'use client';

import { useState } from 'react';
import { Layout, Check, User } from 'lucide-react';

interface Template {
  id: string;
  name: string;
  description: string;
  features: string[];
  colorScheme: string;
}

interface TemplateSelectorProps {
  currentTemplateId: string;
  onTemplateChange: (templateId: string) => void;
}

const templates: Template[] = [
  {
    id: 'professional',
    name: 'Professional',
    description: 'Clean single-column layout perfect for any industry',
    features: ['Single column', 'Traditional layout', 'ATS-friendly'],
    colorScheme: 'blue',
  },
  {
    id: 'modern',
    name: 'Modern',
    description: 'Two-column design with photo and accent colors',
    features: ['Two columns', 'Profile photo', 'Color accents', 'Modern fonts'],
    colorScheme: 'blue',
  },
  {
    id: 'creative',
    name: 'Creative',
    description: 'Eye-catching design for creative professionals',
    features: ['Unique layout', 'Large photo', 'Custom sections', 'Bold headings'],
    colorScheme: 'purple',
  },
  {
    id: 'minimal',
    name: 'Minimal',
    description: 'Simple, elegant, and easy to read',
    features: ['Minimal design', 'Maximum readability', 'Clean typography'],
    colorScheme: 'gray',
  },
  {
    id: 'executive',
    name: 'Executive',
    description: 'Sophisticated layout for senior positions',
    features: ['Professional header', 'Logo placement', 'Premium feel'],
    colorScheme: 'black',
  },
];

// Mini visual preview component for each template
const TemplatePreview = ({ template }: { template: Template }) => {
  const getColorClass = () => {
    switch (template.colorScheme) {
      case 'purple': return 'bg-purple-600';
      case 'black': return 'bg-gray-900';
      case 'gray': return 'bg-gray-600';
      default: return 'bg-blue-600';
    }
  };

  const showPhoto = template.id === 'modern' || template.id === 'creative';
  const isCreative = template.id === 'creative';

  return (
    <div className="bg-gray-50 rounded border border-gray-200 p-3 h-32 overflow-hidden">
      {/* Header */}
      <div className={`${getColorClass()} h-2 rounded mb-2`} />
      
      <div className={`flex ${showPhoto ? 'gap-2' : 'flex-col gap-1'}`}>
        {showPhoto && (
          <div className={`${isCreative ? 'w-8 h-8' : 'w-6 h-6'} rounded-full bg-gray-300 shrink-0 flex items-center justify-center`}>
            <User className="h-3 w-3 text-gray-500" />
          </div>
        )}
        
        <div className="flex-1 space-y-1">
          <div className="h-2 bg-gray-800 rounded w-3/4" />
          <div className="h-1 bg-gray-400 rounded w-1/2" />
        </div>
      </div>

      {/* Content lines */}
      <div className="mt-3 space-y-1.5">
        <div className="h-1 bg-gray-300 rounded w-full" />
        <div className="h-1 bg-gray-300 rounded w-5/6" />
        <div className="h-1 bg-gray-300 rounded w-4/6" />
        <div className="flex gap-1 mt-2">
          <div className={`h-1.5 ${getColorClass()} rounded w-12`} />
          <div className={`h-1.5 ${getColorClass()} rounded w-16`} />
          <div className={`h-1.5 ${getColorClass()} rounded w-14`} />
        </div>
      </div>
    </div>
  );
};

export default function TemplateSelector({
  currentTemplateId,
  onTemplateChange,
}: TemplateSelectorProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="bg-white rounded-lg shadow-sm border p-6">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between w-full text-left"
      >
        <div className="flex items-center gap-2">
          <Layout className="h-5 w-5 text-blue-600" />
          <h2 className="text-xl font-bold text-gray-900">Template</h2>
          <span className="text-sm text-gray-500">
            ({templates.find(t => t.id === currentTemplateId)?.name || 'Professional'})
          </span>
        </div>
        <span className="text-2xl">{isOpen ? '−' : '+'}</span>
      </button>

      {isOpen && (
        <div className="mt-4 space-y-3">
          <p className="text-sm text-gray-600 mb-4">
            Choose a template and see the preview update instantly
          </p>
          
          <div className="grid md:grid-cols-2 gap-3">
            {templates.map((template) => (
              <button
                key={template.id}
                onClick={() => {
                  onTemplateChange(template.id);
                }}
                className={`relative p-4 border-2 rounded-lg text-left transition-all hover:shadow-md ${
                  currentTemplateId === template.id
                    ? 'border-blue-500 bg-blue-50 ring-2 ring-blue-200'
                    : 'border-gray-200 hover:border-blue-300'
                }`}
              >
                {currentTemplateId === template.id && (
                  <div className="absolute top-2 right-2 bg-blue-500 text-white rounded-full p-1">
                    <Check className="h-4 w-4" />
                  </div>
                )}
                
                {/* Visual Preview */}
                <TemplatePreview template={template} />
                
                {/* Template Info */}
                <div className="mt-3">
                  <h3 className="font-semibold text-gray-900 mb-1">
                    {template.name}
                  </h3>
                  <p className="text-xs text-gray-600 mb-2">
                    {template.description}
                  </p>
                  <div className="flex flex-wrap gap-1">
                    {template.features.map((feature, idx) => (
                      <span
                        key={idx}
                        className="text-xs px-2 py-0.5 bg-gray-100 text-gray-600 rounded-full"
                      >
                        {feature}
                      </span>
                    ))}
                  </div>
                </div>
              </button>
            ))}
          </div>

          <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
            <p className="text-xs text-blue-800">
              <strong>✨ Live Preview:</strong> Your CV preview updates instantly when you select a template. 
              Changes apply to all sections automatically!
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
