import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import '../styles/CryptoDetailPage.css'
import axios from "axios";

interface Crypto {
    id: string;
    name: string;
    symbol: string;
    image: string;
    priceUsd: string;
    marketCapUsd: string;
    changePercent24Hr: string;
}

const CryptoDetailPage = () => {
    const { id } = useParams<{ id: string }>();
    const [crypto, setCrypto] = useState<Crypto | null>(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchCryptoDetails = async () => {
            try {
                const response = await axios.get(`https://api.coingecko.com/api/v3/coins/${id}`);
                setCrypto({
                    id: response.data.id,
                    name: response.data.name,
                    symbol: response.data.symbol,
                    image: response.data.image.large,
                    priceUsd: response.data.market_data.current_price.usd.toFixed(2),
                    marketCapUsd: response.data.market_data.market_cap.usd.toFixed(2),
                    changePercent24Hr: response.data.market_data.price_change_percentage_24h.toFixed(2),
                });
            } catch (error) {
                console.error("Ошибка загрузки данных:", error);
            }
        };

        if (id) {
            fetchCryptoDetails();
        }
    }, [id]);

    if (!crypto) return <p className="text-center text-gray-400">Загрузка...</p>;

    return (
        <div className="bg-gray-900 min-h-screen text-white p-6">
            <button
                className="bg-gray-700 hover:bg-gray-600 px-4 py-2 rounded-md mb-4"
                onClick={() => navigate(-1)}
            >
                Назад
            </button>
            <div className="flex flex-col items-center">
                <img src={crypto.image} alt={crypto.name} className="w-24 h-24 mb-4" />
                <h2 className="text-3xl font-bold mb-2">
                    {crypto.name} ({crypto.symbol.toUpperCase()})
                </h2>
                <p className="text-lg">💰 Цена: ${crypto.priceUsd}</p>
                <p className="text-lg">📊 Рыночная капитализация: ${crypto.marketCapUsd}</p>
                <p
                    className={`text-lg ${parseFloat(crypto.changePercent24Hr) >= 0 ? "text-green-400" : "text-red-400"}`}
                >
                    🔥 Изменение за 24ч: {crypto.changePercent24Hr}%
                </p>
            </div>
        </div>
    );
};

export default CryptoDetailPage;
