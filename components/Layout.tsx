import { NavBar } from "./Navbar";
import Link from "next/link";
import React from "react";
import Footer from "./Footer";
import styled from "styled-components";

export const Layout: React.FC = ({ children }) => {
  return (
    <PageContainer>
      <>
        <NavBar />
        <HomeLink>
          <Link href={"/"}>
            <h1>Ben Allan-Rahill</h1>
          </Link>
        </HomeLink>
        <Email>benjamin [dot] allanrahill [at] gmail</Email>
      </>
      <div className="main">{children}</div>
      <Footer />
    </PageContainer>
  );
};

const Email = styled.p`
  font-style: italic;
  font-size: 14px;
  font-weight: 400;
  color: #7c7c7c;
`;

const HomeLink = styled.div`
  :hover {
    cursor: pointer;
  }
  margin-bottom: -1.5rem;
`;

const PageContainer = styled.div`
  margin: auto;
  padding: 15px;
  max-width: 750px;
`;
