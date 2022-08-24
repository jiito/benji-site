import { NavBar } from "./Navbar";
import React from "react";
import Footer from "./Footer";
import styled from "styled-components";

export const Layout: React.FC = ({ children }) => {
    return (
        <PageContainer>
            <>
                {/*
        <div className="construction">
          🚧 This page is currently under construction 🚧
        </div>*/}
                <NavBar />
                <h1>jiito</h1>
            </>
            <div className="main">{children}</div>
            <Footer />
        </PageContainer>
    );
};

const PageContainer = styled.div`
  margin: auto;
  padding: 15px;
  max-width: 750px;
`;
