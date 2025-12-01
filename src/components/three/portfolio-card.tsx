import {AnimatePresence, motion} from "framer-motion";
import {ExternalLink, Github, X} from "lucide-react";
import {useEffect, useId, useRef, useState} from "react";
import {useOutsideClick} from "../../hooks/useOutsideClick";
import {Project} from "../../types";

export default function PortfolioProjects({projects}: {projects: Project[]}) {
  const [active, setActive] = useState<Project | null>(null);
  const [isHovering, setIsHovering] = useState(false);
  const id = useId();
  const ref = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const scrollIntervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) =>
      e.key === "Escape" && setActive(null);
    document.body.style.overflow = active ? "hidden" : "auto";
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [active]);

  useEffect(() => {
    if (!isHovering && scrollRef.current) {
      scrollIntervalRef.current = setInterval(() => {
        if (scrollRef.current) {
          scrollRef.current.scrollLeft += 1;
        }
      }, 30);
    } else {
      if (scrollIntervalRef.current) {
        clearInterval(scrollIntervalRef.current);
        scrollIntervalRef.current = null;
      }
    }

    return () => {
      if (scrollIntervalRef.current) {
        clearInterval(scrollIntervalRef.current);
      }
    };
  }, [isHovering]);

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
              className="max-w-2xl w-full bg-white dark:bg-[#0F172A] rounded-2xl overflow-hidden shadow-2xl relative border border-gray-200 dark:border-slate-700"
            >
              <motion.img
                layoutId={`image-${active.title}-${id}`}
                src={active.image}
                alt={active.title}
                className="w-full h-80 object-cover"
              />
              <div className="p-8">
                <motion.h3
                  layoutId={`title-${active.title}-${id}`}
                  className="text-2xl font-bold text-gray-900 dark:text-white font-domine"
                >
                  {active.title}
                </motion.h3>
                <motion.p
                  layoutId={`description-${active.description}-${id}`}
                  className="text-gray-600 dark:text-gray-300 mt-3 font-manrope leading-relaxed"
                >
                  {active.description}
                </motion.p>

                <div className="flex gap-6 mt-6">
                  {active.demoUrl && (
                    <a
                      href={active.demoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors"
                    >
                      <ExternalLink className="h-4 w-4" />
                      Demo
                    </a>
                  )}
                  {active.githubUrl && (
                    <a
                      href={active.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-4 py-2 bg-gray-800 hover:bg-gray-900 dark:bg-gray-700 dark:hover:bg-gray-600 text-white rounded-lg transition-colors"
                    >
                      <Github className="h-4 w-4" />
                      GitHub
                    </a>
                  )}
                </div>
              </div>
              <button
                onClick={() => setActive(null)}
                className="absolute top-4 right-4 bg-white dark:bg-slate-800 rounded-full p-2 shadow-lg hover:bg-gray-100 dark:hover:bg-slate-700 transition-colors"
              >
                <X className="h-5 w-5 text-gray-900 dark:text-white" />
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Horizontal Scrolling Container */}
      <div
        className="mt-8 w-screen relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] overflow-hidden"
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
      >
        <div
          ref={scrollRef}
          className="flex gap-6 overflow-x-auto pb-4 px-6 scrollbar-hide"
          style={{
            scrollBehavior: "smooth",
            msOverflowStyle: "none",
            scrollbarWidth: "none",
          }}
        >
          {projects.map((project) => (
            <motion.div
              layoutId={`card-${project.title}-${id}`}
              key={project.title}
              onClick={() => setActive(project)}
              className="flex-shrink-0 w-80 bg-white dark:bg-[#1A2F4A] rounded-xl overflow-hidden cursor-pointer hover:shadow-lg dark:hover:shadow-blue-900/20 border border-gray-200 dark:border-slate-700 transition-all hover:scale-105"
              whileHover={{y: -4}}
            >
              <motion.div
                layoutId={`image-${project.title}-${id}`}
                className="w-full h-48 overflow-hidden bg-gray-200 dark:bg-slate-700"
              >
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                />
              </motion.div>
              <div className="p-5">
                <motion.h3
                  layoutId={`title-${project.title}-${id}`}
                  className="text-lg font-semibold text-gray-900 dark:text-white font-domine truncate"
                >
                  {project.title}
                </motion.h3>
                <motion.p
                  layoutId={`description-${project.description}-${id}`}
                  className="text-sm leading-relaxed text-gray-600 dark:text-gray-400 font-manrope mt-2 line-clamp-2"
                >
                  {project.description}
                </motion.p>
                <div className="flex gap-3 mt-4">
                  {project.demoUrl && (
                    <a
                      href={project.demoUrl}
                      onClick={(e) => e.stopPropagation()}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1 text-blue-500 hover:text-blue-600 text-sm"
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
                      className="flex items-center gap-1 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white text-sm"
                    >
                      <Github className="h-3 w-3" />
                      Code
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Custom Scrollbar Styles */}
      <style>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </>
  );
}
