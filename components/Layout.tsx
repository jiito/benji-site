import { NavBar } from './NavBar'

export const Layout = ({ children }) => {
    return (
        <>
            <div>
                <h1>jiito</h1>
                <NavBar />
            </div>
            <div>{children}</div>
        </>
    )
}
