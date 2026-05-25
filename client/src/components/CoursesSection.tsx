import { useMemo, useState } from "react";
import { BookOpen, ChevronRight, GraduationCap, Search } from "lucide-react";
import { coursesContent } from "../data/content";

type TabKey = "ug" | "pg" | "research" | "lateral";
type CourseItem = string | { name: string; specialization?: string[] };

const tabMeta: Record<TabKey, { label: string; eyebrow: string; description: string }> = {
  ug: {
    label: "Under Graduate programs",
    eyebrow: "School-based degrees",
    description: "Explore all undergraduate programs grouped by school.",
  },
  pg: {
    label: "Post Graduate programs",
    eyebrow: "Master's degrees",
    description: "Explore all postgraduate programs grouped by school.",
  },
  research: {
    label: "Research",
    eyebrow: "Doctoral programs",
    description: "Ph.D. opportunities across engineering, science, and management.",
  },
  lateral: {
    label: "Lateral Entry programs",
    eyebrow: "Direct entry options",
    description: "B.Tech lateral entry programs for eligible diploma holders.",
  },
};

function sectionTitle(key: string) {
  switch (key) {
    case "engineering":
      return "School of Engineering & Technology";
    case "computerScience":
      return "School of Computer Science & Technology";
    case "agriculture":
      return "School of Agricultural Sciences";
    case "artsScience":
      return "School of Arts & Science";
    case "science":
      return "School of Science, Arts & Media";
    case "management":
      return "School of Management";
    default:
      return key;
  }
}

function splitIntoColumns(items: string[], columns = 2) {
  const size = Math.ceil(items.length / columns);
  return Array.from({ length: columns }, (_, index) => items.slice(index * size, index * size + size));
}

function ProgramCard({ item, showBadge = true }: { item: CourseItem; showBadge?: boolean }) {
  const name = typeof item === "string" ? item : item.name;
  const specialization = typeof item === "string" ? [] : item.specialization ?? [];

  return (
    <article className="group relative h-full overflow-hidden rounded-2xl border border-gray-100 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-maroon/30 hover:shadow-xl">
      {showBadge ? (
        <span className="absolute right-4 top-4 rounded-full bg-maroon px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-white">
          Program
        </span>
      ) : null}

      <div className="flex items-start gap-3 pr-10">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-maroon/10 text-maroon transition-colors duration-300 group-hover:bg-maroon group-hover:text-white">
          <BookOpen className="h-5 w-5" />
        </div>
        <div className="min-w-0">
          <h5 className="text-base font-semibold leading-snug text-slate-900">{name}</h5>
          {specialization.length > 0 ? (
            <div className="mt-3 flex flex-wrap gap-2">
              {specialization.map((spec) => (
                <span key={spec} className="rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-600">
                  {spec}
                </span>
              ))}
            </div>
          ) : null}
        </div>
      </div>
    </article>
  );
}

function CategoryPanel({
  title,
  items,
  columns = 2,
  compact = false,
}: {
  title: string;
  items: CourseItem[];
  columns?: number;
  compact?: boolean;
}) {
  return (
    <section className="rounded-3xl border border-white/60 bg-white/80 p-5 shadow-[0_12px_40px_rgba(123,30,43,0.06)] backdrop-blur-sm md:p-6">
      <div className="mb-5 border-b border-maroon/10 pb-4">
        <h4 className="text-lg font-bold text-slate-900 md:text-xl">{title}</h4>
        <div className="mt-2 h-1 w-20 rounded-full bg-maroon" />
      </div>

      <div className={`grid gap-4 ${columns === 1 ? "grid-cols-1" : "grid-cols-1 md:grid-cols-2"}`}>
        {items.map((item) => (
          <ProgramCard key={typeof item === "string" ? item : item.name} item={item} showBadge={!compact} />
        ))}
      </div>
    </section>
  );
}

