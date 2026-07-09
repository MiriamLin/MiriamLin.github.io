import EducationEntry from "./components/education-entry";

export default function Home() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-12">
      <section className="pt-2">
        <h1 className="font-mono text-sm text-zinc-500 dark:text-zinc-400">
          CS undergrad @ National Taiwan University · programmer · AI research
        </h1>
      </section>

      <section className="mt-12 border-t border-zinc-200 pt-8 dark:border-zinc-800">
        <h2 className="font-mono text-xs uppercase tracking-[0.15em] text-zinc-500 dark:text-zinc-400">
          Internship
        </h2>
        <div className="mt-5 space-y-8">
          <article>
            <header className="flex flex-col gap-0.5 sm:flex-row sm:items-baseline sm:justify-between sm:gap-4">
              <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">EPFL</h3>
              <span className="shrink-0 font-mono text-xs text-zinc-500 dark:text-zinc-400">
                Jun 2026 – Sep 2026
              </span>
            </header>
            <p className="mt-0.5 text-[15px] text-zinc-700 dark:text-zinc-300">
              Summer@EPFL Research Intern
            </p>
            <ul className="mt-3 list-disc space-y-1.5 pl-4 text-[15px] leading-relaxed text-zinc-700 marker:text-zinc-400 dark:text-zinc-300 dark:marker:text-zinc-600">
              <li>
                Developing a self-supervised encoder that turns pathology images into general-purpose representations for downstream tasks.
              </li>
            </ul>
          </article>

          <article>
            <header className="flex flex-col gap-0.5 sm:flex-row sm:items-baseline sm:justify-between sm:gap-4">
              <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">Amazon</h3>
              <span className="shrink-0 font-mono text-xs text-zinc-500 dark:text-zinc-400">
                Jun 2025 – Nov 2025
              </span>
            </header>
            <p className="mt-0.5 text-[15px] text-zinc-700 dark:text-zinc-300">
              Software Development Engineer Intern
            </p>
            <ul className="mt-3 list-disc space-y-1.5 pl-4 text-[15px] leading-relaxed text-zinc-700 marker:text-zinc-400 dark:text-zinc-300 dark:marker:text-zinc-600">
              <li>
                Developed a pytest-based automated validation pipeline for firmware image testing on eero embedded devices.
              </li>
              <li>
                Integrated Serial/Telnet communication, GitLab CI/CD triggers, TFTP/SCP transfer, image flashing, connectivity tests, and functional tests into a unified workflow.
              </li>
              <li>
                Improved image bundle validation speed, consistency, and robustness.
              </li>
            </ul>
          </article>
        </div>
      </section>

      <section className="mt-12 border-t border-zinc-200 pt-8 dark:border-zinc-800">
        <h2 className="font-mono text-xs uppercase tracking-[0.15em] text-zinc-500 dark:text-zinc-400">
          Research Experience
        </h2>
        <div className="mt-5 space-y-8">
          <article>
            <header className="flex flex-col gap-0.5 sm:flex-row sm:items-baseline sm:justify-between sm:gap-4">
              <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">NTU Vision and Learning Lab</h3>
              <span className="shrink-0 font-mono text-xs text-zinc-500 dark:text-zinc-400">
                Sep 2025 – Present
              </span>
            </header>
            <ul className="mt-3 list-disc space-y-1.5 pl-4 text-[15px] leading-relaxed text-zinc-700 marker:text-zinc-400 dark:text-zinc-300 dark:marker:text-zinc-600">
              <li>
                Conducted research on physical reasoning in multimodal LLMs, integrating textual context, intermediate visual generation, and tool usage to improve problem-solving performance.
              </li>
              <li>
                Developed a pipeline enabling models to generate sketches, auxiliary lines, and visual cues for geometric and physical reasoning tasks.
              </li>
              <li>
                Investigated multimodal reasoning methods, specifically Chain-of-Thought and self-reflection, to enhance physical reasoning capabilities.
              </li>
            </ul>
          </article>

          <article>
            <header className="flex flex-col gap-0.5 sm:flex-row sm:items-baseline sm:justify-between sm:gap-4">
              <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">
                NTU Artificial Intelligence Security Lab
              </h3>
              <span className="shrink-0 font-mono text-xs text-zinc-500 dark:text-zinc-400">
                Feb 2025 – Jan 2026
              </span>
            </header>
            <ul className="mt-3 list-disc space-y-1.5 pl-4 text-[15px] leading-relaxed text-zinc-700 marker:text-zinc-400 dark:text-zinc-300 dark:marker:text-zinc-600">
              <li>
                Researched large language model security by applying RAG pipelines and LoRA adapters to enforce role-based access control.
              </li>
              <li>
                Improved access control robustness and reduced unauthorized information leakage, validated through benchmark evaluation and practical validation.
              </li>
            </ul>
          </article>

          <article>
            <header className="flex flex-col gap-0.5 sm:flex-row sm:items-baseline sm:justify-between sm:gap-4">
              <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">
                NTUCM, Graduate Institute of Immunology
              </h3>
              <span className="shrink-0 font-mono text-xs text-zinc-500 dark:text-zinc-400">
                Jul 2021 - Jan 2023
              </span>
            </header>
            <ul className="mt-3 list-disc space-y-1.5 pl-4 text-[15px] leading-relaxed text-zinc-700 marker:text-zinc-400 dark:text-zinc-300 dark:marker:text-zinc-600">
              <li>
                Researched how the neurotransmitters SP and GABA modulate the activation of allergy-associated immune cells.
              </li>
            </ul>
          </article>
        </div>
      </section>

      <section className="mt-12 border-t border-zinc-200 pt-8 dark:border-zinc-800">
        <h2 className="font-mono text-xs uppercase tracking-[0.15em] text-zinc-500 dark:text-zinc-400">
          Education
        </h2>
        <div className="mt-5">
          <EducationEntry
            school="National Taiwan University"
            degree="B.S. in Computer Science & Information Engineering"
            gpa="GPA: 4.21 / 4.30"
            dateRange="Sep 2023 – Jun 2027"
            courses={[
              { name: "Deep Learning for Computer Vision", tags: ["Python", "Diffusion model", "3D Vision"] },
              { name: "Applied Deep Learning", tags: ["Python", "Deep Learning"] },
              { name: "Machine Learning", tags: ["Python", "Machine Learning"] },
              { name: "Special Topics in Innovative Integration of Medicine and EECS", tags: ["VR", "3D Vision"] },
              { name: "Linear Algebra", tags: ["Math"] },
              { name: "Probability", tags: ["Math"] },
              { name: "Calculus", tags: ["Math"] },
              { name: "Operating Systems", tags: ["C"] },
              { name: "Systems Programming", tags: ["C", "Linux"] },
              { name: "Computer Networks", tags: ["C++"] },
              { name: "Computer Architecture", tags: ["Verilog", "RISC-V"] },
              { name: "Computer System Laboratory", tags: ["Embedded Systems", "HCI"] },
              { name: "Virtual Reality Game Programming", tags: ["AR/VR", "Unity", "C#"] },
              { name: "Data Structures and Algorithms", tags: ["Algorithms", "Data Structures", "C++"] },
              { name: "Algorithm Design and Analysis", tags: ["Algorithms", "Problem Solving"] },
              { name: "Foundations of Artificial Intelligence", tags: ["Classical AI", "Machine Learning"] },
              { name: "Introduction to FinTech", tags: ["Solidity"] },
              { name: "Introduction to Computer Programming", tags: ["C"] },
            ]}
          />
        </div>
      </section>

      <section className="mt-12 border-t border-zinc-200 pt-8 dark:border-zinc-800">
        <h2 className="font-mono text-xs uppercase tracking-[0.15em] text-zinc-500 dark:text-zinc-400">
          Skills
        </h2>
        <div className="mt-5 space-y-4">
          <div>
            <p className="font-mono text-xs text-zinc-500 dark:text-zinc-400">Languages</p>
            <div className="mt-2 flex flex-wrap gap-2">
              {["Python", "C", "C++", "C#", "JavaScript", "TypeScript", "Swift"].map(
                (skill) => (
                  <span
                    key={skill}
                    className="rounded-full border border-blue-900/25 bg-blue-50 px-3 py-1 text-xs font-medium text-blue-800 dark:border-blue-400/25 dark:bg-blue-950/40 dark:text-blue-300"
                  >
                    {skill}
                  </span>
                )
              )}
            </div>
          </div>
          <div>
            <p className="font-mono text-xs text-zinc-500 dark:text-zinc-400">Tools & Frameworks</p>
            <div className="mt-2 flex flex-wrap gap-2">
              {[
                "Git",
                "GitHub",
                "GitLab",
                "Docker",
                "React",
                "Unity",
                "Linux",
                "Jira",
                "Machine Learning",
                "PyTorch",
                "Algorithms",
                "Data Structures",
              ].map((skill) => (
                <span
                  key={skill}
                  className="rounded-full border border-blue-900/25 bg-blue-50 px-3 py-1 text-xs font-medium text-blue-800 dark:border-blue-400/25 dark:bg-blue-950/40 dark:text-blue-300"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
