import { useState } from 'react';
import type { ClientData } from '../types';

interface Props {
  data: ClientData;
  paleta: any;
}

export default function HeroT3({ data, paleta }: Props) {
  const [isHovered, setIsHovered] = useState(false);

  const isCalendar = data.hero.buttonType === 'calendar';
  const buttonHref = isCalendar && data.hero.buttonUrl 
    ? data.hero.buttonUrl 
    : `https://wa.me/${data.contact.whatsapp}`;

  const iconSvg = isCalendar ? (
    <svg className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
  ) : (
    <svg className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
  );

  return (
    <section id="inicio" className="relative w-full h-[100svh] min-h-[750px] flex flex-col justify-end lg:justify-center overflow-hidden pb-12 lg:pb-0" style={{ backgroundColor: paleta.fondoOscuro }}>
      
      <picture className="absolute inset-0 w-full h-full">
        <source media="(min-width: 1024px)" srcSet={data.hero.images.desktop} />
        <source media="(min-width: 768px)" srcSet={data.hero.images.tablet} />
        <img 
          src={data.hero.images.mobile} 
          alt="Fondo corporativo del estudio jurídico" 
          className="w-full h-full object-cover object-center"
        />
      </picture>

      {/* Sombra suave protectora para la Navbar */}
      <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-black/70 to-transparent pointer-events-none z-0" />

      {/* Degradado neutro cinematográfico para legibilidad (sin tinte azul) */}
      <div 
        className="absolute inset-0 hidden lg:block pointer-events-none" 
        style={{ 
          background: 'linear-gradient(90deg, rgba(0, 0, 0, 0.88) 0%, rgba(0, 0, 0, 0.7) 40%, rgba(0, 0, 0, 0.3) 75%, rgba(0, 0, 0, 0.15) 100%)' 
        }} 
      />
      <div 
        className="absolute inset-0 lg:hidden pointer-events-none" 
        style={{ 
          background: 'linear-gradient(180deg, rgba(0, 0, 0, 0.6) 0%, rgba(0, 0, 0, 0.25) 25%, rgba(0, 0, 0, 0.75) 65%, rgba(0, 0, 0, 0.94) 100%)' 
        }} 
      />

      <div className="relative z-10 w-full max-w-[1250px] mx-auto px-6 sm:px-10 lg:px-12 flex flex-col items-start h-auto">
        <div className="max-w-[800px] flex flex-col items-start w-full">
          
          <h1 
            className="text-[40px] sm:text-[48px] md:text-[56px] lg:text-[76px] font-extrabold font-['Lexend_Deca'] tracking-tighter leading-[1.1] mb-5 text-balance drop-shadow-lg" 
            style={{ color: paleta.textoClaro }}
          >
            {data.hero.title}
          </h1>
          
          <p 
            className="text-[16px] sm:text-[18px] md:text-[20px] lg:text-[22px] font-light font-['Inter'] leading-relaxed max-w-[550px] lg:max-w-[650px] mb-8 text-balance drop-shadow-md" 
            style={{ color: `${paleta.textoClaro}E6` }}
          >
            {data.hero.subtitle}
          </p>
          
          {/* BOTÓN UNIFICADO */}
          <a 
            href={buttonHref}
            target="_blank" rel="noopener noreferrer"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className="group relative overflow-hidden w-full sm:w-auto px-8 sm:px-10 py-3.5 sm:py-4 rounded-[4px] flex justify-center items-center gap-3 transition-all duration-300 active:scale-95 shadow-lg"
            style={{ 
              backgroundColor: 'rgba(226, 232, 240, 0.08)',
              borderColor: paleta.colorSecundario || '#E2E8F0',
              borderWidth: '1.5px'
            }}
          >
            {/* Animación Fill */}
            <div 
              className="absolute left-0 top-0 h-full transition-all duration-500 ease-in-out z-0"
              style={{ 
                width: isHovered ? '100%' : '0%',
                backgroundColor: '#FFFFFF' 
              }}
            />

            <span 
              className="relative z-10 text-[15px] sm:text-[16px] font-semibold font-['Inter'] tracking-wide transition-colors duration-300" 
              style={{ color: isHovered ? paleta.fondoOscuro : paleta.textoClaro }}
            >
              {data.hero.buttonText}
            </span>
            <div className="relative z-10 transition-colors duration-300" style={{ color: isHovered ? paleta.fondoOscuro : paleta.textoClaro }}>
               {iconSvg}
            </div>
          </a>

        </div>
      </div>
    </section>
  );
}