import { configT3 } from './config/dataT3'; 
import NavbarT3 from './components/NavbarT3';
import HeroT3 from './components/HeroT3';
import ServiciosT3 from './components/ServiciosT3';
import EquipoT3 from './components/EquipoT3';
import FaqT3 from './components/FaqT3';
import CtaT3 from './components/CtaT3';
import LocationT3 from './components/LocationT3';
import FooterT3 from './components/FooterT3';

export default function Template3() {

  // 🎨 TABLERO DE COLORES T3 🎨
  const paleta = {
    fondoOscuro: "#0B192C",          // Azul noche profundo y corporativo (color principal)
    fondoOscuroSecundario: "#06101E",// Azul casi negro para el Footer
    fondoClaro: "#F8F9FA",           // Blanco roto muy sutil (no cansa la vista)
    fondoCajas: "#FFFFFF",           // Blanco puro para resaltar las tarjetas
    colorPrimario: configT3?.theme?.primaryColor || "#0B192C", // Azul oscuro principal
    colorSecundario: configT3?.theme?.secondaryColor || "#E2E8F0", // Gris blanquecino minimalista
    textoClaro: "#FFFFFF",           // Textos sobre fondos oscuros
    textoOscuro: "#0B192C",          // Títulos oscuros (mismo tono azul principal)
    textoGris: "#546477",            // Párrafos grises con leve tinte azulado
  };
  return (
    <main 
      className="w-full min-h-screen font-sans selection:text-white overflow-x-hidden"
      style={{ 
        backgroundColor: paleta.fondoClaro,
        '--tw-selection-background-color': paleta.colorPrimario 
      } as React.CSSProperties}
    >
      <NavbarT3 data={configT3} paleta={paleta} />
      <HeroT3 data={configT3} paleta={paleta} />
      <ServiciosT3 data={configT3} paleta={paleta} />
      <EquipoT3 data={configT3} paleta={paleta} />
      {/* Nueva sección FAQ insertada antes del CTA */}
      <FaqT3 data={configT3} paleta={paleta} />
      <CtaT3 data={configT3} paleta={paleta} />
      <LocationT3 data={configT3} paleta={paleta} />
      <FooterT3 data={configT3} paleta={paleta} />
    </main>
  );
}