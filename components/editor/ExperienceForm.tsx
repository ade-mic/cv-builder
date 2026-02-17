'use client';

import { WorkExperience } from '@/types/cv';
import { Plus, Trash2, GripVertical } from 'lucide-react';
import { nanoid } from 'nanoid';

interface ExperienceFormProps {
  data: WorkExperience[];
  onChange: (data: WorkExperience[]) => void;
}

export default function ExperienceForm({ data, onChange }: ExperienceFormProps) {
  const addExperience = () => {
    const newExperience: WorkExperience = {
      id: nanoid(),
      jobTitle: '',
      company: '',
      location: '',
      startDate: '',
      endDate: '',
      current: false,
      description: '',
    };
    onChange([...data, newExperience]);
  };

  const updateExperience = (id: string, field: keyof WorkExperience, value: any) => {
    onChange(
      data.map((exp) => (exp.id === id ? { ...exp, [field]: value } : exp))
    );
  };

  const removeExperience = (id: string) => {
    onChange(data.filter((exp) => exp.id !== id));
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold text-gray-900">Work Experience</h2>
        <button
          onClick={addExperience}
          className="flex items-center gap-2 px-3 py-1.5 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        >
          <Plus className="h-4 w-4" />
          Add Experience
        </button>
      </div>

      <div className="space-y-6">
        {data.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <p>No work experience added yet.</p>
            <button
              onClick={addExperience}
              className="mt-2 text-blue-600 hover:text-blue-700"
            >
              Add your first experience
            </button>
          </div>
        ) : (
          data.map((exp, index) => (
            <div key={exp.id} className="border-l-4 border-blue-600 pl-4 space-y-3">
              <div className="flex justify-between items-start">
                <span className="text-sm font-medium text-gray-500">
                  Experience #{index + 1}
                </span>
                <button
                  onClick={() => removeExperience(exp.id)}
                  className="text-red-600 hover:text-red-700"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>

              <div className="grid md:grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Job Title *
                  </label>
                  <input
                    type="text"
                    value={exp.jobTitle}
                    onChange={(e) => updateExperience(exp.id, 'jobTitle', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm text-gray-900 placeholder:text-gray-400"
                    placeholder="Software Engineer"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Company *
                  </label>
                  <input
                    type="text"
                    value={exp.company}
                    onChange={(e) => updateExperience(exp.id, 'company', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm text-gray-900 placeholder:text-gray-400"
                    placeholder="Tech Corp"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Location
                </label>
                <input
                  type="text"
                  value={exp.location}
                  onChange={(e) => updateExperience(exp.id, 'location', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm text-gray-900 placeholder:text-gray-400"
                  placeholder="New York, NY"
                />
              </div>

              <div className="grid md:grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Start Date *
                  </label>
                  <input
                    type="month"
                    value={exp.startDate}
                    onChange={(e) => updateExperience(exp.id, 'startDate', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm text-gray-900"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    End Date
                  </label>
                  <input
                    type="month"
                    value={exp.endDate}
                    onChange={(e) => updateExperience(exp.id, 'endDate', e.target.value)}
                    disabled={exp.current}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm text-gray-900 disabled:bg-gray-100"
                  />
                </div>
              </div>

              <div className="flex items-center">
                <input
                  type="checkbox"
                  id={`current-${exp.id}`}
                  checked={exp.current}
                  onChange={(e) => updateExperience(exp.id, 'current', e.target.checked)}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label
                  htmlFor={`current-${exp.id}`}
                  className="ml-2 text-sm text-gray-700"
                >
                  I currently work here
                </label>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Description
                </label>
                <textarea
                  value={exp.description}
                  onChange={(e) => updateExperience(exp.id, 'description', e.target.value)}
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm text-gray-900 placeholder:text-gray-400"
                  placeholder="• Developed and maintained web applications&#10;• Collaborated with cross-functional teams&#10;• Implemented new features and improvements"
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
