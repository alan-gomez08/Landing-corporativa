import { useState } from 'react';
import type { ClientData } from '../types';
import ScrollReveal from './ScrollReveal';

interface Props {
  data: ClientData;
  paleta: any;
}

export default function LocationT3({ data, paleta }: Props) {
  const [isHovered, setIsHovered] = useState(false);
  const buttonHref = `https://wa.me/${data.contact.whatsapp}`;

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
                  backgroundColor: paleta.fondoOscuro, // Empieza Sólido en azul oscuro
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
                  style={{ color: isHovered ? paleta.fondoOscuro : '#FFFFFF' }} // Pasa a ser de color azul cuando se llena de blanco
                >
                  {data.location.buttonText}
                </span>
             </a>
          </ScrollReveal>
        </div>

        <ScrollReveal>
          <div className="w-full h-[350px] md:h-[450px] rounded-[16px] overflow-hidden shadow-lg border relative group" style={{ borderColor: `${paleta.textoGris}20` }}>
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
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}