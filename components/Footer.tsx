import styled from "styled-components";
import Link from "next/link";

const SOCIAL_LINKS = [
  {
    name: "twitter",
    href: "https://twitter.com/beeejar",
  },
  {
    name: "github",
    href: "https://github.com/jiito",
  },
];

const Footer = () => {
  return (
    <Container>
      <Break />
      <CenteredDiv>
        <SocialLinks>
          {SOCIAL_LINKS.map((s) => (
            <Link href={s.href} passHref>
              <SocialLinkItem>{s.name}</SocialLinkItem>
            </Link>
          ))}
        </SocialLinks>
        <p>built by benji ar © 2023</p>
      </CenteredDiv>
    </Container>
  );
};
export default Footer;

const Container = styled.div`
  margin-top: 40px;
  color: gray;
`;

const Break = styled.hr`
  color: gray;
  width: 25%;
`;

const CenteredDiv = styled.div`
  margin: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const SocialLinks = styled.div`
  display: flex;
  width: 100%;
  flex-direction: row;
  justify-content: center;
`;

const SocialLinkItem = styled.a`
  margin-right: 8px;
`;
