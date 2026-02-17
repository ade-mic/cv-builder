'use client';

import { Certification } from '@/types/cv';
import { Plus, Trash2, Award } from 'lucide-react';
import { nanoid } from 'nanoid';

interface CertificationsFormProps {
  data: Certification[];
  onChange: (data: Certification[]) => void;
}

export default function CertificationsForm({ data, onChange }: CertificationsFormProps) {
  const addCertification = () => {
    const newCert: Certification = {
      id: nanoid(),
      name: '',
      issuer: '',
      date: '',
      expiryDate: '',
      credentialId: '',
      url: '',
    };
    onChange([...data, newCert]);
  };

  const updateCertification = (id: string, field: keyof Certification, value: any) => {
    onChange(
      data.map((cert) => (cert.id === id ? { ...cert, [field]: value } : cert))
    );
  };

  const removeCertification = (id: string) => {
    onChange(data.filter((cert) => cert.id !== id));
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border p-6">
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center gap-2">
          <Award className="h-5 w-5 text-purple-600" />
          <h2 className="text-xl font-bold text-gray-900">Certifications</h2>
        </div>
        <button
          onClick={addCertification}
          className="flex items-center gap-2 px-3 py-1.5 text-sm bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition"
        >
          <Plus className="h-4 w-4" />
          Add Certification
        </button>
      </div>

      <div className="space-y-6">
        {data.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <p>No certifications added yet.</p>
            <button
              onClick={addCertification}
              className="mt-2 text-purple-600 hover:text-purple-700"
            >
              Add your first certification
            </button>
          </div>
        ) : (
          data.map((cert, index) => (
            <div key={cert.id} className="border-l-4 border-purple-600 pl-4 space-y-3">
              <div className="flex justify-between items-start">
                <span className="text-sm font-medium text-gray-500">
                  Certification #{index + 1}
                </span>
                <button
                  onClick={() => removeCertification(cert.id)}
                  className="text-red-600 hover:text-red-700"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>

              <div className="grid md:grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Certification Name *
                  </label>
                  <input
                    type="text"
                    value={cert.name}
                    onChange={(e) => updateCertification(cert.id, 'name', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm text-gray-900 placeholder:text-gray-400"
                    placeholder="AWS Certified Solutions Architect"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Issuing Organization *
                  </label>
                  <input
                    type="text"
                    value={cert.issuer}
                    onChange={(e) => updateCertification(cert.id, 'issuer', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm text-gray-900 placeholder:text-gray-400"
                    placeholder="Amazon Web Services"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Date Obtained *
                  </label>
                  <input
                    type="month"
                    value={cert.date}
                    onChange={(e) => updateCertification(cert.id, 'date', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm text-gray-900"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Expiry Date (Optional)
                  </label>
                  <input
                    type="month"
                    value={cert.expiryDate || ''}
                    onChange={(e) => updateCertification(cert.id, 'expiryDate', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm text-gray-900"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Credential ID (Optional)
                  </label>
                  <input
                    type="text"
                    value={cert.credentialId || ''}
                    onChange={(e) => updateCertification(cert.id, 'credentialId', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm text-gray-900 placeholder:text-gray-400"
                    placeholder="ABC123XYZ"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Credential URL (Optional)
                  </label>
                  <input
                    type="url"
                    value={cert.url || ''}
                    onChange={(e) => updateCertification(cert.id, 'url', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm text-gray-900 placeholder:text-gray-400"
                    placeholder="https://verify.example.com/cert"
                  />
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
