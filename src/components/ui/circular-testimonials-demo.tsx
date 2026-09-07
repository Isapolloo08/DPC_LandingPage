import React from "react";
import { CircularTestimonials } from "@/components/ui/circular-testimonials";

const DEMO_TESTIMONIALS = [
  {
    name: "Martina Edelweist",
    designation: "Satisfied Customer",
    quote: "Shining Yam is a hidden gem! The impeccable service and overall attention to detail created a memorable experience. I highly recommend it!",
    src: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=800&auto=format&fit=crop",
    tag: "Experience",
  },
  {
    name: "Pastor Mark Arvin Lopez",
    designation: "Youth Pastor, DPC",
    quote: "Watching our students grow in deep love for Scripture and live unashamedly for Jesus is our greatest joy and prayer.",
    src: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=800&auto=format&fit=crop",
    tag: "Testimony",
  },
  {
    name: "Sister Hannah De Vera",
    designation: "Covenant Kids Director",
    quote: "Planting God's gospel truth in children's hearts builds a foundation that withstands all cultural storms.",
    src: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=800&auto=format&fit=crop",
    tag: "Ministry Impact",
  },
];

export default function CircularTestimonialsDemo() {
  return (
    <div className="w-full max-w-4xl mx-auto p-6">
      <CircularTestimonials testimonials={DEMO_TESTIMONIALS} autoplay={true} />
    </div>
  );
}
