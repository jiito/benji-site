import { BannerImage } from "../components/BannerImage";
import { Layout } from "../components/Layout";
import Project from "../components/Project";
import { projects } from "../data/projects";

export default function Home() {
  return (
    <Layout>
      <div className="mt-8">
        <BannerImage
          src="/blue_spheres.png"
          height={200}
          width={200}
          alt="Blue spheres banner image"
        />
        <ul className="ml-0 p-0 list-none space-y-8">
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
      </div>
    </Layout>
  );
}
