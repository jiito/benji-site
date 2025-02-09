import { BannerImage } from "../components/BannerImage";
import { Layout } from "../components/Layout";
import Project from "../components/Project";
import { projects } from "../data/projects";

export default function Home() {
  return (
    <Layout>
      <BannerImage
        src="/blue_spheres.png"
        height={1200 / 2}
        width={1800}
        alt="Blue spheres banner image"
      />
      <div className="mt-8">
        <h3 className="text-2xl font-semibold mb-4">Expeditions</h3>
        <p className="text-lg mb-4">
          I imagine myself as an explorer who is slowly but intently charting a
          new world. Much of my life has thus far included various expeditions
          or forrays into different fields.{" "}
        </p>
        <p className="text-lg mb-6">
          Here are a few of the stops I have made along the way:
        </p>
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
