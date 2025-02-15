import CombinedGraph from "../components/ActivityTracker/CombinedGraph";
import { Layout } from "../components/Layout";
import Project from "../components/Project";
import { projects } from "../data/projects";

export default function Home() {
  return (
    <Layout>
      {/* <ActivityGraph />
        <GithubGraph /> */}
      <CombinedGraph />
      <ul className="ml-0 p-0 list-none ">
        {projects.map((project) => {
          return (
            project.featured && (
              <li key={project.name}>
                <Project project={project} />
              </li>
            )
          );
        })}
      </ul>
    </Layout>
  );
}
