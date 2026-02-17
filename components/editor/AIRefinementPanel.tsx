'use client';

import { useState } from 'react';
import { Wand2, Loader2, Sparkles } from 'lucide-react';

interface AIRefinementPanelProps {
  onRefine: (content: string, contentType: string, targetRole?: string) => Promise<string>;
}

export default function AIRefinementPanel({ onRefine }: AIRefinementPanelProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [contentType, setContentType] = useState<'summary' | 'experience' | 'skills' | 'full'>('summary');
  const [targetRole, setTargetRole] = useState('');
  const [originalContent, setOriginalContent] = useState('');
  const [refinedContent, setRefinedContent] = useState('');
  const [isRefining, setIsRefining] = useState(false);

  const handleRefine = async () => {
    if (!originalContent.trim()) return;

    setIsRefining(true);
    try {
      const result = await onRefine(originalContent, contentType, targetRole || undefined);
      setRefinedContent(result);
    } catch (error) {
      console.error('Error refining content:', error);
      alert('Failed to refine content. Please try again.');
    } finally {
      setIsRefining(false);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(refinedContent);
    alert('Copied to clipboard!');
  };

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 flex items-center gap-2 px-4 py-3 bg-linear-to-r from-purple-600 to-pink-600 text-white rounded-full shadow-lg hover:shadow-xl transition-all hover:scale-105 z-50"
      >
        <Wand2 className="h-5 w-5" />
        <span className="font-medium">AI Assistant</span>
        <Sparkles className="h-4 w-4" />
      </button>
    );
  }

  return (
    <div className="fixed bottom-6 right-6 w-96 bg-white rounded-lg shadow-2xl border-2 border-purple-200 z-50">
      <div className="bg-linear-to-r from-purple-600 to-pink-600 text-white p-4 rounded-t-lg">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Wand2 className="h-5 w-5" />
            <h3 className="font-bold">AI Content Refinement</h3>
          </div>
          <button
            onClick={() => setIsOpen(false)}
            className="hover:bg-white/20 rounded p-1 transition"
          >
            ✕
          </button>
        </div>
      </div>

      <div className="p-4 space-y-4 max-h-150 overflow-y-auto">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            What would you like to refine?
          </label>
          <select
            value={contentType}
            onChange={(e) => setContentType(e.target.value as any)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-gray-900"
          >
            <option value="summary">Professional Summary</option>
            <option value="experience">Work Experience Description</option>
            <option value="skills">Skills Section</option>
            <option value="full">Full CV Content</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Target Role (Optional)
          </label>
          <input
            type="text"
            value={targetRole}
            onChange={(e) => setTargetRole(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-gray-900 placeholder:text-gray-400"
            placeholder="e.g., Senior Software Engineer"
          />
          <p className="text-xs text-gray-500 mt-1">
            Specify a role to tailor content accordingly
          </p>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Original Content *
          </label>
          <textarea
            value={originalContent}
            onChange={(e) => setOriginalContent(e.target.value)}
            rows={5}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm text-gray-900 placeholder:text-gray-400"
            placeholder="Paste the content you want to refine..."
          />
        </div>

        <button
          onClick={handleRefine}
          disabled={!originalContent.trim() || isRefining}
          className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-linear-to-r from-purple-600 to-pink-600 text-white rounded-lg hover:shadow-lg transition disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isRefining ? (
            <>
              <Loader2 className="h-5 w-5 animate-spin" />
              Refining...
            </>
          ) : (
            <>
              <Sparkles className="h-5 w-5" />
              Refine with AI
            </>
          )}
        </button>

        {refinedContent && (
          <div className="border-t pt-4">
            <div className="flex justify-between items-center mb-2">
              <label className="block text-sm font-medium text-gray-700">
                Refined Content
              </label>
              <button
                onClick={handleCopy}
                className="text-xs text-purple-600 hover:text-purple-700 font-medium"
              >
                Copy to Clipboard
              </button>
            </div>
            <div className="bg-purple-50 border border-purple-200 rounded-lg p-3">
              <p className="text-sm text-gray-900 whitespace-pre-wrap">{refinedContent}</p>
            </div>
            <p className="text-xs text-gray-500 mt-2">
              💡 Review and copy the refined content to your CV sections
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
