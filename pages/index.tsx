import type { NextPage } from "next";
import { Layout } from "../components/Layout";
import Project from "../components/Project";
import { projects } from "../data/projects";

const Home: NextPage = () => {
  return (
    <Layout>
      <img
        src="/blue_balls.png"
        height="100px"
        style={{ objectFit: "cover" }}
      />
      <h3>🏔 Expeditions</h3>
      <ul>
        {projects.map((project) => (
          <li>
            <Project project={project} />
          </li>
        ))}
      </ul>
    </Layout>
  );
};

export default Home;
