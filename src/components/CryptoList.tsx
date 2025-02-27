import { Link } from "react-router-dom";
import "../styles/CryptoList.css";

interface Crypto {
    id: string;
    name: string;
    symbol: string;
    image: string;
    current_price: number;
}

interface CryptoListProps {
    cryptos: Crypto[];
    favorites: string[];
    toggleFavorite: (id: string) => void;
}

const CryptoList: React.FC<CryptoListProps> = ({ cryptos, favorites, toggleFavorite }) => {
    return (
        <div className="crypto-container">
            {cryptos.length > 0 ? (
                cryptos.map((crypto) => (
                    <div key={crypto.id} className="crypto-card">
                        <Link to={`/details/${crypto.id}`}>
                            <img src={crypto.image} alt={crypto.name} />
                            <h3 className="crypto-name">{crypto.name} ({crypto.symbol.toUpperCase()})</h3>
                            <p className="crypto-price">${crypto.current_price.toLocaleString()}</p>
                        </Link>
                        <button
                            className={`favorite-button ${favorites.includes(crypto.id) ? 'bg-red-500' : 'bg-blue-500'}`}
                            onClick={(e) => {
                                e.stopPropagation();
                                toggleFavorite(crypto.id);
                            }}
                        >
                            {favorites.includes(crypto.id) ? '❤️' : '⭐'}
                        </button>
                    </div>
                ))
            ) : (
                <p className="text-gray-400 text-center">Данные не найдены</p>
            )}
        </div>
    );
};

export default CryptoList;
