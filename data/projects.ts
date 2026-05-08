export type Project = {
  title: string;
  description: string;
  tags: string[];
  link?: string;
  github?: string;
};

export const projects: Project[] = [
  {
    title: "Project Alpha",
    description:
      "Placeholder — describe what this project does, what problem it solves, and what you learned.",
    tags: ["Python", "Aerospace", "Simulation"],
    github: "https://github.com/Oltunisie",
  },
  {
    title: "Project Beta",
    description:
      "Placeholder — describe what this project does, what problem it solves, and what you learned.",
    tags: ["MATLAB", "CFD", "Research"],
    github: "https://github.com/Oltunisie",
  },
  {
    title: "Project Gamma",
    description:
      "Placeholder — describe what this project does, what problem it solves, and what you learned.",
    tags: ["C++", "Embedded", "Hardware"],
    github: "https://github.com/Oltunisie",
  },
];
