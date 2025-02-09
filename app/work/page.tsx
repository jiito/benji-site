import { Layout } from "../../components/Layout";
import { projects } from "../../data/projects";
import Project from "../../components/Project";

export default function WorkPage() {
  return (
    <Layout>
      <ul className="ml-0 p-0 list-none">
        {projects.map((project) => (
          <li key={project.name}>
            <Project project={project} />
          </li>
        ))}
      </ul>
    </Layout>
  );
}
