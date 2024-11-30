import { AnimatedTestimonials } from "@/components/ui/animated-testimonials";
import KevinRogersImg from "@/assets/images/landingpage/boy1.jpg";
import KristinaWernerImg from "@/assets/images/landingpage/girl1.jpg";
import JeremyHopkinsImg from "@/assets/images/landingpage/boy2.jpg";
import IanLandonImg from "@/assets/images/landingpage/boy3.jpg";
import IanThompsonImg from "@/assets/images/landingpage/boy4.jpg";


export function Testimonials() {
  const testimonials = [
    {
      quote:
        "The attention to detail and innovative features have completely transformed our workflow. This is exactly what we've been looking for.",
      name: "Kevin Rogers",
      designation: "Intern at TechPros",
      src: KevinRogersImg,
    },
    {
      quote:
        "Implementation was seamless and the results exceeded our expectations. The platform's flexibility is remarkable.",
      name: "Kristina Werner",
      designation: "OJT Supervisor at TechSol",
      src: KristinaWernerImg,
    },
    {
      quote:
        "This solution has significantly improved our team's productivity. The intuitive interface makes complex tasks simple.",
      name: "Jeremy Hopkins",
      designation: "Project Supervisor at CloudScale",
      src: JeremyHopkinsImg,
    },
    {
      quote:
        "Outstanding support and robust features. It's rare to find a product that delivers on all its promises.",
      name: "Ian Landon",
      designation: "Engineering Lead at DataLanPro",
      src: IanLandonImg,
    },
    {
      quote:
        "The scalability and performance have been game-changing for our organization. Highly recommend to any growing business.",
      name: "Ian Thompson",
      designation: "CTO at TechWave",
      src: IanThompsonImg,
    },
  ];
  return <AnimatedTestimonials testimonials={testimonials} />;
}
