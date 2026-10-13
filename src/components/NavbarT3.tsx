import { useState, useEffect } from 'react';
import type { ClientData } from '../types';

interface Props {
  data: ClientData;
  paleta: any;
}

export default function NavbarT3({ data, paleta }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isHovered, setIsHovered] = useState(false); 

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 150);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = data.nav?.links || [
    { name: 'Especialidades', href: '#servicios' },
    { name: 'Sobre Nosotros', href: '#equipo' },
    { name: 'Contacto', href: '#contacto' },
    { name: 'Ubicación', href: '#ubicacion' }
  ];

  const navButtonText = data.nav?.buttonText || data.hero.buttonText;

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
        <a href="#inicio" className="flex items-baseline transition-transform hover:scale-105" onClick={() => setIsOpen(false)}>
          <span className="text-[22px] lg:text-[26px] font-bold font-['Lexend_Deca'] tracking-tight" style={{ color: paleta.textoClaro }}>
            {data.businessName.replace('.', '')}
          </span>
          <span className="text-[24px] lg:text-[32px] font-bold font-['Lexend_Deca'] leading-none" style={{ color: paleta.colorSecundario || '#E2E8F0' }}>.</span>
        </a>

        {/* CONTENEDOR DERECHO: Links y Botón (Desktop) */}
        <div className="hidden lg:flex items-center justify-end flex-1 gap-8">
          
          <div className="flex items-center gap-8">
            {navLinks.map((link: any) => (
              <a 
                key={link.name} 
                href={link.href} 
                className="text-[14px] font-medium font-['Inter'] transition-colors tracking-wide"
                style={{ color: scrolled ? `${paleta.textoClaro}D9` : paleta.textoClaro }}
                onMouseEnter={(e) => e.currentTarget.style.color = '#FFFFFF'}
                onMouseLeave={(e) => e.currentTarget.style.color = scrolled ? `${paleta.textoClaro}D9` : paleta.textoClaro}
              >
                {link.name}
              </a>
            ))}
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
          maxHeight: isOpen ? '400px' : '0px',
          paddingTop: isOpen ? '16px' : '0px',
          paddingBottom: isOpen ? '40px' : '0px',
          opacity: isOpen ? 1 : 0,
          boxShadow: isOpen ? '0 20px 25px -5px rgba(0, 0, 0, 0.5)' : 'none' // Sombra al abrir
        }}
      >
        <div className="flex flex-col items-center gap-8 w-full mt-4">
          {navLinks.map((link: any) => (
            <a 
              key={link.name} 
              href={link.href} 
              onClick={() => setIsOpen(false)} 
              className="text-[17px] font-medium font-['Lexend_Deca'] tracking-wide transition-opacity hover:opacity-80" 
              style={{ color: paleta.textoClaro }}
            >
              {link.name}
            </a>
          ))}
          
          {/* BOTÓN SÓLIDO MOBILE: Mismo estilo premium del hero */}
          <a 
            href={`https://wa.me/${data.contact.whatsapp}`}
            className="mt-4 px-10 py-3.5 font-semibold font-['Inter'] rounded-[4px] flex items-center justify-center gap-2 shadow-lg w-[85%] max-w-[300px] transition-transform active:scale-95"
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