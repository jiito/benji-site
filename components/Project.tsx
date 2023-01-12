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
  margin-bottom: 10px;
  background: #f3f3f3;
  padding: 10px 20px;
  border-radius: 5px;
  border: 1px solid #e9e9e9;
`;

const ProjectLink = styled.a`
  text-decoration: underline;
`;

const Description = styled.p`
  font-style: italic;
`;

const Gear = styled.span`
  margin-right: 4px;
  font-style: normal;
`;

const ToolsUsedContainer = styled.div`
  margin-top: 0;
  display: flex;
  flex-direction: row;
  align-items: center;
  font-style: italic;
  color: grey;
`;
