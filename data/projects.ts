export type Project = {
  title: string;
  description: string;
  tags: string[];
  link?: string;
  github?: string;
};

export const projects: Project[] = [
  {
    title: "Hybrid Rocket Feed System",
    description:
      "Lead engineer for a 586 lbf N₂O/HTPB hybrid rocket feed system targeting 20,000 ft apogee. Designed full oxidizer plumbing at 750 psi MEOP, performed discharge coefficient modeling, FEA-validated endcaps and brackets, and led cold-flow and static fire campaigns.",
    tags: ["Propulsion", "SolidWorks", "FEA", "ANSYS", "N₂O", "Python"],
    github: "https://github.com/Oltunisie",
  },
  {
    title: "CubeSat ADCS — BruinSpace",
    description:
      "Leading design and development of the Attitude Determination and Control System for UCLA BruinSpace's satellite. Built the ADCS test setup to validate sensors, actuators, and control algorithms, and coordinating integration across electronics and structures subsystems.",
    tags: ["ADCS", "Control Systems", "Sensors", "Embedded", "Satellite"],
    github: "https://github.com/Oltunisie",
  },
  {
    title: "Zero-G Experiments — CNES",
    description:
      "Selected for the 66th Parabolic Flight Campaign of the French CNES. Designed and conducted microgravity experiments covering thermodynamics, centrifugal forces, and Newton's Laws aboard a Zero-G aircraft in Bordeaux.",
    tags: ["Microgravity", "Thermodynamics", "Experimental", "CNES"],
  },
  {
    title: "Space Probe — Project X",
    description:
      "Won the Young Searchers Prize at the 2023 Project X engineering competition with a space probe design concept. Repeated the win in 2024 with a Zero-G experiment design, and was selected to present awards at the 2025 ceremony.",
    tags: ["Systems Design", "Space Probe", "Competition"],
  },
];
