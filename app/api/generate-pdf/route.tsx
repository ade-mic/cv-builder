import React from 'react';
import { NextRequest, NextResponse } from 'next/server';
import { Document, Page, Text, View, StyleSheet, pdf, Font } from '@react-pdf/renderer';
import { CVData, defaultSectionTitles, PROFESSIONAL_ICONS } from '@/types/cv';

// Register professional fonts using system fonts
Font.register({
  family: 'Inter',
  fonts: [
    { src: 'https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyfAZ9hiA.woff2' },
    { src: 'https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuGKYAZ9hiA.woff2', fontWeight: 600 },
    { src: 'https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuFuYAZ9hiA.woff2', fontWeight: 700 },
  ],
});

// Define professional styles for PDF
const styles = StyleSheet.create({
  page: {
    padding: 50,
    fontSize: 10.5,
    fontFamily: 'Inter',
    color: '#1f2937',
    lineHeight: 1.6,
  },
  header: {
    marginBottom: 24,
    borderBottom: 2.5,
    borderBottomColor: '#2563eb',
    paddingBottom: 16,
  },
  name: {
    fontSize: 26,
    fontWeight: 700,
    marginBottom: 10,
    color: '#111827',
    letterSpacing: -0.3,
  },
  contactInfo: {
    fontSize: 9.5,
    color: '#6b7280',
    marginBottom: 2,
    lineHeight: 1.5,
  },
  contactRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    marginTop: 6,
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 12,
    fontWeight: 700,
    marginBottom: 14,
    textTransform: 'uppercase',
    letterSpacing: 1.2,
    color: '#1f2937',
    borderBottom: 2,
    borderBottomColor: '#e5e7eb',
    paddingBottom: 6,
  },
  subtitle: {
    fontSize: 11.5,
    fontWeight: 600,
    marginBottom: 4,
    color: '#111827',
  },
  text: {
    fontSize: 10,
    lineHeight: 1.6,
    color: '#4b5563',
  },
  dateText: {
    fontSize: 9,
    color: '#9ca3af',
    marginBottom: 4,
    fontWeight: 600,
  },
  experienceItem: {
    marginBottom: 16,
  },
  educationItem: {
    marginBottom: 16,
  },
  itemHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  itemLeft: {
    flex: 1,
  },
  itemRight: {
    marginLeft: 10,
  },
  company: {
    fontSize: 10,
    color: '#6b7280',
    marginBottom: 2,
  },
  skillsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 7,
  },
  skillChip: {
    backgroundColor: '#eff6ff',
    color: '#1e40af',
    padding: '6 12',
    borderRadius: 4,
    fontSize: 9,
    fontWeight: 600,
  },
  certificationItem: {
    marginBottom: 14,
  },
  referenceItem: {
    marginBottom: 12,
    padding: 10,
    backgroundColor: '#f9fafb',
    borderRadius: 4,
    borderLeft: 2,
    borderLeftColor: '#2563eb',
  },
  referenceGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  referenceColumn: {
    width: '48%',
  },
  hobbyChip: {
    backgroundColor: '#fef2f2',
    color: '#991b1b',
    padding: '6 12',
    borderRadius: 4,
    fontSize: 9,
    fontWeight: 600,
  },
});

