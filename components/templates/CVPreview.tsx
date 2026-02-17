'use client';

import { CVData, defaultSectionTitles, PROFESSIONAL_ICONS } from '@/types/cv';
import { Mail, Phone, MapPin, Globe, Linkedin, Github, Award, Users, Heart, FileText, Briefcase, GraduationCap, Zap, Code2, Stethoscope, Palette, DollarSign, MessageSquare, BookOpen, Microscope, Building2, Scale, Utensils, Paintbrush, Music, Trophy } from 'lucide-react';

interface CVPreviewProps {
  data: CVData;
}

export default function CVPreview({ data }: CVPreviewProps) {
  const {
    personalInfo,
    experience,
    education,
    skills,
    certifications,
    references,
    hobbies,
    formatting,
    enabledSections,
    templateId,
    sectionOrder,
    sectionTitles,
  } = data;

  // Get section titles with fallback to defaults
  const titles = sectionTitles || defaultSectionTitles;

  // Helper function to get professional icon component
  const getProfessionalIconComponent = () => {
    if (!personalInfo.titleIcon || personalInfo.titleIcon === 'none') return null;
    
    const iconProps = { size: 48, strokeWidth: 1.5, className: 'text-gray-800' };
    
    switch (personalInfo.titleIcon) {
      case 'engineer':
        return <Code2 {...iconProps} />;
      case 'medic':
        return <Stethoscope {...iconProps} />;
      case 'designer':
        return <Palette {...iconProps} />;
      case 'finance':
        return <DollarSign {...iconProps} />;
      case 'marketing':
        return <MessageSquare {...iconProps} />;
      case 'manager':
        return <Briefcase {...iconProps} />;
      case 'teacher':
        return <BookOpen {...iconProps} />;
      case 'scientist':
        return <Microscope {...iconProps} />;
      case 'architect':
        return <Building2 {...iconProps} />;
      case 'law':
        return <Scale {...iconProps} />;
      case 'nurse':
        return <Stethoscope {...iconProps} />;
      case 'chef':
        return <Utensils {...iconProps} />;
      case 'artist':
        return <Paintbrush {...iconProps} />;
      case 'musician':
        return <Music {...iconProps} />;
      case 'athlete':
        return <Trophy {...iconProps} />;
      default:
        return null;
    }
  };

  // Helper function to render text with bullet point support
  const renderTextWithBullets = (text: string, className: string = '') => {
    const lines = text.split('\n').filter(line => line.trim());
    
    // Check if text contains bullet points
    const hasBullets = lines.some(line => line.trim().match(/^[•\-\*]\s/));
    
    if (hasBullets) {
      return (
        <ul className={`list-none space-y-1 ${className}`}>
          {lines.map((line, idx) => {
            const trimmed = line.trim();
            // Remove bullet characters at the start
            const content = trimmed.replace(/^[•\-\*]\s+/, '');
            return (
              <li key={idx} className="flex items-start">
                <span className="mr-2 text-blue-600">•</span>
                <span className="flex-1">{content}</span>
              </li>
            );
          })}
        </ul>
      );
    }
    
    // No bullets, render as normal text
    return <p className={`whitespace-pre-wrap ${className}`}>{text}</p>;
  };

  const formatDate = (date: string) => {
    if (!date) return '';
    const [year, month] = date.split('-');
    const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    return `${monthNames[parseInt(month) - 1]} ${year}`;
  };

  // Get text alignment class
  const getAlignmentClass = () => {
    const alignment = formatting?.alignment || 'left';
    switch (alignment) {
      case 'center': return 'text-center';
      case 'right': return 'text-right';
      case 'justify': return 'text-justify';
      default: return 'text-left';
    }
  };

  // Get heading style classes
  const getHeadingClass = () => {
    const style = formatting?.headingStyle || 'modern';
    switch (style) {
      case 'classic':
        return 'text-lg font-semibold text-gray-900 mb-4 border-b-2 border-gray-200 pb-2 tracking-tight';
      case 'bold':
        return 'text-xl font-extrabold text-gray-900 mb-4 uppercase tracking-wider';
      case 'minimal':
        return 'text-base font-semibold text-gray-800 mb-4 tracking-normal';
      default: // modern
        return 'text-lg font-bold text-gray-900 mb-4 uppercase tracking-wide';
    }
  };

  // Get section spacing class
  const getSectionSpacing = () => {
    const spacing = formatting?.sectionSpacing || 'normal';
    switch (spacing) {
      case 'compact': return 'mb-5';
      case 'relaxed': return 'mb-10';
      default: return 'mb-7';
    }
  };

  const headingClass = getHeadingClass();
  const sectionSpacing = getSectionSpacing();
  const alignmentClass = getAlignmentClass();

  // Template-specific styling
  const isModern = templateId === 'modern';
  const isCreative = templateId === 'creative';
  const isMinimal = templateId === 'minimal';
  const isExecutive = templateId === 'executive';

  // Default section order
  const defaultOrder = ['summary', 'experience', 'education', 'skills', 'certifications', 'references', 'hobbies'];
  const orderedSections = sectionOrder || defaultOrder;

  // Section renderers
  const renderSummary = () => {
    if (enabledSections?.summary === false || !personalInfo.summary) return null;
    return (
      <div className={sectionSpacing} key="summary">
        <h2 className={`${headingClass} flex items-center gap-2`}>
          <FileText className="inline h-5 w-5 -mt-1" />
          {titles.summary}
        </h2>
        <p className="text-gray-700 leading-relaxed whitespace-pre-wrap text-sm">
          {personalInfo.summary}
        </p>
      </div>
    );
  };

  const renderExperience = () => {
    if (enabledSections?.experience === false || experience.length === 0) return null;
    return (
      <div className={sectionSpacing} key="experience">
        <h2 className={`${headingClass} flex items-center gap-2`}>
          <Briefcase className="inline h-5 w-5 -mt-1" />
          {titles.experience}
        </h2>
        <div className="space-y-5">
          {experience.map((exp) => (
            <div key={exp.id}>
              <div className="flex justify-between items-start mb-2">
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900 text-base">{exp.jobTitle || 'Job Title'}</h3>
                  <p className="text-gray-600 text-sm mt-0.5">
                    {exp.company || 'Company'}{exp.location && ` • ${exp.location}`}
                  </p>
                </div>
                <div className="text-gray-500 text-xs whitespace-nowrap ml-4 font-semibold">
                  {formatDate(exp.startDate)} - {exp.current ? 'Present' : formatDate(exp.endDate)}
                </div>
              </div>
              {exp.description && renderTextWithBullets(exp.description, 'text-gray-700 mt-2 text-sm leading-relaxed')}
            </div>
          ))}
        </div>
      </div>
    );
  };

  const renderEducation = () => {
    if (enabledSections?.education === false || education.length === 0) return null;
    return (
      <div className={sectionSpacing} key="education">
        <h2 className={`${headingClass} flex items-center gap-2`}>
          <GraduationCap className="inline h-5 w-5 -mt-1" />
          {titles.education}
        </h2>
        <div className="space-y-5">
          {education.map((edu) => (
            <div key={edu.id}>
              <div className="flex justify-between items-start mb-2">
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900 text-base">{edu.degree || 'Degree'}</h3>
                  <p className="text-gray-600 text-sm mt-0.5">
                    {edu.institution || 'Institution'}{edu.location && ` • ${edu.location}`}
                  </p>
                  {edu.gpa && (
                    <p className="text-gray-600 text-sm mt-0.5">GPA: {edu.gpa}</p>
                  )}
                </div>
                <div className="text-gray-500 text-xs whitespace-nowrap ml-4 font-semibold">
                  {formatDate(edu.startDate)} - {edu.current ? 'Present' : formatDate(edu.endDate)}
                </div>
              </div>
              {edu.description && renderTextWithBullets(edu.description, 'text-gray-700 mt-2 text-sm leading-relaxed')}
            </div>
          ))}
        </div>
      </div>
    );
  };

  const renderSkills = () => {
    if (enabledSections?.skills === false || skills.length === 0) return null;
    return (
      <div className={sectionSpacing} key="skills">
        <h2 className={`${headingClass} flex items-center gap-2`}>
          <Zap className="inline h-5 w-5 -mt-1" />
          {titles.skills}
        </h2>
        <div className="flex flex-wrap gap-2">
          {skills.map((skill) => (
            <span
              key={skill.id}
              className={`px-3 py-1.5 ${isCreative ? 'bg-purple-100 text-purple-800' : isExecutive ? 'bg-gray-800 text-white' : 'bg-blue-50 text-blue-800'} rounded text-xs font-semibold tracking-wide`}
            >
              {skill.name}
            </span>
          ))}
        </div>
      </div>
    );
  };

  const renderCertifications = () => {
    if (enabledSections?.certifications === false || !certifications || certifications.length === 0) return null;
    return (
      <div className={sectionSpacing} key="certifications">
        <h2 className={`${headingClass} flex items-center gap-2`}>
          <Award className="inline h-5 w-5 -mt-1" />
          {titles.certifications}
        </h2>
        <div className="space-y-4">
          {certifications.map((cert) => (
            <div key={cert.id}>
              <div className="flex justify-between items-start mb-1">
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900 text-base">{cert.name}</h3>
                  <p className="text-gray-600 text-sm mt-0.5">{cert.issuer}</p>
                  {cert.credentialId && (
                    <p className="text-gray-500 text-sm mt-0.5">ID: {cert.credentialId}</p>
                  )}
                </div>
                <div className="text-gray-500 text-xs whitespace-nowrap ml-4 font-semibold">
                  {formatDate(cert.date)}
                  {cert.expiryDate && ` - ${formatDate(cert.expiryDate)}`}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const renderReferences = () => {
    if (enabledSections?.references === false || !references || references.length === 0) return null;
    return (
      <div className={sectionSpacing} key="references">
        <h2 className={`${headingClass} flex items-center gap-2`}>
          <Users className="inline h-5 w-5 -mt-1" />
          {titles.references}
        </h2>
        <div className="grid md:grid-cols-2 gap-4">
          {references.map((ref) => (
            <div key={ref.id} className="border-l-2 border-blue-600 pl-3 py-2 bg-gray-50 rounded-r">
              <h3 className="font-semibold text-gray-900 text-base">{ref.name}</h3>
              <p className="text-gray-700 text-sm mt-0.5">{ref.position}</p>
              <p className="text-gray-600 text-sm">{ref.company}</p>
              <div className="mt-1.5 text-xs text-gray-500 space-y-0.5">
                <p>{ref.email}</p>
                <p>{ref.phone}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const renderHobbies = () => {
    if (enabledSections?.hobbies === false || !hobbies || hobbies.length === 0) return null;
    return (
      <div className={sectionSpacing} key="hobbies">
        <h2 className={`${headingClass} flex items-center gap-2`}>
          <Heart className="inline h-5 w-5 -mt-1" />
          {titles.hobbies}
        </h2>
        <div className="flex flex-wrap gap-2">
          {hobbies.map((hobby, index) => (
            <span
              key={index}
              className="px-3 py-1.5 bg-pink-50 text-pink-800 rounded text-xs font-semibold tracking-wide"
            >
              {hobby}
            </span>
          ))}
        </div>
      </div>
    );
  };

  // Section renderer map
  const sectionRenderers: Record<string, () => React.ReactElement | null> = {
    summary: renderSummary,
    experience: renderExperience,
    education: renderEducation,
    skills: renderSkills,
    certifications: renderCertifications,
    references: renderReferences,
    hobbies: renderHobbies,
  };

  return (
    <div className={`bg-white w-full max-w-full overflow-x-hidden p-4 sm:p-8 md:p-12 text-sm ${alignmentClass} antialiased`} style={{ minHeight: '1000px', fontFamily: 'Inter, system-ui, -apple-system, sans-serif' }}>
      {/* Header with optional photo */}
      <div className={`border-b-[2.5px] ${isCreative ? 'border-purple-600' : isExecutive ? 'border-gray-800' : 'border-blue-600'} pb-4 mb-4 sm:mb-6`}>
        <div className={`flex ${personalInfo.profilePhoto ? 'flex-col sm:flex-row gap-4 sm:gap-6 items-center' : 'flex-col'}`}>
          {personalInfo.profilePhoto && (
            <div className="shrink-0">
              <img
                src={personalInfo.profilePhoto}
                alt="Profile"
                className={`${isCreative ? 'w-24 h-24 sm:w-32 sm:h-32' : 'w-20 h-20 sm:w-24 sm:h-24'} rounded-full object-cover border-4 ${isCreative ? 'border-purple-500' : isExecutive ? 'border-gray-800' : 'border-blue-500'} shadow-sm`}
              />
            </div>
          )}
          
          <div className="flex-1 w-full">
            <div className="flex justify-between items-start gap-2 sm:gap-4">
              <div className="flex-1 min-w-0">
                <h1 className={`${isCreative ? 'text-2xl sm:text-3xl md:text-4xl' : 'text-xl sm:text-2xl md:text-3xl'} font-bold ${isCreative ? 'text-purple-900' : isExecutive ? 'text-gray-900' : 'text-gray-900'} text-left mb-2 sm:mb-2.5 tracking-tight leading-tight break-words`}>
                  {personalInfo.fullName || 'Your Name'}
                </h1>
                
                {personalInfo.professionalTitle && (
                  <p className="text-sm sm:text-base font-semibold text-gray-700 mb-2 sm:mb-3">
                    {personalInfo.professionalTitle}
                  </p>
                )}
              </div>
              
              {personalInfo.titleIcon && personalInfo.titleIcon !== 'none' && (
                <div className="leading-none shrink-0 hidden sm:block">
                  {getProfessionalIconComponent()}
                </div>
              )}
            </div>
            
            <div className="flex flex-wrap gap-x-2 sm:gap-x-3 gap-y-1 text-gray-600 text-xs">
              {personalInfo.email && (
                <div className="flex items-center gap-1">
                  <Mail className="h-3.5 w-3.5 shrink-0" />
                  <span className="break-all">{personalInfo.email}</span>
                </div>
              )}
              {personalInfo.phone && (
                <div className="flex items-center gap-1">
                  <Phone className="h-3.5 w-3.5 shrink-0" />
                  <span className="whitespace-nowrap">{personalInfo.phone}</span>
                </div>
              )}
              {personalInfo.location && (
                <div className="flex items-center gap-1">
                  <MapPin className="h-3.5 w-3.5 shrink-0" />
                  <span className="break-words">{personalInfo.location}</span>
                </div>
              )}
            </div>

            {(personalInfo.website || personalInfo.linkedin || personalInfo.github) && (
              <div className="flex flex-wrap gap-x-2 sm:gap-x-3 gap-y-1 text-gray-600 mt-1.5 text-xs">
                {personalInfo.website && (
                  <div className="flex items-center gap-1">
                    <Globe className="h-3.5 w-3.5 shrink-0" />
                    <span className="break-all">{personalInfo.website}</span>
                  </div>
                )}
                {personalInfo.linkedin && (
                  <div className="flex items-center gap-1">
                    <Linkedin className="h-3.5 w-3.5 shrink-0" />
                    <span className="break-all">{personalInfo.linkedin}</span>
                  </div>
                )}
                {personalInfo.github && (
                  <div className="flex items-center gap-1">
                    <Github className="h-3.5 w-3.5 shrink-0" />
                    <span className="break-all">{personalInfo.github}</span>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Render sections in custom order */}
      {orderedSections.map((sectionKey) => {
        const renderer = sectionRenderers[sectionKey];
        return renderer ? renderer() : null;
      })}
    </div>
  );
}