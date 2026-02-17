import {
  collection,
  doc,
  setDoc,
  getDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  query,
  where,
  orderBy,
  Timestamp,
} from 'firebase/firestore';
import { db } from './config';
import { CVData } from '@/types/cv';

// Collection references
export const getCVsCollection = (userId: string) => 
  collection(db, 'users', userId, 'cvs');

export const getCVDoc = (userId: string, cvId: string) =>
  doc(db, 'users', userId, 'cvs', cvId);

export const getTemplatesCollection = () => collection(db, 'templates');

// CV CRUD operations
export const createCV = async (userId: string, cvData: Partial<CVData>) => {
  const cvRef = doc(getCVsCollection(userId));
  const now = Timestamp.now();
  
  const newCV: CVData = {
    id: cvRef.id,
    userId,
    personalInfo: {
      fullName: '',
      email: '',
      phone: '',
      location: '',
      summary: '',
    },
    experience: [],
    education: [],
    skills: [],
    certifications: [],
    references: [],
    hobbies: [],
    customSections: [],
    templateId: 'professional',
    formatting: {
      alignment: 'left',
      headingStyle: 'modern',
      sectionSpacing: 'normal',
    },
    enabledSections: {
      summary: true,
      experience: true,
      education: true,
      skills: true,
      certifications: false,
      references: false,
      hobbies: false,
      customSections: false,
    },
    sectionOrder: ['summary', 'experience', 'education', 'skills', 'certifications', 'references', 'hobbies'],
    createdAt: now.toDate(),
    updatedAt: now.toDate(),
    ...cvData,
  };

  await setDoc(cvRef, {
    ...newCV,
    createdAt: now,
    updatedAt: now,
  });

  return newCV;
};

export const getCV = async (userId: string, cvId: string) => {
  const cvRef = getCVDoc(userId, cvId);
  const snapshot = await getDoc(cvRef);
  
  if (!snapshot.exists()) {
    return null;
  }

  const data = snapshot.data();
  
  // Initialize defaults for backward compatibility
  return {
    ...data,
    id: snapshot.id,
    certifications: data.certifications || [],
    references: data.references || [],
    hobbies: data.hobbies || [],
    customSections: data.customSections || [],
    formatting: data.formatting || {
      alignment: 'left',
      headingStyle: 'modern',
      sectionSpacing: 'normal',
    },
    enabledSections: data.enabledSections || {
      summary: true,
      experience: true,
      education: true,
      skills: true,
      certifications: false,
      references: false,
      hobbies: false,
      customSections: false,
    },
    sectionOrder: data.sectionOrder || ['summary', 'experience', 'education', 'skills', 'certifications', 'references', 'hobbies'],
    createdAt: data.createdAt.toDate(),
    updatedAt: data.updatedAt.toDate(),
  } as CVData;
};

export const getUserCVs = async (userId: string) => {
  const cvsQuery = query(
    getCVsCollection(userId),
    orderBy('updatedAt', 'desc')
  );
  
  const snapshot = await getDocs(cvsQuery);
  return snapshot.docs.map(doc => {
    const data = doc.data();
    return {
      ...data,
      id: doc.id,
      certifications: data.certifications || [],
      references: data.references || [],
      hobbies: data.hobbies || [],
      customSections: data.customSections || [],
      formatting: data.formatting || {
        alignment: 'left',
        headingStyle: 'modern',
        sectionSpacing: 'normal',
      },
      enabledSections: data.enabledSections || {
        summary: true,
        experience: true,
        education: true,
        skills: true,
        certifications: false,
        references: false,
        hobbies: false,
        customSections: false,
      },
      createdAt: data.createdAt.toDate(),
      updatedAt: data.updatedAt.toDate(),
    } as CVData;
  });
};

export const updateCV = async (
  userId: string,
  cvId: string,
  updates: Partial<CVData>
) => {
  const cvRef = getCVDoc(userId, cvId);
  await updateDoc(cvRef, {
    ...updates,
    updatedAt: Timestamp.now(),
  });
};

export const deleteCV = async (userId: string, cvId: string) => {
  const cvRef = getCVDoc(userId, cvId);
  await deleteDoc(cvRef);
};
