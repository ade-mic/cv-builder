import { NextRequest, NextResponse } from 'next/server';
import {
  Document,
  Packer,
  Paragraph,
  TextRun,
  HeadingLevel,
  AlignmentType,
  BorderStyle,
  Table,
  TableRow,
  TableCell,
  WidthType,
  ShadingType,
} from 'docx';
import { CVData, defaultSectionTitles, PROFESSIONAL_ICONS } from '@/types/cv';

export async function POST(request: NextRequest) {
  try {
    const cvData: CVData = await request.json();
    const { personalInfo, experience, education, skills, certifications, references, hobbies, enabledSections, sectionTitles } = cvData;

    // Get section titles with fallback to defaults
    const titles = sectionTitles || defaultSectionTitles;

    const formatDate = (date: string) => {
      if (!date) return '';
      const [year, month] = date.split('-');
      const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
      return `${monthNames[parseInt(month) - 1]} ${year}`;
    };

    // Helper function to parse bullet points
    const parseBulletText = (text: string) => {
      const lines = text.split('\n').filter(line => line.trim());
      const hasBullets = lines.some(line => line.trim().match(/^[•\-\*]\s/));
      
      if (hasBullets) {
        return lines.map(line => {
          const trimmed = line.trim();
          const content = trimmed.replace(/^[•\-\*]\s+/, '');
          return new Paragraph({
            text: content,
            spacing: { after: 60, line: 300 },
            style: 'List Bullet',
          });
        });
      }
      
      return [
        new Paragraph({
          text: text,
          spacing: { after: 240, line: 340 },
        }),
      ];
    };

    // Create document sections
    const docSections: Paragraph[] = [];

    // Header - Name with better styling
    docSections.push(
      new Paragraph({
        text: personalInfo.fullName || 'Your Name',
        heading: HeadingLevel.TITLE,
        alignment: AlignmentType.LEFT,
        spacing: { after: personalInfo.professionalTitle ? 60 : 120 },
        style: 'Title',
      })
    );

    // Professional Title
    if (personalInfo.professionalTitle) {
      docSections.push(
        new Paragraph({
          children: [
            new TextRun({
              text: personalInfo.professionalTitle,
              size: 22,
              bold: true,
              color: '4b5563',
              font: 'Calibri',
            }),
          ],
          spacing: { after: 120 },
        })
      );
    }

    // Contact Info - Better formatted
    const contactInfo: string[] = [];
    if (personalInfo.email) contactInfo.push(personalInfo.email);
    if (personalInfo.phone) contactInfo.push(personalInfo.phone);
    if (personalInfo.location) contactInfo.push(personalInfo.location);

    if (contactInfo.length > 0) {
      docSections.push(
        new Paragraph({
          children: [
            new TextRun({
              text: contactInfo.join(' • '),
              size: 20,
              color: '6b7280',
              font: 'Calibri',
            }),
          ],
          spacing: { after: 60 },
        })
      );
    }

    // Links - Professional formatting
    const links: string[] = [];
    if (personalInfo.website) links.push(personalInfo.website);
    if (personalInfo.linkedin) links.push(personalInfo.linkedin);
    if (personalInfo.github) links.push(personalInfo.github);

    if (links.length > 0) {
      docSections.push(
        new Paragraph({
          children: [
            new TextRun({
              text: links.join(' • '),
              size: 18,
              color: '2563eb',
              font: 'Calibri',
            }),
          ],
          spacing: { after: 200 },
          border: {
            bottom: {
              color: '2563eb',
              space: 1,
              style: BorderStyle.SINGLE,
              size: 10,
            },
          },
        })
      );
    } else {
      // Add border even if no links
      docSections.push(
        new Paragraph({
          spacing: { after: 200 },
          border: {
            bottom: {
              color: '2563eb',
              space: 1,
              style: BorderStyle.SINGLE,
              size: 10,
            },
          },
        })
      );
    }

    // Professional Summary
    if (enabledSections?.summary !== false && personalInfo.summary) {
      docSections.push(
        new Paragraph({
          text: `📄 ${titles.summary.toUpperCase()}`,
          heading: HeadingLevel.HEADING_1,
          spacing: { before: 180, after: 140 },
        }),
        new Paragraph({
          children: [
            new TextRun({
              text: personalInfo.summary,
              size: 21,
              font: 'Calibri',
            }),
          ],
          spacing: { after: 240, line: 340 },
        })
      );
    }

    // Work Experience
    if (enabledSections?.experience !== false && experience.length > 0) {
      docSections.push(
        new Paragraph({
          text: `💼 ${titles.experience.toUpperCase()}`,
          heading: HeadingLevel.HEADING_1,
          spacing: { before: 180, after: 140 },
        })
      );

      experience.forEach((exp) => {
        docSections.push(
          new Paragraph({
            children: [
              new TextRun({
                text: exp.jobTitle || 'Job Title',
                bold: true,
                size: 24,
                font: 'Calibri',
              }),
            ],
            spacing: { after: 60 },
          }),
          new Paragraph({
            children: [
              new TextRun({
                text: `${exp.company || 'Company'}${exp.location ? ` • ${exp.location}` : ''}`,
                size: 20,
                color: '6b7280',
                font: 'Calibri',
              }),
            ],
            spacing: { after: 50 },
          }),
          new Paragraph({
            children: [
              new TextRun({
                text: `${formatDate(exp.startDate)} - ${exp.current ? 'Present' : formatDate(exp.endDate)}`,
                size: 18,
                color: '9ca3af',
                italics: true,
                bold: true,
                font: 'Calibri',
              }),
            ],
            spacing: { after: 80 },
          })
        );

        if (exp.description) {
          const bulletParas = parseBulletText(exp.description);
          docSections.push(...bulletParas);
        }
      });
    }

    // Education
    if (enabledSections?.education !== false && education.length > 0) {
      docSections.push(
        new Paragraph({
          text: `🎓 ${titles.education.toUpperCase()}`,
          heading: HeadingLevel.HEADING_1,
          spacing: { before: 180, after: 140 },
        })
      );

      education.forEach((edu) => {
        docSections.push(
          new Paragraph({
            children: [
              new TextRun({
                text: edu.degree || 'Degree',
                bold: true,
                size: 24,
                font: 'Calibri',
              }),
            ],
            spacing: { after: 60 },
          }),
          new Paragraph({
            children: [
              new TextRun({
                text: `${edu.institution || 'Institution'}${edu.location ? ` • ${edu.location}` : ''}`,
                size: 20,
                color: '6b7280',
                font: 'Calibri',
              }),
            ],
            spacing: { after: 50 },
          }),
          new Paragraph({
            children: [
              new TextRun({
                text: `${formatDate(edu.startDate)} - ${edu.current ? 'Present' : formatDate(edu.endDate)}`,
                size: 18,
                color: '9ca3af',
                italics: true,
                bold: true,
                font: 'Calibri',
              }),
            ],
            spacing: { after: edu.gpa || edu.description ? 50 : 220 },
          })
        );

        if (edu.gpa) {
          docSections.push(
            new Paragraph({
              children: [
                new TextRun({
                  text: `GPA: ${edu.gpa}`,
                  size: 20,
                  font: 'Calibri',
                }),
              ],
              spacing: { after: edu.description ? 50 : 220 },
            })
          );
        }

        if (edu.description) {
          const bulletParas = parseBulletText(edu.description);
          docSections.push(...bulletParas);
        }
      });
    }

    // Skills
    if (enabledSections?.skills !== false && skills.length > 0) {
      docSections.push(
        new Paragraph({
          text: `⚡ ${titles.skills.toUpperCase()}`,
          heading: HeadingLevel.HEADING_1,
          spacing: { before: 180, after: 140 },
        }),
        new Paragraph({
          children: [
            new TextRun({
              text: skills.map((s) => s.name).join(' • '),
              size: 20,
              font: 'Calibri',
            }),
          ],
          spacing: { after: 240 },
        })
      );
    }

    // Certifications
    if (enabledSections?.certifications !== false && certifications && certifications.length > 0) {
      docSections.push(
        new Paragraph({
          text: `🏆 ${titles.certifications.toUpperCase()}`,
          heading: HeadingLevel.HEADING_1,
          spacing: { before: 180, after: 140 },
        })
      );

      certifications.forEach((cert) => {
        docSections.push(
          new Paragraph({
            children: [
              new TextRun({
                text: cert.name,
                bold: true,
                size: 24,
                font: 'Calibri',
              }),
            ],
            spacing: { after: 60 },
          }),
          new Paragraph({
            children: [
              new TextRun({
                text: cert.issuer,
                size: 20,
                color: '6b7280',
                font: 'Calibri',
              }),
            ],
            spacing: { after: 50 },
          }),
          new Paragraph({
            children: [
              new TextRun({
                text: `${formatDate(cert.date)}${cert.expiryDate ? ` - ${formatDate(cert.expiryDate)}` : ''}`,
                size: 18,
                color: '9ca3af',
                italics: true,
                bold: true,
                font: 'Calibri',
              }),
            ],
            spacing: { after: cert.credentialId ? 50 : 220 },
          })
        );

        if (cert.credentialId) {
          docSections.push(
            new Paragraph({
              children: [
                new TextRun({
                  text: `Credential ID: ${cert.credentialId}`,
                  size: 18,
                  color: '6b7280',
                  font: 'Calibri',
                }),
              ],
              spacing: { after: 220 },
            })
          );
        }
      });
    }

    // References
    if (enabledSections?.references !== false && references && references.length > 0) {
      docSections.push(
        new Paragraph({
          text: `👥 ${titles.references.toUpperCase()}`,
          heading: HeadingLevel.HEADING_1,
          spacing: { before: 180, after: 140 },
        })
      );

      references.forEach((ref) => {
        docSections.push(
          new Paragraph({
            children: [
              new TextRun({
                text: ref.name,
                bold: true,
                size: 24,
                font: 'Calibri',
              }),
            ],
            spacing: { after: 50 },
          }),
          new Paragraph({
            children: [
              new TextRun({
                text: ref.position,
                size: 20,
                font: 'Calibri',
              }),
            ],
            spacing: { after: 30 },
          }),
          new Paragraph({
            children: [
              new TextRun({
                text: ref.company,
                size: 20,
                color: '6b7280',
                font: 'Calibri',
              }),
            ],
            spacing: { after: 50 },
          }),
          new Paragraph({
            children: [
              new TextRun({
                text: `${ref.email} • ${ref.phone}`,
                size: 18,
                color: '6b7280',
                font: 'Calibri',
              }),
            ],
            spacing: { after: 220 },
          })
        );
      });
    }

    // Hobbies & Interests
    if (enabledSections?.hobbies !== false && hobbies && hobbies.length > 0) {
      docSections.push(
        new Paragraph({
          text: `❤️ ${titles.hobbies.toUpperCase()}`,
          heading: HeadingLevel.HEADING_1,
          spacing: { before: 180, after: 140 },
        }),
        new Paragraph({
          children: [
            new TextRun({
              text: hobbies.join(' • '),
              size: 20,
              font: 'Calibri',
            }),
          ],
          spacing: { after: 180 },
        })
      );
    }

    // Create document with professional styling
    const doc = new Document({
      styles: {
        paragraphStyles: [
          {
            id: 'Title',
            name: 'Title',
            basedOn: 'Normal',
            run: {
              size: 56,
              bold: true,
              color: '111827',
              font: 'Calibri',
            },
            paragraph: {
              spacing: {
                after: 150,
              },
            },
          },
        ],
      },
      sections: [
        {
          properties: {
            page: {
              margin: {
                top: 1440,  // 1 inch
                right: 1440,
                bottom: 1440,
                left: 1440,
              },
            },
          },
          children: docSections,
        },
      ],
    });

    // Generate buffer
    const buffer = await Packer.toBuffer(doc);

    // Return DOCX as response
    return new NextResponse(Buffer.from(buffer), {
      headers: {
        'Content-Type':
          'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        'Content-Disposition': `attachment; filename="${cvData.personalInfo.fullName || 'CV'}.docx"`,
      },
    });
  } catch (error) {
    console.error('Error generating DOCX:', error);
    return NextResponse.json(
      { error: 'Failed to generate DOCX' },
      { status: 500 }
    );
  }
}
