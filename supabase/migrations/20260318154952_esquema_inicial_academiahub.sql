-- 1. Tipos Personalizados
DO $$ BEGIN
    CREATE TYPE public.user_role AS ENUM ('ADMIN', 'DOCENTE', 'ESTUDIANTE');
    CREATE TYPE public.user_gender AS ENUM ('M', 'F', 'Otro');
    CREATE TYPE public.tipo_materia AS ENUM ('OBLIGATORIA', 'OPTATIVA', 'ELECTIVA');
    CREATE TYPE public.tipo_bloqueo AS ENUM ('FUERTE', 'DEBIL');
EXCEPTION WHEN duplicate_object THEN null; END $$;

-- 2. Tablas (Solo si no existen)
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

-- ==========================================
-- ELIMINAR POLÍTICAS VIEJAS (LIMPIEZA)
-- ==========================================
DROP POLICY IF EXISTS "Usuarios ven su propio perfil" ON public.profiles;
DROP POLICY IF EXISTS "Lectura pública de carreras" ON public.carreras;
DROP POLICY IF EXISTS "Solo admins gestionan carreras" ON public.carreras;
DROP POLICY IF EXISTS "Solo admins modifican carreras" ON public.carreras;
DROP POLICY IF EXISTS "Solo admins actualizan carreras" ON public.carreras;
DROP POLICY IF EXISTS "Solo admins borran carreras" ON public.carreras;

-- Habilitar RLS
ALTER TABLE public.carreras ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- ==========================================
-- POLÍTICAS OPTIMIZADAS (CERO AVISOS)
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
  (select auth.jwt()) ->> 'role' = 'ADMIN'
)
WITH CHECK (
  (select auth.jwt()) ->> 'role' = 'ADMIN'
);

-- REGLA 3: Solo Admins pueden MODIFICAR (Delete)
CREATE POLICY "carreras_admin_delete" 
ON public.carreras 
FOR DELETE 
TO authenticated 
USING (
  (select auth.jwt()) ->> 'role' = 'ADMIN'
);

-- REGLA 4: Solo Admins pueden INSERTAR
CREATE POLICY "carreras_admin_insert" 
ON public.carreras 
FOR INSERT 
TO authenticated 
WITH CHECK (
  (select auth.jwt()) ->> 'role' = 'ADMIN'
);