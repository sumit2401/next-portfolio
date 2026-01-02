"use client";

import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function Experience(sectionRefs: any) {
  const [activeTab, setActiveTab] = useState("company1");
  const ref = useRef(sectionRefs);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  const experiences = [
    {
      id: "company1",
      company: "EdgeNRoots",
      timeline: [
        {
          title: "Team Lead",
          date: "September 2024 - Present",
          responsibilities: [
            "Leading development teams and overseeing project delivery",
            "Mentoring junior developers and conducting code reviews",
            "Architecting scalable solutions and making technical decisions",
            "Collaborating with stakeholders to define project requirements",
          ],
        },
        {
          title: "Senior Full Stack Developer",
          date: "March 2024 - September 2024",
          responsibilities: [
            "Developed and maintained major features of the company's customer-facing web application using React, TypeScript, and MUI",
            "Led a team of developers as a Project Manager, overseeing front-end development and successful project delivery.",
            "Developed dashboards and CRM systems using React, TypeScript, and MUI, with full API integration for dynamic data handling.",
            "Built SEO-friendly websites using Next.js, enhancing search engine visibility and performance.",
            "Optimized performance and user experience through lazy loading, code splitting, and responsive design.",
          ],
        },
        {
          title: "Full Stack Developer",
          date: "August 2024 - March 2024",
          responsibilities: [
            "Developed full-stack applications using modern web technologies",
            "Implemented responsive designs and optimized user interfaces",
            "Integrated third-party APIs and services",
            "Collaborated with cross-functional teams to deliver scalable solutions",
          ],
        },
        {
          title: "Intern",
          date: "March 2024 - August 2024",
          responsibilities: [
            "Learned and applied modern web development technologies",
            "Assisted in developing web applications and features",
            "Participated in code reviews and team meetings",
            "Gained hands-on experience with React, Node.js, and database management",
          ],
        },
      ],
      skills: [
        "JavaScript",
        "TypeScript",
        "Socket.io",
        "HTML & SCSS",
        "Material UI",
        "React",
        "Next.js",
        "Node.js",
        "Git",
        "Team Leadership",
        "Project Management",
      ],
    },
  ];

  return (
    <motion.section
      id="experience"
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={containerVariants}
      className="min-h-screen w-full max-w-6xl mx-auto py-16 md:py-20 px-4 sm:px-6 md:px-8"
    >
      <motion.h2 variants={itemVariants} className="numbered-heading mb-10">
        Where I've Worked
      </motion.h2>

      <Tabs
        defaultValue="company1"
        value={activeTab}
        onValueChange={setActiveTab}
      >
        <TabsList className="flex flex-col sm:flex-row h-auto bg-transparent border-l-2 border-lightest-navy sm:border-l-0 sm:border-b-2 overflow-x-auto">
          {experiences.map((exp) => (
            <TabsTrigger
              key={exp.id}
              value={exp.id}
              className="font-mono text-xs sm:text-sm px-3 sm:px-5 py-2 sm:py-3 data-[state=active]:text-teal data-[state=active]:border-l-2 data-[state=active]:border-teal sm:data-[state=active]:border-l-0 sm:data-[state=active]:border-b-2 -ml-[2px] sm:-mb-[2px] text-left justify-start whitespace-nowrap"
            >
              {exp.company}
            </TabsTrigger>
          ))}
        </TabsList>
        {experiences.map((exp) => (
          <TabsContent key={exp.id} value={exp.id} className="mt-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <h3 className="text-lg sm:text-xl text-light-slate font-medium mb-4 sm:mb-6">
                <span className="text-teal">@ {exp.company}</span>
              </h3>
              
              {/* Timeline */}
              <div className="relative">
                <div className="absolute left-3 sm:left-4 top-0 bottom-0 w-0.5 bg-teal/30"></div>
                {exp.timeline.map((role, index) => (
                  <div key={index} className="relative flex items-start mb-6 sm:mb-8">
                    <div className="absolute left-2 sm:left-3 w-1.5 sm:w-2 h-1.5 sm:h-2 bg-teal rounded-full mt-2"></div>
                    <div className="ml-6 sm:ml-8">
                      <h4 className="text-base sm:text-lg text-light-slate font-medium">
                        {role.title}
                      </h4>
                      <p className="font-mono text-xs sm:text-sm text-slate mt-1 mb-3 sm:mb-4">
                        {role.date}
                      </p>
                      <ul className="space-y-2 sm:space-y-3">
                        {role.responsibilities.map((item, i) => (
                          <li key={i} className="flex text-sm sm:text-base">
                            <span className="text-teal mr-2 mt-1 flex-shrink-0">▹</span>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))}
              </div>
              
              {/* Skills tags */}
              <div className="flex flex-wrap mt-6 sm:mt-8">
                {exp.skills &&
                  exp.skills.map((skill, i) => (
                    <span
                      key={i}
                      className="bg-navy text-teal rounded-full px-2 sm:px-3 py-1 mr-2 mb-2 text-xs sm:text-sm font-mono border border-teal/30"
                    >
                      {skill}
                    </span>
                  ))}
              </div>
            </motion.div>
          </TabsContent>
        ))}
      </Tabs>
    </motion.section>
  );
}
