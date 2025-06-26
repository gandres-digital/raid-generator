'use client';

import { FC } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';

type FormData = {
  name: string;
  mainclass: string;
  talent: string;
  gs: number;
};

const FormularioPersonaje: FC = () => {
  const { register, handleSubmit, reset, formState: { errors } } = useForm<FormData>();

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    await fetch('/api/submit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    alert('Done');
    reset(); // limpia los campos
  };

  return (
    <main className="p-6">
      <h1 className="text-xl font-bold mb-4">Register your character for next raid</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4 max-w-md">

        <input {...register('name', { required: true, maxLength: 20 })} placeholder="Character name" className="p-2 border" />
        {errors.name && <span className="text-red-600">Field required</span>}

        <input {...register('mainclass', { required: true, maxLength: 20 })} placeholder="Class" className="p-2 border" />
        {errors.mainclass && <span className="text-red-600">Field required</span>}

        <input {...register('talent', { required: true, maxLength: 20 })} placeholder="Talent" className="p-2 border" />
        {errors.talent && <span className="text-red-600">Field required</span>}

        <input {...register('gs', { required: true, valueAsNumber: true, maxLength: 20 })} type="number" placeholder="GS" className="p-2 border" />
        {errors.gs && <span className="text-red-600">Field required</span>}

        <button type="submit" className="bg-blue-600 text-white px-4 py-2">Send</button>
      </form>
    </main>
  );
};

export default FormularioPersonaje;