import Navbar from '@/components/navbar'
import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Button } from "@/components/ui/button"
import { ChartLine, Users, LayoutDashboard } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

const Home = () => {
  const navigate = useNavigate();
  return (
        <div className='flex justify-center items-center'>
          <div className='w-full'>
          <section className="w-full py-24 bg-accent">
            <div className=" px-4 md:px-6">
              <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl">OnTheJob <span className='text-primary'>Tracker</span></h1>
              <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
              A Tool to  track and evaluate the performance of students in their On-the-Job Training (OJT)
              </p>
              <p className='max-w-[900px] text-red-500 text-sm dark:text-gray-400'>
              (⚠️NOTE: THIS IS STILL UNDER DEVELOPMENT SO SOME PAGES ARE STILL MISSING⚠️)
              </p>
              </div>
            </div>
          </section>
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-3 lg:gap-12">
              <div className="flex flex-col items-center space-y-4 text-center">
                <ChartLine className="h-12 w-12" />
                <h2 className="text-2xl font-bold">Track Performances</h2>
                <p className="text-gray-500 dark:text-gray-400">Track and evaluate Trainee’s weekly reports, skills, and overall performance during the OJT.</p>
              </div>
              <div className="flex flex-col items-center space-y-4 text-center">
                <Users className="h-12 w-12" />
                <h2 className="text-2xl font-bold">Trainee Management</h2>
                <p className="text-gray-500 dark:text-gray-400">View and manage OJT Trainee profiles, including essential details like course, email, and OJT status.</p>
              </div>
              <div className="flex flex-col items-center space-y-4 text-center">
                <LayoutDashboard className="h-12 w-12" />
                <h2 className="text-2xl font-bold">Dashboard</h2>
                <p className="text-gray-500 dark:text-gray-400">Visualize data on Trainee's progress, attendance, report submission compliance, and more.</p>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-accent">
          <div className="px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter text-center sm:text-4xl md:text-5xl">Testimonials</h2>
            <div className="grid gap-6 lg:grid-cols-3 lg:gap-12 mt-8">
              <Card>
                <CardContent className="flex flex-col items-center space-y-4 text-center">
                  <Avatar>
                    <AvatarImage src="/placeholder-user.jpg" alt="User" />
                    <AvatarFallback>JP</AvatarFallback>
                  </Avatar>
                  <h3 className="text-xl font-bold">John Doe</h3>
                  <p className="text-gray-500 dark:text-gray-400">
                    "OnTheJob provides the best service in the market. I'm very satisfied with their service."
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="flex flex-col items-center space-y-4 text-center">
                  <Avatar>
                    <AvatarImage src="/placeholder-user.jpg" alt="User" />
                    <AvatarFallback>JP</AvatarFallback>
                  </Avatar>
                  <h3 className="text-xl font-bold">Jane Doe</h3>
                  <p className="text-gray-500 dark:text-gray-400">
                    "I love OnTheJob They are of high quality and affordable."
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="flex flex-col items-center space-y-4 text-center">
                  <Avatar>
                    <AvatarImage src="/placeholder-user.jpg" alt="User" />
                    <AvatarFallback>JP</AvatarFallback>
                  </Avatar>
                  <h3 className="text-xl font-bold">Jim Doe</h3>
                  <p className="text-gray-500 dark:text-gray-400">
                    "The customer service from OnTheJob is top-notch. They are always available to help."
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="grid items-center justify-center gap-4 px-4 text-center md:px-6">
            <div className="space-y-3">
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">Ready to get started?</h2>
              <p className="mx-auto max-w-[600px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                Join us today and experience the best service.
              </p>
            </div>
            <div className="mx-auto w-fit max-w-sm space-y-2">
              <Button className="w-full" onClick={() => navigate('/login')}>Start Project</Button>
            </div>
          </div>
        </section>
          </div>

        </div>
  )
}

export default Home