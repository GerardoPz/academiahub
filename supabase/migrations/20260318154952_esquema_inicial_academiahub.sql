-- 1. Tipos Personalizados
DO $$ BEGIN
    CREATE TYPE public.user_role AS ENUM ('ADMIN', 'DOCENTE', 'ESTUDIANTE');
    CREATE TYPE public.user_gender AS ENUM ('M', 'F', 'Otro');
    CREATE TYPE public.tipo_bloqueo AS ENUM ('FUERTE', 'DEBIL');
EXCEPTION WHEN duplicate_object THEN null; END $$;

-- 2. Tablas
CREATE TABLE IF NOT EXISTS public.carreras (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    nombre TEXT NOT NULL,
    codigo_carrera TEXT UNIQUE NOT NULL,
    duracion_semestres_minimo INT,
    duracion_semestres_maximo INT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

CREATE TABLE IF NOT EXISTS public.profiles (
    id UUID REFERENCES auth.users ON DELETE CASCADE PRIMARY KEY,
    carrera_id UUID REFERENCES public.carreras(id) ON DELETE SET NULL,
    nombres TEXT NOT NULL,
    apellido_paterno TEXT NOT NULL,
    apellido_materno TEXT,
    email TEXT UNIQUE NOT NULL,
    rol public.user_role DEFAULT 'ESTUDIANTE',
    identificacion_oficial TEXT UNIQUE,
    fecha_nacimiento DATE,
    genero public.user_gender,
    telefono_celular TEXT,
    contacto_emergencia_nombre TEXT,
    contacto_emergencia_telefono TEXT,
    direccion_calle_num TEXT,
    direccion_colonia TEXT,
    direccion_cp TEXT,
    direccion_ciudad TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Habilitar RLS
ALTER TABLE public.carreras ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- ==========================================
-- POLÍTICAS
-- ==========================================

--- PROFILES ---
-- Solo lectura de lo propio. 
CREATE POLICY "profiles_self_select" 
ON public.profiles FOR SELECT 
TO authenticated 
USING ((SELECT auth.uid()) = id);

--- CARRERAS ---
-- REGLA 1: Todos pueden VER (Lectura pública)
CREATE POLICY "carreras_read_all" 
ON public.carreras FOR SELECT 
USING (true);

-- REGLA 2: Solo Admins pueden MODIFICAR (Update)
CREATE POLICY "carreras_admin_update" 
ON public.carreras 
FOR UPDATE 
TO authenticated 
USING (
  (SELECT (jwt -> 'app_metadata' ->> 'role') = 'ADMIN'
 FROM (SELECT auth.jwt() AS jwt) t)
)
WITH CHECK (
  (SELECT (jwt -> 'app_metadata' ->> 'role') = 'ADMIN'
 FROM (SELECT auth.jwt() AS jwt) t)
);

-- REGLA 3: Solo Admins pueden MODIFICAR (Delete)
CREATE POLICY "carreras_admin_delete" 
ON public.carreras 
FOR DELETE 
TO authenticated 
USING (
  (SELECT (jwt -> 'app_metadata' ->> 'role') = 'ADMIN'
 FROM (SELECT auth.jwt() AS jwt) t)
);

-- REGLA 4: Solo Admins pueden INSERTAR
CREATE POLICY "carreras_admin_insert" 
ON public.carreras 
FOR INSERT 
TO authenticated 
WITH CHECK (
  (SELECT (jwt -> 'app_metadata' ->> 'role') = 'ADMIN'
 FROM (SELECT auth.jwt() AS jwt) t)
);
-- ==========================================
-- FUNCIONES DE AUTOMATIZACIÓN 
-- ==========================================

-- Función para crear el perfil automáticamente
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger AS $$
BEGIN
  INSERT INTO profiles (id, email, nombres, apellido_paterno, rol)
  VALUES (
    new.id, 
    new.email, 
    COALESCE(new.raw_user_meta_data->>'full_name', 'Nuevo'),
    COALESCE(new.raw_user_meta_data->>'last_name', 'Usuario'),
    'ESTUDIANTE' 
  );
  RETURN new;
END;
$$ LANGUAGE plpgsql 
SECURITY DEFINER 
SET search_path = public; 

-- Función para sincronizar el ROL hacia el JWT (Claims)
CREATE OR REPLACE FUNCTION public.sync_user_role()
RETURNS trigger AS $$
BEGIN
  UPDATE auth.users
  SET raw_app_meta_data = 
    coalesce(raw_app_meta_data, '{}'::jsonb) || 
    jsonb_build_object('role', NEW.rol::text) 
  WHERE id = NEW.id;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql 
SECURITY DEFINER 
SET search_path = public; 

-- ==========================================
-- DISPARADORES (TRIGGERS)
-- ==========================================

-- Eliminar si existen para evitar errores al re-ejecutar
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
DROP TRIGGER IF EXISTS on_profile_role_update ON public.profiles;

-- Trigger 1: Se dispara en AUTH
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Trigger 2: Se dispara en PUBLIC.PROFILES
CREATE TRIGGER on_profile_role_update
  AFTER INSERT OR UPDATE OF rol ON public.profiles
  FOR EACH ROW EXECUTE FUNCTION public.sync_user_role();