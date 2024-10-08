import React, { useEffect, useState } from "react";


import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from "react-router-dom";
import Home from "../../Pages/Home";
import About from "../../Pages/About";
import Contact from "../../Pages/Contact";
import Services from "../../Pages/Services";
import './style.css';
import Login from "../../Pages/Login";
import ProtectedRoutes from "../../Pages/ProtectedRoutes";


const Header = () => {
    const[login, setIslogin] = useState(false);

    const navigate = useNavigate();
    const logout = () => {
        localStorage.removeItem('login');
        setIslogin(false);
        navigate('/login')
    }
    
    useEffect(() => {
        const loginStatus = localStorage.getItem('login') === "true";
        setIslogin(loginStatus);
    }, [])

    


    return(
        <>
          {/* <Router> */}

          {
            login && (

                <nav>
                <ul className="d-flex justify-content-center gap-5 bg-dark p-3 fs-4">
                    <li><Link to="/" className="links">Home</Link></li>
                    <li><Link to="/about" className="links">API Data (Axios)</Link></li>
                    <li><Link to="/contact" className="links">Contact</Link></li>
                    <li><Link to="/services" className="links">Services</Link></li>
                    {
                        login === true ? (<li><Link to="/login" className="links" onClick={logout}>Logout</Link></li>) : (<li><Link to="/login" className="links">Login</Link></li>)
                    }
                </ul>
            </nav>

            )};
            <Routes>
                <Route path="/" element={<ProtectedRoutes Component= {Home}/>} />
                <Route path="/about" element={<ProtectedRoutes Component= {About} />} />
                <Route path="/contact" element={< ProtectedRoutes Component= {Contact}/>} />
                <Route path="/services" element={< ProtectedRoutes Component={Services}/>} />

                <Route path="/login" element={<Login/>} />
            </Routes>
          {/* </Router> */}

        </>
    )
}

export default  Header;