import React, { useEffect, useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useParams, Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Building2, Mail, MapPin, Phone, Eye, Download} from 'lucide-react';
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
import agencies from '@/constants/agenciesData';

const AgencyProfile = () => {
  const { company_id } = useParams();
  const [company, setCompany] = useState(null);
  const [companyTrainees, setCompanyTrainees] = useState([]);

  useEffect(() => {
    // Fetch the company data based on the company_id
    const companyData = agencies.find(a => a.id == company_id);
    setCompany(companyData);

    // Fetch the trainee data that is assigned to the company
    const traineeData = trainees.filter(t => t.company_id == company_id);
    setCompanyTrainees(traineeData);
  }, [company_id]);

  if (!company) {
    return <div>Loading...</div>;
  }

  return (
    <div className="w-full pt-10 lg:pt-0 px-2 space-y-6 pb-10">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink as={Link} to="/dashboard/coordinator">
              All Trainees
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink as={Link} to={`/dashboard/coordinator/company/${company_id}`}>
              Company-{company_id}
            </BreadcrumbLink>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList className="bg-background border-b rounded-none w-fit justify-start h-auto p-0 space-x-3">
          <TabsTrigger value="overview" className="rounded-none data-[state=active]:border-b-2 data-[state=active]:border-primary">Overview</TabsTrigger>
          <TabsTrigger value="timeoff" className="rounded-none data-[state=active]:border-b-2 data-[state=active]:border-primary">Time Off</TabsTrigger>
          <TabsTrigger value="files" className="rounded-none data-[state=active]:border-b-2 data-[state=active]:border-primary">Files</TabsTrigger>
          <TabsTrigger value="onboarding" className="rounded-none data-[state=active]:border-b-2 data-[state=active]:border-primary">Onboarding</TabsTrigger>
        </TabsList>
        <TabsContent value="overview" className="space-y-6">
          <div className="grid lg:grid-cols-[300px,1fr] gap-6">
            <div className="text-start px-3 md:grid md:grid-cols-3 md:gap-y-6 md:gap-x-4 lg:block md:space-y-0 lg:space-y-6 w-fit">
              <div className="row-span-2 flex items-start gap-2">
                <div className='w-fit'>
                  <h1 className="text-md lg:text-lg font-semibold">{company.company_name}</h1>
                  <p className="text-sm text-muted-foreground">Tech Company</p>
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
                    <span>{company.representative_email}</span>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h2 className="text-lg font-semibold">Address</h2>
                <div className="space-y-3 text-sm">
                  <div className="flex items-center gap-2">
                    <Building2 className="w-4 h-4" />
                    <span>{company.company_address}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4" />
                    <span>San Francisco CA, 94102</span>
                  </div>
                </div>
              </div>

              <div className="space-y-4 md:col-span-2">
                <h2 className="text-lg font-semibold">Representative Detail</h2>
                <div className="space-y-3 text-sm">
                  <div>
                    <span className="text-muted-foreground">Representative:</span>
                    <span className="ml-2">{company.representative_name}</span>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Representative Email:</span>
                    <span className="ml-2">{company.representative_email}</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="space-y-6">
              <h2 className="text-md font-semibold">Trainees Working in this Company</h2>
              <Card>
                <CardContent className="p-0">
                  <div className="rounded-lg border max-w-[100vw] overflow-x-auto">
                    <Table className="min-w-[500px] bg-card">
                      <TableHeader>
                        <TableRow>
                          <TableHead>Student Name</TableHead>
                          <TableHead>OJT Completed</TableHead>
                          <TableHead>Date Started</TableHead>
                          <TableHead>Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {companyTrainees.map((trainee, index) => (
                          <TableRow key={index}>
                            <TableCell>{trainee.name}</TableCell>
                            <TableCell>
                              <Badge variant={trainee.completed ? "default" : "destructive"}>
                                {trainee.completed ? 'Yes' : 'No'}
                              </Badge>
                            </TableCell>
                            <TableCell>{trainee.date_started_ojt}</TableCell>
                            <TableCell>
                              <div className="flex space-x-2">
                                <TooltipProvider>
                                  <Tooltip>
                                    <TooltipTrigger asChild>
                                      <Button variant="outline" size="icon">
                                        <a href={'/dashboard/coordinator/view-trainee/'+trainee.id}>
                                        <Eye className="h-4 w-4" />
                                        </a>
                                      </Button>
                                    </TooltipTrigger>
                                    <TooltipContent>View</TooltipContent>
                                  </Tooltip>
                                </TooltipProvider>
                              </div>
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

export default AgencyProfile;