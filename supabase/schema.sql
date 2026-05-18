-- ============================================================
-- BioEARTH – Schema inicial para Supabase (PostgreSQL)
-- Ejecutar en: Supabase Dashboard → SQL Editor → New query
-- ============================================================

-- 1. ENUM: tipos de espécimen
-- -----------------------------------------------------------
CREATE TYPE specimen_type AS ENUM ('insect', 'pest', 'plant');

-- 2. ENUM: roles ecológicos
CREATE TYPE ecological_role_type AS ENUM (
  'Polinizador',
  'Controlador Biológico',
  'Descomponedor',
  'Plaga Potencial',
  'Indicador Ambiental',
  'Polinizador y Descomponedor'
);

-- 3. ENUM: nivel de peligro
CREATE TYPE danger_level_type AS ENUM (
  'Inofensivo',
  'Manipular con cuidado',
  'No manipular'
);

-- 4. ENUM: estado de conservación
CREATE TYPE conservation_status_type AS ENUM (
  'Preocupación menor',
  'Casi amenazado',
  'Vulnerable',
  'En peligro',
  'Sin evaluación'
);

-- 5. TABLA PRINCIPAL: specimens
-- -----------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.specimens (
  id                  UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  type                specimen_type          NOT NULL,
  common_name         TEXT                   NOT NULL,
  scientific_name     TEXT                   NOT NULL,
  category            TEXT                   NOT NULL,  -- ej. 'Abejas', 'Mariposas', 'Hongos'
  ecological_role     ecological_role_type   NOT NULL,
  campus_location     TEXT[]                 NOT NULL DEFAULT '{}',
  description         TEXT                   NOT NULL,
  detailed_info       TEXT,
  fun_fact            TEXT,
  image_url           TEXT,
  danger_level        danger_level_type      NOT NULL DEFAULT 'Inofensivo',
  conservation_status conservation_status_type NOT NULL DEFAULT 'Sin evaluación',
  activity_period     TEXT,                           -- 'Diurno', 'Nocturno', etc.
  size                TEXT,
  flight_months       INT[]              DEFAULT '{}',
  observation_count   INT                DEFAULT 0,
  last_observed       DATE,
  inaturalist_link    TEXT,
  created_by          UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  created_at          TIMESTAMPTZ        NOT NULL DEFAULT NOW(),
  updated_at          TIMESTAMPTZ        NOT NULL DEFAULT NOW()
);

-- Índices para consultas frecuentes
CREATE INDEX idx_specimens_type ON public.specimens(type);
CREATE INDEX idx_specimens_ecological_role ON public.specimens(ecological_role);
CREATE INDEX idx_specimens_danger_level ON public.specimens(danger_level);

-- Trigger para actualizar updated_at automáticamente
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER specimens_updated_at
  BEFORE UPDATE ON public.specimens
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- ============================================================
-- 6. ROW LEVEL SECURITY (RLS)
-- ============================================================
ALTER TABLE public.specimens ENABLE ROW LEVEL SECURITY;

-- POLÍTICA 1: Lectura pública (cualquier visitante/estudiante)
CREATE POLICY "Lectura pública de especímenes"
  ON public.specimens
  FOR SELECT
  USING (true);

-- POLÍTICA 2: Solo usuarios autenticados pueden insertar
CREATE POLICY "Solo admins pueden insertar"
  ON public.specimens
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() IS NOT NULL);

-- POLÍTICA 3: Solo el creador o un admin puede actualizar
CREATE POLICY "Solo admins pueden actualizar"
  ON public.specimens
  FOR UPDATE
  TO authenticated
  USING (auth.uid() IS NOT NULL)
  WITH CHECK (auth.uid() IS NOT NULL);

-- POLÍTICA 4: Solo usuarios autenticados pueden eliminar
CREATE POLICY "Solo admins pueden eliminar"
  ON public.specimens
  FOR DELETE
  TO authenticated
  USING (auth.uid() IS NOT NULL);

-- ============================================================
-- 7. STORAGE: bucket para imágenes de especímenes
-- Ejecutar en el SQL Editor de Supabase (Storage Policies)
-- ============================================================

-- Crear bucket (si no existe aún; también puedes hacerlo desde
-- el panel en Storage → New Bucket, con Public = true)
INSERT INTO storage.buckets (id, name, public)
VALUES ('specimen-images', 'specimen-images', true)
ON CONFLICT (id) DO NOTHING;

-- Política: lectura pública del bucket
CREATE POLICY "Imágenes públicas"
  ON storage.objects
  FOR SELECT
  USING (bucket_id = 'specimen-images');

-- Política: solo admins suben imágenes
CREATE POLICY "Solo admins suben imágenes"
  ON storage.objects
  FOR INSERT
  TO authenticated
  WITH CHECK (bucket_id = 'specimen-images');

-- Política: solo admins eliminan imágenes
CREATE POLICY "Solo admins eliminan imágenes"
  ON storage.objects
  FOR DELETE
  TO authenticated
  USING (bucket_id = 'specimen-images');

-- ============================================================
-- 8. DATOS INICIALES (seed) — opcional
-- ============================================================
-- Puedes comentar o quitar este bloque si prefieres cargar
-- datos desde el panel de administración de BioEARTH.

INSERT INTO public.specimens (
  type, common_name, scientific_name, category, ecological_role,
  campus_location, description, fun_fact, danger_level,
  conservation_status, activity_period, size, observation_count, last_observed
) VALUES
(
  'insect', 'Abeja Angelita', 'Tetragonisca angustula', 'Abejas', 'Polinizador',
  ARRAY['Cafetal Agroforestal', 'Arboretum'],
  'Diminuta abeja sin aguijón que produce miel de alto valor medicinal.',
  'Sus guardianas flotan en el aire frente al nido como drones vivos.',
  'Inofensivo', 'Preocupación menor', 'Diurno', '4–5 mm', 83, '2026-05-15'
),
(
  'insect', 'Morpho Azul', 'Morpho peleides', 'Mariposas', 'Polinizador',
  ARRAY['Reserva Forestal', 'Jardín de Mariposas'],
  'Su color azul no es pigmento, sino nanoestructuras en las escamas.',
  'Sus alas se ven desde un helicóptero a 100 metros de altura.',
  'Inofensivo', 'Preocupación menor', 'Diurno', '95–120 mm', 112, '2026-05-14'
),
(
  'pest', 'Chinche de la Palma', 'Oebalus insularis', 'Chinches', 'Plaga Potencial',
  ARRAY['Finca Orgánica', 'Cafetal Agroforestal'],
  'Insecto piercing-sucking que daña granos de cereales y palmito.',
  'Puede reducir hasta un 40% el rendimiento de arroz en infestaciones severas.',
  'Manipular con cuidado', 'Sin evaluación', 'Diurno', '8–10 mm', 22, '2026-04-30'
),
(
  'plant', 'Heliconia', 'Heliconia latispatha', 'Plantas Tropicales', 'Polinizador',
  ARRAY['Jardín de Mariposas', 'Sendero Ecológico'],
  'Planta tropical ornamental y hospedera clave de colibríes y abejas.',
  'Cada bráctea actúa como una piscina de agua donde viven microecosistemas completos.',
  'Inofensivo', 'Preocupación menor', 'Todo el día', '1–3 m de altura', 45, '2026-05-10'
);
