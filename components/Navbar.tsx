import Link from "next/link";

const NAVLINKS = [
  {
    name: "work",
    link: "/work",
  },
  {
    name: "art",
    link: "/art",
  },
  {
    name: "dev",
    link: "https://github.com/jiito",
  },
];

export const NavBar = () => {
  return (
    <>
      <div className="nav">
        <nav>
          {NAVLINKS.map((item, i, arr) => (
            <Link href={item.link} key={i}>
              {"/" + item.name}
            </Link>
          ))}
        </nav>
      </div>
    </>
  );
};
