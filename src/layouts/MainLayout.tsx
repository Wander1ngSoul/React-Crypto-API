import { Link, Outlet } from "react-router-dom";
import "../styles/MainLayout.css";

const MainLayout = () => {
    return (
        <>
            <header>
                <h1>Криптовалюты</h1>
                <nav>
                    <Link to="/">Главная</Link>
                    <Link to="/favorites">Избранное</Link>
                </nav>
            </header>
            <main>
                <Outlet />
            </main>
        </>
    );
};

export default MainLayout;
