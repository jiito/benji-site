import { NavBar } from './NavBar'

export const Layout = ({ children }) => {
    return (
        <div className="container">
            <>
                <div className="construction">
                    🚧 This page is currently under construction 🚧
                </div>
                <h1>jiito</h1>
                <NavBar />
            </>
            <div className="main">{children}</div>
        </div>
    )
}
