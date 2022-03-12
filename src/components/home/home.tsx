import React from 'react';
import { useEffect } from 'react';
import { Link, Navigate, Route, Routes, useLocation } from 'react-router-dom';
import { handleLogout, sessionStatus } from '../../helper/authorization';
import AddEvent from '../add-event/add-event';
import List from '../list/list';
import Login from '../login/login';
import NotFound from '../not-found/not-found';
import './home.scss';
import logo from '../../assets/logo.png';


function Home() {
    const [token, setToken] = React.useState(sessionStatus());
    const [activeClass, setActiveClass] = React.useState('');
    const location = useLocation();

    const logout = async () => {
        setToken(false);
        await handleLogout();
    };

    const handleLogin = async () => {
        setToken(sessionStatus());
        setActiveClass(location.pathname)
    };

    useEffect(() => {
        handleLogin();
    }, [location.pathname]);

    return (
        <div className='home'>
            {token &&
                <nav className='header'>
                    <div className="logo">
                        <Link className='link' to="/"> <img src={logo} alt="logo" /></Link>
                    </div>
                    <div className="navLinks">
                        <Link className={activeClass === '/' ? 'link active' : 'link'} to="/" onClick={() => handleLogin()}>EVENTS</Link>
                        <Link className={activeClass === '/add-event' ? 'link active' : 'link'} to="/add-event" onClick={() => handleLogin()}>ADD</Link>
                        <Link className={activeClass === '/login' ? 'link active' : 'link'} to="/login" onClick={() => logout()}>LOGOUT</Link>
                    </div>
                </nav>}
            <Routes>
                <Route path="/" element={sessionStatus() ? <List /> : <Navigate to="/login" />} />
                <Route path="/add-event" element={sessionStatus() ? <AddEvent /> : <Navigate to="/login" />} />
                <Route path="/login" element={<Login />} />
                <Route path="*" element={<NotFound />} />
            </Routes>
            <footer className='footer'>
                <p>Muriya Live | Admin</p>
            </footer>
        </div>
    );
}


export default Home;


