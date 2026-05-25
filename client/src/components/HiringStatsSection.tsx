import { elitePlacements, placementHighlights, topRecruiters } from "../data/content";
import { Award, Building2, DollarSign, TrendingUp, Users } from "lucide-react";

export default function HiringStatsSection() {
  return (
    <section id="placements" className="bg-cream py-20 md:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-10 max-w-3xl">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-maroon/15 bg-white/80 px-4 py-2 text-sm font-semibold uppercase tracking-wide text-maroon shadow-sm backdrop-blur">
            <Award className="h-4 w-4" />
            Placement Highlights
          </div>
          <h2 className="text-3xl font-bold tracking-tight text-slate-900 md:text-5xl">
            Strong outcomes, elite offers, and trusted recruiters
          </h2>
          <p className="mt-4 max-w-2xl text-sm leading-7 text-gray-600 md:text-base">
            A clean view of recruiting companies, standout offers, and top recruiters connected to our students.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-12">
          <div className="lg:col-span-7 rounded-3xl border border-white/60 bg-white/80 p-5 shadow-[0_14px_50px_rgba(123,30,43,0.08)] backdrop-blur">
            <div className="mb-5 flex items-center gap-3 border-b border-maroon/10 pb-4">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-maroon/10 text-maroon">
                <TrendingUp className="h-5 w-5" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-900 md:text-xl">Forthcoming recruitment</h3>

              </div>
            </div>

            <div className="overflow-hidden rounded-2xl border border-gray-100">
              <div className="grid grid-cols-[64px_1.6fr_1fr] bg-maroon/5 px-4 py-3 text-xs font-bold uppercase tracking-wider text-gray-600 md:grid-cols-[80px_1.8fr_1fr]">
                <div>S. No.</div>
                <div>Company Name</div>
                <div className="text-right">Salary Package (LPA)</div>
              </div>
              <div className="divide-y divide-gray-100">
                {placementHighlights.map((item) => (
                  <div key={item.sno} className="grid grid-cols-[64px_1.6fr_1fr] items-center px-4 py-3 text-sm md:grid-cols-[80px_1.8fr_1fr]">
                    <div className="font-semibold text-maroon">{item.sno}</div>
                    <div className="font-medium text-slate-900">{item.company}</div>
                    <div className="text-right font-semibold text-slate-900">₹{item.salary}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 space-y-6">
            <div className="overflow-hidden rounded-3xl border border-white/60 bg-white/80 shadow-[0_14px_50px_rgba(123,30,43,0.08)] backdrop-blur">
              <div className="bg-gradient-to-r from-maroon to-maroon-light px-5 py-4 text-white">
                <div className="flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/15">
                    <Users className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold">Elite Placements</h3>
                    <p className="text-sm text-white/80">2024–2025 batch with 8+ LPA offers</p>
                  </div>
                </div>
              </div>

              <div className="max-h-[560px] overflow-auto">
                <div className="grid grid-cols-[52px_1.2fr_1fr_1.2fr_92px] bg-white px-4 py-3 text-xs font-bold uppercase tracking-wider text-gray-500 sticky top-0 border-b border-gray-100">
                  <div>S.No</div>
                  <div>Student</div>
                  <div>Reg. No.</div>
                  <div>Company</div>
                  <div className="text-right">LPA</div>
                </div>
                <div className="divide-y divide-gray-100 bg-white">
                  {elitePlacements.map((item) => (
                    <div key={item.sno} className="grid grid-cols-[52px_1.2fr_1fr_1.2fr_92px] items-center px-4 py-3 text-sm">
                      <div className="font-semibold text-maroon">{item.sno}</div>
                      <div className="font-medium text-slate-900">{item.student}</div>
                      <div className="font-mono text-xs text-gray-500">{item.regNo}</div>
                      <div className="truncate text-gray-700">{item.company}</div>
                      <div className="text-right font-semibold text-slate-900">₹{item.salary}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="rounded-3xl border border-white/60 bg-white/80 p-5 shadow-[0_14px_50px_rgba(123,30,43,0.08)] backdrop-blur">
              <div className="mb-4 flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-maroon/10 text-maroon">
                  <Building2 className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-900">Top Recruiters</h3>
                  <p className="text-sm text-gray-500">Trusted companies hiring our students</p>
                </div>
              </div>

              <div className="flex flex-wrap gap-2">
                {topRecruiters.map((company) => (
                  <span
                    key={company}
                    className="inline-flex items-center gap-2 rounded-full border border-gray-200 bg-cream px-3 py-1.5 text-sm text-gray-700 transition-all duration-200 hover:border-maroon hover:text-maroon"
                  >
                    <DollarSign className="h-3.5 w-3.5" />
                    {company}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}