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
import { Separator } from '@/components/ui/separator';
import { Progress } from '@/components/ui/progress';

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

  const calculateOJTCompletionRate = (trainee) => {
    const today = new Date();
    const startDate = new Date(trainee.date_started_ojt);
    const totalDays = Math.floor((today - startDate) / (1000 * 60 * 60 * 24));
    const totalWeeks = Math.floor(totalDays / 7);
    const totalWorkingDays = totalWeeks * 5 + (totalDays % 7);
    const totalWorkingHours = totalWorkingDays * 8;
    const completionRate = (totalWorkingHours / trainee.required_hours) * 100;
    return Math.min(completionRate, 100).toFixed(2); // Cap at 100%
  };

  if (!trainee) {
    return <div>Loading...</div>;
  }

  const ojtCompletionRate = calculateOJTCompletionRate(trainee);

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
      <div>
        <div>
          <h1>Trainee Profile</h1>
        </div>
        <div className='py-5'>
          <Separator />
        </div>
      <div className="text-start px-3 flex flex-col dividex-x-0 divide-y-2 md:divide-y-0 md:divide-x-2 md:flex-row justify-between w-full">
              <div className="flex flex-col items-start gap-2 pb-2">
                <Avatar className="w-16 h-16">
                  <AvatarImage src={trainee.avatar} />
                  <AvatarFallback>{trainee.name[0]}</AvatarFallback>
                </Avatar>
                <div className='w-fit'>
                  <h1 className="text-md lg:text-lg font-semibold">{trainee.name}</h1>
                  <p className="text-sm text-muted-foreground">#{trainee.studentId}</p>
                </div>
              </div>

              <div className="space-y-4 py-2 px-2">
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
                  <div>
                    {/* Progress */}
                    <span className="text-muted-foreground">Progress:</span>
                    <span className="ml-2 font-semibold">{ojtCompletionRate}%</span>
                    <Progress value={ojtCompletionRate} />
                  </div>
                </div>
              </div>

              <div className="space-y-4 py-2 px-2">
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

              <div className="space-y-4 py-2 px-2">
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
            </div>
      </div>
            <div>
              <Separator />
            </div>
      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList className="bg-background border-b rounded-none w-fit justify-start h-auto p-0 space-x-3">
          <TabsTrigger value="overview" className="rounded-none data-[state=active]:border-b-2 data-[state=active]:border-primary">Documents</TabsTrigger>
          {/* <TabsTrigger value="timeoff" className="rounded-none data-[state=active]:border-b-2 data-[state=active]:border-primary">Performance</TabsTrigger> */}
        </TabsList>
        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-rows-1 gap-6">
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