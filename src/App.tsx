import { useEffect } from 'react';
import ReactGA from 'react-ga4';
import Template3 from './Template3';

// Captura del ID de medición desde la variable de entorno de Vite
const GA_MEASUREMENT_ID = import.meta.env.VITE_GA_ID;

// Inicialización condicional crítica:
// ReactGA.initialize() SOLO se ejecuta si VITE_GA_ID existe y tiene un valor válido.
// Esto mantiene limpio el entorno local (localhost) y previene envíos no deseados.
if (GA_MEASUREMENT_ID && GA_MEASUREMENT_ID.trim() !== '') {
  ReactGA.initialize(GA_MEASUREMENT_ID);
}

function App() {
  useEffect(() => {
    // Registro del pageview inicial solo si GA está configurado
    if (GA_MEASUREMENT_ID && GA_MEASUREMENT_ID.trim() !== '') {
      ReactGA.send({
        hitType: 'pageview',
        page: window.location.pathname + window.location.search,
        title: document.title,
      });
    }
  }, []);

  return (
    <div className="w-full min-h-screen">
      <Template3 />
    </div>
  );
}

export default App;