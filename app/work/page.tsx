import { projects } from "@/data/projects";
import { ProjectCard } from "@/components/project-card";

export default function WorkPage() {
  return (
      <ul className="ml-0 p-0 list-none">
        {projects.map((project) => (
          <li key={project.name}>
            <ProjectCard project={project} />
          </li>
        ))}
      </ul>
  );
}
