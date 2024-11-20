import React, { useEffect, useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useParams, Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Building2, Mail, MapPin, Phone, Eye, Download, GraduationCap } from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { Badge } from "@/components/ui/badge";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";  
import trainees from '@/constants/traineeData';
import traineeSubmissions from '@/constants/traineeSubmissions';
import agencies from '@/constants/agenciesData';

const TraineeProfile = () => {
  const { trainee_id } = useParams();
  const [trainee, setTrainee] = useState(null);
  const [submissions, setSubmissions] = useState([]);
  const [company, setCompany] = useState(null);

  useEffect(() => {
    // Fetch the trainee data based on the trainee_id
    const traineeData = trainees.find(t => t.id == trainee_id);
    setTrainee(traineeData);

    // Fetch the trainee submissions based on the trainee_id
    const traineeSubmissionData = traineeSubmissions.find(t => t.id == trainee_id);
    setSubmissions(traineeSubmissionData ? traineeSubmissionData.submissions : []);

    // Fetch the company data based on the company_id
    if (traineeData) {
      const companyData = agencies.find(a => a.id == traineeData.company_id);
      setCompany(companyData);
    }
  }, [trainee_id]);

  if (!trainee) {
    return <div>Loading...</div>;
  }

  return (
    <div className="w-full pt-10 lg:pt-0 px-2 space-y-6 pb-10">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink as={Link} to="/dashboard/coordinator/all-trainees">
              All Trainees
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink as={Link} to={`/dashboard/coordinator/trainee/${trainee_id}`}>
              Trainee-{trainee_id}
            </BreadcrumbLink>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList className="bg-background border-b rounded-none w-full justify-start h-auto p-0 space-x-3">
          <TabsTrigger value="overview" className="rounded-none data-[state=active]:border-b-2 data-[state=active]:border-primary">Overview</TabsTrigger>
          <TabsTrigger value="timeoff" className="rounded-none data-[state=active]:border-b-2 data-[state=active]:border-primary">Time Off</TabsTrigger>
          <TabsTrigger value="files" className="rounded-none data-[state=active]:border-b-2 data-[state=active]:border-primary">Files</TabsTrigger>
          <TabsTrigger value="onboarding" className="rounded-none data-[state=active]:border-b-2 data-[state=active]:border-primary">Onboarding</TabsTrigger>
        </TabsList>
        <TabsContent value="overview" className="space-y-6">
            {/* Add Resizeable Panels here */}
          <div className="grid lg:grid-cols-[300px,1fr] gap-6">
            <div className="text-start px-3 md:grid md:grid-cols-3 md:gap-y-6 md:gap-x-4 lg:block md:space-y-0 lg:space-y-6 w-fit">
              <div className="row-span-2 flex items-start gap-2">
                <Avatar className="w-16 h-16">
                  <AvatarImage src={trainee.avatar} />
                  <AvatarFallback>{trainee.name[0]}</AvatarFallback>
                </Avatar>
                <div className='w-fit'>
                  <h1 className="text-md lg:text-lg font-semibold">{trainee.name}</h1>
                  <p className="text-sm text-muted-foreground">#{trainee.studentId}</p>
                </div>
              </div>

              <div className="space-y-4">
                <h2 className="text-lg font-semibold">About</h2>
                <div className="space-y-3 text-sm">
                  <div className="flex items-center gap-2">
                    <Phone className="w-4 h-4" />
                    <span>(629) 555-0123</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Mail className="w-4 h-4" />
                    <span>{trainee.email}</span>
                  </div>
                    <div className="flex items-center gap-2">
                    <GraduationCap className="w-4 h-4" />
                    <span>{trainee.course} - {trainee.year}</span>
                    </div>
                </div>
              </div>

              <div className="space-y-4">
                <h2 className="text-lg font-semibold">Address</h2>
                <div className="space-y-3 text-sm">
                  <div className="flex items-center gap-2">
                    <Building2 className="w-4 h-4" />
                    <span>390 Market Street, Suite 200</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4" />
                    <span>San Francisco CA, 94102</span>
                  </div>
                </div>
              </div>

              <div className="space-y-4 md:col-span-2">
                <h2 className="text-lg font-semibold">OJT details</h2>
                <div className="space-y-3 text-sm">
                  <div>
                    <span className="text-muted-foreground">Company Name:</span>
                    <span className="ml-2">{company ? company.company_name : 'N/A'}</span>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Representative:</span>
                    <span className="ml-2">{company ? company.representative_name : 'N/A'}</span>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Date Started:</span>
                    <span className="ml-2">{trainee.date_started_ojt}</span>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Title:</span>
                    <span className="ml-2">Intern</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="space-y-6">
              <h2 className="text-md font-semibold">Documents Submitted</h2>
              <Card>
                <CardContent className="p-0">
                  <div className="rounded-lg border max-w-[100vw] overflow-x-auto">
                    <Table className="min-w-[500px] bg-card">
                      <TableHeader>
                        <TableRow>
                          <TableHead>Document</TableHead>
                          <TableHead>Submitted</TableHead>
                          <TableHead>File Name</TableHead>
                          <TableHead>Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {submissions.map((submission, index) => (
                          <TableRow key={index}>
                            <TableCell>{submission.document}</TableCell>
                            <TableCell>
                              <Badge variant={submission.submitted ? "default" : "destructive"}>
                                {submission.submitted ? 'Yes' : 'No'}
                              </Badge>
                            </TableCell>
                            <TableCell>
                              {submission.submitted ? (
                                <Badge variant="default">{submission.file_name || 'N/A'}</Badge>
                              ) : (
                                <Badge variant="secondary" className="font-mono w-fit hidden md:block">
                                -
                                </Badge>
                              )}
                            </TableCell>
                            <TableCell>
                              {submission.submitted ? (
                                <div className="flex space-x-2">
                                  <TooltipProvider>
                                    <Tooltip>
                                      <TooltipTrigger asChild>
                                        <Button variant="outline" size="icon">
                                          <Eye className="h-4 w-4" />
                                        </Button>
                                      </TooltipTrigger>
                                      <TooltipContent>View</TooltipContent>
                                    </Tooltip>
                                  </TooltipProvider>
                                  <TooltipProvider>
                                    <Tooltip>
                                      <TooltipTrigger asChild>
                                        <Button variant="outline" size="icon">
                                          <Download className="h-4 w-4" />
                                        </Button>
                                      </TooltipTrigger>
                                      <TooltipContent>Download</TooltipContent>
                                    </Tooltip>
                                  </TooltipProvider>
                                </div>
                              ) : (
                                <Badge variant="secondary" className="font-mono w-fit hidden md:block">
                                -
                                </Badge>
                              )}
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default TraineeProfile;