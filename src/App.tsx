import { useEffect, useState } from "react";

export default function App() {
    const [cryptoData, setCryptoData] = useState([]);
    const [search, setSearch] = useState("");
    const [minPrice, setMinPrice] = useState("");

    useEffect(() => {
        fetch("https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=20&page=1&sparkline=false")
            .then((response) => response.json())
            .then((data) => setCryptoData(data))
            .catch((error) => console.error("Ошибка:", error));
    }, []);

    // Фильтрация криптовалют по названию и минимальной цене
    const filteredCrypto = cryptoData.filter((coin) =>
        coin.name.toLowerCase().includes(search.toLowerCase()) &&
        (!minPrice || coin.current_price >= parseFloat(minPrice))
    );

    return (
        <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center py-10 px-4">
            <h1 className="text-3xl font-bold mb-6">Курс криптовалют</h1>

            {/* Поле поиска */}
            <input
                type="text"
                placeholder="Поиск криптовалюты..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full max-w-md p-3 mb-4 text-black rounded-lg border border-gray-600 bg-gray-200"
            />

            {/* Фильтр по минимальной цене */}
            <input
                type="number"
                placeholder="Минимальная цена (USD)"
                value={minPrice}
                onChange={(e) => setMinPrice(e.target.value)}
                className="w-full max-w-md p-3 mb-6 text-black rounded-lg border border-gray-600 bg-gray-200"
            />

            {/* Список криптовалют */}
            <div className="w-full max-w-4xl">
                {filteredCrypto.length > 0 ? (
                    <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredCrypto.map((coin) => (
                            <li key={coin.id} className="bg-gray-800 p-4 rounded-lg shadow-md flex justify-between items-center hover:bg-gray-700 transition">
                                <div className="flex items-center space-x-3">
                                    <img src={coin.image} alt={coin.name} className="w-10 h-10" />
                                    <span className="text-lg font-semibold">{coin.name} ({coin.symbol.toUpperCase()})</span>
                                </div>
                                <span className="text-green-400 text-xl">${coin.current_price.toLocaleString()}</span>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p className="text-xl text-gray-400 mt-4">Ничего не найдено</p>
                )}
            </div>
        </div>
    );
}