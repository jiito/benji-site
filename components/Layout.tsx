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
            <h1>jiito</h1>
          </Link>
        </HomeLink>
      </>
      <div className="main">{children}</div>
      <Footer />
    </PageContainer>
  );
};

const HomeLink = styled.div`
  :hover {
    cursor: pointer;
  }
`;

const PageContainer = styled.div`
  margin: auto;
  padding: 15px;
  max-width: 750px;
`;
