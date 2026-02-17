'use client';

import { TextFormatting } from '@/types/cv';
import { Settings, AlignLeft, AlignCenter, AlignRight, AlignJustify, Type } from 'lucide-react';
import { useState } from 'react';

interface CustomizationPanelProps {
  formatting: TextFormatting;
  onFormattingChange: (formatting: TextFormatting) => void;
  enabledSections: Record<string, boolean>;
  onSectionToggle: (section: string, enabled: boolean) => void;
}

export default function CustomizationPanel({
  formatting,
  onFormattingChange,
  enabledSections,
  onSectionToggle,
}: CustomizationPanelProps) {
  const [isOpen, setIsOpen] = useState(false);

  const sections = [
    { key: 'summary', label: 'Professional Summary', icon: '📝' },
    { key: 'experience', label: 'Work Experience', icon: '💼' },
    { key: 'education', label: 'Education', icon: '🎓' },
    { key: 'skills', label: 'Skills', icon: '⚡' },
    { key: 'certifications', label: 'Certifications', icon: '🏆' },
    { key: 'references', label: 'References', icon: '👥' },
    { key: 'hobbies', label: 'Hobbies & Interests', icon: '❤️' },
  ];

  return (
    <div className="bg-white rounded-lg shadow-sm border p-6">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between w-full text-left"
      >
        <div className="flex items-center gap-2">
          <Settings className="h-5 w-5 text-orange-600" />
          <h2 className="text-xl font-bold text-gray-900">Customization</h2>
        </div>
        <span className="text-2xl">{isOpen ? '−' : '+'}</span>
      </button>

      {isOpen && (
        <div className="mt-4 space-y-6">
          {/* Text Formatting */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 mb-3 flex items-center gap-2">
              <Type className="h-4 w-4" />
              Text Formatting
            </h3>
            
            <div className="space-y-3">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Text Alignment
                </label>
                <div className="flex gap-2">
                  <button
                    onClick={() => onFormattingChange({ ...formatting, alignment: 'left' })}
                    className={`flex-1 flex items-center justify-center gap-2 px-3 py-2 border rounded-lg transition ${
                      formatting.alignment === 'left'
                        ? 'bg-orange-100 border-orange-500 text-orange-700'
                        : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                    }`}
                    title="Left align"
                  >
                    <AlignLeft className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => onFormattingChange({ ...formatting, alignment: 'center' })}
                    className={`flex-1 flex items-center justify-center gap-2 px-3 py-2 border rounded-lg transition ${
                      formatting.alignment === 'center'
                        ? 'bg-orange-100 border-orange-500 text-orange-700'
                        : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                    }`}
                    title="Center align"
                  >
                    <AlignCenter className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => onFormattingChange({ ...formatting, alignment: 'right' })}
                    className={`flex-1 flex items-center justify-center gap-2 px-3 py-2 border rounded-lg transition ${
                      formatting.alignment === 'right'
                        ? 'bg-orange-100 border-orange-500 text-orange-700'
                        : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                    }`}
                    title="Right align"
                  >
                    <AlignRight className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => onFormattingChange({ ...formatting, alignment: 'justify' })}
                    className={`flex-1 flex items-center justify-center gap-2 px-3 py-2 border rounded-lg transition ${
                      formatting.alignment === 'justify'
                        ? 'bg-orange-100 border-orange-500 text-orange-700'
                        : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                    }`}
                    title="Justify"
                  >
                    <AlignJustify className="h-4 w-4" />
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Heading Style
                </label>
                <select
                  value={formatting.headingStyle}
                  onChange={(e) =>
                    onFormattingChange({
                      ...formatting,
                      headingStyle: e.target.value as any,
                    })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent text-sm text-gray-900"
                >
                  <option value="modern">Modern</option>
                  <option value="classic">Classic</option>
                  <option value="bold">Bold</option>
                  <option value="minimal">Minimal</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Section Spacing
                </label>
                <select
                  value={formatting.sectionSpacing}
                  onChange={(e) =>
                    onFormattingChange({
                      ...formatting,
                      sectionSpacing: e.target.value as any,
                    })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent text-sm text-gray-900"
                >
                  <option value="compact">Compact</option>
                  <option value="normal">Normal</option>
                  <option value="relaxed">Relaxed</option>
                </select>
              </div>
            </div>
          </div>

          {/* Section Visibility */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 mb-3">
              Toggle Sections
            </h3>
            <div className="space-y-2">
              {sections.map((section) => (
                <label
                  key={section.key}
                  className="flex items-center justify-between p-2 hover:bg-gray-50 rounded-lg cursor-pointer"
                >
                  <span className="flex items-center gap-2 text-sm text-gray-700">
                    <span>{section.icon}</span>
                    {section.label}
                  </span>
                  <input
                    type="checkbox"
                    checked={enabledSections[section.key] !== false}
                    onChange={(e) => onSectionToggle(section.key, e.target.checked)}
                    className="h-4 w-4 text-orange-600 focus:ring-orange-500 border-gray-300 rounded"
                  />
                </label>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
