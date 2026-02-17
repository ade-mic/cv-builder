'use client';

import { Reference } from '@/types/cv';
import { Plus, Trash2, Users } from 'lucide-react';
import { nanoid } from 'nanoid';

interface ReferencesFormProps {
  data: Reference[];
  onChange: (data: Reference[]) => void;
}

export default function ReferencesForm({ data, onChange }: ReferencesFormProps) {
  const addReference = () => {
    const newRef: Reference = {
      id: nanoid(),
      name: '',
      position: '',
      company: '',
      email: '',
      phone: '',
    };
    onChange([...data, newRef]);
  };

  const updateReference = (id: string, field: keyof Reference, value: any) => {
    onChange(
      data.map((ref) => (ref.id === id ? { ...ref, [field]: value } : ref))
    );
  };

  const removeReference = (id: string) => {
    onChange(data.filter((ref) => ref.id !== id));
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border p-6">
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center gap-2">
          <Users className="h-5 w-5 text-indigo-600" />
          <h2 className="text-xl font-bold text-gray-900">References</h2>
        </div>
        <button
          onClick={addReference}
          className="flex items-center gap-2 px-3 py-1.5 text-sm bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
        >
          <Plus className="h-4 w-4" />
          Add Reference
        </button>
      </div>

      <div className="space-y-6">
        {data.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <p>No references added yet.</p>
            <button
              onClick={addReference}
              className="mt-2 text-indigo-600 hover:text-indigo-700"
            >
              Add your first reference
            </button>
          </div>
        ) : (
          data.map((ref, index) => (
            <div key={ref.id} className="border-l-4 border-indigo-600 pl-4 space-y-3">
              <div className="flex justify-between items-start">
                <span className="text-sm font-medium text-gray-500">
                  Reference #{index + 1}
                </span>
                <button
                  onClick={() => removeReference(ref.id)}
                  className="text-red-600 hover:text-red-700"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>

              <div className="grid md:grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    value={ref.name}
                    onChange={(e) => updateReference(ref.id, 'name', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-sm text-gray-900 placeholder:text-gray-400"
                    placeholder="Dr. Jane Smith"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Position *
                  </label>
                  <input
                    type="text"
                    value={ref.position}
                    onChange={(e) => updateReference(ref.id, 'position', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-sm text-gray-900 placeholder:text-gray-400"
                    placeholder="Senior Manager"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Company *
                </label>
                <input
                  type="text"
                  value={ref.company}
                  onChange={(e) => updateReference(ref.id, 'company', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-sm text-gray-900 placeholder:text-gray-400"
                  placeholder="Tech Corporation"
                />
              </div>

              <div className="grid md:grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email *
                  </label>
                  <input
                    type="email"
                    value={ref.email}
                    onChange={(e) => updateReference(ref.id, 'email', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-sm text-gray-900 placeholder:text-gray-400"
                    placeholder="jane.smith@company.com"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Phone *
                  </label>
                  <input
                    type="tel"
                    value={ref.phone}
                    onChange={(e) => updateReference(ref.id, 'phone', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-sm text-gray-900 placeholder:text-gray-400"
                    placeholder="+1 (555) 987-6543"
                  />
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
