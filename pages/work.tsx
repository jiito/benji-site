import { Layout } from "../components/Layout";
import { projects } from "../data/projects";
import Project from "../components/Project";

import styled from "styled-components";
const WorkPage = () => {
  return (
    <Layout>
      <ExpeditionList>
        {projects.map((project) => (
          <li>
            <Project project={project} />
          </li>
        ))}
      </ExpeditionList>
    </Layout>
  );
};
export default WorkPage;

const ExpeditionList = styled.ul`
  margin-left: 0;
  padding: 0;
  text-decoration: none;
  list-style: none;
`;
