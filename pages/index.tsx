import type { NextPage } from "next";
import styled from "styled-components";
import Project from "../components/Project";
import { projects } from "../data/projects";
import Image from "next/image";

const Home: NextPage = () => {
  return (
    <div>
      <BannerImage src="/blue_balls.png" height={100} width={500} />
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
    </div>
  );
};

export default Home;

const ExpeditionList = styled.ul`
  margin-left: 0;
  padding: 0;
  text-decoration: none;
  list-style: none;
`;

const BannerImage = styled(Image)`
  object-fit: cover;
  border-radius: 5px;
`;
