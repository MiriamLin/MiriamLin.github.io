import EducationEntry from "./components/education-entry";

export default function Home() {
  return (
    <main className="mx-auto mt-12 max-w-4xl px-6 space-y-14">
      <section className="space-y-4">
        <h1 className="text-5xl font-semibold leading-tight text-black">
          Miriam Lin
        </h1>
      </section>

      <section className="space-y-6">
        <header className="space-y-2">
          <p className="text-sm uppercase tracking-wide text-zinc-500">Working Experience</p>
        </header>
        <article className="space-y-3 rounded-2xl border border-zinc-200 bg-white/70 p-6 shadow-sm">
          <header className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between">
            <h3 className="text-xl font-semibold text-black">Amazon</h3>
            <span className="text-sm uppercase tracking-wide text-zinc-500">
              Jun 2025 – Nov 2025
            </span>
          </header>
          <p className="text-base font-medium text-black">
            Software Development Engineer Intern
          </p>
          <ul className="list-disc space-y-2 pl-5 text-base leading-relaxed text-zinc-700">
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
      </section>

      <section className="space-y-6">
        <header className="space-y-2">
          <p className="text-sm uppercase tracking-wide text-zinc-500">Research Experience</p>
        </header>
        <div className="space-y-4">
          <article className="space-y-2 rounded-2xl border border-zinc-200 bg-white/70 p-5 shadow-sm">
            <header className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between">
              <h3 className="text-xl font-semibold text-black">NTU Vision and Learning Lab</h3>
              <span className="text-xs uppercase tracking-wide text-zinc-500">
                Sep 2025 – Present
              </span>
            </header>
            <ul className="list-disc space-y-2 pl-5 text-base leading-relaxed text-zinc-700">
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

          <article className="space-y-2 rounded-2xl border border-zinc-200 bg-white/70 p-5 shadow-sm">
            <header className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between">
              <h3 className="text-xl font-semibold text-black">
                NTU Artificial Intelligence Security Lab
              </h3>
              <span className="text-xs uppercase tracking-wide text-zinc-500">
                Feb 2025 – Present
              </span>
            </header>
            <ul className="list-disc space-y-2 pl-5 text-base leading-relaxed text-zinc-700">
            <li>
              Researched large language model security by applying RAG pipelines and LoRA adapters to enforce role-based access control.
            </li>
            <li>
              Improved access control robustness and reduced unauthorized information leakage, validated through benchmark evaluation and practical validation.
            </li>
          </ul>
          </article>

          <article className="space-y-2 rounded-2xl border border-zinc-200 bg-white/70 p-5 shadow-sm">
            <header className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between">
              <h3 className="text-xl font-semibold text-black">
                NTUCM, Graduate Institute of Immunology
              </h3>
              <span className="text-xs uppercase tracking-wide text-zinc-500">
                Jul 2021 - Jan 2023
              </span>
            </header>
            <ul className="list-disc space-y-2 pl-5 text-base leading-relaxed text-zinc-700">
            <li>
              Researched how the neurotransmitters SP and GABA modulate the activation of allergy-associated immune cells.
            </li>
          </ul>
          </article>
        </div>
      </section>

      <section className="space-y-6">
        <header className="space-y-2">
          <p className="text-sm uppercase tracking-wide text-zinc-500">Education</p>
        </header>
        <div className="space-y-8 rounded-2xl border border-zinc-200 bg-white/70 p-6 shadow-sm">
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
              { name: "Calculus",tags: ["Math"] },
              { name: "Operating Systems", tags: ["C"] },
              { name: "Systems Programming", tags: ["C", "Linux"] },
              { name: "Computer Networks", tags: ["C++"] },
              { name: "Computer Architecture", tags: ["Verilog", "RISC-V"] },
              { name: "Computer System Laboratory", tags: ["Embedded Systems", "HCI"] },
              { name: "Virtual Reality Game Programming", tags: ["AR/VR", "Unity", "C#"] },
              { name: "Data Structures and Algorithms",tags: ["Algorithms", "Data Structures", "C++"] },
              { name: "Algorithm Design and Analysis",tags: ["Algorithms", "Problem Solving"] },
              { name: "Foundations of Artificial Intelligence",tags: ["Classical AI", "Machine Learning"] },
              { name: "Introduction to FinTech",tags: ["Solidity"] },
              { name: "Introduction to Computer Programming",tags: ["C"] },
            ]}
          />
        </div>
      </section>

      <section className="space-y-6">
        <header className="space-y-2">
          <p className="text-sm uppercase tracking-wide text-zinc-500">Skills</p>
        </header>
        <div className="space-y-3 rounded-2xl border border-zinc-200 bg-white/70 p-6 shadow-sm">
          {[
            ["Python", "C", "C++", "C#", "JavaScript", "TypeScript", "Swift"],
            [
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
            ],
          ].map((row, index) => (
            <div key={index} className="flex flex-wrap gap-3">
              {row.map((skill) => (
                <span
                  key={skill}
                  className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1.5 text-sm font-normal text-slate-700"
                >
                  {skill}
                </span>
              ))}
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
