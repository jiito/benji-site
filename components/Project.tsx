import { Project } from "../data/projects"
import Link from "next/link"
import styled from "styled-components"


type ProjectProps = {
    project: Project
}

const Project = ({ project }: ProjectProps) => {

    return (<>
        <Link href={project.href} passHref>
            <ProjectLink>{project.name}</ProjectLink>
        </Link>
        <Description>{project.description}
        </Description>
        <ToolsUsedContainer> <Gear>Gear Used:</Gear> {project.toolsUsed.join(", ")}</ToolsUsedContainer>
    </>)
}

export default Project;


const ProjectLink = styled.a`
    text-decoration: underline;
`

const Description = styled.p`
    font-style: italic;
`

const ToolsUsedContainer = styled.div`
    display: flex;
    flex-direction: row;
`

const Tool = styled.p`
    margin-left: 4px;

`

const Gear = styled.span`
    font-style: bold;
`
