import { supabase } from './supabase';

export async function getRegistrationStatus(): Promise<boolean> {
  try {
    const { data, error } = await supabase
      .from('config')
      .select('registration_open')
      .single();

    if (error) {
      console.error('Error en Supabase:', error);
      return false;
    }

    return data?.registration_open ?? false;
  } catch (err) {
    console.error('Fallo en la conexión o consulta:', err);
    return false;
  }
}