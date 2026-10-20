import { useState, useEffect, useRef } from 'react';
import type { ClientData } from '../types';
import ScrollReveal from './ScrollReveal';

interface Props {
  data: ClientData;
  paleta: any;
}

export default function LocationT3({ data, paleta }: Props) {
  const [isHovered, setIsHovered] = useState(false);
  const [shouldLoadMap, setShouldLoadMap] = useState(false);
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const buttonHref = `https://wa.me/${data.contact.whatsapp}`;

  useEffect(() => {
    if (!mapContainerRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShouldLoadMap(true);
          observer.disconnect();
        }
      },
      { rootMargin: '300px' }
    );

    observer.observe(mapContainerRef.current);

    return () => observer.disconnect();
  }, []);

  return (
    <section id="ubicacion" className="w-full py-[80px] lg:py-[100px]" style={{ backgroundColor: paleta.fondoCajas }}>
      <div className="max-w-[1250px] mx-auto px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
        
        <div className="flex flex-col items-start text-left">
          <ScrollReveal>
            <h2 className="text-[32px] md:text-[44px] font-bold font-['Lexend_Deca'] tracking-tight leading-[1.1] mb-6 whitespace-pre-line" style={{ color: paleta.textoOscuro }}>
              {data.location.title}
            </h2>
          </ScrollReveal>
          
          <ScrollReveal>
            <p className="text-[17px] md:text-[19px] font-normal font-['Inter'] leading-relaxed mb-10 text-balance" style={{ color: paleta.textoGris }}>
              {data.location.description}
            </p>
          </ScrollReveal>

          <ScrollReveal>
             {/* BOTÓN CON EFECTO INVERSO (Solid -> Outline) */}
             <a 
                href={buttonHref}
                target="_blank" rel="noopener noreferrer"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                className="group relative overflow-hidden w-full sm:w-auto px-10 py-4 rounded-[4px] flex justify-center items-center gap-3 transition-all duration-300 active:scale-95 shadow-lg"
                style={{ 
                  backgroundColor: paleta.fondoOscuro,
                  borderColor: paleta.fondoOscuro,
                  borderWidth: '1.5px'
                }}
              >
                {/* Animación "Vaciado" (Llena con el color blanco) */}
                <div 
                  className="absolute left-0 top-0 h-full transition-all duration-500 ease-in-out z-0"
                  style={{ 
                    width: isHovered ? '100%' : '0%',
                    backgroundColor: '#FFFFFF' 
                  }}
                />
                
                <span 
                  className="relative z-10 text-[16px] font-semibold font-['Inter'] tracking-wide transition-colors duration-300" 
                  style={{ color: isHovered ? paleta.fondoOscuro : '#FFFFFF' }}
                >
                  {data.location.buttonText}
                </span>
             </a>
          </ScrollReveal>
        </div>

        <ScrollReveal>
          <div 
            ref={mapContainerRef}
            className="w-full h-[350px] md:h-[450px] rounded-[16px] overflow-hidden shadow-lg border relative group bg-slate-100 flex items-center justify-center" 
            style={{ borderColor: `${paleta.textoGris}20` }}
          >
            {shouldLoadMap ? (
              <iframe 
                src={data.location.mapEmbedUrl} 
                width="100%" 
                height="100%" 
                style={{ border: 0 }} 
                allowFullScreen={false} 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
                title="Ubicación de nuestras oficinas"
                className="absolute inset-0 transition-transform duration-700 group-hover:scale-105"
              />
            ) : (
              <div 
                className="flex flex-col items-center justify-center p-6 text-center cursor-pointer select-none"
                onClick={() => setShouldLoadMap(true)}
              >
                <div className="w-12 h-12 rounded-full flex items-center justify-center mb-3 shadow-sm bg-white" style={{ color: paleta.fondoOscuro }}>
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <span className="text-[14px] font-semibold font-['Inter']" style={{ color: paleta.textoOscuro }}>
                  Cargar mapa interactivo
                </span>
                <span className="text-[12px] font-normal font-['Inter'] mt-1 text-slate-500">
                  Haz clic o desplázate para explorar
                </span>
              </div>
            )}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}