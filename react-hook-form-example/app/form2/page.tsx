'use client';

import React from 'react';
import { useForm, useFieldArray, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

const schema = z.object({
  username: z.string().min(2, { message: 'Username must be at least 2 characters' }),
  hobbies: z.array(
    z.object({
      name: z.string().min(1, { message: 'Hobby name is required' }),
      priority: z.string().min(1, { message: 'Priority is required' }),
    })
  ).min(1, { message: 'At least one hobby is required' }),
});

type FormValues = z.infer<typeof schema>;

export default function Form2Page() {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      username: '',
      hobbies: [{ name: '', priority: 'Medium' }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'hobbies',
  });

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    console.log('Form Submitted:', data);
    alert(JSON.stringify(data, null, 2));
  };

  return (
    <div className="max-w-2xl mx-auto p-8">
      <h1 className="text-2xl font-bold mb-6">User Profile with Hobbies (useFieldArray)</h1>
      
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Username */}
        <div>
          <label className="block text-sm font-medium mb-1">Username</label>
          <input
            {...register('username')}
            className="w-full p-2 border rounded border-gray-300 dark:border-gray-700 bg-transparent"
            placeholder="Enter username"
          />
          {errors.username && (
            <p className="text-red-500 text-sm mt-1">{errors.username.message}</p>
          )}
        </div>

        {/* Hobbies Section */}
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">Hobbies</h2>
            <button
              type="button"
              onClick={() => append({ name: '', priority: 'Medium' })}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
            >
              Add Hobby
            </button>
          </div>

          {errors.hobbies?.root && (
             <p className="text-red-500 text-sm">{errors.hobbies.root.message}</p>
          )}

          {fields.map((field, index) => (
            <div key={field.id} className="p-4 border rounded border-gray-200 dark:border-gray-800 space-y-3 relative">
              <div className="flex justify-between items-start">
                <span className="text-sm font-bold text-gray-500">Hobby #{index + 1}</span>
                {fields.length > 1 && (
                  <button
                    type="button"
                    onClick={() => remove(index)}
                    className="text-red-500 hover:text-red-700 text-sm"
                  >
                    Remove
                  </button>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm mb-1">Hobby Name</label>
                  <input
                    {...register(`hobbies.${index}.name`)}
                    className="w-full p-2 border rounded border-gray-300 dark:border-gray-700 bg-transparent"
                    placeholder="e.g. Coding"
                  />
                  {errors.hobbies?.[index]?.name && (
                    <p className="text-red-500 text-sm mt-1">{errors.hobbies[index].name.message}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm mb-1">Priority</label>
                  <select
                    {...register(`hobbies.${index}.priority`)}
                    className="w-full p-2 border rounded border-gray-300 dark:border-gray-700 bg-transparent"
                  >
                    <option value="Low">Low</option>
                    <option value="Medium">Medium</option>
                    <option value="High">High</option>
                  </select>
                  {errors.hobbies?.[index]?.priority && (
                    <p className="text-red-500 text-sm mt-1">{errors.hobbies[index].priority.message}</p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        <button
          type="submit"
          className="w-full py-3 bg-green-600 text-white font-bold rounded hover:bg-green-700 transition"
        >
          Submit All
        </button>
      </form>
    </div>
  );
}
