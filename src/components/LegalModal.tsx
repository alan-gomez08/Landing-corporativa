import { useState, useEffect } from 'react';

export type LegalTab = 'terminos' | 'privacidad' | 'deslinde';

interface LegalModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialTab?: LegalTab;
  paleta?: any;
}

export default function LegalModal({
  isOpen,
  onClose,
  initialTab = 'terminos',
  paleta = {
    fondoOscuro: '#0B192C',
    fondoOscuroSecundario: '#06101E',
    textoClaro: '#FFFFFF',
    colorPrimario: '#0B192C',
    colorSecundario: '#E2E8F0',
  },
}: LegalModalProps) {
  const [activeTab, setActiveTab] = useState<LegalTab>(initialTab);

  // Sincronizar el tab activo cuando cambia initialTab o se abre el modal
  useEffect(() => {
    if (isOpen && initialTab) {
      setActiveTab(initialTab);
    }
  }, [isOpen, initialTab]);

  // Manejar tecla Escape y bloqueo de scroll
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-8 animate-menu-fade"
      role="dialog"
      aria-modal="true"
      aria-labelledby="legal-modal-title"
    >
      {/* Backdrop con desenfoque */}
      <div 
        className="fixed inset-0 bg-black/75 backdrop-blur-sm transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Contenedor de la ventana modal */}
      <div 
        className="relative w-full max-w-3xl max-h-[90vh] flex flex-col rounded-2xl shadow-2xl overflow-hidden border transition-all z-10"
        style={{
          backgroundColor: paleta.fondoOscuroSecundario || '#06101E',
          borderColor: `${paleta.textoClaro}20`,
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Cabecera del modal */}
        <div 
          className="flex items-center justify-between px-6 py-5 border-b shrink-0"
          style={{ borderColor: `${paleta.textoClaro}15` }}
        >
          <div className="flex items-center gap-3">
            <div 
              className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 border"
              style={{
                backgroundColor: `${paleta.textoClaro}0D`,
                borderColor: `${paleta.textoClaro}1A`,
                color: '#94A3B8',
              }}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <div>
              <h2 id="legal-modal-title" className="text-lg sm:text-xl font-bold font-['Lexend_Deca'] text-white">
                Información Legal
              </h2>
              <p className="text-xs text-[#94A3B8] font-['Inter']">
                AG Web Design · Términos, Privacidad y Descargo de Marcas
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Cerrar modal"
            className="w-9 h-9 rounded-lg flex items-center justify-center text-[#94A3B8] hover:text-white transition-colors cursor-pointer border"
            style={{
              backgroundColor: `${paleta.textoClaro}08`,
              borderColor: `${paleta.textoClaro}15`,
            }}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Selector de pestañas */}
        <div 
          className="flex items-center gap-1 sm:gap-2 px-6 pt-3 pb-3 border-b overflow-x-auto hide-scrollbar shrink-0 text-xs sm:text-sm font-['Inter']"
          style={{ 
            backgroundColor: `${paleta.fondoOscuro}80`,
            borderColor: `${paleta.textoClaro}15`,
          }}
        >
          <button
            type="button"
            onClick={() => setActiveTab('terminos')}
            className={`px-3 py-2 rounded-lg font-medium transition-all whitespace-nowrap cursor-pointer ${
              activeTab === 'terminos'
                ? 'bg-white text-[#0B192C] font-semibold shadow-sm'
                : 'text-[#94A3B8] hover:text-white hover:bg-white/5'
            }`}
          >
            Términos y Condiciones
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('privacidad')}
            className={`px-3 py-2 rounded-lg font-medium transition-all whitespace-nowrap cursor-pointer ${
              activeTab === 'privacidad'
                ? 'bg-white text-[#0B192C] font-semibold shadow-sm'
                : 'text-[#94A3B8] hover:text-white hover:bg-white/5'
            }`}
          >
            Política de Privacidad
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('deslinde')}
            className={`px-3 py-2 rounded-lg font-medium transition-all whitespace-nowrap cursor-pointer ${
              activeTab === 'deslinde'
                ? 'bg-white text-[#0B192C] font-semibold shadow-sm'
                : 'text-[#94A3B8] hover:text-white hover:bg-white/5'
            }`}
          >
            Deslinde de Responsabilidad
          </button>
        </div>

        {/* Contenido scrolleable */}
        <div className="px-6 py-6 overflow-y-auto space-y-6 text-[#94A3B8] font-['Inter'] text-sm leading-relaxed">
          {activeTab === 'terminos' && (
            <div className="space-y-5 animate-menu-fade">
              <div className="border-b pb-4" style={{ borderColor: `${paleta.textoClaro}15` }}>
                <span className="inline-block text-[11px] font-semibold tracking-wider uppercase px-2.5 py-1 rounded bg-white/10 text-white mb-2">
                  Acuerdo de Servicio
                </span>
                <h3 className="text-xl font-bold text-white font-['Lexend_Deca']">
                  Términos y Condiciones de Uso
                </h3>
                <p className="text-xs text-[#64748B] mt-1">
                  Vigencia: 2026 · AG Web Design
                </p>
              </div>

              <div>
                <h4 className="text-base font-semibold text-white mb-2">
                  1. Aceptación de los Términos
                </h4>
                <p>
                  El acceso, navegación y utilización de este sitio web y de las plantillas y servicios provistos por <strong className="text-white">AG Web Design</strong> implica la aceptación plena e incondicional de los presentes Términos y Condiciones por parte del usuario o cliente. Si no está de acuerdo con alguna de las cláusulas, deberá abstenerse de utilizar este sitio y los servicios ofrecidos.
                </p>
              </div>

              <div>
                <h4 className="text-base font-semibold text-white mb-2">
                  2. Alcance de los Servicios y Plantillas
                </h4>
                <p>
                  AG Web Design provee servicios profesionales independientes de diseño, maquetación, desarrollo web frontend y plantillas prediseñadas orientadas a empresas, profesionales e instituciones. Las demostraciones contenidas en esta landing page son ejemplos ilustrativos de maquetación y arquitectura web.
                </p>
              </div>

              <div>
                <h4 className="text-base font-semibold text-white mb-2">
                  3. Propiedad Intelectual y Licencia
                </h4>
                <p>
                  El código fuente, estructura de componentes, diseño visual, estilos y recursos gráficos desarrollados por AG Web Design constituyen propiedad intelectual protegida por la legislación correspondiente. La adquisición de una plantilla o proyecto otorga una licencia de uso legítima para el proyecto acordado, quedando prohibida su reventa o redistribución pública no autorizada como plantilla genérica.
                </p>
              </div>

              <div>
                <h4 className="text-base font-semibold text-white mb-2">
                  4. Responsabilidad sobre Contenidos Publicados
                </h4>
                <p>
                  Cada cliente o titular de la implementación final es el exclusivo responsable de los textos, logotipos, imágenes, productos y afirmaciones legales incorporadas en su respectivo sitio web, garantizando contar con las debidas autorizaciones de uso y cumpliendo la normativa vigente de su jurisdicción.
                </p>
              </div>

              <div>
                <h4 className="text-base font-semibold text-white mb-2">
                  5. Limitación de Responsabilidad
                </h4>
                <p>
                  AG Web Design no se responsabiliza por caídas de servidores de hosting externos, fallas en proveedores de dominio, bloqueos de APIs externas (como WhatsApp, Meta, Google Maps) o pérdidas comerciales indirectas derivadas del funcionamiento de servicios de terceros.
                </p>
              </div>
            </div>
          )}

          {activeTab === 'privacidad' && (
            <div className="space-y-5 animate-menu-fade">
              <div className="border-b pb-4" style={{ borderColor: `${paleta.textoClaro}15` }}>
                <span className="inline-block text-[11px] font-semibold tracking-wider uppercase px-2.5 py-1 rounded bg-white/10 text-white mb-2">
                  Protección de Datos
                </span>
                <h3 className="text-xl font-bold text-white font-['Lexend_Deca']">
                  Política de Privacidad
                </h3>
                <p className="text-xs text-[#64748B] mt-1">
                  Transparencia y resguardo de su información · 2026
                </p>
              </div>

              <div>
                <h4 className="text-base font-semibold text-white mb-2">
                  1. Responsable del Tratamiento
                </h4>
                <p>
                  El titular responsable del tratamiento de los datos recolectados en el marco de la prestación de servicios es <strong className="text-white">AG Web Design</strong>.
                </p>
              </div>

              <div>
                <h4 className="text-base font-semibold text-white mb-2">
                  2. Información que Recolectamos
                </h4>
                <p>
                  Solo recopilamos información personal (como nombre, correo electrónico, número de teléfono o datos de contacto) que el usuario decide proporcionar voluntariamente a través de canales de mensajería (WhatsApp), correo electrónico o formularios de contacto.
                </p>
              </div>

              <div>
                <h4 className="text-base font-semibold text-white mb-2">
                  3. Finalidad del Uso de Datos
                </h4>
                <ul className="list-disc list-inside space-y-1.5 pl-2 text-[#94A3B8]">
                  <li>Responder a solicitudes de asesoramiento, cotizaciones o demostraciones técnicas.</li>
                  <li>Coordinar los requerimientos del proyecto de diseño y desarrollo web contratado.</li>
                  <li>Brindar soporte técnico y seguimiento posterior a la entrega.</li>
                </ul>
              </div>

              <div>
                <h4 className="text-base font-semibold text-white mb-2">
                  4. Confidencialidad y No Comercialización
                </h4>
                <p>
                  Garantizamos que bajo ningún concepto vendemos, alquilamos ni transferimos sus datos personales a terceros con fines publicitarios o lucrativos ajenos a la relación profesional.
                </p>
              </div>

              <div>
                <h4 className="text-base font-semibold text-white mb-2">
                  5. Derechos de Acceso y Supresión
                </h4>
                <p>
                  El usuario podrá solicitar en todo momento la actualización, consulta o eliminación definitiva de sus datos personales comunicándose directamente a través de nuestros canales de contacto.
                </p>
              </div>
            </div>
          )}

          {activeTab === 'deslinde' && (
            <div className="space-y-5 animate-menu-fade">
              <div className="border-b pb-4" style={{ borderColor: `${paleta.textoClaro}15` }}>
                <span className="inline-block text-[11px] font-semibold tracking-wider uppercase px-2.5 py-1 rounded bg-white/10 text-white mb-2">
                  Aviso Legal y Marcas
                </span>
                <h3 className="text-xl font-bold text-white font-['Lexend_Deca']">
                  Deslinde de Responsabilidad y Descargo de Marcas
                </h3>
                <p className="text-xs text-[#64748B] mt-1">
                  Uso descriptivo de marcas y compatibilidad técnica · 2026
                </p>
              </div>

              <div 
                className="p-4 rounded-xl border"
                style={{
                  backgroundColor: `${paleta.textoClaro}06`,
                  borderColor: `${paleta.textoClaro}15`,
                }}
              >
                <p className="text-white font-medium text-sm leading-relaxed">
                  © 2026 AG Web Design. Todos los derechos reservados.
                </p>
                <p className="text-xs text-[#94A3B8] mt-2 leading-relaxed">
                  Servicios de diseño y desarrollo web independiente. Las marcas comerciales, logotipos y nombres de terceros (como Mercado Libre, WhatsApp, Google o Meta) pertenecen a sus respectivos titulares y se mencionan exclusivamente con fines descriptivos de compatibilidad técnica.
                </p>
              </div>

              <div>
                <h4 className="text-base font-semibold text-white mb-2">
                  1. Titularidad de Marcas de Terceros
                </h4>
                <p>
                  Todas las marcas registradas, logotipos, imagotipos, nombres comerciales y marcas de servicio de terceros exhibidas o mencionadas en este portal o en los templates (incluyendo, entre otros: WhatsApp, Google, Google Maps, Meta, Facebook, Instagram, Mercado Libre) son propiedad exclusiva de sus respectivos titulares.
                </p>
              </div>

              <div>
                <h4 className="text-base font-semibold text-white mb-2">
                  2. Uso con Fines Exclusivamente Descriptivos y Técnicos
                </h4>
                <p>
                  La referencia a las marcas citadas se efectúa con propósitos meramente informativos y descriptivos para señalar la compatibilidad técnica de nuestros desarrollos (por ejemplo, botones directos de enlace con la API de WhatsApp, mapas embebidos de Google Maps o enlaces a perfiles sociales).
                </p>
              </div>

              <div>
                <h4 className="text-base font-semibold text-white mb-2">
                  3. Inexistencia de Vínculo, Afiliación o Patrocinio Oficial
                </h4>
                <p>
                  AG Web Design es un proveedor independiente de servicios digitales. La mención de marcas comerciales de terceros no implica afiliación, sociedad comercial, aval, patrocinio ni recomendación oficial por parte de las empresas titulares de dichas marcas hacia los servicios provistos por AG Web Design.
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Pie del modal */}
        <div 
          className="flex flex-col sm:flex-row items-center justify-between gap-3 px-6 py-4 border-t shrink-0"
          style={{ borderColor: `${paleta.textoClaro}15`, backgroundColor: `${paleta.fondoOscuro}40` }}
        >
          <span className="text-xs text-[#64748B]">
            Presione <kbd className="px-1.5 py-0.5 rounded bg-white/10 text-white font-mono text-[10px]">Esc</kbd> o haga clic fuera para cerrar
          </span>
          <button
            type="button"
            onClick={onClose}
            className="w-full sm:w-auto px-5 py-2 rounded-lg text-xs sm:text-sm font-semibold text-[#0B192C] bg-white hover:bg-slate-200 transition-colors cursor-pointer"
          >
            Entendido y Cerrar
          </button>
        </div>
      </div>
    </div>
  );
}
