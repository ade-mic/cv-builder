'use client';

import { Skill } from '@/types/cv';
import { Plus, X } from 'lucide-react';
import { useState } from 'react';
import { nanoid } from 'nanoid';

interface SkillsFormProps {
  data: Skill[];
  onChange: (data: Skill[]) => void;
}

export default function SkillsForm({ data, onChange }: SkillsFormProps) {
  const [newSkill, setNewSkill] = useState('');

  const addSkill = () => {
    if (!newSkill.trim()) return;

    const skill: Skill = {
      id: nanoid(),
      name: newSkill.trim(),
    };

    onChange([...data, skill]);
    setNewSkill('');
  };

  const removeSkill = (id: string) => {
    onChange(data.filter((skill) => skill.id !== id));
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addSkill();
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border p-6">
      <h2 className="text-xl font-bold text-gray-900 mb-4">Skills</h2>

      <div className="space-y-4">
        <div className="flex gap-2">
          <input
            type="text"
            value={newSkill}
            onChange={(e) => setNewSkill(e.target.value)}
            onKeyPress={handleKeyPress}
            className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 placeholder:text-gray-400"
            placeholder="Type a skill and press Enter..."
          />
          <button
            onClick={addSkill}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            <Plus className="h-4 w-4" />
            Add
          </button>
        </div>

        {data.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <p>No skills added yet.</p>
            <p className="text-sm mt-1">Add skills like JavaScript, React, Python, etc.</p>
          </div>
        ) : (
          <div className="flex flex-wrap gap-2">
            {data.map((skill) => (
              <div
                key={skill.id}
                className="flex items-center gap-2 px-3 py-1.5 bg-blue-100 text-blue-800 rounded-full"
              >
                <span className="text-sm font-medium">{skill.name}</span>
                <button
                  onClick={() => removeSkill(skill.id)}
                  className="hover:text-blue-900"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
