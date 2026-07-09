type Project = {
  title: string;
  link: string;
  image: string;
  description: string;
  skills: string[];
};

/// Images in public/projects/
const projects: Project[] = [
  {
    title: "Alpha Research",
    link: "",
    image: "/projects/wq.png",
    description:
      "Researched alpha generation strategies and built a Python parameter-tuning pipeline, submitting 40 active alphas and ranking 5th in the WorldQuant BRAIN University Alphathon.",
    skills: ["Python", "Quant Trading"],
  },
  {
    title: "Into The Unknown",
    link: "https://github.com/MiriamLin/Into-the-unknown",
    image: "/projects/space.png",
    description:
      "Developed an interactive iOS space education game independently, winning the Apple Swift Student Challenge.",
    skills: ["Swift"],
  },
  {
    title: "CSIE Camp Challenge",
    link: "https://github.com/seantsao00/Challenge2024",
    image: "/projects/challenge.png",
    description:
      "Developed a multiplayer tower-defense game, responsible for building character classes, designing the character selection interface, and developing APIs.",
    skills: ["Python"],
  },
  {
    title: "Harmonic Grove",
    link: "https://github.com/benphamroodman/Harmonic-Grove",
    image: "/projects/vr-game.jpeg",
    description:
      "Developed an augmented reality (AR) game enabling users to decorate their living spaces with interactive musical plants, responsible for AR plant generation, collision detection, and 3D coordinate transformations.",
    skills: ["Unity 3D", "C#"],
  },
  {
    title: "安好食",
    link: "https://github.com/MiriamLin/im-pasta-service",
    image: "/projects/iconSafeRestaurant.png",
    description:
      "Developed an interactive food-safety app featuring restaurant hygiene grade lookup, ingredient source tracing, and nearby restaurant search using TGOS Map API, providing safe, reliable restaurant choices for people in Taipei.",
    skills: ["Vue", "TypeScript"],
  },
];

export default function ProjectsPage() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-12">
      <h1 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
        Projects
      </h1>

      <div className="mt-8 grid grid-cols-1 gap-8 sm:grid-cols-2">
        {projects.map((project) => (
          <article
            key={project.title}
            className="group relative isolate flex flex-col gap-3 overflow-hidden rounded-xl border-2 border-blue-900 bg-white p-3 text-black dark:border-blue-400/60 dark:bg-zinc-900 dark:text-zinc-100 dark:shadow-[10px_10px_0_0_#1e3a5f] dark:hover:shadow-[12px_12px_0_0_#1e3a5f] dark:active:shadow-[5px_5px_0_0_#1e3a5f] shadow-[10px_10px_0_0_#1e3a8a] transition-all duration-150 hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[12px_12px_0_0_#1e3a8a] active:translate-x-1 active:translate-y-1 active:shadow-[5px_5px_0_0_#1e3a8a]"
          >
            <div className="relative aspect-[5/3] overflow-hidden rounded-lg border border-blue-900/20 bg-white shadow-inner dark:border-blue-400/20">
              <img
                src={project.image}
                alt={`${project.title} graphic`}
                loading="lazy"
                className="h-full w-full object-fill"
              />
            </div>

            <div
              className={`flex items-center gap-3 ${
                project.link?.trim() ? "justify-between" : ""
              }`}
            >
              <h2 className="text-lg font-semibold text-black dark:text-zinc-100">
                {project.title}
              </h2>
              {project.link?.trim() && (
                <a
                  href={project.link}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border border-blue-900 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-blue-900 transition hover:-translate-y-0.5 hover:bg-blue-900 hover:text-white dark:border-blue-400/60 dark:text-blue-300 dark:hover:bg-blue-400 dark:hover:text-zinc-950"
                >
                  Link
                </a>
              )}
            </div>

            <p className="text-sm leading-relaxed text-zinc-700 dark:text-zinc-300">
              {project.description}
            </p>

            <div className="mt-auto flex flex-wrap gap-2 pt-1">
              {project.skills.map((skill) => (
                <span
                  key={skill}
                  className="rounded-full border border-blue-900/25 bg-blue-50 px-3 py-1 text-xs font-medium text-blue-800 dark:border-blue-400/25 dark:bg-blue-950/40 dark:text-blue-300"
                >
                  {skill}
                </span>
              ))}
            </div>
          </article>
        ))}
      </div>
    </main>
  );
}
