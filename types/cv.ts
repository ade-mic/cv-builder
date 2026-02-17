export const PROFESSIONAL_ICONS = [
  { value: 'none', label: 'None' },
  { value: 'engineer', label: 'Software Engineer' },
  { value: 'medic', label: 'Medical Practitioner' },
  { value: 'designer', label: 'Designer' },
  { value: 'finance', label: 'Finance' },
  { value: 'marketing', label: 'Marketing' },
  { value: 'manager', label: 'Manager' },
  { value: 'teacher', label: 'Teacher/Educator' },
  { value: 'scientist', label: 'Scientist' },
  { value: 'architect', label: 'Architect' },
  { value: 'law', label: 'Legal Professional' },
  { value: 'nurse', label: 'Nurse' },
  { value: 'chef', label: 'Chef' },
  { value: 'artist', label: 'Artist' },
  { value: 'musician', label: 'Musician' },
  { value: 'athlete', label: 'Athlete' },
];

export interface PersonalInfo {
  fullName: string;
  email: string;
  phone: string;
  location: string;
  website?: string;
  linkedin?: string;
  github?: string;
  summary: string;
  profilePhoto?: string;
  professionalTitle?: string; // e.g., "Senior Software Engineer"
  titleIcon?: string; // One of PROFESSIONAL_ICONS values
}

export interface WorkExperience {
  id: string;
  jobTitle: string;
  company: string;
  location: string;
  startDate: string;
  endDate: string;
  current: boolean;
  description: string;
}

export interface Education {
  id: string;
  degree: string;
  institution: string;
  location: string;
  startDate: string;
  endDate: string;
  current: boolean;
  gpa?: string;
  description?: string;
}

export interface Skill {
  id: string;
  name: string;
  category?: string;
}

export interface Certification {
  id: string;
  name: string;
  issuer: string;
  date: string;
  expiryDate?: string;
  credentialId?: string;
  url?: string;
}

export interface Reference {
  id: string;
  name: string;
  position: string;
  company: string;
  email: string;
  phone: string;
}

export interface CustomSection {
  id: string;
  title: string;
  content: string;
  order: number;
}

export interface TextFormatting {
  alignment: 'left' | 'center' | 'right' | 'justify';
  headingStyle: 'modern' | 'classic' | 'bold' | 'minimal';
  sectionSpacing: 'compact' | 'normal' | 'relaxed';
}

export interface SectionTitles {
  summary: string;
  experience: string;
  education: string;
  skills: string;
  certifications: string;
  references: string;
  hobbies: string;
}

export const defaultSectionTitles: SectionTitles = {
  summary: 'Professional Summary',
  experience: 'Work Experience',
  education: 'Education',
  skills: 'Skills',
  certifications: 'Certifications',
  references: 'References',
  hobbies: 'Hobbies & Interests',
};

export interface CVData {
  id: string;
  userId: string;
  personalInfo: PersonalInfo;
  experience: WorkExperience[];
  education: Education[];
  skills: Skill[];
  certifications?: Certification[];
  references?: Reference[];
  customSections?: CustomSection[];
  hobbies?: string[];
  templateId: string;
  formatting?: TextFormatting;
  sectionTitles?: SectionTitles; // Customizable section titles
  sectionOrder?: string[]; // Order of sections: ['summary', 'experience', 'education', 'skills', 'certifications', 'references', 'hobbies']
  enabledSections: {
    summary: boolean;
    experience: boolean;
    education: boolean;
    skills: boolean;
    certifications: boolean;
    references: boolean;
    hobbies: boolean;
    customSections: boolean;
  };
  createdAt: Date;
  updatedAt: Date;
}

export interface Template {
  id: string;
  name: string;
  description: string;
  thumbnail?: string;
  layout: 'single-column' | 'two-column' | 'modern' | 'classic';
  config: {
    primaryColor: string;
    fontFamily: string;
    fontSize: number;
    spacing: 'compact' | 'normal' | 'relaxed';
  };
}

export type CVFormData = Omit<CVData, 'id' | 'userId' | 'createdAt' | 'updatedAt'>;
