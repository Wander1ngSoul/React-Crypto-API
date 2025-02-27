import { Link, Outlet } from "react-router-dom";
import "../styles/MainLayout.css";

const MainLayout = () => {
    return (
        <div className="main-layout">
            <header className="header">
                <h1 className="logo">Криптовалюты</h1>
                <nav className="nav">
                    <Link to="/" className="nav-button">Главная</Link>
                    <Link to="/favorites" className="nav-button">Избранное</Link>
                </nav>
            </header>
            <main className="main">
                <Outlet />
            </main>
        </div>
    );
};

export default MainLayout;