// PDF Document Component
const CVDocument = ({ data }: { data: CVData }) => {
  const { personalInfo, experience, education, skills, certifications, references, hobbies, enabledSections, sectionTitles } = data;

  // Get section titles with fallback to defaults
  const titles = sectionTitles || defaultSectionTitles;

  const formatDate = (date: string) => {
    if (!date) return '';
    const [year, month] = date.split('-');
    const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    return `${monthNames[parseInt(month) - 1]} ${year}`;
  };

  // Helper function to get professional icon symbol
  const getProfessionalIcon = () => {
    if (!personalInfo.titleIcon || personalInfo.titleIcon === 'none') return '';
    
    const iconMap: Record<string, string> = {
      'engineer': '◆',
      'medic': '†',
      'designer': '✦',
      'finance': '¤',
      'marketing': '✉',
      'manager': '□',
      'teacher': '◎',
      'scientist': '◊',
      'architect': '▪',
      'law': '⚖',
      'nurse': '†',
      'chef': '✓',
      'artist': '✎',
      'musician': '♪',
      'athlete': '◆',
    };
    
    return iconMap[personalInfo.titleIcon] || '';
  };

  // Helper function to render text with bullet points
  const renderBulletText = (text: string) => {
    const lines = text.split('\n').filter(line => line.trim());
    const hasBullets = lines.some(line => line.trim().match(/^[•\-\*]\s/));
    
    if (hasBullets) {
      return lines.map((line, idx) => {
        const trimmed = line.trim();
        const content = trimmed.replace(/^[•\-\*]\s+/, '');
        return (
          <View key={idx} style={{ flexDirection: 'row', marginBottom: 4 }}>
            <Text style={styles.text}>•</Text>
            <Text style={{ ...styles.text, marginLeft: 6, flex: 1 }}>{content}</Text>
          </View>
        );
      });
    }
    
    return <Text style={styles.text}>{text}</Text>;
  };

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Header */}
        <View style={styles.header}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <View style={{ flex: 1 }}>
              <Text style={styles.name}>{personalInfo.fullName || 'Your Name'}</Text>
              
              {personalInfo.professionalTitle && (
                <Text style={{ fontSize: 11, color: '#4b5563', marginBottom: 12, fontWeight: 600 }}>
                  {personalInfo.professionalTitle}
                </Text>
              )}
            </View>
            
            {personalInfo.titleIcon && personalInfo.titleIcon !== 'none' && (
              <Text style={{ fontSize: 48, textAlign: 'right', marginLeft: 20 }}>
                {getProfessionalIcon()}
              </Text>
            )}
          </View>
          
          <View style={styles.contactRow}>
            {personalInfo.email && (
              <Text style={styles.contactInfo}>{personalInfo.email}</Text>
            )}
            {personalInfo.phone && (
              <Text style={styles.contactInfo}>{personalInfo.phone}</Text>
            )}
            {personalInfo.location && (
              <Text style={styles.contactInfo}>{personalInfo.location}</Text>
            )}
          </View>

          {(personalInfo.website || personalInfo.linkedin || personalInfo.github) && (
            <View style={styles.contactRow}>
              {personalInfo.website && (
                <Text style={styles.contactInfo}>{personalInfo.website}</Text>
              )}
              {personalInfo.linkedin && (
                <Text style={styles.contactInfo}>{personalInfo.linkedin}</Text>
              )}
              {personalInfo.github && (
                <Text style={styles.contactInfo}>{personalInfo.github}</Text>
              )}
            </View>
          )}
        </View>

        {/* Summary */}
        {enabledSections?.summary !== false && personalInfo.summary && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>📄 {titles.summary.toUpperCase()}</Text>
            <Text style={styles.text}>{personalInfo.summary}</Text>
          </View>
        )}

        {/* Experience */}
        {enabledSections?.experience !== false && experience.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>💼 {titles.experience.toUpperCase()}</Text>
            {experience.map((exp) => (
              <View key={exp.id} style={styles.experienceItem}>
                <View style={styles.itemHeader}>
                  <View style={styles.itemLeft}>
                    <Text style={styles.subtitle}>{exp.jobTitle || 'Job Title'}</Text>
                    <Text style={styles.company}>
                      {exp.company || 'Company'}{exp.location && ` • ${exp.location}`}
                    </Text>
                  </View>
                  <View style={styles.itemRight}>
                    <Text style={styles.dateText}>
                      {formatDate(exp.startDate)} - {exp.current ? 'Present' : formatDate(exp.endDate)}
                    </Text>
                  </View>
                </View>
                {exp.description && (
                  <View style={styles.text}>
                    {renderBulletText(exp.description)}
                  </View>
                )}
              </View>
            ))}
          </View>
        )}

        {/* Education */}
        {enabledSections?.education !== false && education.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>🎓 {titles.education.toUpperCase()}</Text>
            {education.map((edu) => (
              <View key={edu.id} style={styles.educationItem}>
                <View style={styles.itemHeader}>
                  <View style={styles.itemLeft}>
                    <Text style={styles.subtitle}>{edu.degree || 'Degree'}</Text>
                    <Text style={styles.company}>
                      {edu.institution || 'Institution'}{edu.location && ` • ${edu.location}`}
                    </Text>
                    {edu.gpa && (
                      <Text style={styles.text}>GPA: {edu.gpa}</Text>
                    )}
                  </View>
                  <View style={styles.itemRight}>
                    <Text style={styles.dateText}>
                      {formatDate(edu.startDate)} - {edu.current ? 'Present' : formatDate(edu.endDate)}
                    </Text>
                  </View>
                </View>
                {edu.description && (
                  <View style={styles.text}>
                    {renderBulletText(edu.description)}
                  </View>

                )}
              </View>
            ))}
          </View>
        )}

        {/* Skills */}
        {enabledSections?.skills !== false && skills && skills.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>⚡ {titles.skills.toUpperCase()}</Text>
            <View style={styles.skillsContainer}>
              {skills.map(skill => (
                <Text key={skill.id} style={styles.skillChip}>{skill.name}</Text>
              ))}
            </View>
          </View>
        )}

        {/* Certifications */}
        {enabledSections?.certifications !== false && certifications && certifications.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>🏆 {titles.certifications.toUpperCase()}</Text>
            {certifications.map((cert) => (
              <View key={cert.id} style={styles.certificationItem}>
                <View style={styles.itemHeader}>
                  <View style={styles.itemLeft}>
                    <Text style={styles.subtitle}>{cert.name}</Text>
                    <Text style={styles.company}>{cert.issuer}</Text>
                    {cert.credentialId && (
                      <Text style={styles.text}>ID: {cert.credentialId}</Text>
                    )}
                  </View>
                  <View style={styles.itemRight}>
                    <Text style={styles.dateText}>
                      {formatDate(cert.date)}
                      {cert.expiryDate && ` - ${formatDate(cert.expiryDate)}`}
                    </Text>
                  </View>
                </View>
              </View>
            ))}
          </View>
        )}

        {/* References */}
        {enabledSections?.references !== false && references && references.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>👥 {titles.references.toUpperCase()}</Text>
            <View style={styles.referenceGrid}>
              {references.map((ref) => (
                <View key={ref.id} style={[styles.referenceItem, styles.referenceColumn]}>
                  <Text style={styles.subtitle}>{ref.name}</Text>
                  <Text style={styles.text}>{ref.position}</Text>
                  <Text style={styles.text}>{ref.company}</Text>
                  <Text style={styles.contactInfo}>{ref.email}</Text>
                  <Text style={styles.contactInfo}>{ref.phone}</Text>
                </View>
              ))}
            </View>
          </View>
        )}

        {/* Hobbies */}
        {enabledSections?.hobbies !== false && hobbies && hobbies.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>❤️ {titles.hobbies.toUpperCase()}</Text>
            <View style={styles.skillsContainer}>
              {hobbies.map((hobby, index) => (
                <Text key={index} style={styles.hobbyChip}>
                  {hobby}
                </Text>
              ))}
            </View>
          </View>
        )}
      </Page>
    </Document>
  );
};

export async function POST(request: NextRequest) {
  try {
    const cvData: CVData = await request.json();

    // Generate PDF
    const pdfDoc = <CVDocument data={cvData} />;
    const pdfBlob = await pdf(pdfDoc).toBlob();
    const pdfBuffer = Buffer.from(await pdfBlob.arrayBuffer());

    // Return PDF as response
    return new NextResponse(pdfBuffer, {
      status: 200,
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename="${(cvData.personalInfo.fullName || 'CV').replace(/[^a-zA-Z0-9-_]/g, '_')}.pdf"`,
        'Content-Length': pdfBuffer.length.toString(),
      },
    });
  } catch (error) {
    console.error('Error generating PDF:', error);
    return NextResponse.json(
      { error: 'Failed to generate PDF', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}
