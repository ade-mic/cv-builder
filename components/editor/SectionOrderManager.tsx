'use client';

import { useState } from 'react';
import { GripVertical, ArrowUp, ArrowDown, FileText, Briefcase, GraduationCap, Zap, Award, Users, Heart } from 'lucide-react';

interface SectionOrderManagerProps {
  sectionOrder: string[];
  enabledSections: Record<string, boolean>;
  onOrderChange: (newOrder: string[]) => void;
}

const sectionConfig = {
  summary: { label: 'Professional Summary', icon: FileText, color: 'text-blue-600' },
  experience: { label: 'Work Experience', icon: Briefcase, color: 'text-blue-600' },
  education: { label: 'Education', icon: GraduationCap, color: 'text-green-600' },
  skills: { label: 'Skills', icon: Zap, color: 'text-yellow-600' },
  certifications: { label: 'Certifications', icon: Award, color: 'text-purple-600' },
  references: { label: 'References', icon: Users, color: 'text-indigo-600' },
  hobbies: { label: 'Hobbies & Interests', icon: Heart, color: 'text-pink-600' },
};

export default function SectionOrderManager({
  sectionOrder,
  enabledSections,
  onOrderChange,
}: SectionOrderManagerProps) {
  const [isOpen, setIsOpen] = useState(false);

  const moveSection = (index: number, direction: 'up' | 'down') => {
    const newOrder = [...sectionOrder];
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    
    if (targetIndex < 0 || targetIndex >= newOrder.length) return;
    
    [newOrder[index], newOrder[targetIndex]] = [newOrder[targetIndex], newOrder[index]];
    onOrderChange(newOrder);
  };

  // Filter to only show enabled sections
  const visibleSections = sectionOrder.filter(section => enabledSections[section] !== false);

  return (
    <div className="bg-white rounded-lg shadow-sm border p-6">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between w-full text-left"
      >
        <div className="flex items-center gap-2">
          <GripVertical className="h-5 w-5 text-gray-600" />
          <h2 className="text-xl font-bold text-gray-900">Section Order</h2>
        </div>
        <span className="text-2xl">{isOpen ? '−' : '+'}</span>
      </button>

      {isOpen && (
        <div className="mt-4 space-y-2">
          <p className="text-sm text-gray-600 mb-4">
            Drag sections or use arrows to reorder how they appear in your CV
          </p>

          <div className="space-y-2">
            {visibleSections.map((sectionKey, index) => {
              const config = sectionConfig[sectionKey as keyof typeof sectionConfig];
              if (!config) return null;

              const Icon = config.icon;

              return (
                <div
                  key={sectionKey}
                  className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg border border-gray-200 hover:bg-gray-100 transition"
                >
                  <GripVertical className="h-5 w-5 text-gray-400 cursor-move" />
                  
                  <div className="flex-1 flex items-center gap-2">
                    <Icon className={`h-4 w-4 ${config.color}`} />
                    <span className="text-sm font-medium text-gray-900">
                      {config.label}
                    </span>
                  </div>

                  <div className="flex gap-1">
                    <button
                      onClick={() => moveSection(index, 'up')}
                      disabled={index === 0}
                      className="p-1 rounded hover:bg-white disabled:opacity-30 disabled:cursor-not-allowed transition"
                      title="Move up"
                    >
                      <ArrowUp className="h-4 w-4 text-gray-600" />
                    </button>
                    <button
                      onClick={() => moveSection(index, 'down')}
                      disabled={index === visibleSections.length - 1}
                      className="p-1 rounded hover:bg-white disabled:opacity-30 disabled:cursor-not-allowed transition"
                      title="Move down"
                    >
                      <ArrowDown className="h-4 w-4 text-gray-600" />
                    </button>
                  </div>

                  <span className="text-xs text-gray-500 font-medium w-8 text-center">
                    #{index + 1}
                  </span>
                </div>
              );
            })}
          </div>

          <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
            <p className="text-xs text-blue-800">
              <strong>💡 Tip:</strong> Reorder sections to highlight what's most important for your target role. 
              For example, put Education first for academic positions, or Skills first for technical roles.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
