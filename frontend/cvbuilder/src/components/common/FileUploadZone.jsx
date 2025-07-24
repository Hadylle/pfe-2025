import { useState } from 'react';
import { Card } from '../ui/Card';
import { cn } from '../../utils/className';

export function FileUploadZone({ 
  onFileChange, 
  accept = '.pdf,.doc,.docx',
  label = 'Upload your CV',
  helper = 'PDF, DOC, or DOCX files only',
  className = '' 
}) {
  const [dragOver, setDragOver] = useState(false);

  const handleDragOver = (e) => {
    e.preventDefault();
    setDragOver(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setDragOver(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      onFileChange({ target: { files } });
    }
  };

  return (
    <Card
      className={cn(
        'border-2 border-dashed transition-colors duration-200 text-center',
        dragOver ? 'border-teal-500 bg-teal-50' : 'border-gray-300',
        className
      )}
      padding="p-8"
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <div className="space-y-4">
        <div className="flex justify-center">
          <svg className="h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
          </svg>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {label}
          </label>
          <input
            type="file"
            accept={accept}
            onChange={onFileChange}
            className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-medium file:bg-teal-50 file:text-teal-700 hover:file:bg-teal-100"
          />
          <p className="text-gray-500 text-sm mt-2">{helper}</p>
        </div>
      </div>
    </Card>
  );
}
