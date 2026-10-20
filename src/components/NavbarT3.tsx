import { useState, useEffect, useRef, useMemo } from 'react';
import type { ClientData } from '../types';

interface Props {
  data: ClientData;
  paleta: any;
}

export default function NavbarT3({ data, paleta }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isHovered, setIsHovered] = useState(false); 
  const [activeSection, setActiveSection] = useState<string>('');

  const isClickScrolling = useRef(false);
  const scrollTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Referencia y estado para el subrayado animado deslizante
  const navContainerRef = useRef<HTMLDivElement>(null);
  const [indicatorStyle, setIndicatorStyle] = useState<{
    left: number;
    width: number;
    opacity: number;
  }>({
    left: 0,
    width: 0,
    opacity: 0,
  });
  const [hasInitialized, setHasInitialized] = useState(false);

  const navLinks = useMemo(() => data.nav?.links || [
    { name: 'Especialidades', href: '#servicios' },
    { name: 'Sobre Nosotros', href: '#equipo' },
    { name: 'Contacto', href: '#contacto' },
    { name: 'Ubicación', href: '#ubicacion' }
  ], [data.nav?.links]);

  const navButtonText = data.nav?.buttonText || data.hero.buttonText;

  // LÓGICA DE SCROLLSPY: Detección precisa de la sección activa sin forzar reflujos
  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      const scrollY = window.scrollY;
      setScrolled(scrollY > 80);

      // Si el usuario navegó por click, no sobreescribir temporalmente para mantener la animación fluida
      if (isClickScrolling.current) return;

      // Si estamos en la parte superior (Hero), ningún enlace de sección está seleccionado
      if (scrollY < 180) {
        setActiveSection('');
        return;
      }

      // Si el usuario llega al final de la página (o está muy cerca del pie)
      const windowHeight = window.innerHeight;
      const docHeight = document.documentElement.scrollHeight;
      if (windowHeight + scrollY >= docHeight - 80) {
        const lastLink = navLinks[navLinks.length - 1];
        if (lastLink && lastLink.href.startsWith('#')) {
          setActiveSection(lastLink.href);
          return;
        }
      }

      // Determinamos qué sección cruzó el umbral del header
      const headerOffset = 180;
      let current = '';

      for (const link of navLinks) {
        if (!link.href.startsWith('#')) continue;
        const targetId = link.href.slice(1);
        const element = document.getElementById(targetId);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= headerOffset) {
            current = link.href;
          }
        }
      }

      if (current) {
        setActiveSection(current);
      }
    };

    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    // Si el usuario interrumpe el scroll con la rueda o el dedo, cancelamos el bloqueo de click
    const cancelClickScroll = () => {
      if (isClickScrolling.current) {
        isClickScrolling.current = false;
        if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
      }
    };

    handleScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });
    window.addEventListener('wheel', cancelClickScroll, { passive: true });
    window.addEventListener('touchmove', cancelClickScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      window.removeEventListener('wheel', cancelClickScroll);
      window.removeEventListener('touchmove', cancelClickScroll);
      if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
    };
  }, [navLinks]);

  // EFECTO DE LÍNEA DESLIZANTE: Calcula y anima la posición hacia un lado o el otro
  useEffect(() => {
    let rafId: number;

    const updateIndicator = () => {
      rafId = window.requestAnimationFrame(() => {
        if (!navContainerRef.current) return;

        if (!activeSection) {
          setIndicatorStyle(prev => ({ ...prev, opacity: 0 }));
          return;
        }

        const activeLink = navContainerRef.current.querySelector<HTMLAnchorElement>(
          `a[data-href="${activeSection}"]`
        );

        if (activeLink) {
          setIndicatorStyle({
            left: activeLink.offsetLeft,
            width: activeLink.offsetWidth,
            opacity: 1,
          });
          setHasInitialized(true);
        } else {
          setIndicatorStyle(prev => ({ ...prev, opacity: 0 }));
        }
      });
    };

    updateIndicator();

    window.addEventListener('resize', updateIndicator);
    if (document.fonts?.ready) {
      document.fonts.ready.then(updateIndicator);
    }

    return () => {
      window.cancelAnimationFrame(rafId);
      window.removeEventListener('resize', updateIndicator);
    };
  }, [activeSection, navLinks]);

  // Manejo de clicks en links con scroll suave y actualización inmediata de la guía
  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith('#')) {
      e.preventDefault();
      const id = href.slice(1);
      const element = document.getElementById(id);

      setActiveSection(href);
      isClickScrolling.current = true;
      if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
      scrollTimeoutRef.current = setTimeout(() => {
        isClickScrolling.current = false;
      }, 900);

      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
        if (window.history.pushState) {
          window.history.pushState(null, '', href);
        }
      }
    }
    setIsOpen(false);
  };

  const handleLogoClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    setActiveSection('');
    isClickScrolling.current = true;
    if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
    scrollTimeoutRef.current = setTimeout(() => {
      isClickScrolling.current = false;
    }, 900);

    const hero = document.getElementById('inicio');
    if (hero) {
      hero.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    if (window.history.pushState) {
      window.history.pushState(null, '', '#inicio');
    }
    setIsOpen(false);
  };

  // LÓGICA DE FONDO: Si el usuario scrolleó O si el menú móvil está abierto, aplicamos fondo oscuro sólido.
  const isNavSolid = scrolled || isOpen;

  return (
    <nav 
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${isNavSolid ? 'py-4 shadow-md' : 'py-6'}`}
      style={{ 
        backgroundColor: isNavSolid ? paleta.fondoOscuro : 'transparent',
        borderBottom: (scrolled && !isOpen) ? `1px solid ${paleta.textoClaro}1A` : 'none'
      }}
    >
      <div className="max-w-[1250px] mx-auto px-6 lg:px-8 flex items-center justify-between relative z-20">
        
        {/* LOGO */}
        <a 
          href="#inicio" 
          onClick={handleLogoClick}
          className="flex items-baseline transition-transform hover:scale-105 cursor-pointer"
        >
          <span className="text-[22px] lg:text-[26px] font-bold font-['Lexend_Deca'] tracking-tight" style={{ color: paleta.textoClaro }}>
            {data.businessName.replace('.', '')}
          </span>
          <span className="text-[24px] lg:text-[32px] font-bold font-['Lexend_Deca'] leading-none" style={{ color: paleta.colorSecundario || '#E2E8F0' }}>.</span>
        </a>

        {/* CONTENEDOR DERECHO: Links y Botón (Desktop) */}
        <div className="hidden lg:flex items-center justify-end flex-1 gap-8">
          
          {/* Enlaces con subrayado deslizante */}
          <div ref={navContainerRef} className="relative flex items-center gap-7 lg:gap-8 py-2">
            {navLinks.map((link: any) => {
              const isActive = activeSection === link.href;
              return (
                <a 
                  key={link.name} 
                  data-href={link.href}
                  href={link.href} 
                  onClick={(e) => handleNavClick(e, link.href)}
                  className={`relative py-1 text-[14px] font-['Inter'] tracking-wide transition-colors duration-200 cursor-pointer ${
                    isActive ? 'font-semibold text-white' : 'font-medium hover:text-white'
                  }`}
                  style={{ 
                    color: isActive 
                      ? '#FFFFFF' 
                      : (scrolled ? `${paleta.textoClaro}B3` : `${paleta.textoClaro}CC`) 
                  }}
                >
                  {link.name}
                </a>
              );
            })}

            {/* SUBRAYADO ACTIVO DESLIZANTE: Se desplaza hacia la izquierda o derecha fluidamente */}
            <span 
              className="absolute bottom-0 h-[2.5px] rounded-full pointer-events-none shadow-[0_0_12px_rgba(255,255,255,0.7)]"
              style={{ 
                left: `${indicatorStyle.left}px`,
                width: `${indicatorStyle.width}px`,
                opacity: indicatorStyle.opacity,
                backgroundColor: paleta.colorSecundario || '#FFFFFF',
                transition: hasInitialized 
                  ? 'left 350ms cubic-bezier(0.25, 1, 0.5, 1), width 350ms cubic-bezier(0.25, 1, 0.5, 1), opacity 250ms ease'
                  : 'opacity 200ms ease'
              }}
            />
          </div>
          
          <div className={`transition-all duration-500 ease-out overflow-hidden ${scrolled ? 'opacity-100 translate-x-0 w-[180px]' : 'opacity-0 translate-x-4 w-0 pointer-events-none'}`}>
            <a 
              href={`https://wa.me/${data.contact.whatsapp}`}
              target="_blank" rel="noopener noreferrer"
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
              className="group relative overflow-hidden px-6 py-2.5 rounded-[4px] flex justify-center items-center transition-all duration-300 w-full whitespace-nowrap"
              style={{ 
                backgroundColor: 'rgba(226, 232, 240, 0.08)',
                borderColor: paleta.colorSecundario || '#E2E8F0',
                borderWidth: '1px'
              }}
            >
              <div 
                className="absolute left-0 top-0 h-full transition-all duration-[400ms] ease-out z-0"
                style={{ 
                  width: isHovered ? '100%' : '0%',
                  backgroundColor: '#FFFFFF' 
                }}
              />
              <span 
                className="relative z-10 text-[13px] font-semibold font-['Inter'] tracking-wide transition-colors duration-300" 
                style={{ color: isHovered ? paleta.fondoOscuro : paleta.textoClaro }}
              >
                {navButtonText}
              </span>
            </a>
          </div>

        </div>

        {/* MOBILE MENU TOGGLE (Hamburguesa / Cruz) */}
        <button 
          onClick={() => setIsOpen(!isOpen)}
          className="lg:hidden w-10 h-10 flex flex-col justify-center items-center gap-1.5 ml-auto cursor-pointer"
          aria-label={isOpen ? 'Cerrar menú de navegación' : 'Abrir menú de navegación'}
          aria-expanded={isOpen}
        >
          <div className={`w-[24px] h-[2px] rounded-full transition-transform duration-300 ${isOpen ? 'rotate-45 translate-y-[8px]' : ''}`} style={{ backgroundColor: paleta.textoClaro }} />
          <div className={`w-[24px] h-[2px] rounded-full transition-opacity duration-300 ${isOpen ? 'opacity-0' : 'opacity-100'}`} style={{ backgroundColor: paleta.textoClaro }} />
          <div className={`w-[24px] h-[2px] rounded-full transition-transform duration-300 ${isOpen ? '-rotate-45 -translate-y-[8px]' : ''}`} style={{ backgroundColor: paleta.textoClaro }} />
        </button>
      </div>

      {/* MOBILE MENU DROPDOWN */}
      <div 
        className="absolute top-full left-0 w-full flex flex-col items-center lg:hidden transition-all duration-300 ease-in-out overflow-hidden z-10" 
        style={{ 
          backgroundColor: paleta.fondoOscuro, 
          maxHeight: isOpen ? '440px' : '0px',
          paddingTop: isOpen ? '20px' : '0px',
          paddingBottom: isOpen ? '36px' : '0px',
          opacity: isOpen ? 1 : 0,
          boxShadow: isOpen ? '0 20px 25px -5px rgba(0, 0, 0, 0.5)' : 'none'
        }}
      >
        <div className="flex flex-col items-center gap-5 w-full px-6">
          {navLinks.map((link: any) => {
            const isActive = activeSection === link.href;
            return (
              <a 
                key={link.name} 
                href={link.href} 
                onClick={(e) => handleNavClick(e, link.href)} 
                className={`relative py-1 text-[17px] font-['Lexend_Deca'] tracking-wide transition-colors duration-200 flex flex-col items-center cursor-pointer ${
                  isActive 
                    ? 'font-semibold text-white' 
                    : 'font-medium text-white/70 hover:text-white'
                }`}
              >
                <span>{link.name}</span>
                {/* Subrayado elegante en mobile sin fondos */}
                <span 
                  className={`h-[2px] rounded-full transition-all duration-300 mt-1 shadow-[0_0_8px_rgba(255,255,255,0.7)] ${
                    isActive 
                      ? 'w-full opacity-100' 
                      : 'w-0 opacity-0'
                  }`}
                  style={{ backgroundColor: paleta.colorSecundario || '#FFFFFF' }}
                />
              </a>
            );
          })}
          
          {/* BOTÓN SÓLIDO MOBILE */}
          <a 
            href={`https://wa.me/${data.contact.whatsapp}`}
            className="mt-3 px-10 py-3.5 font-semibold font-['Inter'] rounded-[4px] flex items-center justify-center gap-2 shadow-lg w-full max-w-[280px] transition-transform active:scale-95"
            style={{ 
              backgroundColor: '#FFFFFF', 
              color: paleta.fondoOscuro 
            }}
          >
            {navButtonText}
          </a>
        </div>
      </div>
    </nav>
  );
}