import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error(
    'Faltan variables de entorno VITE_SUPABASE_URL o VITE_SUPABASE_ANON_KEY. ' +
    'Revisa tu archivo .env.local'
  );
}

// El genérico Database se omite intencionalmente: nuestro schema manual no satisface
// el constraint GenericSchema de esta versión de Supabase (los tipos de tabla específicos
// no extienden Record<string, GenericTable> en el narrowing del createClient).
// Los tipos de dominio se aplican manualmente en cada llamada con `as Specimen`, etc.
export const supabase = createClient(supabaseUrl, supabaseAnonKey);
