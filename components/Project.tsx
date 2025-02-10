"use client";

import { Project as ProjectType } from "../data/projects";

interface ProjectProps {
  project: ProjectType;
}

export default function Project({ project }: ProjectProps) {
  return (
    <div className="mb-8 bg-[#f3f3f3] p-5 rounded-lg border border-[#e9e9e9]">
      <a
        href={project.href}
        target="_blank"
        rel="noreferrer"
        className="underline"
      >
        <h4 className="text-lg font-semibold mb-2">{project.name}</h4>
      </a>
      <p className="mt-0 italic mb-4">{project.description}</p>
      <div className="flex flex-wrap gap-2 text-gray-600 italic">
        {project.toolsUsed.map((tool) => (
          <span key={tool} className="text-sm">
            {tool}
            {tool !== project.toolsUsed[project.toolsUsed.length - 1] && ", "}
          </span>
        ))}
      </div>
    </div>
  );
}
