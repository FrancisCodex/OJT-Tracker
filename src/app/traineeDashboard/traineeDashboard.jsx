import * as React from "react";
import {
  Building2,
  CalendarClock,
  SmilePlus,
  Clock,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import trainees from "@/constants/traineeData";
import agencies from "@/constants/agenciesData";

const TraineeDashboard = () => {
  const myTraineeID = 1;

  // Fetch the trainee data based on the trainee_id
  const trainee = trainees.find(t => t.id === myTraineeID);

  // Fetch the company data based on the company_id
  const company = agencies.find(a => a.id === trainee.company_id);

  // Calculate OJT completion rate and hours completed
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
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default TraineeDashboard;