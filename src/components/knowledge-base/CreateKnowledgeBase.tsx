import React, { useState } from 'react';
import { MessageSquare, Globe, FileText } from 'lucide-react';
import { TawktoImport } from './sources/TawktoImport';

interface SourceOption {
  id: 'tawkto' | 'scraper' | 'upload';
  title: string;
  description: string;
  icon: React.ReactNode;
}

const sourceOptions: SourceOption[] = [
  {
    id: 'tawkto',
    title: 'Import from Tawk.to',
    description: 'Import existing chat histories and FAQs',
    icon: <MessageSquare className="h-6 w-6" />
  },
  {
    id: 'scraper',
    title: 'Scrape Website',
    description: 'Extract content from your help center',
    icon: <Globe className="h-6 w-6" />
  },
  {
    id: 'upload',
    title: 'Upload Documents',
    description: 'Upload PDF, DOCX, or CSV files',
    icon: <FileText className="h-6 w-6" />
  }
];

export function CreateKnowledgeBase() {
  const [selectedSource, setSelectedSource] = useState<string | null>(null);

  const handleImportComplete = (data: any) => {
    console.log('Import completed:', data);
    // TODO: Process the imported data and create knowledge base
  };

  const handleCancel = () => {
    setSelectedSource(null);
  };

  const renderSourceForm = () => {
    switch (selectedSource) {
      case 'tawkto':
        return <TawktoImport onComplete={handleImportComplete} onCancel={handleCancel} />;
      case 'scraper':
        return <div>Scraper form coming soon...</div>;
      case 'upload':
        return <div>Upload form coming soon...</div>;
      default:
        return null;
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h2 className="text-xl font-semibold mb-4">Create Knowledge Base</h2>
      
      {!selectedSource ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {sourceOptions.map((option) => (
            <button
              key={option.id}
              onClick={() => setSelectedSource(option.id)}
              className={`p-4 rounded-lg border-2 text-left transition-colors
                border-gray-200 hover:border-blue-200`}
            >
              <div className="flex items-center space-x-3">
                <div className="p-2 rounded-lg bg-gray-100">
                  {option.icon}
                </div>
                <div>
                  <h3 className="font-medium">{option.title}</h3>
                  <p className="text-sm text-gray-600 mt-1">{option.description}</p>
                </div>
              </div>
            </button>
          ))}
        </div>
      ) : (
        <div>{renderSourceForm()}</div>
      )}
    </div>
  );
}