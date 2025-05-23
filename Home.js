import { useState } from 'react';
import './Home.css';
import menuData from './menuData.json';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import { useCart } from './CartContext';
import _ from 'lodash';

export default function Home() {
  const [visibleItems, setVisibleItems] = useState({});
  const [filterType, setFilterType] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const navigate = useNavigate();

  const { cart, addToCart } = useCart();

  const handleShowMore = (category) => {
    setVisibleItems((prev) => ({
      ...prev,
      [category]: menuData[category].length,
    }));
  };

  const handleShowLess = (category) => {
    setVisibleItems((prev) => ({
      ...prev,
      [category]: 3,
    }));
  };

  const handleAddToCart = (item) => {
    addToCart(item);
    toast.success(`${item.name} added to cart! 🛒`);
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value.toLowerCase());
  };

  const handleFilterChange = (e) => {
    setFilterType(e.target.value);
  };

  const suggestions = _(menuData)
    .values()
    .flatten()
    .filter(
      (item) =>
        item.name.toLowerCase().includes(searchTerm) ||
        item.description.toLowerCase().includes(searchTerm)
    )
    .take(5)
    .value();

  return (
    <div className="home-container">
      <div className="welcome-banner">
        <h1>Welcome to Campus Canteen!</h1>
        <p>Delicious, affordable, and just a click away. Explore our menu below.</p>
      </div>

      <div className="filter-bar">
        <div className="search-wrapper">
          <input
            type="text"
            placeholder="Search food..."
            value={searchTerm}
            onChange={handleSearchChange}
            onFocus={() => setIsSearchFocused(true)}
            onBlur={() => setTimeout(() => setIsSearchFocused(false), 150)}
            className="search-input"
          />
          {isSearchFocused && searchTerm && suggestions.length > 0 && (
            <div className="suggestions-list">
              {suggestions.map((item) => (
                <div
                  key={item.id}
                  className="suggestion-item"
                  onMouseDown={() => {
                    // Preserve casing & update searchTerm for filtering
                    setSearchTerm(item.name);
                  }}
                >
                  {item.name}
                </div>
              ))}
            </div>
          )}
        </div>

        <select value={filterType} onChange={handleFilterChange} className="filter-select">
          <option value="all">All</option>
          <option value="veg">Veg</option>
          <option value="non-veg">Non-Veg</option>
        </select>
      </div>

      <div className="menu-header">
        <h2>MENU</h2>
      </div>

      {Object.entries(menuData).map(([category, items], index) => {
        const visibleCount = visibleItems[category] || 3;

        const filteredItems = items.filter((item) => {
          const matchesFilter =
            filterType === 'all' || item.type.toLowerCase() === filterType;
          const matchesSearch =
            item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.description.toLowerCase().includes(searchTerm.toLowerCase());
          return matchesFilter && matchesSearch;
        });

        if (filteredItems.length === 0) return null;

        const showMoreAvailable = filteredItems.length > visibleCount;

        return (
          <div className="menu-section" key={category}>
            {index > 0 && <hr className="category-divider" />}
            <h2 className="section-title">{category}</h2>
            <div className="menu-grid three-column-grid">
              {filteredItems.slice(0, visibleCount).map((item) => (
                <div className="menu-card classy-card" key={item.id}>
                  <img src={item.image} alt={item.name} className="menu-image" />
                  <div className="menu-card-body">
                    <h3 className="menu-name">{item.name}</h3>
                    <p className="menu-description">{item.description}</p>
                    <div className="menu-card-footer">
                      <p className="menu-price">₹{item.price}</p>
                      <button
                        className="add-to-cart"
                        onClick={() => handleAddToCart(item)}
                      >
                        Add to Cart
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {filteredItems.length > 3 && (
              <div className="show-more-container">
                {showMoreAvailable ? (
                  <button className="show-more-btn" onClick={() => handleShowMore(category)}>
                    Show More
                  </button>
                ) : (
                  <button className="show-more-btn" onClick={() => handleShowLess(category)}>
                    Show Less
                  </button>
                )}
              </div>
            )}
          </div>
        );
      })}

      <div
  onClick={() => navigate('/cart')}
  style={{
    position: 'fixed',
    bottom: '20px',
    right: '20px',
    backgroundColor: '#000',
    color: '#fff',
    borderRadius: '50%',
    width: '60px',
    height: '60px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: '24px',
    cursor: 'pointer',
    boxShadow: '0 4px 10px rgba(0, 0, 0, 0.3)',
    zIndex: 1000,
  }}
>
  🛒
  {cart.length > 0 && (
    <span
      style={{
        position: 'absolute',
        top: '-5px',
        right: '-5px',
        backgroundColor: '#ff4d4d',
        color: '#fff',
        borderRadius: '50%',
        padding: '4px 8px',
        fontSize: '14px',
        fontWeight: 'bold',
        boxShadow: '0 2px 6px rgba(0,0,0,0.2)',
      }}
    >
      {cart.length}
    </span>
  )}
</div>

      <ToastContainer position="top-right" />
    </div>
  );
}
