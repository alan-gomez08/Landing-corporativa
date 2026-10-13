import { useState } from 'react';
import type { ClientData } from '../types';
import ScrollReveal from './ScrollReveal';

interface Props {
  data: ClientData;
  paleta: any;
}

export default function CtaT3({ data, paleta }: Props) {
  const [isHovered, setIsHovered] = useState(false);

  // Verificamos si existe el bloque CTA en la configuración, sino usamos valores por defecto
  const ctaData = data.cta || {
    title: 'Llevá la imagen de tu empresa al siguiente nivel',
    description: 'Contactanos hoy para un diagnóstico rápido de tu presencia digital.',
    buttonText: 'Agendar una reunión',
    buttonType: 'whatsapp',
    buttonUrl: ''
  };

  // Lógica para el botón dinámico (WhatsApp o Calendar)
  const isCalendar = ctaData.buttonType === 'calendar';
  const buttonHref = isCalendar && ctaData.buttonUrl 
    ? ctaData.buttonUrl 
    : `https://wa.me/${data.contact.whatsapp}`;

  const iconSvg = isCalendar ? (
    <svg className="w-5 h-5 transition-transform group-hover:scale-110 duration-300" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
  ) : (
    <svg className="w-5 h-5 transition-transform group-hover:scale-110 duration-300" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
  );

  return (
    <section id="contacto" className="relative w-full py-[80px] lg:py-[120px] flex justify-center overflow-hidden" style={{ backgroundColor: paleta.fondoOscuroSecundario }}>
      
      {/* EFECTO GLOW: Ahora el resplandor está libre en el fondo, creando un aura sutil */}
      <div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] md:w-[600px] h-[400px] md:h-[600px] opacity-15 blur-[120px] pointer-events-none rounded-full" 
        style={{ backgroundColor: paleta.colorPrimario }} 
      />

      <div className="relative z-10 w-full max-w-[1000px] mx-auto px-4 md:px-8">
        <ScrollReveal>
          <div className="flex flex-col items-center justify-center text-center gap-6 md:gap-8">
            
            <h2 className="text-[32px] md:text-[46px] lg:text-[56px] font-bold font-['Lexend_Deca'] leading-[1.15] max-w-[800px] drop-shadow-lg" style={{ color: paleta.textoClaro }}>
              {ctaData.title}
            </h2>
            
            <p className="text-[17px] md:text-[20px] font-normal font-['Inter'] max-w-[520px] lg:max-w-[650px] leading-relaxed" style={{ color: `${paleta.textoClaro}B3` }}>
              {ctaData.description}
            </p>
            
            <div className="mt-4 w-full sm:w-auto">
              <a 
                href={buttonHref}
                target="_blank" rel="noopener noreferrer"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                className="group relative overflow-hidden w-full sm:w-auto px-10 py-4 rounded-[8px] flex justify-center items-center gap-3 transition-all duration-300 active:scale-95"
                style={{ 
                  backgroundColor: paleta.fondoOscuro, 
                  borderColor: paleta.colorSecundario || '#E2E8F0',
                  borderWidth: '1.5px',
                  boxShadow: isHovered ? '0px 0px 30px rgba(255, 255, 255, 0.2)' : `0px 10px 30px ${paleta.fondoOscuroSecundario}`
                }}
              >
                {/* FILL ANIMADO */}
                <div 
                  className="absolute left-0 top-0 h-full transition-all duration-[400ms] ease-out z-0"
                  style={{ 
                    width: isHovered ? '100%' : '0%',
                    backgroundColor: '#FFFFFF' 
                  }}
                />
                
                <span className="relative z-10 text-[15px] md:text-[17px] font-bold font-['Inter'] tracking-wide transition-colors duration-300" style={{ color: isHovered ? paleta.fondoOscuro : paleta.textoClaro }}>
                  {ctaData.buttonText}
                </span>
                <div className="relative z-10 transition-colors duration-300" style={{ color: isHovered ? paleta.fondoOscuro : paleta.textoClaro }}>
                  {iconSvg}
                </div>
              </a>
            </div>

          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}