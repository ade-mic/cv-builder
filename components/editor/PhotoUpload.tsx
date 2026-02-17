'use client';

import { useState } from 'react';
import { Upload, X, User } from 'lucide-react';

interface PhotoUploadProps {
  currentPhoto?: string;
  onPhotoChange: (photo: string | undefined) => void;
}

export default function PhotoUpload({ currentPhoto, onPhotoChange }: PhotoUploadProps) {
  const [preview, setPreview] = useState<string | undefined>(currentPhoto);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      alert('Please upload an image file');
      return;
    }

    // Validate file size (max 2MB)
    if (file.size > 2 * 1024 * 1024) {
      alert('Image size should be less than 2MB');
      return;
    }

    // Convert to base64
    const reader = new FileReader();
    reader.onloadend = () => {
      const base64String = reader.result as string;
      setPreview(base64String);
      onPhotoChange(base64String);
    };
    reader.readAsDataURL(file);
  };

  const removePhoto = () => {
    setPreview(undefined);
    onPhotoChange(undefined);
  };

  return (
    <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
      <div className="relative">
        {preview ? (
          <div className="relative w-24 h-24 rounded-full overflow-hidden border-4 border-white shadow-lg">
            <img src={preview} alt="Profile" className="w-full h-full object-cover" />
            <button
              onClick={removePhoto}
              className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition"
              title="Remove photo"
            >
              <X className="h-3 w-3" />
            </button>
          </div>
        ) : (
          <div className="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center border-4 border-white shadow-lg">
            <User className="h-12 w-12 text-gray-400" />
          </div>
        )}
      </div>

      <div className="flex-1">
        <h3 className="text-sm font-semibold text-gray-900 mb-1">Profile Photo</h3>
        <p className="text-xs text-gray-500 mb-2">
          Add a professional photo (Optional)
        </p>
        <label className="inline-flex items-center gap-2 px-3 py-1.5 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition cursor-pointer">
          <Upload className="h-4 w-4" />
          Upload Photo
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="hidden"
          />
        </label>
        <p className="text-xs text-gray-400 mt-1">Max 2MB • JPG, PNG, GIF</p>
      </div>
    </div>
  );
}
