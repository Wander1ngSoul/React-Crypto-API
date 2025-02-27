import { Link } from "react-router-dom";

interface Crypto {
    id: string;
    name: string;
    symbol: string;
    image: string;
    current_price: number;
}

interface CryptoListProps {
    cryptos: Crypto[];
}

const CryptoList: React.FC<CryptoListProps> = ({ cryptos }) => {
    return (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 p-4">
        {cryptos.length > 0 ? (
                    cryptos.map((crypto) => (
                        <div
                            key={crypto.id}
                className="bg-gray-900 p-3 rounded-2xl shadow-md transition-transform hover:scale-105"
                >
                <Link to={`/details/${crypto.id}`}>
        <img
            src={crypto.image}
    alt={crypto.name}
    className="w-full h-20 object-contain rounded-xl"
    />
    <p className="text-white text-center mt-2 font-semibold">
        {crypto.name} ({crypto.symbol.toUpperCase()})
        </p>
        <p className="text-green-400 text-center font-bold">
        ${crypto.current_price.toLocaleString()}
    </p>
    </Link>
    </div>
))
) : (
        <p className="text-gray-400 text-center">Данные не найдены</p>
)}
    </div>
);
};

export default CryptoList;
