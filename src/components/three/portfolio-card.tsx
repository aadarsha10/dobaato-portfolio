import {
  AnimatePresence,
  motion,
  useMotionTemplate,
  useMotionValue,
} from "framer-motion";
import {ArrowUpRight, ExternalLink, Github, Layers, X} from "lucide-react";
import {useEffect, useId, useRef, useState} from "react";
import {useOutsideClick} from "../../hooks/useOutsideClick";
import {Project} from "../../types";

const categoryStyles: Record<Project["category"], string> = {
  web: "from-blue-500 to-cyan-400",
  mobile: "from-fuchsia-500 to-pink-400",
  analytics: "from-emerald-500 to-teal-400",
};

function PortfolioProjectCard({
  project,
  id,
  onOpen,
}: {
  project: Project;
  id: string;
  onOpen: (project: Project) => void;
}) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const radialBackground = useMotionTemplate`radial-gradient(500px circle at ${mouseX}px ${mouseY}px, rgba(59, 130, 246, 0.18), transparent 65%)`;

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);
  };

  return (
    <motion.article
      layoutId={`card-${project.title}-${id}`}
      onMouseMove={handleMouseMove}
      onClick={() => onOpen(project)}
      initial={{opacity: 0, y: 20}}
      whileInView={{opacity: 1, y: 0}}
      whileHover={{y: -10, rotateX: 2.5, rotateY: -2.5}}
      transition={{duration: 0.45, ease: [0.16, 1, 0.3, 1]}}
      viewport={{once: true, amount: 0.2}}
      className="group relative isolate cursor-pointer overflow-hidden rounded-3xl border border-slate-200/90 bg-white/85 shadow-[0_20px_70px_-30px_rgba(15,23,42,0.55)] backdrop-blur-xl will-change-transform dark:border-slate-700/90 dark:bg-slate-900/75"
      style={{transformStyle: "preserve-3d"}}
    >
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{background: radialBackground}}
      />

      <div
        className={`absolute inset-x-6 top-6 h-24 rounded-full bg-gradient-to-r ${categoryStyles[project.category]} opacity-25 blur-3xl dark:opacity-35`}
      />

      <motion.div
        layoutId={`image-${project.title}-${id}`}
        className="relative h-56 overflow-hidden"
      >
        <img
          src={project.image}
          alt={project.title}
          className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/20 to-transparent" />
        <div className="absolute inset-x-5 bottom-5 flex items-center justify-between">
          <span className="rounded-full border border-white/30 bg-white/20 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-white backdrop-blur-md">
            {project.category}
          </span>
          <span className="rounded-full bg-white/20 p-2 text-white backdrop-blur-md transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1">
            <ArrowUpRight className="h-4 w-4" />
          </span>
        </div>
      </motion.div>

      <div className="relative space-y-4 px-6 pb-6 pt-5">
        <motion.h3
          layoutId={`title-${project.title}-${id}`}
          className="line-clamp-2 text-xl font-bold text-slate-900 dark:text-white font-domine"
        >
          {project.title}
        </motion.h3>

        <motion.p
          layoutId={`description-${project.description}-${id}`}
          className="line-clamp-3 text-sm leading-relaxed text-slate-600 dark:text-slate-300"
        >
          {project.description}
        </motion.p>

        <div className="flex items-center justify-between border-t border-slate-200/90 pt-4 dark:border-slate-700/80">
          <div className="inline-flex items-center gap-2 text-xs font-medium uppercase tracking-wider text-blue-500 dark:text-slate-400">
            <Layers className="h-3.5 w-3.5 text-blue-700" />
            Deployed
          </div>

          <div className="flex items-center gap-2">
            {project.demoUrl && (
              <a
                href={project.demoUrl}
                onClick={(e) => e.stopPropagation()}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 rounded-full border border-blue-200 bg-blue-50 px-3 py-1.5 text-xs font-semibold text-blue-700 transition-colors hover:bg-blue-100 dark:border-blue-500/35 dark:bg-blue-500/15 dark:text-blue-200 dark:hover:bg-blue-500/25"
              >
                <ExternalLink className="h-3 w-3" />
                Demo
              </a>
            )}
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                onClick={(e) => e.stopPropagation()}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 rounded-full border border-slate-300 bg-slate-100 px-3 py-1.5 text-xs font-semibold text-slate-700 transition-colors hover:bg-slate-200 dark:border-slate-600 dark:bg-slate-700/70 dark:text-slate-100 dark:hover:bg-slate-700"
              >
                <Github className="h-3 w-3" />
                Code
              </a>
            )}
          </div>
        </div>
      </div>
    </motion.article>
  );
}

