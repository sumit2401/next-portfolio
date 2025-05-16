"use client";

import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function Experience() {
  const [activeTab, setActiveTab] = useState("company1");
  const ref = useRef(null);
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
      title: "Senior Full Stack Developer",
      date: "March 2024 - Present",
      responsibilities: [
        "Developed and maintained major features of the company's customer-facing web application using React, TypeScript, and MUI",
        "Led a team of developers as a Project Manager, overseeing front-end development and successful project delivery.",
        "Developed dashboards and CRM systems using React, TypeScript, and MUI, with full API integration for dynamic data handling.",
        "Built SEO-friendly websites using Next.js, enhancing search engine visibility and performance.",
        "Optimized performance and user experience through lazy loading, code splitting, and responsive design.",
        "Collaborated with cross-functional teams to deliver scalable and maintainable front-end solutions.",
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
      className="section"
    >
      <motion.h2 variants={itemVariants} className="numbered-heading mb-10">
        Where I've Worked
      </motion.h2>

      <Tabs
        defaultValue="company1"
        value={activeTab}
        onValueChange={setActiveTab}
      >
        <TabsList className="flex flex-col sm:flex-row h-auto bg-transparent border-l-2 border-lightest-navy sm:border-l-0 sm:border-b-2">
          {experiences.map((exp) => (
            <TabsTrigger
              key={exp.id}
              value={exp.id}
              className="font-mono text-sm px-5 py-3 data-[state=active]:text-teal data-[state=active]:border-l-2 data-[state=active]:border-teal sm:data-[state=active]:border-l-0 sm:data-[state=active]:border-b-2 -ml-[2px] sm:-mb-[2px] text-left justify-start"
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
              <h3 className="text-xl text-light-slate font-medium">
                {exp.title} <span className="text-teal">@ {exp.company}</span>
              </h3>
              <p className="font-mono text-sm text-slate mt-1 mb-4">
                {exp.date}
              </p>
              <ul className="space-y-4">
                {exp.responsibilities.map((item, i) => (
                  <li key={i} className="flex">
                    <span className="text-teal mr-2 mt-1 flex-shrink-0">▹</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              {/* Skills tags */}
              <div className="flex flex-wrap mt-6">
                {exp.skills &&
                  exp.skills.map((skill, i) => (
                    <span
                      key={i}
                      className="bg-navy text-teal rounded-full px-3 py-1 mr-2 mb-2 text-sm font-mono border border-teal/30"
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
