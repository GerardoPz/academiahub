'use server'

import { createClient } from './server'

export async function login(formData: FormData) {
  try {
    const supabase = await createClient()
    const email = formData.get('email') as string
    const password = formData.get('password') as string

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) {
      return { success: false, message: error.message }
    }

    return { success: true, user: data.user }
  } catch (e) {
    return { success: false, message: "Error inesperado en el servidor" }
  }
}