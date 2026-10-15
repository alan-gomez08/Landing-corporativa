import { useState } from 'react';
import type { ClientData } from '../types';
import ScrollReveal from './ScrollReveal';
import LegalModal, { type LegalTab } from './LegalModal';

interface Props {
  data: ClientData;
  paleta: any;
}

export default function FooterT3({ data, paleta }: Props) {
  const currentYear = new Date().getFullYear();
  const [activeLegalTab, setActiveLegalTab] = useState<LegalTab | null>(null);

  const openLegalModal = (tab: LegalTab) => {
    setActiveLegalTab(tab);
  };

  const closeLegalModal = () => {
    setActiveLegalTab(null);
  };

  return (
    <footer className="w-full pt-12 lg:pt-16 pb-8 px-6 lg:px-8 border-t" style={{ backgroundColor: paleta.fondoOscuroSecundario, borderColor: `${paleta.textoClaro}10` }}>
      <div className="max-w-[1250px] mx-auto flex flex-col">
        
        <ScrollReveal>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 lg:gap-16 items-start pb-10">
            
            {/* COLUMNA 1: LOGO, DESCRIPCIÓN Y REDES */}
            <div className="flex flex-col items-start max-w-[380px]">
              <a href="#inicio" className="flex items-baseline mb-4">
                <span className="text-[24px] font-bold font-['Lexend_Deca'] tracking-wide" style={{ color: paleta.textoClaro }}>
                  {data.businessName.replace('.', '')}
                </span>
                <span className="text-[24px] font-bold font-['Lexend_Deca'] leading-none" style={{ color: paleta.colorSecundario || '#E2E8F0' }}>.</span>
              </a>
              
              <p className="text-[15px] font-normal font-['Inter'] leading-relaxed mb-6" style={{ color: `${paleta.textoClaro}99` }}>
                Estudio jurídico especializado en derecho laboral y accidentes viales. Asesoramiento legal y representación integral para damnificados.
              </p>

              <div className="flex items-center gap-3">
                <a 
                  href={`https://wa.me/${data.contact.whatsapp}`} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  title="WhatsApp"
                  className="w-9 h-9 rounded-[8px] flex justify-center items-center transition-colors" 
                  style={{ backgroundColor: `${paleta.textoClaro}15`, color: paleta.textoClaro }} 
                  onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = '#FFFFFF'; e.currentTarget.style.color = paleta.fondoOscuro; }} 
                  onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = `${paleta.textoClaro}15`; e.currentTarget.style.color = paleta.textoClaro; }}
                >
                  <svg className="w-[17px] h-[17px]" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                </a>
                <a 
                  href={data.contact.instagram || '#'} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  title="Instagram"
                  className="w-9 h-9 rounded-[8px] flex justify-center items-center transition-colors" 
                  style={{ backgroundColor: `${paleta.textoClaro}15`, color: paleta.textoClaro }} 
                  onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = '#FFFFFF'; e.currentTarget.style.color = paleta.fondoOscuro; }} 
                  onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = `${paleta.textoClaro}15`; e.currentTarget.style.color = paleta.textoClaro; }}
                >
                  <svg className="w-[17px] h-[17px]" fill="currentColor" viewBox="0 0 448 512"><path d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z" /></svg>
                </a>
                <a 
                  href={data.contact.facebook || '#'} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  title="Facebook"
                  className="w-9 h-9 rounded-[8px] flex justify-center items-center transition-colors" 
                  style={{ backgroundColor: `${paleta.textoClaro}15`, color: paleta.textoClaro }} 
                  onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = '#FFFFFF'; e.currentTarget.style.color = paleta.fondoOscuro; }} 
                  onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = `${paleta.textoClaro}15`; e.currentTarget.style.color = paleta.textoClaro; }}
                >
                  <svg className="w-[17px] h-[17px]" fill="currentColor" viewBox="0 0 320 512"><path d="M275.9 330.7H171.8V512H90V330.7H16V226.6h74v-58.4c0-67.6 39.5-105.4 105.5-105.4 14.4 0 27.5 1.1 31.2 1.5v72.3h-42.6c-16.8 0-20.1 8-20.1 19.7v45.9h66.3l-10.4 104.1z" /></svg>
                </a>
              </div>
            </div>

            {/* COLUMNA 2: NAVEGACIÓN */}
            <div className="flex flex-col items-start">
              <h3 className="text-[15px] font-semibold font-['Inter'] mb-5" style={{ color: paleta.textoClaro }}>
                Navegación
              </h3>
              <ul className="flex flex-col gap-3 text-[14px] font-['Inter']" style={{ color: `${paleta.textoClaro}B3` }}>
                <li>
                  <a href="#inicio" className="hover:text-white transition-colors">
                    Inicio
                  </a>
                </li>
                <li>
                  <a href="#servicios" className="hover:text-white transition-colors">
                    Especialidades
                  </a>
                </li>
                <li>
                  <a href="#equipo" className="hover:text-white transition-colors">
                    Sobre Nosotros
                  </a>
                </li>
                <li>
                  <a href="#contacto" className="hover:text-white transition-colors">
                    Contacto
                  </a>
                </li>
                <li>
                  <a href="#ubicacion" className="hover:text-white transition-colors">
                    Ubicación
                  </a>
                </li>
              </ul>
            </div>

            {/* COLUMNA 3: CONTACTO */}
            <div className="flex flex-col items-start">
              <h3 className="text-[15px] font-semibold font-['Inter'] mb-5" style={{ color: paleta.textoClaro }}>
                Contacto
              </h3>
              <div className="flex flex-col gap-3.5 text-[14px] font-['Inter']" style={{ color: `${paleta.textoClaro}B3` }}>
                <div className="flex items-start gap-3">
                  <svg className="w-[17px] h-[17px] shrink-0 mt-0.5 text-slate-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                  <span>Av. Corrientes 1234, CABA</span>
                </div>
                <div className="flex items-start gap-3">
                  <svg className="w-[17px] h-[17px] shrink-0 mt-0.5 text-slate-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                  <span>(11) 4567-8900</span>
                </div>
                <div className="flex items-start gap-3">
                  <svg className="w-[17px] h-[17px] shrink-0 mt-0.5 text-slate-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                  <span>estudio@ejemplo.com</span>
                </div>
              </div>
            </div>

          </div>
        </ScrollReveal>

        {/* LÍNEA DE SEPARACIÓN Y AVISO LEGAL / COPYRIGHT */}
        <div className="w-full pt-8 border-t flex flex-col items-center justify-center gap-3.5 text-center" style={{ borderColor: `${paleta.textoClaro}15` }}>
          {/* Fila de Enlaces Legales */}
          <div className="flex flex-wrap items-center justify-center gap-2.5 text-xs sm:text-sm font-['Inter'] text-[#94A3B8]">
            <button 
              type="button"
              onClick={() => openLegalModal('terminos')} 
              className="hover:text-white transition-colors cursor-pointer underline-offset-4 hover:underline"
            >
              Términos y Condiciones
            </button>
            <span className="text-[#64748B] select-none">|</span>
            <button 
              type="button"
              onClick={() => openLegalModal('privacidad')} 
              className="hover:text-white transition-colors cursor-pointer underline-offset-4 hover:underline"
            >
              Política de Privacidad
            </button>
            <span className="text-[#64748B] select-none">|</span>
            <button 
              type="button"
              onClick={() => openLegalModal('deslinde')} 
              className="hover:text-white transition-colors cursor-pointer underline-offset-4 hover:underline"
            >
              Deslinde de Responsabilidad
            </button>
          </div>

          {/* Copyright */}
          <div className="flex flex-wrap items-center justify-center gap-x-2 gap-y-1 text-xs sm:text-sm font-['Inter'] text-[#94A3B8]">
            <span>© 2026 AG Web Design. Todos los derechos reservados.</span>
            {data.businessName && (
              <>
                <span className="text-[#64748B] select-none">·</span>
                <span className="text-[#64748B]">
                  © {currentYear} {data.businessName.replace('.', '')}
                </span>
              </>
            )}
          </div>

          {/* Texto de descargo de marcas */}
          <p className="max-w-[850px] text-xs sm:text-sm leading-relaxed font-['Inter'] text-[#64748B]">
            Servicios de diseño y desarrollo web independientes. Las marcas comerciales, logotipos y nombres de terceros (como Mercado Libre, WhatsApp, Google o Meta) pertenecen a sus respectivos titulares y se mencionan exclusivamente con fines descriptivos de compatibilidad técnica.
          </p>
        </div>

      </div>

      {/* Modal emergente para Términos, Privacidad y Deslinde */}
      <LegalModal 
        isOpen={activeLegalTab !== null}
        onClose={closeLegalModal}
        initialTab={activeLegalTab || 'terminos'}
        paleta={paleta}
      />
    </footer>
  );
}