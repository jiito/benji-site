import styled from "styled-components";

const SOCIAL_LINKS = [{
    name: "twitter",
    href: "https://twitter.com/beeejar"
}
    , {
    name: "github",
    href: "https://github.com/jiito"
}
]

const Footer = () => {
    return (
        <>
            <Break />
            <CenteredDiv>
                <p>
                    Built by Benji using Next.js, © 2022
                </p>
                <SocialLinks
                >
                    {SOCIAL_LINKS.map((s) => (
                        <div><a href={s.href}>{s.name}</a></div>
                    ))}
                </SocialLinks>
            </CenteredDiv>
        </>
    );
};
export default Footer;

const Break = styled.hr`
  color: gray;
  width: 25%;
`

const CenteredDiv = styled.div`
  margin: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`

const SocialLinks = styled.div`
  display:flex;
  flex-direction: row;
`
