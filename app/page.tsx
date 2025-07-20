import { ProjectCard } from "@/components/project-card";
import { projects } from "@/data/projects";

export default function Home() {
  return (
      <div className="mt-8">
        <ul className="ml-0 p-0 list-none space-y-8">
          {projects.map((project) => {
            return (
              project.featured && (
                <li key={project.name}>
                  <ProjectCard project={project} />
                </li>
              )
            );
          })}
        </ul>
      </div>
  );
}
