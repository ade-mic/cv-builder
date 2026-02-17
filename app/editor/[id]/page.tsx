'use client';

import { useEffect, useRef, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useAuth } from '@/lib/firebase/auth-context';
import { getCV, updateCV } from '@/lib/firebase/firestore';
import { CVData, WorkExperience, Education, Skill, Certification, Reference, TextFormatting, SectionTitles, defaultSectionTitles } from '@/types/cv';
import { FileText, Save, Download, ArrowLeft, Loader2 } from 'lucide-react';
import Link from 'next/link';
import PersonalInfoForm from '@/components/editor/PersonalInfoForm';
import ExperienceForm from '@/components/editor/ExperienceForm';
import EducationForm from '@/components/editor/EducationForm';
import SkillsForm from '@/components/editor/SkillsForm';
import CertificationsForm from '@/components/editor/CertificationsForm';
import ReferencesForm from '@/components/editor/ReferencesForm';
import HobbiesForm from '@/components/editor/HobbiesForm';
import PhotoUpload from '@/components/editor/PhotoUpload';
import TemplateSelector from '@/components/editor/TemplateSelector';
import CustomizationPanel from '@/components/editor/CustomizationPanel';
import SectionOrderManager from '@/components/editor/SectionOrderManager';
import SectionTitleEditor from '@/components/editor/SectionTitleEditor';
import AIRefinementPanel from '@/components/editor/AIRefinementPanel';
import CVPreview from '@/components/templates/CVPreview';

