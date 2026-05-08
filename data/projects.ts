export type ProcessStep = {
  title: string;
  description: string;
};

export type Project = {
  slug: string;
  title: string;
  description: string;       // short — shown on card
  tags: string[];
  github?: string;
  link?: string;
  // ── Full project page content ──────────────────────────────────
  period?: string;
  status?: string;           // e.g. "In Progress", "Completed"
  overview?: string;         // 1-3 paragraph overview
  goals?: string[];          // bullet list of project goals
  process?: ProcessStep[];   // step-by-step breakdown
  challenges?: string[];     // difficulties faced
  // Images: drop files in public/projects/<slug>/ and list filenames here
  images?: string[];
};

export const projects: Project[] = [
  {
    slug: "hybrid-rocket-feed-system",
    title: "Hybrid Rocket Feed System",
    description:
      "Lead engineer for a 586 lbf N₂O/HTPB hybrid rocket feed system targeting 20,000 ft apogee. Designed full oxidizer plumbing at 750 psi MEOP, performed discharge coefficient modeling, FEA-validated endcaps and brackets, and led cold-flow and static fire campaigns.",
    tags: ["Propulsion", "SolidWorks", "FEA", "ANSYS", "N₂O", "Python"],
    github: "https://github.com/Oltunisie",
    period: "2025 – Present",
    status: "In Progress",
    overview: `[Placeholder — write 1-3 paragraphs describing the project at a high level. What is it? What does it do? What's the mission?]`,
    goals: [
      "[Goal 1 — e.g. Design a feed system capable of 750 psi MEOP with reliable actuation]",
      "[Goal 2 — e.g. Achieve a target apogee of 20,000 ft]",
      "[Goal 3 — add more as needed]",
    ],
    process: [
      {
        title: "System Architecture & Requirements",
        description: "[Describe how you defined the system requirements, selected the oxidizer, and laid out the architecture.]",
      },
      {
        title: "Plumbing & Valve Design",
        description: "[Describe the feed system design — fittings, valve selection, pressure relief strategy.]",
      },
      {
        title: "Structural Analysis",
        description: "[Describe the FEA work on endcaps and brackets — loads, materials, margin of safety.]",
      },
      {
        title: "Testing Campaigns",
        description: "[Describe hydrostatic proof testing, cold-flow, and static fire integration.]",
      },
    ],
    challenges: [
      "[Challenge 1 — e.g. Managing ullage volume to maximize delivered impulse]",
      "[Challenge 2 — add more]",
    ],
    images: [
      // Add filenames here after dropping images in public/projects/hybrid-rocket-feed-system/
      // Example: "feed-system-cad.jpg", "static-fire.jpg"
    ],
  },
  {
    slug: "cubesat-adcs-bruinspace",
    title: "CubeSat ADCS — BruinSpace",
    description:
      "Leading design and development of the Attitude Determination and Control System for UCLA BruinSpace's satellite. Built the ADCS test setup to validate sensors, actuators, and control algorithms, and coordinating integration across electronics and structures subsystems.",
    tags: ["ADCS", "Control Systems", "Sensors", "Embedded", "Satellite"],
    github: "https://github.com/Oltunisie",
    period: "2025 – Present",
    status: "In Progress",
    overview: `[Placeholder — describe the satellite mission, your role as ADCS lead, and the overall spacecraft.]`,
    goals: [
      "[Goal 1 — e.g. Design and validate a 3-axis ADCS system for the CubeSat]",
      "[Goal 2 — e.g. Build a hardware-in-the-loop test setup]",
    ],
    process: [
      {
        title: "ADCS Architecture",
        description: "[Describe sensor and actuator selection — magnetometers, sun sensors, reaction wheels, magnetorquers.]",
      },
      {
        title: "Control Algorithm Development",
        description: "[Describe the control laws — detumbling, pointing modes, simulation.]",
      },
      {
        title: "Test Setup Assembly",
        description: "[Describe building the ADCS test bench to validate hardware.]",
      },
      {
        title: "Subsystem Integration",
        description: "[Describe coordinating with electronics and structures teams.]",
      },
    ],
    challenges: [
      "[Challenge 1 — e.g. Managing sensor noise in hardware testing]",
      "[Challenge 2 — add more]",
    ],
    images: [],
  },
  {
    slug: "zero-g-experiments-cnes",
    title: "Zero-G Experiments — CNES",
    description:
      "Selected for the 66th Parabolic Flight Campaign of the French CNES. Designed and conducted microgravity experiments covering thermodynamics, centrifugal forces, and Newton's Laws aboard a Zero-G aircraft in Bordeaux.",
    tags: ["Microgravity", "Thermodynamics", "Experimental", "CNES"],
    period: "2023",
    status: "Completed",
    overview: `[Placeholder — describe the context: the competition, why you were selected, and what the campaign involved.]`,
    goals: [
      "[Goal 1 — e.g. Design experiments demonstrating thermodynamic behavior in microgravity]",
      "[Goal 2 — e.g. Collect and analyze flight data]",
    ],
    process: [
      {
        title: "Experiment Design",
        description: "[Describe how you designed each experiment over the year of preparation.]",
      },
      {
        title: "Preparation & Review",
        description: "[Describe CNES review process, safety requirements, experiment iteration.]",
      },
      {
        title: "Parabolic Flight",
        description: "[Describe the flight experience and running experiments in real microgravity.]",
      },
      {
        title: "Data Analysis",
        description: "[Describe post-flight data processing and results.]",
      },
    ],
    challenges: [
      "[Challenge 1 — e.g. Designing experiments that work in 20-second microgravity windows]",
    ],
    images: [],
  },
  {
    slug: "space-probe-project-x",
    title: "Space Probe — Project X",
    description:
      "Won the Young Searchers Prize at the 2023 Project X engineering competition with a space probe design concept. Repeated the win in 2024 with a Zero-G experiment design, and was selected to present awards at the 2025 ceremony.",
    tags: ["Systems Design", "Space Probe", "Competition"],
    period: "2023 – 2025",
    status: "Completed",
    overview: `[Placeholder — describe Project X, the competition format, your team, and what you built each year.]`,
    goals: [
      "[Goal 1 — e.g. Design a viable space probe concept within competition constraints]",
      "[Goal 2 — e.g. Present a compelling case to the jury]",
    ],
    process: [
      {
        title: "2023 — Space Probe",
        description: "[Describe the space probe concept you built and what made it win.]",
      },
      {
        title: "2024 — Zero-G Experiments",
        description: "[Describe the Zero-G experiment design for the second win.]",
      },
    ],
    challenges: [
      "[Challenge 1 — e.g. Tight timeline with limited resources]",
    ],
    images: [],
  },
];
