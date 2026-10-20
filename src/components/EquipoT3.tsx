import type { ClientData } from '../types';
import ScrollReveal from './ScrollReveal';

interface Props {
  data: ClientData;
  paleta: any;
}

export default function EquipoT3({ data, paleta }: Props) {
  const paragraphs = data.about.description.split('\n\n');

  return (
    <section id="equipo" className="w-full py-[80px] lg:py-[100px]" style={{ backgroundColor: paleta.fondoCajas }}>
      <div className="max-w-[1250px] mx-auto px-6 lg:px-8 flex flex-col items-center">
        
        <ScrollReveal>
          <h2 className="hidden lg:block text-center text-[48px] font-bold font-['Lexend_Deca'] mb-10 lg:mb-12" style={{ color: paleta.textoOscuro }}>
            {data.about.title}
          </h2>
        </ScrollReveal>

        <div className="w-full flex flex-col lg:flex-row items-center lg:items-start justify-between gap-12 lg:gap-16 xl:gap-24">
          
          <div className="w-full lg:w-1/2 flex flex-col justify-start">
            <ScrollReveal>
              <h2 className="lg:hidden text-left text-[32px] md:text-[40px] font-bold font-['Lexend_Deca'] mb-6" style={{ color: paleta.textoOscuro }}>
                {data.about.title}
              </h2>

              <div className="flex flex-col gap-6 text-[16px] md:text-[18px] font-normal font-['Inter'] lg:font-['Lexend_Deca'] leading-[1.7] md:leading-[1.8]" style={{ color: paleta.textoGris }}>
                {paragraphs.map((text, index) => (
                  <p key={index}>{text}</p>
                ))}
              </div>

              <ul className="flex flex-col gap-4 mt-8 md:mt-10">
                {data.stats.items.map((item, index) => (
                  <li key={index} className="flex items-start gap-4">
                    <div 
                      className="w-6 h-6 rounded-full flex items-center justify-center shrink-0 mt-0.5 shadow-sm"
                      style={{ backgroundColor: paleta.fondoOscuro }}
                    >
                      <svg className="w-3.5 h-3.5" style={{ color: paleta.colorSecundario || '#E2E8F0' }} fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span className="text-[16px] md:text-[18px] font-light font-['Lexend_Deca']" style={{ color: paleta.textoGris }}>
                      {item.label}
                    </span>
                  </li>
                ))}
              </ul>
            </ScrollReveal>
          </div>

          <div className="w-full lg:w-1/2 flex justify-center lg:justify-end shrink-0">
            <ScrollReveal>
              <div className="w-full max-w-[600px] lg:max-w-[608px] rounded-[24px] overflow-hidden shadow-lg border" style={{ borderColor: `${paleta.textoGris}1A` }}>
                <img 
                  src={data.about.images.desktop} 
                  alt={data.about.title} 
                  width="800"
                  height="1200"
                  loading="lazy"
                  decoding="async"
                  className="w-full h-auto lg:h-[640px] object-cover hover:scale-105 transition-transform duration-700"
                />
              </div>
            </ScrollReveal>
          </div>

        </div>
      </div>
    </section>
  );
}