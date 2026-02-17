'use client';

import { Plus, X, Heart } from 'lucide-react';
import { useState } from 'react';

interface HobbiesFormProps {
  data: string[];
  onChange: (data: string[]) => void;
}

export default function HobbiesForm({ data, onChange }: HobbiesFormProps) {
  const [newHobby, setNewHobby] = useState('');

  const addHobby = () => {
    if (!newHobby.trim()) return;
    onChange([...data, newHobby.trim()]);
    setNewHobby('');
  };

  const removeHobby = (index: number) => {
    onChange(data.filter((_, i) => i !== index));
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addHobby();
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border p-6">
      <div className="flex items-center gap-2 mb-4">
        <Heart className="h-5 w-5 text-pink-600" />
        <h2 className="text-xl font-bold text-gray-900">Hobbies & Interests</h2>
      </div>

      <div className="space-y-4">
        <div className="flex gap-2">
          <input
            type="text"
            value={newHobby}
            onChange={(e) => setNewHobby(e.target.value)}
            onKeyPress={handleKeyPress}
            className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent text-gray-900 placeholder:text-gray-400"
            placeholder="Type a hobby and press Enter..."
          />
          <button
            onClick={addHobby}
            className="flex items-center gap-2 px-4 py-2 bg-pink-600 text-white rounded-lg hover:bg-pink-700 transition"
          >
            <Plus className="h-4 w-4" />
            Add
          </button>
        </div>

        {data.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <p>No hobbies added yet.</p>
            <p className="text-sm mt-1">Add interests like Photography, Hiking, Reading, etc.</p>
          </div>
        ) : (
          <div className="flex flex-wrap gap-2">
            {data.map((hobby, index) => (
              <div
                key={index}
                className="flex items-center gap-2 px-3 py-1.5 bg-pink-100 text-pink-800 rounded-full"
              >
                <span className="text-sm font-medium">{hobby}</span>
                <button
                  onClick={() => removeHobby(index)}
                  className="hover:text-pink-900"
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
