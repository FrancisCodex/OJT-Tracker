import React from 'react';
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
import agencies from '@/constants/agenciesData'; // Update the path as needed

const DashboardTables = () => {
  const dummyData = [
    {
      id: 1,
      name: "Sarah Johnson",
      email: "sarah.j@example.com",
      studentId: "2024-0001",
      course: "BSIT",
      year: 3,
      deployed: true,
      evaluated: "pending",
      completed: false,
      avatar: "/placeholder.svg?height=32&width=32",
    },
    {
      id: 2,
      name: "Michael Chen",
      email: "m.chen@example.com",
      studentId: "2024-0002",
      course: "BSIT",
      year: 4,
      deployed: true,
      evaluated: "completed",
      completed: true,
      avatar: "/placeholder.svg?height=32&width=32",
    },
    {
      id: 3,
      name: "Emma Davis",
      email: "emma.d@example.com",
      studentId: "2024-0003",
      course: "BSIT",
      year: 3,
      deployed: false,
      evaluated: "pending",
      completed: false,
      avatar: "/placeholder.svg?height=32&width=32",
    },
  ];

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
            <a href="/dashboard/trainees" className='text-end text-primary'>view more</a>
          </div>
          <div className="rounded-lg border max-w-[100vw] overflow-x-auto">
            <Table className="min-w-[800px] bg-card">
              <TableHeader>
                <TableRow>
                  <TableHead className="w-fit">Profile</TableHead>
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
                {dummyData.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell>
                      <Avatar className="w-8 h-8">
                        <AvatarImage src={item.avatar} alt={item.name} />
                        <AvatarFallback>{item.name[0]}</AvatarFallback>
                      </Avatar>
                    </TableCell>
                    <TableCell className="font-medium">{item.name}</TableCell>
                    <TableCell className="hidden md:table-cell">{item.email}</TableCell>
                    <TableCell>{item.studentId}</TableCell>
                    <TableCell className="hidden md:table-cell">{item.course}</TableCell>
                    <TableCell className="hidden md:table-cell">{item.year}</TableCell>
                    <TableCell>
                      <Badge variant={item.deployed ? "default" : "destructive"}>
                        {item.deployed ? "YES" : "NO"}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge variant={item.evaluated === "completed" ? "default" : "secondary"}>
                        {item.evaluated.toUpperCase()}
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
                                <FileText className="h-4 w-4 text-blue-500" />
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>View User Profile</p>
                            </TooltipContent>
                          </Tooltip>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button variant="outline" size="icon">
                                <ClipboardEdit className="h-4 w-4 text-green-500" />
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
              <Button variant="outline" size="sm">
                Previous
              </Button>
              <Button variant="outline" size="sm">
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
                                <Eye className="h-4 w-4 text-blue-500" />
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