import React, { useState } from 'react';
import { Eye, Download, Upload, Trash } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { useDocumentUpload } from '@/hooks/trainee/useDocumentUpload';

const initialDocuments = [
  { id: 1, name: 'Student Internship Contract', fileName: null, status: 'Missing', fileUrl: null },
  { id: 2, name: 'Internship Work Plan', fileName: null, status: 'Missing', fileUrl: null },
  { id: 3, name: 'Parents Consent', fileName: null, status: 'Missing', fileUrl: null },
  { id: 4, name: 'Medical Certificate', fileName: null, status: 'Missing', fileUrl: null },
  { id: 5, name: 'Student Pledge', fileName: null, status: 'Missing', fileUrl: null },
  { id: 6, name: 'Departmental Acceptance', fileName: null, status: 'Missing', fileUrl: null },
  { id: 7, name: 'Insurance', fileName: null, status: 'Missing', fileUrl: null },
  { id: 8, name: 'Student History Statement', fileName: null, status: 'Missing', fileUrl: null },
];

const TraineeDocsTab = ({ lastName }) => {
  const [documents, setDocuments] = useState(initialDocuments);
  const { uploadDocument, loading, error } = useDocumentUpload();

  const handleFileUpload = (documentId) => async (event) => {
    const file = event.target.files?.[0];
    if (file) {
      const document = documents.find(doc => doc.id === documentId);
      const newFileName = `${document.name.replace(/ /g, '_')}_${lastName}${file.name.substring(file.name.lastIndexOf('.'))}`;
      const renamedFile = new File([file], newFileName, { type: file.type });

      const fileUrl = await uploadDocument(documentId, renamedFile, newFileName);

      if (fileUrl) {
        setDocuments((prevDocuments) =>
          prevDocuments.map((doc) =>
            doc.id === documentId
              ? { ...doc, fileName: renamedFile.name, status: 'Submitted', fileUrl }
              : doc
          )
        );
      }
    }
  };

  const handleRemoveFile = (documentId) => () => {
    setDocuments((prevDocuments) =>
      prevDocuments.map((doc) =>
        doc.id === documentId
          ? { ...doc, fileName: null, status: 'Missing', fileUrl: null }
          : doc
      )
    );
  };

  const handleViewFile = (fileUrl) => {
    window.open(fileUrl, '_blank');
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Handle form submission to upload files to Supabase storage
    console.log('Form submitted', documents);
  };

  return (
    <Tabs defaultValue="documents" className="flex flex-col items-center">
      <TabsList className="grid w-full max-w-[400px] grid-cols-2">
        <TabsTrigger value="documents" className="font-medium">
          Documents
        </TabsTrigger>
        <TabsTrigger value="weekly" className="font-medium">
          Weekly Reports
        </TabsTrigger>
      </TabsList>
      <TabsContent value="documents" className="mt-4 w-full">
        <Card className="w-full max-w-4xl mx-auto">
          <CardHeader className="space-y-1">
            <div>
              <h2 className="text-xl font-bold">Required Documents</h2>
              <p className="text-sm text-muted-foreground">
                List of all the Documents required to submit for OJT
              </p>
            </div>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit}>
              <div className="space-y-4">
                <div className="space-y-4">
                  {documents.map((doc) => (
                    <div
                      key={doc.id}
                      className="grid grid-cols-3 justify-items-stretch border-b pb-4"
                    >
                      <div className="flex items-center text-wrap">
                        <span className="text-sm font-medium">
                          {doc.id}. {doc.name}
                        </span>
                      </div>
                      <div className="flex items-center justify-center">
                        <Badge
                          variant={doc.status === 'Submitted' ? 'default' : 'secondary'}
                          className="capitalize"
                        >
                          {doc.status}
                        </Badge>
                      </div>
                      <div className="flex items-center space-x-2 justify-end">
                        {doc.status === 'Submitted' ? (
                          <>
                            <Badge variant="secondary" className="font-mono max-w-[150px] truncate hidden md:block">
                              {doc.fileName}
                            </Badge>
                            <TooltipProvider>
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <Button
                                    variant="outline"
                                    size="icon"
                                    className="h-8 w-8"
                                    onClick={() => handleViewFile(doc.fileUrl)}
                                  >
                                    <Eye className="h-4 w-4" />
                                  </Button>
                                </TooltipTrigger>
                                <TooltipContent>
                                  <p>View file</p>
                                </TooltipContent>
                              </Tooltip>
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <Button
                                    variant="outline"
                                    size="icon"
                                    className="h-8 w-8"
                                  >
                                    <Download className="h-4 w-4" />
                                  </Button>
                                </TooltipTrigger>
                                <TooltipContent>
                                  <p>Download file</p>
                                </TooltipContent>
                              </Tooltip>
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <Button
                                    variant="outline"
                                    size="icon"
                                    className="h-8 w-8"
                                    onClick={handleRemoveFile(doc.id)}
                                  >
                                    <Trash className="h-4 w-4" />
                                  </Button>
                                </TooltipTrigger>
                                <TooltipContent>
                                  <p>Remove file</p>
                                </TooltipContent>
                              </Tooltip>
                            </TooltipProvider>
                          </>
                        ) : (
                          <div className="flex items-center space-x-2 w-fit">
                            <Badge variant="secondary" className="font-mono hidden md:block">
                              -
                            </Badge>
                            <TooltipProvider>
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <Button
                                    variant="default"
                                    className="h-8"
                                    onClick={() => document.getElementById(`file-${doc.id}`)?.click()}
                                  >
                                    <Upload className="h-4 w-4" />
                                    <span className='hidden md:block'>Upload File</span>
                                  </Button>
                                </TooltipTrigger>
                                <TooltipContent>
                                  <p>Upload PDF file</p>
                                </TooltipContent>
                              </Tooltip>
                            </TooltipProvider>
                            <input
                              type="file"
                              id={`file-${doc.id}`}
                              className="hidden"
                              accept=".pdf"
                              onChange={handleFileUpload(doc.id)}
                            />
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
                <div className='flex justify-center items-center md:justify-end'>
                  <Button type="submit" className="mt-4" disabled={loading}>
                    {loading ? "Submitting..." : "Submit Documents"}
                  </Button>
                  {error && <p className="text-sm text-red-500">{error.message}</p>}
                </div>
              </div>
            </form>
          </CardContent>
        </Card>
      </TabsContent>
      <TabsContent value="weekly" className="mt-4">
        <h1>Weekly</h1>
      </TabsContent>
    </Tabs>
  );
};

export default TraineeDocsTab;