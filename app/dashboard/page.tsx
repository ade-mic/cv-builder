'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/firebase/auth-context';
import { getUserCVs, createCV, deleteCV } from '@/lib/firebase/firestore';
import { CVData } from '@/types/cv';
import { FileText, Plus, Trash2, Eye, LogOut, Loader2 } from 'lucide-react';

export default function DashboardPage() {
  const [cvs, setCvs] = useState<CVData[]>([]);
  const [loading, setLoading] = useState(true);
  const [creating, setCreating] = useState(false);
  const { user, logout, loading: authLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    // Wait for auth to finish loading before redirecting
    if (authLoading) {
      return;
    }

    if (!user) {
      router.push('/auth/login');
      return;
    }

    loadCVs();
  }, [user, authLoading, router]);

  const loadCVs = async () => {
    if (!user) return;
    
    try {
      const userCVs = await getUserCVs(user.uid);
      setCvs(userCVs);
    } catch (error) {
      console.error('Error loading CVs:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateCV = async () => {
    if (!user) return;
    
    setCreating(true);
    try {
      const newCV = await createCV(user.uid, {
        personalInfo: {
          fullName: '',
          email: user.email || '',
          phone: '',
          location: '',
          summary: '',
        },
        experience: [],
        education: [],
        skills: [],
        templateId: 'modern',
      });
      
      router.push(`/editor/${newCV.id}`);
    } catch (error) {
      console.error('Error creating CV:', error);
      setCreating(false);
    }
  };

  const handleDeleteCV = async (cvId: string) => {
    if (!user || !confirm('Are you sure you want to delete this CV?')) return;
    
    try {
      await deleteCV(user.uid, cvId);
      setCvs(cvs.filter(cv => cv.id !== cvId));
    } catch (error) {
      console.error('Error deleting CV:', error);
    }
  };

  const handleLogout = async () => {
    await logout();
    router.push('/');
  };

  // Show loading while auth is initializing or data is loading
  if (authLoading || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <FileText className="h-8 w-8 text-blue-600" />
              <span className="text-2xl font-bold text-gray-900">CV Builder</span>
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:text-gray-900"
            >
              <LogOut className="h-4 w-4" />
              Logout
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">My CVs</h1>
          <button
            onClick={handleCreateCV}
            disabled={creating}
            className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition disabled:opacity-50"
          >
            {creating ? (
              <Loader2 className="h-5 w-5 animate-spin" />
            ) : (
              <Plus className="h-5 w-5" />
            )}
            Create New CV
          </button>
        </div>

        {cvs.length === 0 ? (
          <div className="text-center py-20">
            <FileText className="h-16 w-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-700 mb-2">
              No CVs yet
            </h3>
            <p className="text-gray-500 mb-6">
              Create your first CV to get started
            </p>
            <button
              onClick={handleCreateCV}
              disabled={creating}
              className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
            >
              <Plus className="h-5 w-5" />
              Create Your First CV
            </button>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {cvs.map((cv) => (
              <div
                key={cv.id}
                className="bg-white rounded-lg shadow-sm border p-6 hover:shadow-md transition"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="h-12 w-12 bg-blue-100 rounded-lg flex items-center justify-center">
                      <FileText className="h-6 w-6 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">
                        {cv.personalInfo.fullName || 'Untitled CV'}
                      </h3>
                      <p className="text-sm text-gray-500">
                        Updated {new Date(cv.updatedAt).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex gap-2">
                  <Link
                    href={`/editor/${cv.id}`}
                    className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                  >
                    <Eye className="h-4 w-4" />
                    Edit
                  </Link>
                  <button
                    onClick={() => handleDeleteCV(cv.id)}
                    className="px-4 py-2 border border-red-300 text-red-600 rounded-lg hover:bg-red-50 transition"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
