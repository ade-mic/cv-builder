'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useAuth } from '@/lib/firebase/auth-context';
import { getCV } from '@/lib/firebase/firestore';
import { CVData } from '@/types/cv';
import CVPreview from '@/components/templates/CVPreview';

export default function PrintPreviewPage() {
  const params = useParams();
  const router = useRouter();
  const { user, loading: authLoading } = useAuth();
  const [cv, setCV] = useState<CVData | null>(null);
  const [loading, setLoading] = useState(true);

  const cvId = params.id as string;

  useEffect(() => {
    if (authLoading) return;
    
    if (!user) {
      router.push('/auth/login');
      return;
    }

    loadCV();
  }, [user, authLoading, cvId]);

  const loadCV = async () => {
    if (!user) return;
    
    try {
      const data = await getCV(user.uid, cvId);
      setCV(data);
    } catch (error) {
      console.error('Error loading CV:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading CV...</p>
        </div>
      </div>
    );
  }

  if (!cv) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="text-center">
          <p className="text-red-600">CV not found</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-4 md:py-8">
      <div className="max-w-4xl mx-auto px-3 md:px-4">
        {/* Print Instructions */}
        <div className="no-print bg-white rounded-lg shadow-sm border p-4 md:p-6 mb-4 md:mb-6">
          <h2 className="text-lg md:text-xl font-semibold mb-3 md:mb-4">Ready to Export</h2>
          
          {/* Desktop Instructions */}
          <div className="hidden md:block">
            <p className="text-gray-600 mb-4">
              Your CV is ready to be saved as PDF. Click the button below to open the print dialog, 
              then choose "Save as PDF" as your destination.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => window.print()}
                className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-medium"
              >
                Print to PDF
              </button>
              <button
                onClick={() => window.close()}
                className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition font-medium"
              >
                Close
              </button>
            </div>
          </div>

          {/* Mobile Instructions */}
          <div className="md:hidden">
            <p className="text-gray-600 mb-3 text-sm">
              To save as PDF on mobile:
            </p>
            <ol className="list-decimal list-inside text-gray-700 text-sm space-y-2 mb-4">
              <li>Tap the "Print" button below</li>
              <li>Select your printer or "Save as PDF"</li>
              <li>On iOS: Pinch to zoom on the preview, then tap the share icon</li>
              <li>On Android: Choose "Save as PDF" from the printer list</li>
            </ol>
            <div className="flex flex-col gap-2">
              <button
                onClick={() => window.print()}
                className="w-full px-4 py-3 bg-blue-600 text-white rounded-lg font-medium active:bg-blue-700"
              >
                Print to PDF
              </button>
              <button
                onClick={() => window.close()}
                className="w-full px-4 py-3 border border-gray-300 text-gray-700 rounded-lg font-medium active:bg-gray-50"
              >
                Close
              </button>
            </div>
          </div>
        </div>

        {/* CV Preview for Print */}
        <div className="bg-white rounded-lg shadow-lg print:shadow-none print:rounded-none overflow-hidden">
          <CVPreview data={cv} />
        </div>
      </div>
    </div>
  );
}
