import type { NextPage } from "next";
import styled from "styled-components";
import { BannerImage } from "../components/BannerImage";
import { Layout } from "../components/Layout";
import Project from "../components/Project";
import { projects } from "../data/projects";

const Home: NextPage = () => {
  return (
    <Layout>
      <BannerImage src="/blue_spheres.png" height={1200 / 2} width={1800} />
      <h3>Expeditions</h3>
      <p>
        I imagine myself as an explorer who is slowly but intently charting a
        new world. Much of my life has thus far included various expeditions or
        forrays into different fields.{" "}
      </p>
      <p>Here are a few of the stops I have made along the way:</p>
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

export default Home;

const ExpeditionList = styled.ul`
  margin-left: 0;
  padding: 0;
  text-decoration: none;
  list-style: none;
`;
