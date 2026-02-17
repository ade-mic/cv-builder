import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';

export async function POST(request: NextRequest) {
  try {
    const { content, type, targetRole } = await request.json();

    if (!content || !type) {
      return NextResponse.json(
        { error: 'Content and type are required' },
        { status: 400 }
      );
    }

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: 'Gemini API key not configured' },
        { status: 500 }
      );
    }

    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: 'gemini-pro' });

    // Create tailored prompts based on content type
    let prompt = '';

    switch (type) {
      case 'summary':
        prompt = `You are an expert CV writer. Refine the following professional summary to make it more compelling and professional${targetRole ? ` for a ${targetRole} position` : ''}. Keep it concise (2-3 sentences), highlight key strengths, and use action-oriented language. Only return the refined summary, no additional commentary.

Original summary:
${content}

Refined summary:`;
        break;

      case 'experience':
        prompt = `You are an expert CV writer. Refine the following job description to make it more impactful${targetRole ? ` for someone applying to a ${targetRole} position` : ''}. Use bullet points, start with strong action verbs, quantify achievements where possible, and highlight relevant skills. Only return the refined description, no additional commentary.

Original description:
${content}

Refined description:`;
        break;

      case 'skills':
        prompt = `You are an expert CV writer. Given the following list of skills, suggest additional relevant skills${targetRole ? ` for a ${targetRole} position` : ''} and organize them in a logical order. Return only the comma-separated list of skills, no additional commentary.

Current skills:
${content}

Improved skills list:`;
        break;

      case 'full cv':
        prompt = `You are an expert CV writer. Review the following CV content and provide specific suggestions for improvement${targetRole ? ` when applying for a ${targetRole} position` : ''}. Focus on:
1. Content quality and relevance
2. Achievement highlighting
3. Keyword optimization
4. Professional tone

Provide 3-5 actionable suggestions.

CV Content:
${content}

Suggestions:`;
        break;

      default:
        return NextResponse.json(
          { error: 'Invalid content type' },
          { status: 400 }
        );
    }

    // Generate content
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const refinedContent = response.text();

    return NextResponse.json({
      original: content,
      refined: refinedContent.trim(),
      type,
      targetRole,
    });
  } catch (error: any) {
    console.error('Error refining content:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to refine content' },
      { status: 500 }
    );
  }
}
