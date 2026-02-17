import Link from "next/link";
import { FileText, Download, Sparkles, Zap } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-linear-to-b from-blue-50 to-white">
      {/* Header */}
      <header className="container mx-auto px-4 py-6">
        <nav className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <FileText className="h-8 w-8 text-blue-600" />
            <span className="text-2xl font-bold text-gray-900">CV Builder</span>
          </div>
          <div className="flex gap-4">
            <Link
              href="/auth/login"
              className="px-4 py-2 text-gray-700 hover:text-gray-900"
            >
              Sign In
            </Link>
            <Link
              href="/auth/signup"
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
            >
              Get Started
            </Link>
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <main className="container mx-auto px-4 py-20">
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            Create Professional CVs in Minutes
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Fast, intuitive CV builder with AI-powered refinement. Export to PDF and Word with just one click.
          </p>
          <Link
            href="/auth/signup"
            className="inline-flex items-center gap-2 px-8 py-4 bg-blue-600 text-white text-lg rounded-lg hover:bg-blue-700 transition"
          >
            Start Building Your CV
            <Sparkles className="h-5 w-5" />
          </Link>
        </div>

        {/* Features */}
        <div className="grid md:grid-cols-3 gap-8 mt-20 max-w-5xl mx-auto">
          <div className="bg-white p-6 rounded-xl shadow-sm">
            <div className="h-12 w-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
              <Zap className="h-6 w-6 text-blue-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Lightning Fast
            </h3>
            <p className="text-gray-600">
              Intuitive form-based editor that lets you create professional CVs quickly without any design hassle.
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm">
            <div className="h-12 w-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
              <Sparkles className="h-6 w-6 text-blue-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              AI-Powered Refinement
            </h3>
            <p className="text-gray-600">
              Use Google Gemini AI to refine your CV content for specific job roles and make it stand out.
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm">
            <div className="h-12 w-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
              <Download className="h-6 w-6 text-blue-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Multiple Export Formats
            </h3>
            <p className="text-gray-600">
              Download your CV as PDF or Word document. Compatible with all major ATS systems.
            </p>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="container mx-auto px-4 py-8 mt-20 border-t">
        <div className="text-center text-gray-600">
          <p>&copy; 2026 CV Builder. Built with Next.js, Firebase, and Google Gemini AI.</p>
        </div>
      </footer>
    </div>
  );
}
