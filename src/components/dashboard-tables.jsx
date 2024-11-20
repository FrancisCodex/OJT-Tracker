import React, { useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ClipboardEdit, FileText, Eye } from 'lucide-react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import agencies from '@/constants/agenciesData';
import trainees from '@/constants/traineeData';

const DashboardTables = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const traineesPerPage = 5;

  // Calculate the current trainees to display
  const indexOfLastTrainee = currentPage * traineesPerPage;
  const indexOfFirstTrainee = indexOfLastTrainee - traineesPerPage;
  const currentTrainees = trainees.slice(indexOfFirstTrainee, indexOfLastTrainee);

  // Calculate the total number of pages
  const totalPages = Math.ceil(trainees.length / traineesPerPage);

  // Handle pagination
  const handlePreviousPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  const handleNextPage = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
  };

  return (
    <div className="w-full box-border">
      <Tabs defaultValue="all" className="w-full">
        <TabsList>
          <TabsTrigger value="all">All trainee&apos;s</TabsTrigger>
          <TabsTrigger value="agencies">List of Agencies</TabsTrigger>
        </TabsList>
        <TabsContent value="all" className="mt-4">
          <div className='flex justify-between pb-2'>
            <h1 className=''>List of Trainee's</h1>
            <a href="/dashboard/coordinator/all-trainees" className='text-end text-primary'>view more</a>
          </div>
          <div className="rounded-lg border max-w-[100vw] overflow-x-auto">
            <Table className="min-w-[800px] bg-card">
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Student ID</TableHead>
                  <TableHead className="hidden md:table-cell">Course</TableHead>
                  <TableHead className="hidden md:table-cell">Year</TableHead>
                  <TableHead>Deployed</TableHead>
                  <TableHead>Evaluated</TableHead>
                  <TableHead>Completed</TableHead>
                  <TableHead className="w-fit">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {currentTrainees.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell className="font-medium">{item.name}</TableCell>
                    <TableCell>{item.email}</TableCell>
                    <TableCell>{item.studentId}</TableCell>
                    <TableCell className="hidden md:table-cell">{item.course}</TableCell>
                    <TableCell className="hidden md:table-cell">{item.year}</TableCell>
                    <TableCell>
                      <Badge variant={item.deployed ? "default" : "destructive"}>
                        {item.deployed ? "YES" : "NO"}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge variant={item.evaluated ? "default" : "secondary"}>
                        {item.evaluated ? "YES" : "NO"}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge variant={item.completed ? "default" : "destructive"}>
                        {item.completed ? "YES" : "NO"}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-1">
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button variant="outline" size="icon">
                              <a href={'/dashboard/coordinator/view-trainee/'+item.id}>
                                <Eye className="h-4 w-4 text-blue-500" />
                              </a>
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>View User Profile</p>
                            </TooltipContent>
                          </Tooltip>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button variant="outline" size="icon">
                              <a href={'/dashboard/coordinator/evaluate/'+item.id}>
                                <ClipboardEdit className="h-4 w-4 text-green-500" />
                              </a>
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>Evaluate</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <div className="flex items-center justify-end space-x-2 py-4 px-4 bg-card">
              <Button variant="outline" size="sm" onClick={handlePreviousPage} disabled={currentPage === 1}>
                Previous
              </Button>
              <Button variant="outline" size="sm" onClick={handleNextPage} disabled={currentPage === totalPages}>
                Next
              </Button>
            </div>
          </div>
        </TabsContent>
        <TabsContent value="agencies" className="mt-4">
          <div className='flex justify-between pb-2'>
            <h1 className=''>List of Agencies</h1>
            <a href="/dashboard/agencies" className='text-end text-primary'>view more</a>
          </div>
          <div className="rounded-lg border max-w-[100vw] overflow-x-auto">
            <Table className="min-w-[800px] bg-card">
              <TableHeader>
                <TableRow>
                  <TableHead>Company Name</TableHead>
                  <TableHead>Representative Name</TableHead>
                  <TableHead>Representative Email</TableHead>
                  <TableHead>Number of Trainees</TableHead>
                  <TableHead className='w-fit'>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {agencies.map((agency) => (
                  <TableRow key={agency.id}>
                    <TableCell className="font-medium">{agency.company_name}</TableCell>
                    <TableCell>{agency.representative_name}</TableCell>
                    <TableCell>{agency.representative_email}</TableCell>
                    <TableCell>{agency.num_trainees}</TableCell>
                    <TableCell>
                      <div className="flex gap-1">
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button variant="outline" size="icon">
                              <a href={'/dashboard/coordinator/view-agency/'+agencies.id}>
                                <Eye className="h-4 w-4 text-blue-500" />
                              </a>
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>View Company Details</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default DashboardTables;