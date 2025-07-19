
import Image from "next/image";
import { BannerImage } from "../../components/BannerImage";

export default function AspnProjectPage() {
  return (
    <>
      <BannerImage
        src="/knight-in-the-woods.png"
        height={100}
        width={500}
        alt="Knight in the woods illustration"
      />
      <h1>
        <span className="bg-[#241023] font-mono text-[#00b295] px-2 py-0.5 rounded-[0.1em]">
          aspn
        </span>
        : Volunteer Hosting for Web Applications{" "}
      </h1>
      <h3>Introduction</h3>
      <p>
        The field of volunteer computing was inspired by the realization of
        Moore&apos;s Law—computers will continue to get faster and smaller while
        becoming cheaper, exponentially [ And10 ]. On top of this, developers
        turn to cloud service providers (CSPs) to host all types of applications
        from consumer web apps to machine learning models. These hosting
        solutions are expensive for corporations and unrealistic for a hobbyist.
        At the same time, we have witnessed an increased interest in
        decentralization with cryptocurrencies, decentralized autonomous
        organizations (DAOs), and decentralized apps (dApps) [ Law21 ]. These
        dApps gain their decentralization by using programs hosted on
        blockchains like Ethereum and Solana to run their business-logic;
        however, if there is any web component, it is often centrally hosted
        with a CSP. This poses an opportunity to completely decentralize these
        new applications and build on the altruistic backbone of volunteer
        computing.
      </p>
      <h3>Inspiration</h3>
      <p>
        Most web applications are hosted on large cloud service providers
        (Google, AWS, Azure). There are over a billion computing devices
        connected to the internet. Cryptocurrencies, tokenization, and
        decentralization have gained traction with new types of payments and
        applications.
      </p>
      <h3>Goal</h3>
      <p>
        The aspn network aims to combine the rise of decentralization with new
        technology, such as WebAssembly, to build a platform where developers
        publish their applications on a decentralized community of hosts. Aspn
        allows anyone with a device connected to the internet to support their
        favorite application and earn rewards by hosting microservices.
      </p>
      <h3>Implementation</h3>
      <Image
        src="/aspn-system.png"
        height={1360 / 2}
        width={1760 / 2}
        alt="ASPN system architecture diagram"
      />
      <p>
        Typical web applications are built with a frontend and a backend. When a
        internet users accesses a web-page, under the hood, they are downloading
        and executing the front end code—HTML, CSS, and Javascript files. For
        security, this frontend code will send requests to an application
        programming interface (API).
      </p>
      <p>
        Aspn combines the scalability of microservices to build a network that
        allows developers to host their backend APIs as microservices,
        distributed across hosts with personal computing devices. When the
        developer makes a request to their microservice, the request will be
        received by the aspn API and then proxied to the correct host. The
        correct host will be determined by a scalable load balancing algorithm.
        When a host connects to the aspn network, they are downloading and
        running a microservice function from the aspn API. To reduce the
        complexity and make aspn extensible, the network expects microservices
        in WebAssembly. WebAssembly is a compilation target of many languages
        and provides speed and security. When the host starts the aspn program,
        they open a server on their machine that listens for requests. When a
        request to the microservice is proxied from the aspn API, the
        WebAssembly function is executed and the result returned. This result
        gets propagated all the way back to the user of the webpage.
      </p>
      <h3>Tools Used</h3>
      <ul>
        <li> Rust</li>
      </ul>
      <h3>Future Work</h3>
      <p>
        A tokenization and reward system was not completed by the end of the
        semester and would be integral to recruiting hosts for the network.
        Adding a web platform that allows hosts and developers to manage their
        programs and connections would be great for accessibility of the project
        Full compatible HTTP interface would be necessary for full-fledged
        applications.
      </p>
    </>
  );
}
