import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import CryptoList from "../components/CryptoList";
import axios from "axios";

interface Crypto {
    id: string;
    name: string;
    symbol: string;
    image: string;
    current_price: number;
}

const FavoritePage = () => {
    const [favorites, setFavorites] = useState<string[]>(() => {
        return JSON.parse(localStorage.getItem("favorites") || "[]");
    });

    // ✅ Указываем тип Crypto[]
    const [cryptos, setCryptos] = useState<Crypto[]>([]);

    useEffect(() => {
        const fetchCryptos = async () => {
            try {
                const response = await axios.get<Crypto[]>(
                    "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=20&page=1&sparkline=false"
                );
                setCryptos(response.data);
            } catch (error) {
                console.error("Ошибка загрузки данных:", error);
            }
        };

        fetchCryptos();
    }, []);

    const favoriteCryptos = cryptos.filter(
        (crypto: Crypto) => favorites.includes(crypto.id)
    );

    const toggleFavorite = (id: string) => {
        const updatedFavorites = favorites.includes(id)
            ? favorites.filter((favId) => favId !== id)
            : [...favorites, id];

        setFavorites(updatedFavorites);
        localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
    };

    if (favoriteCryptos.length === 0) {
        return (
            <div className="bg-gray-900 min-h-screen text-white p-6">
                <h2 className="text-3xl font-bold mb-4 text-center">Избранные криптовалюты</h2>
                <p className="text-gray-400 text-center">Нет избранных криптовалют</p>
                <Link to="/" className="text-blue-500 underline">
                    Вернуться к списку криптовалют
                </Link>
            </div>
        );
    }

    return (
        <div className="bg-gray-900 min-h-screen text-white p-6">
            <h2 className="text-3xl font-bold mb-4 text-center">Избранные криптовалюты</h2>
            <CryptoList cryptos={favoriteCryptos} favorites={favorites} toggleFavorite={toggleFavorite} />
        </div>
    );
};

export default FavoritePage;
