import { useState, useEffect } from "react";
import CryptoList from "../components/CryptoList";
import axios from "axios";

const CryptoPage = () => {
    const [cryptos, setCryptos] = useState([]);
    const [search, setSearch] = useState("");

    useEffect(() => {
        const fetchCryptos = async () => {
            try {
                const response = await axios.get("https://api.coincap.io/v2/assets");
                setCryptos(response.data.data);
            } catch (error) {
                console.error("Ошибка загрузки данных:", error);
            }
        };

        fetchCryptos();
    }, []);

    const filteredCryptos = cryptos.filter((crypto) =>
        crypto.name.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="bg-gray-900 min-h-screen text-white p-6">
            <h2 className="text-3xl font-bold mb-4">Криптовалюты</h2>
            <input
                type="text"
                placeholder="Поиск криптовалюты..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="bg-gray-800 text-white px-4 py-2 rounded-md mb-4 w-full"
            />
            <CryptoList cryptos={filteredCryptos} />
        </div>
    );
};

export default CryptoPage;