export default function EditorPage() {
  const params = useParams();
  const router = useRouter();
  const { user, loading: authLoading } = useAuth();
  const previewRef = useRef<HTMLDivElement>(null);
  const [cv, setCV] = useState<CVData | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [lastSaved, setLastSaved] = useState<Date | null>(null);

  const cvId = params.id as string;

  useEffect(() => {
    // Wait for auth to finish loading before redirecting
    if (authLoading) {
      return;
    }

    if (!user) {
      router.push('/auth/login');
      return;
    }

    loadCV();
  }, [user, authLoading, cvId, router]);

  // Auto-save effect
  useEffect(() => {
    if (!cv || loading) return;

    const timer = setTimeout(() => {
      saveCV();
    }, 1000);

    return () => clearTimeout(timer);
  }, [cv]);

  const loadCV = async () => {
    if (!user) return;

    try {
      const cvData = await getCV(user.uid, cvId);
      if (cvData) {
        setCV(cvData);
      } else {
        router.push('/dashboard');
      }
    } catch (error) {
      console.error('Error loading CV:', error);
      router.push('/dashboard');
    } finally {
      setLoading(false);
    }
  };

  const saveCV = async () => {
    if (!user || !cv) return;

    setSaving(true);
    try {
      await updateCV(user.uid, cv.id, cv);
      setLastSaved(new Date());
    } catch (error) {
      console.error('Error saving CV:', error);
    } finally {
      setSaving(false);
    }
  };

  const handleExportPDF = async () => {
    if (!cv) return;
    
    // Open print preview in new window
    const printWindow = window.open(`/print-preview/${cv.id}`, '_blank');
    
    if (!printWindow) {
      alert('Please allow popups to export PDF');
    }
  };

  const handleExportDOCX = async () => {
    if (!cv) return;
    
    try {
      const response = await fetch('/api/generate-docx', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(cv),
      });

      if (response.ok) {
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `${cv.personalInfo.fullName || 'CV'}.docx`;
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);
      }
    } catch (error) {
      console.error('Error generating DOCX:', error);
    }
  };

  const handleAIRefine = async (content: string, contentType: string, targetRole?: string) => {
    try {
      const response = await fetch('/api/refine-content', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content, contentType, targetRole }),
      });

      if (response.ok) {
        const data = await response.json();
        return data.refinedContent;
      } else {
        throw new Error('Failed to refine content');
      }
    } catch (error) {
      console.error('Error refining content:', error);
      throw error;
    }
  };

  if (authLoading || loading || !cv) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full overflow-x-hidden bg-linear-to-br from-gray-50 to-gray-100">
      {/* Header */}
      <header className="bg-white/95 border-b border-gray-200 shadow-sm sticky top-0 z-50 backdrop-blur-sm w-full">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 sm:py-4">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 sm:gap-4">
            {/* Left section - Back button, CV name, and save status */}
            <div className="flex items-center gap-3 sm:gap-4 min-w-0 flex-1">
              <Link
                href="/dashboard"
                className="flex items-center gap-1.5 sm:gap-2 text-gray-600 hover:text-blue-600 shrink-0 transition-colors duration-200 font-medium group"
              >
                <ArrowLeft className="h-4 w-4 sm:h-5 sm:w-5 group-hover:-translate-x-0.5 transition-transform duration-200" />
                <span className="hidden sm:inline text-sm sm:text-base">Back</span>
              </Link>
              
              <div className="h-6 sm:h-8 w-px bg-gray-200 shrink-0"></div>
              
              <div className="flex items-center gap-2 sm:gap-3 min-w-0 flex-1">
                <div className="p-1.5 sm:p-2 bg-blue-50 rounded-lg shrink-0">
                  <FileText className="h-5 w-5 sm:h-5 sm:w-5 text-blue-600" />
                </div>
                <div className="min-w-0 flex-1">
                  <h1 className="text-base sm:text-xl font-bold text-gray-900 truncate">
                    {cv.personalInfo.fullName || 'Untitled CV'}
                  </h1>
                  {saving ? (
                    <div className="flex sm:hidden items-center gap-1.5 mt-0.5">
                      <Loader2 className="h-3 w-3 animate-spin text-blue-600" />
                      <span className="text-xs text-gray-500">Saving...</span>
                    </div>
                  ) : lastSaved ? (
                    <p className="text-xs text-gray-500 mt-0.5 sm:hidden">
                      Saved {lastSaved.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </p>
                  ) : null}
                </div>
              </div>
              
              {saving ? (
                <div className="hidden sm:flex items-center gap-2 shrink-0 px-3 py-1.5 bg-blue-50 rounded-full">
                  <Loader2 className="h-3.5 w-3.5 animate-spin text-blue-600" />
                  <span className="text-xs font-medium text-blue-700">Saving...</span>
                </div>
              ) : lastSaved ? (
                <div className="hidden lg:flex items-center gap-2 shrink-0 px-3 py-1.5 bg-green-50 rounded-full">
                  <div className="h-2 w-2 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-xs font-medium text-green-700">
                    Saved {lastSaved.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>
              ) : null}
            </div>

            {/* Right section - Export buttons */}
            <div className="flex justify-center sm:justify-end gap-2 sm:gap-3 w-full sm:w-auto">
              <button
                onClick={handleExportPDF}
                className="flex-1 sm:flex-none flex items-center justify-center gap-1.5 px-3 sm:px-4 py-2 sm:py-2.5 border-2 border-gray-300 text-gray-700 rounded-lg hover:border-gray-400 hover:bg-gray-50 active:scale-95 transition-all duration-200 text-xs sm:text-sm font-medium shadow-sm hover:shadow group"
              >
                <Download className="h-3.5 w-3.5 sm:h-4 sm:w-4 group-hover:translate-y-0.5 transition-transform duration-200" />
                <span>Export PDF</span>
              </button>
              <button
                onClick={handleExportDOCX}
                className="flex-1 sm:flex-none flex items-center justify-center gap-1.5 px-3 sm:px-5 py-2 sm:py-2.5 bg-linear-to-r from-blue-600 to-blue-700 text-white rounded-lg hover:from-blue-700 hover:to-blue-800 active:scale-95 transition-all duration-200 text-xs sm:text-sm font-medium shadow-md hover:shadow-lg group"
              >
                <Download className="h-3.5 w-3.5 sm:h-4 sm:w-4 group-hover:translate-y-0.5 transition-transform duration-200" />
                <span>Export Word</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="w-full min-h-screen">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
          <div className="grid lg:grid-cols-2 gap-6 lg:gap-8 w-full">
          {/* Editor Forms */}
          <div className="space-y-5 sm:space-y-6 w-full">
            <TemplateSelector
              currentTemplateId={cv.templateId}
              onTemplateChange={(templateId) => setCV({ ...cv, templateId })}
            />

            <CustomizationPanel
              formatting={cv.formatting || { alignment: 'left', headingStyle: 'modern', sectionSpacing: 'normal' }}
              onFormattingChange={(formatting) => setCV({ ...cv, formatting })}
              enabledSections={cv.enabledSections || {
                summary: true,
                experience: true,
                education: true,
                skills: true,
                certifications: false,
                references: false,
                hobbies: false,
                customSections: false,
              }}
              onSectionToggle={(section, enabled) =>
                setCV({
                  ...cv,
                  enabledSections: {
                    ...cv.enabledSections,
                    [section]: enabled,
                  },
                })
              }
            />

            <SectionOrderManager
              sectionOrder={cv.sectionOrder || ['summary', 'experience', 'education', 'skills', 'certifications', 'references', 'hobbies']}
              enabledSections={cv.enabledSections || {
                summary: true,
                experience: true,
                education: true,
                skills: true,
                certifications: false,
                references: false,
                hobbies: false,
                customSections: false,
              }}
              onOrderChange={(sectionOrder) => setCV({ ...cv, sectionOrder })}
            />

            <SectionTitleEditor
              sectionTitles={cv.sectionTitles || defaultSectionTitles}
              onTitlesChange={(sectionTitles) => setCV({ ...cv, sectionTitles })}
              enabledSections={cv.enabledSections || {
                summary: true,
                experience: true,
                education: true,
                skills: true,
                certifications: false,
                references: false,
                hobbies: false,
                customSections: false,
              }}
            />

            <PhotoUpload
              currentPhoto={cv.personalInfo.profilePhoto}
              onPhotoChange={(photo) =>
                setCV({
                  ...cv,
                  personalInfo: { ...cv.personalInfo, profilePhoto: photo },
                })
              }
            />

            <PersonalInfoForm
              data={cv.personalInfo}
              onChange={(personalInfo) => setCV({ ...cv, personalInfo })}
            />

            {cv.enabledSections?.experience !== false && (
              <ExperienceForm
                data={cv.experience}
                onChange={(experience: WorkExperience[]) => setCV({ ...cv, experience })}
              />
            )}

            {cv.enabledSections?.education !== false && (
              <EducationForm
                data={cv.education}
                onChange={(education: Education[]) => setCV({ ...cv, education })}
              />
            )}

            {cv.enabledSections?.skills !== false && (
              <SkillsForm
                data={cv.skills}
                onChange={(skills: Skill[]) => setCV({ ...cv, skills })}
              />
            )}

            {cv.enabledSections?.certifications !== false && (
              <CertificationsForm
                data={cv.certifications || []}
                onChange={(certifications: Certification[]) =>
                  setCV({ ...cv, certifications })
                }
              />
            )}

            {cv.enabledSections?.references !== false && (
              <ReferencesForm
                data={cv.references || []}
                onChange={(references: Reference[]) => setCV({ ...cv, references })}
              />
            )}

            {cv.enabledSections?.hobbies !== false && (
              <HobbiesForm
                data={cv.hobbies || []}
                onChange={(hobbies: string[]) => setCV({ ...cv, hobbies })}
              />
            )}
          </div>

          {/* Preview */}
          <div className="lg:sticky lg:top-24 w-full">
            <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden w-full">
              <div className="px-4 sm:px-6 py-3 sm:py-4 border-b border-gray-200 bg-linear-to-r from-blue-50 to-indigo-50">
                <h3 className="text-base sm:text-lg font-bold text-gray-800 flex items-center gap-2">
                  <div className="h-2 w-2 bg-blue-600 rounded-full animate-pulse"></div>
                  Live Preview
                </h3>
                <p className="text-xs text-gray-600 mt-1">Updates automatically as you edit</p>
              </div>
              <div ref={previewRef} className="overflow-y-auto overflow-x-hidden bg-gray-50 w-full" style={{ maxHeight: 'calc(100vh - 220px)' }}>
                <CVPreview data={cv} />
              </div>
            </div>
          </div>
        </div>
      </div>
      </div>

      {/* AI Assistant */}
      <AIRefinementPanel onRefine={handleAIRefine} />
    </div>
  );
}
