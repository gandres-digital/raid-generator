import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { name, mainclass, talent, gs } = body;

        const { error } = await supabase.from('players').insert([
            { name, mainclass, talent, gs },
        ]);

        if (error) {
            console.error('Error al insertar:', error);
            return NextResponse.json({ error: 'Error al guardar' }, { status: 500 });
        }

        return NextResponse.json({ message: 'Guardado correctamente' }, { status: 200 });
    } catch (err) {
        console.error('Fallo general:', err);
        return NextResponse.json({ error: 'Error interno' }, { status: 500 });
    }

}
