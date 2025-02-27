import { useState, useEffect } from "react";
import CryptoList from "../components/CryptoList";
import axios from "axios";
import "../styles/CryptoPage.css";

// ✅ Определяем интерфейс Crypto
interface Crypto {
    id: string;
    name: string;
    symbol: string;
    image: string;
    current_price: number;
    market_cap: number; // Добавил market_cap
}

const CryptoPage = () => {
    const [cryptos, setCryptos] = useState<Crypto[]>([]); // Указываем тип
    const [search, setSearch] = useState("");
    const [minPrice, setMinPrice] = useState(0);
    const [maxPrice, setMaxPrice] = useState(100000);
    const [minMarketCap] = useState(0);
    const [favorites, setFavorites] = useState<string[]>(() => {
        const savedFavorites = localStorage.getItem("favorites");
        return savedFavorites ? JSON.parse(savedFavorites) : [];
    });

    useEffect(() => {
        const fetchCryptos = async () => {
            try {
                const response = await axios.get<Crypto[]>( // Указываем тип ответа
                    "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=20&page=1&sparkline=false"
                );
                setCryptos(response.data);
            } catch (error) {
                console.error("Ошибка загрузки данных:", error);
            }
        };

        fetchCryptos();
    }, []);

    const filteredCryptos = cryptos.filter((crypto) =>
        crypto.name.toLowerCase().includes(search.toLowerCase()) &&
        crypto.current_price >= minPrice &&
        crypto.current_price <= maxPrice &&
        crypto.market_cap >= minMarketCap
    );

    const toggleFavorite = (id: string) => {
        const updatedFavorites = favorites.includes(id)
            ? favorites.filter((favId) => favId !== id)
            : [...favorites, id];

        setFavorites(updatedFavorites);
        localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
    };

    return (
        <div className="bg-gray-900 min-h-screen text-white p-6">
            <h2 className="text-3xl font-bold mb-4 text-center">Криптовалюты</h2>
            <div className="filters-container">
                <input
                    type="text"
                    placeholder="🔍 Поиск криптовалюты..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="search-input"
                />
                <div className="filter-group">
                    <label>Цена: от</label>
                    <input
                        type="number"
                        value={minPrice}
                        onChange={(e) => setMinPrice(Number(e.target.value))}
                        className="filter-input"
                    />
                    <label>до</label>
                    <input
                        type="number"
                        value={maxPrice}
                        onChange={(e) => setMaxPrice(Number(e.target.value))}
                        className="filter-input"
                    />
                </div>
            </div>
            <CryptoList cryptos={filteredCryptos} favorites={favorites} toggleFavorite={toggleFavorite} />
        </div>
    );
};

export default CryptoPage;