export default function PortfolioProjects({projects}: {projects: Project[]}) {
  const [active, setActive] = useState<Project | null>(null);
  const [visibleOtherProjects, setVisibleOtherProjects] = useState(0);
  const id = useId();
  const ref = useRef<HTMLDivElement>(null);

  const featuredProjects = projects.filter((project) => project.featured);
  const otherProjects = projects.filter((project) => !project.featured);

  useEffect(() => {
    setVisibleOtherProjects(featuredProjects.length > 0 ? 0 : 6);
  }, [projects, featuredProjects.length]);

  const displayedProjects = [
    ...featuredProjects,
    ...otherProjects.slice(0, visibleOtherProjects),
  ];
  const hasHiddenOtherProjects = visibleOtherProjects < otherProjects.length;

  const handleLoadMore = () => {
    setVisibleOtherProjects((prev) => Math.min(prev + 6, otherProjects.length));
  };

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) =>
      e.key === "Escape" && setActive(null);
    document.body.style.overflow = active ? "hidden" : "auto";
    window.addEventListener("keydown", handleEsc);

    return () => {
      window.removeEventListener("keydown", handleEsc);
    };
  }, [active]);

  useOutsideClick(ref, () => setActive(null));

  return (
    <>
      {/* Overlay */}
      <AnimatePresence>
        {active && (
          <motion.div
            initial={{opacity: 0}}
            animate={{opacity: 1}}
            exit={{opacity: 0}}
            className="fixed inset-0 bg-black/40 z-40 backdrop-blur-sm"
          />
        )}
      </AnimatePresence>

      {/* Modal */}
      <AnimatePresence>
        {active && (
          <div className="fixed inset-0 z-50 flex justify-center items-center p-4">
            <motion.div
              ref={ref}
              layoutId={`card-${active.title}-${id}`}
              initial={{scale: 0.9, opacity: 0}}
              animate={{scale: 1, opacity: 1}}
              exit={{scale: 0.9, opacity: 0}}
              className="relative w-full max-w-4xl overflow-hidden rounded-3xl border border-slate-200 bg-white/95 shadow-2xl dark:border-slate-700 dark:bg-[#0F172A]/95"
            >
              <div className="grid md:grid-cols-[1.15fr_1fr]">
                <motion.img
                  layoutId={`image-${active.title}-${id}`}
                  src={active.image}
                  alt={active.title}
                  className="h-72 w-full object-cover md:h-full"
                />
                <div className="space-y-4 p-8">
                  <span className="inline-flex rounded-full border border-slate-300 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-slate-600 dark:border-slate-600 dark:text-slate-300">
                    {active.category} project
                  </span>
                  <motion.h3
                    layoutId={`title-${active.title}-${id}`}
                    className="text-2xl font-domine font-bold text-slate-900 dark:text-white"
                  >
                    {active.title}
                  </motion.h3>
                  <motion.p
                    layoutId={`description-${active.description}-${id}`}
                    className="text-sm leading-relaxed text-slate-600 dark:text-slate-300"
                  >
                    {active.description}
                  </motion.p>

                  <div className="mt-6 flex flex-wrap gap-3">
                    {active.demoUrl && (
                      <a
                        href={active.demoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white font-domine transition-colors hover:bg-blue-700"
                      >
                        <ExternalLink className="h-4 w-4" />
                        Visit Demo
                      </a>
                    )}
                    {active.githubUrl && (
                      <a
                        href={active.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 rounded-xl border border-slate-300 bg-slate-100 px-4 py-2.5 text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-200 dark:border-slate-600 dark:bg-slate-700/70 dark:text-slate-100 dark:hover:bg-slate-700"
                      >
                        <Github className="h-4 w-4" />
                        View Code
                      </a>
                    )}
                  </div>
                </div>
              </div>
              <button
                onClick={() => setActive(null)}
                className="absolute right-4 top-4 rounded-full border border-slate-200 bg-white/90 p-2 text-slate-700 shadow-lg backdrop-blur transition-colors hover:bg-white dark:border-slate-600 dark:bg-slate-800/90 dark:text-white"
              >
                <X className="h-5 w-5" />
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <motion.div
        className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3"
        initial="hidden"
        whileInView="show"
        viewport={{once: true, amount: 0.15}}
        variants={{
          hidden: {opacity: 0},
          show: {
            opacity: 1,
            transition: {
              staggerChildren: 0.08,
              delayChildren: 0.1,
            },
          },
        }}
      >
        {displayedProjects.map((project) => (
          <PortfolioProjectCard
            key={project.title}
            project={project}
            id={id}
            onOpen={setActive}
          />
        ))}
      </motion.div>

      {hasHiddenOtherProjects && (
        <div className="mt-8 flex justify-center">
          <button
            onClick={handleLoadMore}
            className="rounded-xl border border-slate-300 bg-white px-5 py-2.5 text-sm font-semibold text-slate-700 shadow-sm transition-colors hover:bg-slate-100 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-100 dark:hover:bg-slate-700"
          >
            {visibleOtherProjects === 0 ? "Load More Projects" : "Load More"}
          </button>
        </div>
      )}

      {displayedProjects.length === 0 && (
        <div className="mt-8 rounded-2xl border border-dashed border-slate-300 bg-slate-50 px-6 py-10 text-center text-slate-600 dark:border-slate-700 dark:bg-slate-900/40 dark:text-slate-300">
          Portfolio projects will appear here once available.
        </div>
      )}
    </>
  );
}
