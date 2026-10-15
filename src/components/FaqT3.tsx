import { useState } from 'react';
import type { ClientData } from '../types';
import ScrollReveal from './ScrollReveal';

interface Props {
  data: ClientData | any; // Usamos any temporalmente para leer la nueva prop
  paleta: any;
}

export default function FaqT3({ data, paleta }: Props) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  // Consumimos las FAQs desde dataT3.ts o usamos un array vacío por seguridad
  const faqList = data.faqs || [];

  // Si no hay faqs, directamente no mostramos la sección
  if (faqList.length === 0) return null;

  const toggleFaq = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section id="faq" className="w-full py-[80px] lg:py-[100px]" style={{ backgroundColor: paleta.fondoClaro }}>
      <div className="max-w-[800px] mx-auto px-6 lg:px-8">
        
        <ScrollReveal>
          <div className="text-center mb-12">
            <h2 className="text-[32px] md:text-[40px] font-bold font-['Lexend_Deca'] leading-tight mb-4" style={{ color: paleta.textoOscuro }}>
              Preguntas Frecuentes
            </h2>
            <p className="text-[16px] md:text-[18px] font-normal font-['Inter']" style={{ color: paleta.textoGris }}>
              Resolvemos tus dudas principales antes de iniciar tu reclamo con nosotros.
            </p>
          </div>
        </ScrollReveal>

        <div className="flex flex-col gap-4">
          {faqList.map((faq: any, index: number) => {
            const isOpen = activeIndex === index;
            
            return (
              <ScrollReveal key={index}>
                <div 
                  className="rounded-[12px] border transition-all duration-300 overflow-hidden cursor-pointer"
                  style={{ 
                    backgroundColor: paleta.fondoCajas, 
                    borderColor: isOpen ? paleta.fondoOscuro : `${paleta.textoGris}33`,
                    boxShadow: isOpen ? `0 10px 20px -10px rgba(11, 25, 44, 0.15)` : 'none'
                  }}
                  onClick={() => toggleFaq(index)}
                >
                  <div className="flex justify-between items-center p-6 select-none">
                    <h3 className="text-[16px] md:text-[18px] font-semibold font-['Lexend_Deca'] pr-4" style={{ color: paleta.textoOscuro }}>
                      {faq.question}
                    </h3>
                    <div 
                      className="flex-shrink-0 w-8 h-8 rounded-full flex justify-center items-center transition-transform duration-300"
                      style={{ 
                        backgroundColor: isOpen ? paleta.fondoOscuro : `${paleta.textoGris}1A`,
                        color: isOpen ? (paleta.colorSecundario || '#E2E8F0') : paleta.textoOscuro,
                        transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)'
                      }}
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </div>
                  
                  <div 
                    className="grid transition-all duration-300 ease-in-out"
                    style={{ gridTemplateRows: isOpen ? '1fr' : '0fr' }}
                  >
                    <div className="overflow-hidden">
                      <p className="px-6 pb-6 pt-2 text-[15px] md:text-[16px] font-['Inter'] leading-relaxed" style={{ color: paleta.textoGris }}>
                        {faq.answer}
                      </p>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            );
          })}
        </div>

      </div>
    </section>
  );
}