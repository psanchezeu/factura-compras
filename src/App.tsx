import React from 'react';
import axios from 'axios';
import { AlertCircle, FileText, Loader2 } from 'lucide-react';
import { DropZone } from './components/DropZone';
import { ImagePreview } from './components/ImagePreview';
import { MarkdownResult } from './components/MarkdownResult';

function App() {
  const [selectedFile, setSelectedFile] = React.useState<File | null>(null);
  const [isProcessing, setIsProcessing] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const [result, setResult] = React.useState<string | null>(null);

  const handleFileSelect = (file: File) => {
    if (file.size > 10 * 1024 * 1024) {
      setError('File size must be less than 10MB');
      return;
    }
    setSelectedFile(file);
    setError(null);
    setResult(null);
  };

  const handleSubmit = async () => {
    if (!selectedFile) return;

    setIsProcessing(true);
    setError(null);
    setResult(null);

    const formData = new FormData();
    formData.append('image', selectedFile);

    try {
      const response = await axios.post(
        'https://app.aihumancopilot.com/process-image',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );
      setResult(response.data);
    } catch (err) {
      setError(
        err instanceof Error 
          ? err.message 
          : 'An error occurred while processing the image'
      );
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-8">
          <FileText className="mx-auto h-12 w-12 text-blue-600" />
          <h1 className="mt-3 text-3xl font-bold text-gray-900">
            Invoice Text Extractor
          </h1>
          <p className="mt-2 text-gray-600">
            Upload your invoice image and we'll convert it to formatted text
          </p>
        </div>

        <div className="space-y-6">
          {!selectedFile && <DropZone onFileSelect={handleFileSelect} />}
          
          {selectedFile && (
            <div className="space-y-4">
              <ImagePreview 
                file={selectedFile} 
                onRemove={() => setSelectedFile(null)} 
              />
              
              <button
                onClick={handleSubmit}
                disabled={isProcessing}
                className={`w-full py-3 px-4 rounded-md text-white font-medium
                  ${isProcessing 
                    ? 'bg-blue-400 cursor-not-allowed' 
                    : 'bg-blue-600 hover:bg-blue-700'
                  } transition-colors duration-200`}
              >
                {isProcessing ? (
                  <span className="flex items-center justify-center">
                    <Loader2 className="animate-spin -ml-1 mr-2 h-5 w-5" />
                    Processing Invoice...
                  </span>
                ) : (
                  'Process Invoice'
                )}
              </button>
            </div>
          )}

          {error && (
            <div className="rounded-md bg-red-50 p-4">
              <div className="flex">
                <AlertCircle className="h-5 w-5 text-red-400" />
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-red-800">
                    Error processing invoice
                  </h3>
                  <p className="mt-2 text-sm text-red-700">{error}</p>
                </div>
              </div>
            </div>
          )}

          {result && <MarkdownResult content={result} />}
        </div>
      </div>
    </div>
  );
}

export default App;