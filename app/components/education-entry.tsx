type Course = {
  name: string;
  tags: string[];
};

type EducationEntryProps = {
  school: string;
  degree: string;
  gpa: string;
  dateRange: string;
  courses: Course[];
};

export default function EducationEntry({
  school,
  degree,
  gpa,
  dateRange,
  courses,
}: EducationEntryProps) {
  return (
    <details className="group">
      <summary className="cursor-pointer list-none [&::-webkit-details-marker]:hidden">
        <div className="flex flex-col gap-0.5 sm:flex-row sm:items-baseline sm:justify-between sm:gap-4">
          <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">{school}</h3>
          <span className="shrink-0 font-mono text-xs text-zinc-500 dark:text-zinc-400">
            {dateRange}
          </span>
        </div>
        <p className="mt-0.5 text-[15px] text-zinc-700 dark:text-zinc-300">{degree}</p>
        <p className="mt-0.5 font-mono text-xs text-zinc-500 dark:text-zinc-400">{gpa}</p>
        <span className="mt-3 inline-flex items-center gap-1.5 rounded-full border border-blue-900/25 bg-blue-50 px-3 py-1 text-xs font-medium text-blue-800 transition-colors group-hover:bg-blue-100 dark:border-blue-400/25 dark:bg-blue-950/40 dark:text-blue-300 dark:group-hover:bg-blue-950/70">
          <span className="group-open:hidden">View coursework</span>
          <span className="hidden group-open:inline">Hide coursework</span>
          <svg
            viewBox="0 0 12 12"
            className="h-3 w-3 transition-transform duration-200 group-open:rotate-180"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.75"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M3 4.5 6 7.5 9 4.5" />
          </svg>
        </span>
      </summary>

      <ul className="mt-3 space-y-1.5 border-l border-zinc-200 pl-4 dark:border-zinc-800">
        {courses.map((course) => (
          <li
            key={course.name}
            className="flex flex-col gap-0.5 sm:flex-row sm:items-baseline sm:justify-between sm:gap-4"
          >
            <span className="text-[15px] text-zinc-700 dark:text-zinc-300">{course.name}</span>
            <span className="shrink-0 font-mono text-xs text-zinc-400 dark:text-zinc-500">
              {course.tags.join(" · ")}
            </span>
          </li>
        ))}
      </ul>
    </details>
  );
}
