import { createClient } from '@supabase/supabase-js'
import { fakerES_MX as faker } from '@faker-js/faker'
import * as dotenv from 'dotenv'

dotenv.config({ path: '.env.local' })

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!,
  {
    auth: {
      autoRefreshToken: false,
      persistSession: false
    }
  }
)

async function seedCarreras() {
  console.log('📚 Creando carreras base...')
  const carrerasModo = [
    { nombre: 'Ingeniería en Desarrollo de Software', codigo: 'IDS' },
    { nombre: 'Licenciatura en Administración', codigo: 'LAD' },
    { nombre: 'Ingeniería en Ciberseguridad', codigo: 'ICS' }
  ]

  const carrerasCreadas = []

  for (const c of carrerasModo) {
    const { data, error } = await supabase.from('carreras').insert({
      nombre: c.nombre,
      codigo_carrera: `${c.codigo}-${faker.number.int({ min: 2024, max: 2026 })}`,
      duracion_semestres_minimo: 8,
      duracion_semestres_maximo: 12
    }).select().single()

    if (error) console.error('❌ Error carrera:', error.message)
    else carrerasCreadas.push(data)
  }
  return carrerasCreadas
}

async function seedProfiles(cantidad: number, rol: 'ESTUDIANTE' | 'DOCENTE' | 'ADMIN', carrerasIds: string[]) {
  console.log(`\n🚀 Generando ${cantidad} perfiles para el rol: ${rol}...`)

  for (let i = 0; i < cantidad; i++) {
    const email = faker.internet.email().toLowerCase()
    
    // 1. Crear en Auth (Bypass con any para evitar error de tipos en script)
    const { data: authUser, error: authError } = await (supabase.auth as any).admin.createUser({
      email,
      password: 'Password123!',
      email_confirm: true
    })

    if (authError) {
      console.error(`❌ Error auth ${email}:`, authError.message)
      continue
    }

    // 2. Preparar datos del perfil
    const profileData: any = {
      id: authUser.user.id,
      nombres: faker.person.firstName(),
      apellido_paterno: faker.person.lastName(),
      apellido_materno: faker.person.lastName(),
      email: email,
      rol: rol,
      identificacion_oficial: faker.string.alphanumeric(10).toUpperCase(),
      fecha_nacimiento: faker.date.birthdate({ min: 18, max: 50, mode: 'age' }).toISOString().split('T')[0],
      genero: faker.helpers.arrayElement(['M', 'F', 'Otro']),
      telefono_celular: faker.phone.number(),
      direccion_ciudad: faker.location.city()
    }

    // Solo asignar carrera si es Estudiante
    if (rol === 'ESTUDIANTE' && carrerasIds.length > 0) {
      profileData.carrera_id = faker.helpers.arrayElement(carrerasIds)
    }

    const { error: profileError } = await supabase.from('profiles').insert(profileData)

    if (profileError) console.error(`❌ Error profile ${email}:`, profileError.message)
    else console.log(`✅ ${rol} creado: ${email}`)
  }
}

async function main() {
  // Limpieza rápida opcional si fuera necesario, pero el reset de la DB ya lo hace
  const carreras = await seedCarreras()
  const carrerasIds = carreras.map(c => c.id)

  await seedProfiles(1, 'ADMIN', [])
  await seedProfiles(3, 'DOCENTE', [])
  await seedProfiles(10, 'ESTUDIANTE', carrerasIds)

  console.log('\n✨ Factoría completada. AcademiaHub tiene datos listos.')
}

main().catch(err => console.error('🔥 Error fatal:', err))