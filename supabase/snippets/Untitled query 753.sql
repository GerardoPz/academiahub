BEGIN; -- Iniciamos una transacción (nada se guarda hasta el final)

-- 1. Simulamos que somos un usuario con ID específico
-- (Reemplaza el ID por uno que exista en tu tabla auth.users si quieres ser preciso)
SET LOCAL auth.uid = '00000000-0000-0000-0000-000000000000'; 

-- 2. Simulamos el JWT que enviaría el frontend (con el ROL de ADMIN)
SET LOCAL "request.jwt.claims" = '{"app_metadata": {"role": "ESTUDIANTE"}}';

-- 3. PRUEBA DE INSERT: Intentamos insertar una carrera
INSERT INTO public.carreras (nombre, codigo_carrera) 
VALUES ('Ingeniería de Pruebas', 'IP-2026');

-- 4. VERIFICACIÓN: Si esto devuelve la fila, la política de ADMIN funciona
SELECT * FROM public.carreras WHERE codigo_carrera = 'IP-2026';

ROLLBACK; -- Deshacemos todo para dejar la base de datos limpia