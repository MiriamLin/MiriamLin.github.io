'use client';

import { useState } from "react";

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
  const [open, setOpen] = useState(false);

  return (
    <article className="space-y-3">
      <header className="relative space-y-2 sm:flex sm:items-start sm:justify-between">
        <div>
          <h3 className="text-xl font-semibold text-black">{school}</h3>
          <p className="text-lg font-medium text-black">{degree}</p>
          <p className="text-sm text-zinc-600">{gpa}</p>
        </div>
        <span className="text-xs uppercase tracking-wide text-zinc-500">
          {dateRange}
        </span>
        <button
          type="button"
          onClick={() => setOpen((prev) => !prev)}
          className="absolute -bottom-1 right-0 text-2xl text-black transition hover:opacity-80"
          aria-expanded={open}
          aria-label={open ? "隱藏課程" : "顯示課程"}
        >
          <span
            className={`inline-block origin-center transform ${
              open ? "-rotate-90" : "rotate-90"
            }`}
          >
            &gt;
          </span>
        </button>
      </header>

      {open && (
        <dl className="mt-4 space-y-3 text-zinc-800">
          {courses.map((course) => (
            <div
              key={course.name}
              className="flex flex-col gap-2 border-b border-zinc-200 pb-3 sm:flex-row sm:items-center sm:justify-between"
            >
              <dt className="text-base font-medium">{course.name}</dt>
              <dd className="flex flex-wrap justify-end gap-2">
                {course.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-md border border-zinc-300 px-2 py-0.5 text-xs text-zinc-600"
                  >
                    {tag}
                  </span>
                ))}
              </dd>
            </div>
          ))}
        </dl>
      )}
    </article>
  );
}
