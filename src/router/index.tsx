import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CryptoPage from "../pages/CryptoPage";
import MainLayout from "../layouts/MainLayout";
import CryptoDetailPage from "../pages/CryptoDetailPage";
import FavoritePage from "../pages/FavoritePage.tsx";


const AppRouter = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<MainLayout />}>
                    <Route index element={<CryptoPage />} />
                    <Route path="details/:id" element={<CryptoDetailPage />} />
                    <Route path="favorites" element={<FavoritePage />} />
                </Route>
            </Routes>
        </Router>
    );
};

export default AppRouter;
