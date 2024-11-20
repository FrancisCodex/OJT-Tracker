import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const Announcement = () => {
  return (
    <div className="absolute bottom-0 flex items-center justify-center w-full p-4 text-center">
      <Card className="bg-accent w-[350px] text-black">
        <CardHeader>
          <CardTitle>Announcement</CardTitle>
        </CardHeader>
        <CardContent>
          <p className='text-wrap'>
            Currently, signup is disabled in Supabase. Please use the following credentials to log in and test the website:
          </p>
          <div className="mt-4">
            <p>
              <strong>Trainee Account:</strong>
            </p>
            <p>
              <strong>Email:</strong> trainee@example.com
            </p>
            <p>
              <strong>Password:</strong> TraineePassword123
            </p>
          </div>
          <div className="mt-4">
            <p>
              <strong>Coordinator Account:</strong>
            </p>
            <p>
              <strong>Email:</strong> coordinator@example.com
            </p>
            <p>
              <strong>Password:</strong> CoordinatorPassword123
            </p>
          </div>
          <div className="mt-4">
            <p>
              <strong>Supervisor Account:</strong>
            </p>
            <p>
              <strong>Email:</strong> supervisor@example.com
            </p>
            <p>
              <strong>Password:</strong> SupervisorPassword123
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Announcement;