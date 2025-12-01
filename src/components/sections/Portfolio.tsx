import {useEffect, useState} from "react";
import {projects as localProject} from "../../data/projects";
import {supabase} from "../../SupabaseClient";
import {Project} from "../../types"; // Adjust the import path as necessary
import PortfolioCard from "../three/portfolio-card";
import SectionTitle from "../ui/SectionTitle";

export default function Portfolio() {
  const [activeFilter] = useState("all");
  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    const fetchProjects = async () => {
      const {data, error} = await supabase.from("Portfolio").select("*");

      if (error) {
        setProjects(localProject);
        console.error("Error fetching projects:", error);
      } else {
        setProjects(data);
      }
    };

    fetchProjects();
  }, []);

  const filteredProjects =
    activeFilter === "all"
      ? projects
      : projects.filter((project) => project.category === activeFilter);

  const reversedProjects = [...filteredProjects].reverse();

  return (
    <section id="portfolio" className="py-24 bg-white dark:bg-[#10172A]">
      <div className="container  mx-auto flex flex-col gap-10 px-6 md:px-0 w-full md:w-[70%]">
        <SectionTitle
          title="Our Portfolio"
          subtitle="Recent Projects & Case Studies"
        />

        {/* <div className="flex justify-center gap-4 mt-8">
					{categories.map((category) => (
						<button
							key={category}
							onClick={() => setActiveFilter(category)}
							className={`px-4 py-2 rounded-lg capitalize ${
								activeFilter === category
									? "bg-primary-500 text-white"
									: "bg-gray-200 dark:bg-[#1E293B] text-gray-500 dark:text-gray-400 hover:dark:bg-dark-300 hover:bg-gray-300"
							}`}
						>
							{category}
						</button>
					))}
				</div> */}

        <PortfolioCard projects={reversedProjects} />
      </div>
    </section>
  );
}
