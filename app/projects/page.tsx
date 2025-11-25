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
    <main className="mx-auto mt-12 max-w-6xl px-6">
      <section className="mt-12">
        <div className="flex flex-wrap gap-8">
          {projects.map((project) => (
            <article
              key={project.title}
              className="group relative isolate flex basis-full flex-col gap-3 overflow-hidden rounded-xl border-2 border-blue-900 bg-white p-3 text-black shadow-[10px_10px_0_0_rgba(13,43,110,0.9)] transition-transform duration-150 hover:-translate-y-1 sm:basis-[calc((100%-32px)/2)] lg:basis-[calc((100%-64px)/3)]"
            >
              <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-gradient-to-br from-blue-900/50 via-blue-900/30 to-transparent blur-3xl" />
              <div className="relative aspect-[5/3] overflow-hidden rounded-xl border border-blue-900/20 bg-white shadow-inner">
                <div className="absolute -inset-6 bg-gradient-to-br from-blue-900/5 via-transparent to-transparent blur-xl" />
                <img
                  src={project.image}
                  alt={`${project.title} graphic`}
                  className="relative h-full w-full object-fill"
                />
              </div>

              <div
                className={`flex items-center gap-3 ${
                  project.link?.trim() ? "justify-between" : ""
                }`}
              >
                <h3 className="text-lg font-semibold text-black">
                  {project.title}
                </h3>
                {project.link?.trim() && (
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 rounded-full border border-blue-900 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-blue-900 transition hover:-translate-y-0.5 hover:bg-blue-900 hover:text-white"
                  >
                    Link
                  </a>
                )}
              </div>

              <p className="text-sm leading-relaxed text-zinc-700">
                {project.description}
              </p>

              <div className="flex flex-wrap gap-2">
                {project.skills.map((skill) => (
                  <span
                    key={skill}
                    className="rounded-full border border-blue-900/40 bg-blue-50 px-3 py-1 text-xs font-semibold tracking-wide text-blue-900"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
