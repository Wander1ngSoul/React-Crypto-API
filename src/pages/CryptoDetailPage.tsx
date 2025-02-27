import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

interface Crypto {
    name: string;
    symbol: string;
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
                const response = await axios.get(
                    `https://api.coincap.io/v2/assets/${id}`
                );
                setCrypto(response.data.data);
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
            <h2 className="text-3xl font-bold mb-2">
                {crypto.name} ({crypto.symbol})
            </h2>
            <p className="text-lg">💰 Цена: ${parseFloat(crypto.priceUsd).toFixed(2)}</p>
            <p className="text-lg">📊 Рыночная капитализация: ${parseFloat(crypto.marketCapUsd).toFixed(2)}</p>
            <p
                className={`text-lg ${
                    parseFloat(crypto.changePercent24Hr) >= 0 ? "text-green-400" : "text-red-400"
                }`}
            >
                🔥 Изменение за 24ч: {parseFloat(crypto.changePercent24Hr).toFixed(2)}%
            </p>
        </div>
    );
};

export default CryptoDetailPage;
