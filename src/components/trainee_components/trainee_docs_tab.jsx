import React, { useState } from 'react';
import { Eye, Download, Upload, Trash } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { useToast } from '@/hooks/use-toast';
import { Input } from '@/components/ui/input';

const initialDocuments = [
  { id: 1, name: 'Student Internship Contract - MOA', fileName: null, status: 'Missing', fileUrl: null },
  { id: 2, name: 'Internship Work Plan', fileName: null, status: 'Missing', fileUrl: null },
  { id: 3, name: 'Parents Consent', fileName: null, status: 'Missing', fileUrl: null },
  { id: 4, name: 'Medical Certificate', fileName: null, status: 'Missing', fileUrl: null },
  { id: 5, name: 'Student Pledge', fileName: null, status: 'Missing', fileUrl: null },
  { id: 6, name: 'Departmental Acceptance', fileName: null, status: 'Missing', fileUrl: null },
  { id: 7, name: 'Insurance', fileName: null, status: 'Missing', fileUrl: null },
  { id: 8, name: 'Student History Statement', fileName: null, status: 'Missing', fileUrl: null },
];

const TraineeDocsTab = () => {
  const [documents, setDocuments] = useState(initialDocuments);
  const [narrativeReport, setNarrativeReport] = useState({ fileName: null, fileUrl: null, status: 'Missing' });
  const { toast } = useToast();

  const handleFileUpload = (documentId) => (event) => {
    const file = event.target.files?.[0];
    if (file) {
      setDocuments((prevDocuments) =>
        prevDocuments.map((doc) =>
          doc.id === documentId
            ? { ...doc, fileName: file.name, status: 'Submitted', fileUrl: URL.createObjectURL(file) }
            : doc
        )
      );
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

  const handleNarrativeUpload = (event) => {
    const file = event.target.files?.[0];
    if (file) {
      setNarrativeReport({
        fileName: file.name,
        fileUrl: URL.createObjectURL(file),
        status: 'Submitted',
      });
    }
  };

  const handleRemoveNarrative = () => {
    setNarrativeReport({ fileName: null, fileUrl: null, status: 'Missing' });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('Form submitted', documents, narrativeReport);

    toast({
      title: "Documents Submitted",
      description: "Your documents have been successfully submitted.",
      duration: 3000,
    });
  };

  return (
    <Tabs defaultValue="documents" className="flex flex-col items-center">
      <TabsList className="grid w-full max-w-[400px] grid-cols-2">
        <TabsTrigger value="documents" className="font-medium">
          Documents
        </TabsTrigger>
        <TabsTrigger value="narrative" className="font-medium">
          Narrative Report
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
                      className="grid grid-cols-3 items-center justify-between space-x-3 border-b pb-4"
                    >
                      <div className="flex items-center space-x-4">
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
                            <Badge variant="secondary" className="font-mono max-w-[150px] truncate">
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
                                    onClick={(e) => {
                                      e.preventDefault();
                                      document.getElementById(`file-${doc.id}`)?.click();
                                    }}
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
                            <Input
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
                  <Button type="submit" className="mt-4">
                    Submit Documents
                  </Button>
                </div>
              </div>
            </form>
          </CardContent>
        </Card>
      </TabsContent>
      <TabsContent value="narrative" className="mt-4">
        <Card className="w-full max-w-4xl mx-auto">
          <CardHeader className="space-y-1">
            <div>
              <h2 className="text-xl font-bold">Narrative Report</h2>
              <p className="text-sm text-muted-foreground">
                Write your narrative report here
              </p>
            </div>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit}>
              <div className="space-y-4">
                <div className="space-y-4">
                  <div className="grid grid-cols-3 items-center justify-between space-x-3 border-b pb-4">
                    <div className="flex items-center space-x-4">
                      <span className="text-sm font-medium">Narrative Report</span>
                    </div>
                    <div className="flex items-center justify-center">
                      <Badge
                        variant={narrativeReport.status === 'Submitted' ? 'default' : 'secondary'}
                        className="capitalize"
                      >
                        {narrativeReport.status}
                      </Badge>
                    </div>
                    <div className="flex items-center space-x-2 justify-end">
                      {narrativeReport.fileName ? (
                        <>
                          <Badge variant="secondary" className="font-mono max-w-[150px] truncate">
                            {narrativeReport.fileName}
                          </Badge>
                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <Button
                                  variant="outline"
                                  size="icon"
                                  className="h-8 w-8"
                                  onClick={() => handleViewFile(narrativeReport.fileUrl)}
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
                                  onClick={handleRemoveNarrative}
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
                                  onClick={(e) => {
                                    e.preventDefault();
                                    document.getElementById('narrative-file')?.click();
                                  }}
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
                        </div>
                      )}
                      <Input
                        type="file"
                        id="narrative-file"
                        className="hidden"
                        accept=".pdf"
                        onChange={handleNarrativeUpload}
                      />
                    </div>
                  </div>
                </div>
                <div className='flex justify-center items-center md:justify-end'>
                  <Button type="submit" className="mt-4">
                    Submit Narrative Report
                  </Button>
                </div>
              </div>
            </form>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
};

export default TraineeDocsTab;