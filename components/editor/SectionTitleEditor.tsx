'use client';

import { SectionTitles, defaultSectionTitles } from '@/types/cv';
import { Type, RotateCcw } from 'lucide-react';
import { useState } from 'react';

interface SectionTitleEditorProps {
  sectionTitles: SectionTitles;
  onTitlesChange: (titles: SectionTitles) => void;
  enabledSections: Record<string, boolean>;
}

export default function SectionTitleEditor({
  sectionTitles,
  onTitlesChange,
  enabledSections,
}: SectionTitleEditorProps) {
  const [isOpen, setIsOpen] = useState(false);

  const sections: Array<{ key: keyof SectionTitles; label: string; icon: string }> = [
    { key: 'summary', label: 'Summary Section', icon: '📝' },
    { key: 'experience', label: 'Experience Section', icon: '💼' },
    { key: 'education', label: 'Education Section', icon: '🎓' },
    { key: 'skills', label: 'Skills Section', icon: '⚡' },
    { key: 'certifications', label: 'Certifications Section', icon: '🏆' },
    { key: 'references', label: 'References Section', icon: '👥' },
    { key: 'hobbies', label: 'Hobbies Section', icon: '❤️' },
  ];

  const handleTitleChange = (key: keyof SectionTitles, value: string) => {
    onTitlesChange({
      ...sectionTitles,
      [key]: value,
    });
  };

  const resetToDefault = (key: keyof SectionTitles) => {
    handleTitleChange(key, defaultSectionTitles[key]);
  };

  const resetAll = () => {
    onTitlesChange(defaultSectionTitles);
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border p-6">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between w-full text-left"
      >
        <div className="flex items-center gap-2">
          <Type className="h-5 w-5 text-blue-600" />
          <h2 className="text-lg font-bold text-gray-900">Section Titles</h2>
        </div>
        <span className="text-2xl">{isOpen ? '−' : '+'}</span>
      </button>

      {isOpen && (
        <div className="mt-6 space-y-4">
          <div className="flex justify-between items-center mb-4">
            <p className="text-sm text-gray-600">
              Customize how each section is titled in your CV
            </p>
            <button
              onClick={resetAll}
              className="flex items-center gap-1 text-sm text-blue-600 hover:text-blue-700"
            >
              <RotateCcw className="h-4 w-4" />
              Reset All
            </button>
          </div>

          {sections.map((section) => {
            // Only show enabled sections
            if (enabledSections[section.key] === false) return null;

            return (
              <div key={section.key} className="space-y-2">
                <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                  <span>{section.icon}</span>
                  <span>{section.label}</span>
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={sectionTitles[section.key]}
                    onChange={(e) => handleTitleChange(section.key, e.target.value)}
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder={defaultSectionTitles[section.key]}
                  />
                  <button
                    onClick={() => resetToDefault(section.key)}
                    className="px-3 py-2 text-gray-600 hover:text-gray-800 border border-gray-300 rounded-md hover:bg-gray-50"
                    title="Reset to default"
                  >
                    <RotateCcw className="h-4 w-4" />
                  </button>
                </div>
              </div>
            );
          })}

          <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <p className="text-sm text-blue-800">
              <strong>💡 Pro Tip:</strong> Customize section titles to match your industry or preferences.
              Examples: "Professional Background" instead of "Work Experience", or "Core Competencies" instead of "Skills".
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