export default function CoursesSection() {
  const [activeTab, setActiveTab] = useState<TabKey>("ug");

  const ugSections = useMemo(
    () => [
      {
        title: sectionTitle("engineering"),
        items: coursesContent.ug.engineering,
        columns: 1,
      },
      {
        title: sectionTitle("computerScience"),
        items: [
          ...coursesContent.ug.computerScience,
          ...coursesContent.ug.agriculture,
          ...coursesContent.ug.artsScience,
        ],
        columns: 1,
      },
    ],
    []
  );

  const pgSections = useMemo(
    () => [
      {
        title: sectionTitle("engineering"),
        items: coursesContent.pg.engineering,
        columns: 1,
      },
      {
        title: sectionTitle("science"),
        items: [...coursesContent.pg.science, ...coursesContent.pg.management],
        columns: 1,
      },
    ],
    []
  );

  const researchPrograms = [
    "Ph.D. Aerospace Engineering",
    "Ph.D. Agriculture",
    "Ph.D. Civil Engineering",
    "Ph.D. Computer Applications",
    "Ph.D. Computer Science and Engineering",
    "Ph.D. Criminology",
    "Ph.D. Electrical and Electronics Engineering",
    "Ph.D. Mechanical Engineering",
    "Ph.D. Biotechnology",
    "Ph.D. Chemistry",
    "Ph.D. Commerce",
    "Ph.D. Management Sciences",
  ];

  const lateralPrograms = [
    "B.Tech Aerospace Engineering",
    "B.Tech Artificial Intelligence and Data Science",
    "B.Tech Biomedical Engineering",
    "B.Tech Biotechnology",
    "B.Tech Computer Engineering",
    "B.Tech Computer Science and Engineering",
    "B.Tech Computer Science and Engineering (Artificial Intelligence and Machine Learning)",
    "B.Tech Computer Science and Engineering (Artificial Intelligence)",
    "B.Tech Electrical and Electronics Engineering",
    "B.Tech Electronics and Communication Engineering",
    "B.Tech Food Processing and Engineering",
    "B.Tech Mechanical Engineering",
    "B.Tech Robotics and Automation",
  ];

  return (
    <section id="courses" className="bg-cream py-20 md:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-10 max-w-3xl">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-maroon/15 bg-white/80 px-4 py-2 text-sm font-medium tracking-wide text-maroon shadow-sm backdrop-blur">
            <GraduationCap className="h-4 w-4" />
            Programs Offered
          </div>
          <h2 className="text-3xl font-bold tracking-tight text-slate-900 md:text-5xl">
            A complete academic path from undergraduate to research
          </h2>
          <p className="mt-4 max-w-2xl text-sm leading-7 text-gray-600 md:text-base">
            Browse the schools below and switch between UG, PG, research, and lateral entry options.
          </p>
        </div>

        <div className="rounded-3xl border border-white/60 bg-white/70 p-4 shadow-[0_16px_60px_rgba(123,30,43,0.08)] backdrop-blur">
          <div className="flex flex-wrap gap-3 border-b border-gray-200 pb-4">
            {(Object.keys(tabMeta) as TabKey[]).map((key) => {
              const isActive = activeTab === key;
              return (
                <button
                  key={key}
                  type="button"
                  onClick={() => setActiveTab(key)}
                  className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold transition-all duration-200 ${
                    isActive
                      ? "bg-maroon text-white shadow-lg shadow-maroon/20"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  {tabMeta[key].label}
                  <ChevronRight className={`h-4 w-4 transition-transform ${isActive ? "rotate-90" : ""}`} />
                </button>
              );
            })}
          </div>

          <div className="mt-6">
            <div className="mb-6 flex items-start justify-between gap-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-maroon">
                  {tabMeta[activeTab].eyebrow}
                </p>
                <h3 className="mt-2 text-2xl font-bold text-slate-900 md:text-3xl">
                  {tabMeta[activeTab].label}
                </h3>
              </div>
              <div className="hidden items-center gap-2 rounded-full border border-maroon/15 bg-maroon/5 px-4 py-2 text-xs font-medium text-maroon md:flex">
                <Search className="h-4 w-4" />
                {tabMeta[activeTab].description}
              </div>
            </div>

            {activeTab === "ug" ? (
              <div className="grid gap-6 lg:grid-cols-2">
                {ugSections.map((section) => (
                  <CategoryPanel key={section.title} title={section.title} items={section.items} columns={section.columns} />
                ))}
              </div>
            ) : null}

            {activeTab === "pg" ? (
              <div className="grid gap-6 lg:grid-cols-2">
                {pgSections.map((section) => (
                  <CategoryPanel key={section.title} title={section.title} items={section.items} columns={section.columns} />
                ))}
              </div>
            ) : null}

            {activeTab === "research" ? (
              <div className="grid gap-6 lg:grid-cols-2">
                {splitIntoColumns(researchPrograms, 2).map((column, index) => (
                  <CategoryPanel
                    key={`research-${index}`}
                    title={index === 0 ? "Doctoral Research Areas" : "More Research Areas"}
                    items={column}
                    columns={1}
                    compact
                  />
                ))}
              </div>
            ) : null}

            {activeTab === "lateral" ? (
              <div className="grid gap-6 lg:grid-cols-2">
                {splitIntoColumns(lateralPrograms, 2).map((column, index) => (
                  <CategoryPanel
                    key={`lateral-${index}`}
                    title={index === 0 ? "Lateral Entry Options" : "More Options"}
                    items={column}
                    columns={1}
                    compact
                  />
                ))}
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
}
