import React from 'react';
import { X } from 'lucide-react';

interface ImagePreviewProps {
  file: File;
  onRemove: () => void;
}

export function ImagePreview({ file, onRemove }: ImagePreviewProps) {
  const imageUrl = URL.createObjectURL(file);

  React.useEffect(() => {
    return () => URL.revokeObjectURL(imageUrl);
  }, [imageUrl]);

  return (
    <div className="relative group">
      <img
        src={imageUrl}
        alt="Invoice preview"
        className="w-full h-64 object-cover rounded-lg shadow-md"
      />
      <button
        onClick={onRemove}
        className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200"
        aria-label="Remove image"
      >
        <X size={20} />
      </button>
      <p className="mt-2 text-sm text-gray-600 text-center">{file.name}</p>
    </div>
  );
}