import React from 'react';
import { TrendingUp } from "lucide-react";
import { PolarAngleAxis, PolarGrid, PolarRadiusAxis, Radar, RadarChart } from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

const RadarChartGrade = ({ attendance_punctuality_score, performance_score, general_attitude_score }) => {
  const chartData = [
    { category: "Punctuality", score: attendance_punctuality_score },
    { category: "Performance", score: performance_score },
    { category: "Attitude", score: general_attitude_score },
  ];

  const chartConfig = {
    score: {
      label: "Score",
      color: "hsl(var(--chart-1))",
    },
  };

  return (
    <Card className='h-full'>
      <CardHeader className="items-center pb-4">
        <CardTitle>Trainee's Performance</CardTitle>
        <CardDescription>
          Showing the trainee's performance in different categories
        </CardDescription>
      </CardHeader>
      <CardContent className="pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto h-full flex items-center" // Adjust the width and height here
        >
          <RadarChart data={chartData}>
            <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
            <PolarAngleAxis dataKey="category"  />
            <PolarRadiusAxis angle={30} domain={[0, 100]} />
            <PolarGrid/>
            <Radar
              dataKey="score"
              fill="hsl(var(--chart-1))"
              fillOpacity={0.6}
            />
          </RadarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};

export default RadarChartGrade;