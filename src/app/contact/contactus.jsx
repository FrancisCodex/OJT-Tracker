import React from 'react'
import { Card, CardTitle, CardContent, CardFooter } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
  } from "@/components/ui/accordion"
import { MessageCircle, Building2, Phone } from 'lucide-react'
import { Link } from 'react-router-dom';

const ContactUs = () => {
  return (
    <div className="container mx-auto px-4 py-12">
      {/* Header Section */}
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold tracking-tight mb-4">Contact our friendly team</h1>
        <p className="text-lg text-muted-foreground">Let us know how we can help.</p>
      </div>

      {/* Contact Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
        <Card>
          <CardContent className="p-6">
            <div className="rounded-full bg-primary/10 w-10 h-10 flex items-center justify-center mb-4">
              <MessageCircle className="w-5 h-5 " />
            </div>
            <h3 className="font-semibold text-lg mb-2">Chat to sales</h3>
            <p className="text-muted-foreground mb-4">Speak to our friendly team.</p>
            <Link href="mailto:sales@untitledul.com" className=" hover:underline">
              <Button variant="outline">Chat Now</Button>
            </Link>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="rounded-full bg-primary/10 w-10 h-10 flex items-center justify-center mb-4">
              <MessageCircle className="w-5 h-5 " />
            </div>
            <h3 className="font-semibold text-lg mb-2">Chat to support</h3>
            <p className="text-muted-foreground mb-4">We&apos;re here to help.</p>
            <Link href="mailto:support@untitledul.com" className=" hover:underline">
              <Button variant="outline">Chat now</Button>
            </Link>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="rounded-full bg-primary/10 w-10 h-10 flex items-center justify-center mb-4">
              <Building2 className="w-5 h-5 " />
            </div>
            <h3 className="font-semibold text-lg mb-2">Visit us</h3>
            <p className="text-muted-foreground mb-4">Visit our office HQ.</p>
            <Link
              href="https://maps.google.com"
              target="_blank"
              className=" hover:underline"
            >
              <Button variant="outline">View on Google Maps</Button>
            </Link>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="rounded-full bg-primary/10 w-10 h-10 flex items-center justify-center mb-4">
              <Phone className="w-5 h-5 " />
            </div>
            <h3 className="font-semibold text-lg mb-2">Call us</h3>
            <p className="text-muted-foreground mb-4">Mon-Fri from 8am to 5pm.</p>
            <Link href="tel:+1(555)000-0000" className=" hover:underline">
                <Button variant="outline">Call now</Button>
            </Link>
          </CardContent>
        </Card>
      </div>

      {/* FAQ Section */}
      <div className="max-w-3xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-10">Frequently asked questions</h2>
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="trial">
            <AccordionTrigger>Is there a free trial available?</AccordionTrigger>
            <AccordionContent>
              Yes, you can try us for free for 30 days. If you want, we&apos;ll provide you with a free
              30-minute onboarding call to get you up and running. Book a call{" "}
              <Link href="#" className=" hover:underline">
                here
              </Link>
              .
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="plan">
            <AccordionTrigger>Can I change my plan later?</AccordionTrigger>
            <AccordionContent>
              Yes, you can change your plan at any time. If you upgrade, you&apos;ll be prorated the
              difference. If you downgrade, you&apos;ll receive credit for your next billing cycle.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="cancellation">
            <AccordionTrigger>What is your cancellation policy?</AccordionTrigger>
            <AccordionContent>
              You can cancel your subscription at any time. When you cancel, you&apos;ll retain access
              to your account until the end of your current billing period.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  )
}

export default ContactUs