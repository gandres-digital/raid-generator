'use client';

import { FC, useEffect, useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { getRegistrationStatus } from '@/lib/config';

type FormData = {
  name: string;
  mainclass: string;
  talent: string;
  gs: number;
};

const classTalents: Record<string, string[]> = {
  Warrior: ['Arms', 'Fury', 'Protection'],
  Paladin: ['Holy', 'Protection', 'Retribution'],
  Hunter: ['Beast Mastery', 'Marksmanship', 'Survival'],
  Rogue: ['Assassination', 'Combat', 'Subtlety'],
  Priest: ['Discipline', 'Holy', 'Shadow'],
  Shaman: ['Elemental', 'Enhancement', 'Restoration'],
  Mage: ['Arcane', 'Fire', 'Frost'],
  Warlock: ['Affliction', 'Demonology', 'Destruction'],
  Druid: ['Balance', 'Feral', 'Feral Tank', 'Restoration'],
};

const gearScore = [1400, 1450, 1500, 1550, 1600];

const FormularioPersonaje: FC = () => {
  const { register, handleSubmit, watch, reset, resetField, formState: { errors } } = useForm<FormData>();
  const mainclass = watch('mainclass');
  const [registrationOpen, setRegistrationOpen] = useState(false);

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    await fetch('/api/submit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    alert('Done');
    reset(); // limpia los campos
  };

  useEffect(() => {
    resetField('talent');
  }, [mainclass]);

  useEffect(() => {
    async function fetchStatus() {
      const status = await getRegistrationStatus();
      setRegistrationOpen(status);
    }
    fetchStatus();
  }, []);

  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-6 bg-black">
      <h1 className="text-3xl font-bold text-center mb-8 text-blue-600">Register your character for the raid</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4 w-full max-w-md bg-grey p-6 rounded shadow">

        <input {...register('name', { required: true, maxLength: 20 })} placeholder="Character name" className="p-2 border" />
        {errors.name && <span className="text-red-600">Field required</span>}

        <select
          {...register('mainclass', { required: true })}
          className="border p-2 w-full cursor-pointer"
        >
          <option className='bg-blue-600' value="">Select class</option>
          {Object.keys(classTalents).map((cls) => (
            <option className='bg-blue-500' key={cls} value={cls}>
              {cls}
            </option>
          ))}
        </select>
        {errors.mainclass && <span className="text-red-600">Field required</span>}

        <select
          {...register('talent', { required: true })}
          disabled={!mainclass}
          className="border p-2 w-full cursor-pointer"
        >
          <option className='bg-blue-600' value="">Select talents</option>
          {mainclass &&
            classTalents[mainclass]?.map((talent) => (
              <option className='bg-blue-500' key={talent} value={talent}>
                {talent}
              </option>
            ))}
        </select>
        {errors.talent && <span className="text-red-600">Field required</span>}

        <select
          {...register('gs', { required: true, valueAsNumber: true})}
          className="border p-2 w-full cursor-pointer"
        >
          <option className='bg-blue-600' value="">Select GearScore</option>
          {gearScore.map((gs) => (
            <option className='bg-blue-500' key={gs} value={gs}>
              {gs}
            </option>
          ))}
        </select>
        {errors.gs && <span className="text-red-600">Field required</span>}

        <button disabled={!registrationOpen} type="submit" className="bg-blue-600 text-white px-4 py-2 cursor-pointer">Send</button>
      </form>
    </main>
  );
};

export default FormularioPersonaje;