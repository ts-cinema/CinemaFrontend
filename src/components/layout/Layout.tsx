import { Outlet } from "react-router-dom";
import MoviesData from "../movie/MoviesData";
import Navbar from '../navbar/Navbar';

const Layout = () => {
    return (
        <main className="App">
            <Navbar />
            <Outlet />
        </main>
    );
}

export default Layout;