import {AnimatePresence, motion} from "framer-motion";
import {
  Briefcase,
  CalendarClock,
  ExternalLink,
  MapPin,
  Send,
  X,
} from "lucide-react";
import {memo, useCallback, useEffect, useMemo, useState} from "react";
import {createPortal} from "react-dom";
import type {Job} from "../../types/careers";
import {formatJobDescription} from "../../utils/formatters";

interface JobCardProps {
  job: Job;
}

type DescriptionParagraph = {
  id: number;
  lines: string[];
};

interface JobDetailsModalProps {
  job: Job;
  isOpen: boolean;
  onClose: () => void;
  descriptionParagraphs: DescriptionParagraph[];
}

const JobDetailsModal = memo(function JobDetailsModal({
  job,
  isOpen,
  onClose,
  descriptionParagraphs,
}: JobDetailsModalProps) {
  useEffect(() => {
    if (!isOpen || typeof document === "undefined") return;

    const {body} = document;
    const originalOverflow = body.style.overflow;
    body.style.overflow = "hidden";

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };

    window.addEventListener("keydown", onKeyDown);

    return () => {
      body.style.overflow = originalOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [isOpen, onClose]);

  if (typeof document === "undefined") return null;

  return createPortal(
    <AnimatePresence initial={false} mode="wait">
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-5"
          initial={{opacity: 0}}
          animate={{opacity: 1}}
          exit={{opacity: 0}}
          transition={{duration: 0.16}}
        >
          <button
            type="button"
            aria-label="Close details"
            onClick={onClose}
            className="absolute inset-0 bg-black/45 backdrop-blur-[2px]"
          />

          <motion.div
            className="relative z-10 max-h-[92vh] w-[min(96vw,1120px)] overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl dark:border-slate-700 dark:bg-slate-900"
            initial={{opacity: 0, y: 14, scale: 0.985}}
            animate={{opacity: 1, y: 0, scale: 1}}
            exit={{opacity: 0, y: 8, scale: 0.992}}
            transition={{duration: 0.2, ease: "easeOut"}}
            style={{willChange: "transform, opacity"}}
          >
            <div className="pointer-events-none absolute right-0 top-0 h-16 w-24 bg-gradient-to-bl from-primary-500/20 to-sky-400/10 [clip-path:polygon(100%_0,0_0,100%_100%)]" />

            <div className="flex items-start justify-between gap-4 border-b border-slate-200 px-5 py-5 sm:px-7 dark:border-slate-700">
              <div className="space-y-2">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-sky-600 dark:text-sky-300">
                  Job Details
                </p>
                <h4 className="text-2xl font-bold leading-tight text-slate-900 dark:text-white font-domine md:text-3xl">
                  {job.title}
                </h4>
                <div className="flex flex-wrap gap-2 text-xs text-slate-500 dark:text-slate-400">
                  <span className="rounded-full bg-sky-100 px-3 py-1 font-semibold text-sky-700 dark:bg-sky-500/20 dark:text-sky-200">
                    {job.type}
                  </span>
                  <span className="inline-flex items-center gap-1 rounded-full border border-slate-300 px-3 py-1 dark:border-slate-600">
                    <MapPin className="h-3.5 w-3.5" />
                    {job.location}
                  </span>
                  <span className="inline-flex items-center gap-1 rounded-full border border-slate-300 px-3 py-1 dark:border-slate-600">
                    <CalendarClock className="h-3.5 w-3.5" />
                    {job.postedAt}
                  </span>
                </div>
              </div>

              <button
                type="button"
                onClick={onClose}
                className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-slate-300 text-slate-500 transition hover:border-slate-400 hover:text-slate-800 dark:border-slate-600 dark:text-slate-300 dark:hover:text-white"
              >
                <X className="h-4.5 w-4.5" />
              </button>
            </div>

            <div className="max-h-[calc(92vh-9.25rem)] overflow-y-auto px-5 py-5 sm:px-7 sm:py-6">
              <div className="grid grid-cols-1 gap-6 lg:grid-cols-[minmax(0,1.65fr)_minmax(0,1fr)]">
                <section className="rounded-xl border border-slate-200 bg-slate-50/65 p-4 dark:border-slate-700 dark:bg-slate-800/35 sm:p-5">
                  <h5 className="mb-3 text-sm font-semibold uppercase tracking-[0.12em] text-slate-700 dark:text-slate-200">
                    Role Overview
                  </h5>
                  <div className="space-y-3 text-sm leading-relaxed text-slate-700 dark:text-slate-300 md:text-base">
                    {descriptionParagraphs.map((paragraph) => (
                      <div key={paragraph.id}>
                        {paragraph.lines.map((line, lineIdx) => (
                          <p key={lineIdx}>{line}</p>
                        ))}
                      </div>
                    ))}
                  </div>
                </section>

                <aside className="space-y-4">
                  <div className="rounded-xl border border-sky-200 bg-sky-50/70 p-4 dark:border-sky-500/30 dark:bg-sky-500/10 sm:p-5">
                    <h5 className="mb-3 text-sm font-semibold uppercase tracking-[0.12em] text-sky-700 dark:text-sky-200">
                      Quick Summary
                    </h5>
                    <ul className="space-y-2 text-sm text-slate-700 dark:text-slate-300">
                      <li className="flex items-center justify-between gap-3">
                        <span>Employment</span>
                        <span className="font-semibold">{job.type}</span>
                      </li>
                      <li className="flex items-center justify-between gap-3">
                        <span>Location</span>
                        <span className="font-semibold">{job.location}</span>
                      </li>
                      <li className="flex items-center justify-between gap-3">
                        <span>Posted</span>
                        <span className="font-semibold">{job.postedAt}</span>
                      </li>
                    </ul>
                  </div>

                  {job.requirements && job.requirements.length > 0 && (
                    <div className="rounded-xl border border-slate-200 bg-white p-4 dark:border-slate-700 dark:bg-slate-900/40 sm:p-5">
                      <h5 className="mb-3 text-sm font-semibold uppercase tracking-[0.12em] text-slate-700 dark:text-slate-200">
                        Key Requirements
                      </h5>
                      <ul className="space-y-2.5 text-sm text-slate-700 dark:text-slate-300">
                        {job.requirements.map((req, idx) => (
                          <li key={idx} className="flex gap-2.5">
                            <span className="mt-1.5 inline-flex h-1.5 w-1.5 flex-shrink-0 rounded-full bg-sky-500" />
                            {req}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  <a
                    href={`mailto: careers@dobaato.com?subject=${encodeURIComponent(
                      job.title,
                    )}`}
                    className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-sky-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-sky-700"
                  >
                    <Send className="h-4 w-4" />
                    Apply For This Role
                  </a>
                </aside>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body,
  );
});

export const JobCard = memo(function JobCard({job}: JobCardProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const shortSummary = useMemo(() => {
    const plainText = job.description.replace(/\s+/g, " ").trim();
    if (plainText.length <= 140) return plainText;
    return `${plainText.slice(0, 140)}...`;
  }, [job.description]);

  const descriptionParagraphs = useMemo(
    () => formatJobDescription(job.description),
    [job.description],
  );

  const openModal = useCallback(() => setIsModalOpen(true), []);
  const closeModal = useCallback(() => setIsModalOpen(false), []);

  return (
    <article className="group h-full rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm transition duration-300 hover:-translate-y-0.5 hover:shadow-md dark:border-slate-700/70 dark:bg-slate-900/80 md:p-6">
      <div className="mb-4 flex flex-wrap items-center gap-2">
        <span className="rounded-full bg-sky-100 px-3 py-1 text-xs font-semibold text-sky-700 dark:bg-sky-500/20 dark:text-sky-200">
          {job.type}
        </span>
        <span className="rounded-full border border-slate-300 px-3 py-1 text-xs font-medium text-slate-600 dark:border-slate-600 dark:text-slate-300">
          {job.location}
        </span>
      </div>

      <div className="flex items-start justify-between gap-4">
        <div className="space-y-2">
          <h3 className="text-xl font-semibold text-slate-900 dark:text-white font-domine">
            {job.title}
          </h3>
          <div className="flex flex-wrap gap-3 text-xs text-slate-500 dark:text-slate-400">
            <span className="flex items-center gap-1.5">
              <Briefcase className="h-4 w-4" />
              {job.type}
            </span>
            <span className="flex items-center gap-1.5">
              <MapPin className="h-4 w-4" />
              {job.location}
            </span>
            <span className="flex items-center gap-1.5">
              <CalendarClock className="h-4 w-4" />
              {job.postedAt}
            </span>
          </div>
        </div>

        <a
          href={`mailto: careers@dobaato.com?subject=${encodeURIComponent(
            job.title,
          )}`}
          className="hidden shrink-0 items-center gap-1 rounded-lg bg-sky-600 px-3 py-2 text-sm font-medium text-white transition hover:bg-sky-700 sm:inline-flex"
        >
          <Send className="h-3.5 w-3.5" />
          Apply
        </a>
      </div>

      <p className="mt-4 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
        {shortSummary}
      </p>

      <div className="mt-5 flex flex-wrap items-center gap-2">
        {job.requirements.slice(0, 3).map((requirement, idx) => (
          <span
            key={`${requirement}-${idx}`}
            className="rounded-full bg-slate-100 px-3 py-1 text-xs text-slate-600 dark:bg-slate-800 dark:text-slate-300"
          >
            {requirement}
          </span>
        ))}
      </div>

      <button
        type="button"
        onClick={openModal}
        className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-sky-700 transition hover:text-sky-800 dark:text-sky-300 dark:hover:text-sky-200"
      >
        View More
        <ExternalLink className="h-4 w-4" />
      </button>

      <a
        href={`mailto: careers@dobaato.com?subject=${encodeURIComponent(
          job.title,
        )}`}
        className="mt-5 inline-flex items-center gap-1 rounded-lg bg-sky-600 px-3 py-2 text-sm font-medium text-white transition hover:bg-sky-700 sm:hidden"
      >
        <Send className="h-3.5 w-3.5" />
        Apply
      </a>

      <JobDetailsModal
        job={job}
        isOpen={isModalOpen}
        onClose={closeModal}
        descriptionParagraphs={descriptionParagraphs}
      />
    </article>
  );
});
