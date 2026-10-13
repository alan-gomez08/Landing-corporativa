import type { ClientData } from '../types/index';

// Usamos any temporalmente acá o expandimos ClientData en tu types/index.ts
export const configT3: ClientData | any = {
  templateId: 'template-3',
  businessName: 'Tu Logo',
  theme: { primaryColor: '#0B192C', secondaryColor: '#E2E8F0' },
  
  // NAV CONFIG (Para el navbar)
  nav: {
    links: [
      { name: 'Especialidades', href: '#servicios' },
      { name: 'Sobre Nosotros', href: '#equipo' },
      { name: 'Contacto', href: '#contacto' },
      { name: 'Ubicación', href: '#ubicacion' }
    ],
    buttonText: 'Agendar ahora',
  },

  hero: { 
    title: 'Defendemos tus derechos y maximizamos tu indemnización', 
    subtitle: 'Asesoramiento legal y representación integral para trabajadores y accidentados. Reclamos estratégicos con respaldo jurídico.', 
    buttonText: 'Agendar Asesoría Gratis', 
    images: { 
      desktop: '/assets-t3/hero-desktop.webp', 
      tablet: '/assets-t3/hero-tablet.webp', 
      mobile: '/assets-t3/hero-mobile.webp' 
    } 
  },
  
  // EQUIPO T3 (Usamos la sección About)
  about: { 
    title: 'Sobre Nosotros', 
    subtitle: '', 
    description: 'En nuestro despacho, entendemos que cada accidente vial y laboral impacta directamente en el bienestar y la estabilidad de tu familia. Por eso, contamos con más de 15 años de trayectoria en el mercado brindando acompañamiento integral a víctimas, trabajadores y personas damnificadas. Nuestro enfoque trasciende la simple presentación de escritos o la redacción de telegramas; nos posicionamos como verdaderos aliados estratégicos de nuestros clientes.\n\nTrabajamos bajo una estricta filosofía basada en la resolución de conflictos, la atención personalizada y la actualización constante frente a los continuos cambios jurisprudenciales.', 
    images: { desktop: '/assets-t3/estudio-equipo.webp', tablet: '/assets-t3/estudio-equipo.webp', mobile: '/assets-t3/estudio-equipo.webp' } 
  },
  
  // LISTA DE EQUIPO T3 (Usamos la sección Stats)
  stats: { 
    title: '', 
    items: [
      { value: '', label: 'Abogados matriculados y en constante capacitación' },
      { value: '', label: 'Atención personalizada y respuestas ágiles' },
      { value: '', label: 'Transparencia y honestidad de gestión absoluta' },
      { value: '', label: 'Visión integral estratégica del reclamo' }
    ] 
  },

  // SERVICIOS T3 (Usamos la sección Menu)
  menu: { 
    title: 'Mis Especialidades', 
    // Usamos el primer elemento de categories para pasar el subtítulo de la sección
    categories: ['Soluciones integrales para la tranquilidad económica y legal de tu familia.'], 
    items: [
      { id: '1', title: 'Accidentes Viales', description: 'Gestión de siniestros, peritajes y reclamos a aseguradoras para obtener tu máxima compensación.', price: '', category: '', imagePath: '/assets-t3/icon-contable.svg' },
      { id: '2', title: 'Reclamos Contra ART', description: 'GGestión de altas, comisiones médicas y asesoramiento legal continuo para tu salud.', price: '', category: '', imagePath: '/assets-t3/icon-sueldos.svg' },
      { id: '3', title: 'Despidos Laborales', description: 'Liquidación de indemnizaciones, redacción de telegramas y defensa laboral.', price: '', category: '', imagePath: '/assets-t3/icon-legal.svg' },
      { id: '4', title: 'Incapacidades', description: 'Juntas, reevaluaciones y control mensual de expedientes para trabajadores damnificados.', price: '', category: '', imagePath: '/assets-t3/icon-monotributo.svg' },
      { id: '5', title: 'Enfermedad Laboral', description: 'Análisis de historiales y estrategias legales para reconocer la carga física de tu trabajo.', price: '', category: '', imagePath: '/assets-t3/icon-fiscal.svg' },
      { id: '6', title: 'Acuerdos y Juicios', description: 'Conciliaciones, mediaciones y representación integral ante tribunales laborales y SRT.', price: '', category: '', imagePath: '/assets-t3/icon-tramites.svg' }
    ] 
  },

  // === SECCIÓN: FAQ (Preguntas Frecuentes) ===
  faqs: [
    {
      question: '¿Ya tengo abogado, es muy complicado cambiar de estudio?',
      answer: 'Es un trámite rápido, sencillo y un derecho que tenés como cliente. Solo necesitás firmar una revocación de poder. Nosotros nos encargamos de notificar formalmente al abogado anterior y de solicitar el estado de tu expediente para continuar tu reclamo sin demoras.'
    },
    {
      question: '¿Trabajan solo con accidentes o también con enfermedades?',
      answer: 'Cubrimos ambas áreas. Además de accidentes viales y de trabajo (in itinere o en planta), tramitamos el reconocimiento de enfermedades profesionales (aquellas causadas por el esfuerzo repetitivo o el ambiente de trabajo) ante las Comisiones Médicas de la SRT para que cobres lo que corresponde.'
    },
    {
      question: '¿Cómo es el proceso de la primera consulta?',
      answer: 'Es una evaluación totalmente confidencial y sin cargo. Nos contás los detalles del siniestro, revisamos la documentación que tengas a mano (denuncia, estudios médicos, recibos de sueldo) y te explicamos la viabilidad del reclamo, los plazos legales y los próximos pasos a seguir.'
    },
    {
      question: '¿Cómo manejan la entrega de documentos en pericias?',
      answer: 'Trabajamos con un sistema digitalizado ágil. Podés enviarnos fotos de tus estudios médicos e informes por WhatsApp. El día de la junta médica o pericia oficial, te asesoramos previamente y te indicamos exactamente qué documentación física presentar para asegurar que tus lesiones sean evaluadas correctamente.'
    }
  ],

  // === SECCIÓN: CALL TO ACTION (CTA) ===
  cta: {
    title: 'Delegá tus problemas legales y médicos hoy',
    description: 'Dejá tus pericias y tus reclamos en manos de expertos. Contactame hoy para una asesoría inicial sin cargo.',
    buttonText: 'Agendar una consulta',
    buttonType: 'whatsapp',
    buttonUrl: '' 
  },

  events: { title: '', description: '', buttonText: '' },
  testimonials: { title: '', items: [] },
  location: { 
    title: 'Nuestro Estudio.\nVisitanos', 
    description: 'Tenemos oficinas en CABA. Vení a tomar un café con nosotros y analicemos el estado de tu carpeta cara a cara, con estricta y total confidencialidad.', 
    buttonText: 'Agendar Reunión Presencial', 
    mapEmbedUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3284.016713276848!2d-58.38375908477038!3d-34.60373888045942!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4aa9f0a6da5edb%3A0x11be2277a064115b!2sObelisco!5e0!3m2!1ses-419!2sar!4v1680000000000!5m2!1ses-419!2sar' 
  },
  contact: { whatsapp: '5491100000000', instagram: '', facebook: '' }
};