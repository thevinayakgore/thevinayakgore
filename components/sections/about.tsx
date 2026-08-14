"use client";
import {
  Mail,
  MapPin,
  Calendar,
  Coffee,
  LucideIcon,
  Feather,
  Terminal,
} from "lucide-react";

export default function About() {
  return (
    <section id="about" className="relative p-5 md:p-10 lg:p-20 bg-foreground/5 w-full">
      <div className="flex flex-col items-start gap-5 md:gap-10 m-auto max-w-6xl w-full">
        <h2 className="sansita-swashed p-5 -ml-5 text-7xl md:text-[15rem] bg-clip-text text-transparent bg-linear-to-b from-primary/60 via-primary/20 to-transparent tracking-tighter font-light leading-none">
          About Me
        </h2>

        <div className="grid md:grid-cols-2 gap-5 md:gap-10 w-full">
          {/* Left Column - Bio */}
          <div className="space-y-5">
            <p className="text-lg text-muted-foreground leading-relaxed">
              I am Vinayak, a passionate Full Stack Developer with a love for
              building elegant solutions to complex problems. My journey in tech
              started with a curiosity for how things work, which evolved into a
              career of creating digital experiences that make a difference.
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed">
              When I am not coding, I am exploring new technologies,
              contributing to open-source projects, or sharing knowledge with
              the developer community. I believe in writing clean, maintainable
              code and continuous learning.
            </p>
            <div className="flex flex-wrap gap-5 mt-5 md:mt-10 lg:mt-20">
              <span className="inline-flex items-center gap-2 px-5 py-3 bg-primary/10 border-2 border-background ring-3 ring-primary/10 text-base font-medium text-primary shadow-lg/5 inset-shadow-sm inset-shadow-foreground/20 rounded-full">
                <Terminal className="size-5" />
                2.5+ Years of Experience
              </span>
              <span className="inline-flex items-center gap-2 px-5 py-3 bg-primary/10 border-2 border-background ring-3 ring-primary/10 text-base font-medium text-primary shadow-lg/5 inset-shadow-sm inset-shadow-foreground/20 rounded-full">
                <Coffee className="size-5" />
                Chai Powered
              </span>
            </div>
          </div>

          {/* Right Column - Info Cards */}
          <div className="grid grid-cols-1 gap-4">
            <InfoCard icon={Feather} label="Name" value="Vinayak Gore" />
            <InfoCard
              icon={Mail}
              label="Email"
              value="thevinayakgore@gmail.com"
            />
            <InfoCard icon={MapPin} label="Location" value="Remote / India" />
            <InfoCard
              icon={Calendar}
              label="Available"
              value="Freelance / Full-time"
            />
          </div>
        </div>
      </div>
      <div className="absolute top-0 left-1/2 -translate-x-1/2 z-60 bg-linear-to-l from-transparent via-primary to-transparent h-px w-full" />
      <div className="absolute -top-10 left-1/2 -translate-x-1/2 blur-2xl opacity-20 bg-linear-to-l from-transparent via-primary to-transparent rounded-full h-20 w-full" />
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 z-60 bg-linear-to-l from-transparent via-primary to-transparent h-px w-full" />
      <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 blur-2xl opacity-20 bg-linear-to-l from-transparent via-primary to-transparent rounded-full h-20 w-full" />
    </section>
  );
}

function InfoCard({
  icon: Icon,
  label,
  value,
}: {
  icon: LucideIcon;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-center gap-3 p-3 bg-foreground/5 border-2 border-background ring-3 ring-primary/10 rounded-2xl shadow-lg/10">
      <div className="p-3 bg-primary/10 border border-foreground/10 shadow-lg shadow-primary/15 rounded-lg">
        <Icon className="size-6 stroke-[1.3px]" />
      </div>
      <div>
        <p className="text-sm text-foreground/50 font-medium">{label}</p>
        <p className="font-medium">{value}</p>
      </div>
    </div>
  );
}
