import { Project } from "../data/projects";
import Link from "next/link";
import styled from "styled-components";

type ProjectProps = {
  project: Project;
};

const ProjectItem = ({ project }: ProjectProps) => {
  return (
    <ProjectContainer>
      <Link href={project.href} passHref>
        <ProjectLink>{project.name}</ProjectLink>
      </Link>
      <Description>{project.description}</Description>
      <ToolsUsedContainer>
        {" "}
        <Gear>Gear Used:</Gear> {project.toolsUsed.join(", ")}
      </ToolsUsedContainer>
    </ProjectContainer>
  );
};

export default ProjectItem;

const ProjectContainer = styled.div`
  margin-bottom: 20px;
`;

const ProjectLink = styled.a`
  text-decoration: underline;
`;

const Description = styled.p`
  font-style: italic;
`;

const Gear = styled.span`
  font-style: bold;
  margin-top: 2px;
  font-style: italic;
  margin-bottom: 4px;
`;

const ToolsUsedContainer = styled.div`
  margin-top: 0;
  display: flex;
  flex-direction: row;
`;
