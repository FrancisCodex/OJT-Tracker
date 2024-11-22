import * as React from "react";
import {
  Building2,
  CalendarClock,
  SmilePlus,
  Clock,
  Eye,
  Download,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import trainees from "@/constants/traineeData";
import agencies from "@/constants/agenciesData";
import traineeSubmissions from '@/constants/traineeSubmissions';
import { Calendar } from "@/components/ui/calendar";
import { useNavigate } from "react-router-dom";

const TraineeDashboard = () => {
  const myTraineeID = 1;
  const navigate = useNavigate();

  // Fetch the trainee data based on the trainee_id
  const trainee = trainees.find(t => t.id === myTraineeID);

  // Fetch the company data based on the company_id
  const company = agencies.find(a => a.id === trainee.company_id);

  // Fetch the submissions data based on the trainee_id
  const submissions = traineeSubmissions.find(s => s.id === myTraineeID)?.submissions || [];

  // Calculate the OJT completion rate
  const calculateOJTCompletionRate = () => {
    const today = new Date();
    const startDate = new Date(trainee.date_started_ojt);
    const totalDays = Math.floor((today - startDate) / (1000 * 60 * 60 * 24));
    const totalWeeks = Math.floor(totalDays / 7);
    const totalWorkingDays = totalWeeks * 5 + (totalDays % 7);
    const totalWorkingHours = totalWorkingDays * 8;
    const completionRate = (totalWorkingHours / trainee.required_hours) * 100;
    return {
      completionRate: Math.min(completionRate, 100).toFixed(2), // Cap at 100%
      totalWorkingHours: Math.min(totalWorkingHours, trainee.required_hours), // Cap at required hours
    };
  };

  const { completionRate, totalWorkingHours } = calculateOJTCompletionRate();

  // Calculate expected date to finish OJT
  const calculateExpectedFinishDate = () => {
    const startDate = new Date(trainee.date_started_ojt);
    const requiredDays = Math.ceil(trainee.required_hours / 8); // Assuming 8 hours per day
    const totalWeeks = Math.floor(requiredDays / 5);
    const remainingDays = requiredDays % 5;
    const expectedFinishDate = new Date(startDate);
    expectedFinishDate.setDate(startDate.getDate() + (totalWeeks * 7) + remainingDays);
    return expectedFinishDate;
  };

  const expectedFinishDate = calculateExpectedFinishDate();

  return (
    <div className="w-full flex-col box-border">
      <div className="flex-1 space-y-6 p-6">
        <div className="flex flex-col gap-4 md:flex-row-1 md:items-start md:justify-between">
          <div>
            <h1 className="text-2xl font-bold">Trainee Dashboard</h1>
            <p className="text-sm text-muted-foreground">
              Here’s what happening with your Job Today!
            </p>
          </div>
        </div>
        {/* cards */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Currently Working at</CardTitle>
              <Building2 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{company.company_name}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Date Started</CardTitle>
              <CalendarClock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{trainee.date_started_ojt}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">OJT Progress</CardTitle>
              <SmilePlus className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{completionRate}%</div>
              <Progress value={completionRate} />
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Hours Completed</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalWorkingHours} hours</div>
              <div className="flex justify-between">
              <div className="text-sm text-muted-foreground">
                  Expected Date:
              </div>
              <div className="text-sm font-semibold">{expectedFinishDate.toDateString()}</div>
              </div>   
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1">
          {/* Show the documents the users has to submit and submitted */}
          <Card>
            <CardHeader className="items-center">
              <CardTitle>Documents need to submit</CardTitle>
            </CardHeader>
            <CardContent>
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
                                      <Eye className="h-4 w-4 text-blue-500" />
                                    </Button>
                                  </TooltipTrigger>
                                  <TooltipContent>View</TooltipContent>
                                </Tooltip>
                              </TooltipProvider>
                              <TooltipProvider>
                                <Tooltip>
                                  <TooltipTrigger asChild>
                                    <Button variant="outline" size="icon">
                                      <Download className="h-4 w-4 text-primary" />
                                    </Button>
                                  </TooltipTrigger>
                                  <TooltipContent>Download</TooltipContent>
                                </Tooltip>
                              </TooltipProvider>
                            </div>
                          ) : (
                            <Button
                              size="sm"
                              onClick={() => navigate("/dashboard/trainee/documents")}
                            >
                              Submit
                            </Button>
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
    </div>
  );
};

export default TraineeDashboard;