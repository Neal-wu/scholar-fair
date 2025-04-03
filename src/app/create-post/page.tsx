'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import FileUpload from '@/components/FileUpload';

export default function CreatePost() {
  const router = useRouter();
  const [attachments, setAttachments] = useState<any[]>([]);
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    country: '',
    university: '',
    department: '',
    position: '',
    defendant: '',
    reporter: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [tempPostId, setTempPostId] = useState(`temp-${Date.now()}`); // Temporary ID for file uploads

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleUploadComplete = (attachment: any) => {
    setAttachments(prev => [...prev, attachment]);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch('/api/posts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          attachments: attachments.map(att => att.id),
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to create post');
      }

      await response.json();
      router.push('/'); // Redirect to home page instead of post page
    } catch (error) {
      console.error('Error creating post:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-4">Share Your Experience</h1>
      <p className="text-gray-600 mb-8">Your privacy and safety are our top priorities. All information is stored securely, and you can choose to remain anonymous.</p>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700">
            Title
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            required
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="country" className="block text-sm font-medium text-gray-700">
              Country
            </label>
            <input
              type="text"
              id="country"
              name="country"
              value={formData.country}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label htmlFor="university" className="block text-sm font-medium text-gray-700">
              University
            </label>
            <input
              type="text"
              id="university"
              name="university"
              value={formData.university}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label htmlFor="department" className="block text-sm font-medium text-gray-700">
              Department
            </label>
            <input
              type="text"
              id="department"
              name="department"
              value={formData.department}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label htmlFor="position" className="block text-sm font-medium text-gray-700">
              Position
            </label>
            <input
              type="text"
              id="position"
              name="position"
              value={formData.position}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              placeholder="e.g., Student, Professor, Researcher"
              required
            />
          </div>

          <div>
            <label htmlFor="defendant" className="block text-sm font-medium text-gray-700">
              Defendant (Person/Entity Accused)
            </label>
            <input
              type="text"
              id="defendant"
              name="defendant"
              value={formData.defendant}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label htmlFor="reporter" className="block text-sm font-medium text-gray-700">
              Your Name (Optional)
            </label>
            <input
              type="text"
              id="reporter"
              name="reporter"
              value={formData.reporter}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              placeholder="Leave blank to remain anonymous"
            />
          </div>
        </div>

        <div>
          <label htmlFor="content" className="block text-sm font-medium text-gray-700">
            Your Experience
          </label>
          <textarea
            id="content"
            name="content"
            value={formData.content}
            onChange={handleChange}
            rows={8}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            placeholder="Please describe the unfair treatment you experienced..."
            required
          />
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label className="block text-sm font-medium text-gray-700">
              Supporting Documents (Optional)
            </label>
            <span className="text-xs text-gray-500">You can upload images, PDFs, or other relevant files</span>
          </div>
          <FileUpload onUploadComplete={handleUploadComplete} />
        </div>

        {attachments.length > 0 && (
          <div>
            <h3 className="text-sm font-medium text-gray-700 mb-2">Uploaded Files:</h3>
            <ul className="space-y-2">
              {attachments.map((att) => (
                <li key={att.id} className="text-sm text-gray-600">
                  {att.fileName} ({Math.round(att.fileSize / 1024)} KB)
                </li>
              ))}
            </ul>
          </div>
        )}

        <div className="flex justify-end">
          <button
            type="submit"
            disabled={isSubmitting}
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors disabled:opacity-50"
          >
            {isSubmitting ? 'Sharing...' : 'Share Experience'}
          </button>
        </div>
      </form>
    </div>
  );
} 