import { projects } from "@/data/projects";
import Project from "@/components/project";

export default function WorkPage() {
  return (
      <ul className="ml-0 p-0 list-none">
        {projects.map((project) => (
          <li key={project.name}>
            <Project project={project} />
          </li>
        ))}
      </ul>
  );
}
