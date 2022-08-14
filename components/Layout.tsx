import { NavBar } from './Navbar'
import React from 'react'
import Footer from './Footer'

export const Layout: React.FC = ({ children }) => {
    return (
        <div className="container">
            <>
                <div className="construction">
                    🚧 This page is currently under construction 🚧
                </div>
                <NavBar />
                <h1>jiito</h1>
            </>
            <div className="main">{children}</div>
            <Footer />
        </div>
    )
}
