'use client';

import { Education } from '@/types/cv';
import { Plus, Trash2 } from 'lucide-react';
import { nanoid } from 'nanoid';

interface EducationFormProps {
  data: Education[];
  onChange: (data: Education[]) => void;
}

export default function EducationForm({ data, onChange }: EducationFormProps) {
  const addEducation = () => {
    const newEducation: Education = {
      id: nanoid(),
      degree: '',
      institution: '',
      location: '',
      startDate: '',
      endDate: '',
      current: false,
      gpa: '',
      description: '',
    };
    onChange([...data, newEducation]);
  };

  const updateEducation = (id: string, field: keyof Education, value: any) => {
    onChange(
      data.map((edu) => (edu.id === id ? { ...edu, [field]: value } : edu))
    );
  };

  const removeEducation = (id: string) => {
    onChange(data.filter((edu) => edu.id !== id));
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold text-gray-900">Education</h2>
        <button
          onClick={addEducation}
          className="flex items-center gap-2 px-3 py-1.5 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        >
          <Plus className="h-4 w-4" />
          Add Education
        </button>
      </div>

      <div className="space-y-6">
        {data.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <p>No education added yet.</p>
            <button
              onClick={addEducation}
              className="mt-2 text-blue-600 hover:text-blue-700"
            >
              Add your first education
            </button>
          </div>
        ) : (
          data.map((edu, index) => (
            <div key={edu.id} className="border-l-4 border-green-600 pl-4 space-y-3">
              <div className="flex justify-between items-start">
                <span className="text-sm font-medium text-gray-500">
                  Education #{index + 1}
                </span>
                <button
                  onClick={() => removeEducation(edu.id)}
                  className="text-red-600 hover:text-red-700"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Degree *
                </label>
                <input
                  type="text"
                  value={edu.degree}
                  onChange={(e) => updateEducation(edu.id, 'degree', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm text-gray-900 placeholder:text-gray-400"
                  placeholder="Bachelor of Science in Computer Science"
                />
              </div>

              <div className="grid md:grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Institution *
                  </label>
                  <input
                    type="text"
                    value={edu.institution}
                    onChange={(e) => updateEducation(edu.id, 'institution', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm text-gray-900 placeholder:text-gray-400"
                    placeholder="University Name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Location
                  </label>
                  <input
                    type="text"
                    value={edu.location}
                    onChange={(e) => updateEducation(edu.id, 'location', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm text-gray-900 placeholder:text-gray-400"
                    placeholder="Boston, MA"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-3 gap-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Start Date *
                  </label>
                  <input
                    type="month"
                    value={edu.startDate}
                    onChange={(e) => updateEducation(edu.id, 'startDate', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm text-gray-900"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    End Date
                  </label>
                  <input
                    type="month"
                    value={edu.endDate}
                    onChange={(e) => updateEducation(edu.id, 'endDate', e.target.value)}
                    disabled={edu.current}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm text-gray-900 disabled:bg-gray-100"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    GPA (Optional)
                  </label>
                  <input
                    type="text"
                    value={edu.gpa || ''}
                    onChange={(e) => updateEducation(edu.id, 'gpa', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm text-gray-900 placeholder:text-gray-400"
                    placeholder="3.8/4.0"
                  />
                </div>
              </div>

              <div className="flex items-center">
                <input
                  type="checkbox"
                  id={`current-${edu.id}`}
                  checked={edu.current}
                  onChange={(e) => updateEducation(edu.id, 'current', e.target.checked)}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label
                  htmlFor={`current-${edu.id}`}
                  className="ml-2 text-sm text-gray-700"
                >
                  Currently studying
                </label>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Additional Details (Optional)
                </label>
                <textarea
                  value={edu.description || ''}
                  onChange={(e) => updateEducation(edu.id, 'description', e.target.value)}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm text-gray-900 placeholder:text-gray-400"
                  placeholder="Relevant coursework, honors, awards, etc."
                />
                <p className="mt-1 text-xs text-gray-500">
                  💡 Tip: Start each line with • or - to create bullet points
                </p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
