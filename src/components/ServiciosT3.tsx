import type { ClientData } from '../types';
import ScrollReveal from './ScrollReveal';
import { Briefcase, Activity, Scale, Car, FileText, Landmark, ShieldCheck, HeartPulse } from 'lucide-react';

interface Props {
  data: ClientData;
  paleta: any;
}

export default function ServiciosT3({ data, paleta }: Props) {
  
  // Función para determinar el ícono según palabras clave en el título
  const getIconForService = (title: string) => {
    const titleLower = title.toLowerCase();
    const iconColor = paleta.colorSecundario || '#E2E8F0';
    const iconProps = { className: "w-7 h-7", style: { color: iconColor }, strokeWidth: 1.5 };
    
    // El orden es importante. Validamos primero las palabras más específicas.
    if (titleLower.includes('enfermedad') || titleLower.includes('salud')) {
      return <HeartPulse {...iconProps} />;
    }
    if (titleLower.includes('incapacidad') || titleLower.includes('medica') || titleLower.includes('médica')) {
      return <Activity {...iconProps} />;
    }
    if (titleLower.includes('accidente') || titleLower.includes('vial') || titleLower.includes('tránsito')) {
      return <Car {...iconProps} />;
    }
    if (titleLower.includes('art') || titleLower.includes('aseguradora') || titleLower.includes('seguro')) {
      return <ShieldCheck {...iconProps} />;
    }
    if (titleLower.includes('despido')) {
      return <Briefcase {...iconProps} />;
    }
    if (titleLower.includes('acuerdo') || titleLower.includes('juicio') || titleLower.includes('legal') || titleLower.includes('abogado')) {
      return <Scale {...iconProps} />;
    }
    if (titleLower.includes('tramite') || titleLower.includes('documento') || titleLower.includes('contrato')) {
      return <FileText {...iconProps} />;
    }
    // Dejamos "laboral" para el final por si agregan un servicio genérico
    if (titleLower.includes('laboral') || titleLower.includes('trabajo')) {
      return <Briefcase {...iconProps} />;
    }
    
    // Ícono por defecto (Balanza)
    return <Landmark {...iconProps} />;
  };

  return (
    <section id="servicios" className="w-full py-[80px] lg:py-[100px]" style={{ backgroundColor: paleta.fondoClaro }}>
      <div className="max-w-[1250px] mx-auto px-6 lg:px-8 flex flex-col items-center">
        
        <ScrollReveal>
          <div className="flex flex-col items-center text-center max-w-[768px] mb-12 md:mb-16">
            <h2 className="text-[32px] md:text-[40px] lg:text-[48px] font-bold font-['Lexend_Deca'] leading-tight mb-4" style={{ color: paleta.textoOscuro }}>
              {data.menu.title}
            </h2>
            <p className="text-[16px] md:text-[18px] lg:text-[20px] font-normal font-['Lexend_Deca'] md:font-['Inter'] leading-relaxed" style={{ color: paleta.textoGris }}>
              {data.menu.categories[0]}
            </p>
          </div>
        </ScrollReveal>

        <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {data.menu.items.map((service) => (
            <ScrollReveal key={service.id}>
              <article 
                className="h-full p-8 rounded-[14px] border shadow-sm hover:shadow-md transition-shadow duration-300 flex flex-col items-start group"
                style={{ backgroundColor: paleta.fondoCajas, borderColor: `${paleta.textoGris}33` }}
              >
                <div 
                  className="w-14 h-14 rounded-[10px] flex justify-center items-center mb-6 group-hover:scale-105 transition-transform duration-300 shadow-md"
                  style={{ backgroundColor: paleta.fondoOscuro }}
                >
                  {getIconForService(service.title)}
                </div>
                
                <h3 className="text-[20px] font-bold font-['Lexend_Deca'] leading-tight mb-3" style={{ color: paleta.textoOscuro }}>
                  {service.title}
                </h3>
                <p className="text-[15px] lg:text-[16px] font-normal font-['Inter'] lg:font-['Lexend_Deca'] leading-[26px]" style={{ color: paleta.textoGris }}>
                  {service.description}
                </p>
              </article>
            </ScrollReveal>
          ))}
        </div>

      </div>
    </section>
  );
}