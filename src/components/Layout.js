
import { useAuth } from "../context/auth-context";
import { Link } from "react-router-dom";

import './layout.css'

const Layout = ({ children }) => {
    const {user, signout} = useAuth();

    return (
        <>
            <div className="header">
                <div className="logo">LOGO</div>
                <div className="site-nav">
                    <ul className="nav-list">
                        <li className="nav-item">
                            <Link to="/">Home</Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/login">Login</Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/register">Register</Link>
                        </li>
                        {user && (
                            <li className="nav-item">
                                <Link to="/login" onClick={() => signout()}>Signout</Link>
                            </li>
                       )}
                    </ul>
                    {user && (
                        <div className="user-info">
                        {user && (<>Hi, {user.email}</> )}
                    </div>
                    )}
                </div>
            </div>
            {children}
        </>
    )
}

export default Layout;