// src/Cart.js
import { useCart } from './CartContext';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './Cart.css';

export default function Cart() {
  const { cart, removeFromCart, increaseQty, decreaseQty, clearCart } = useCart();
  const navigate = useNavigate();

  const totalCost = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  const handlePlaceOrder = () => {
    if (cart.length === 0) {
      toast.error('Cart is empty!');
      return;
    }

    // Create a snapshot of cart items at the time of ordering
    const order = {
      id: Date.now(),
      items: cart.map(item => ({ ...item })), // deep copy of current cart items
      total: totalCost,
      timestamp: new Date().toISOString(), // use ISO for consistent parsing
    };

    const existingOrders = JSON.parse(localStorage.getItem('orders')) || [];
    localStorage.setItem('orders', JSON.stringify([order, ...existingOrders]));

    toast.success('Order placed successfully!');
    clearCart();

    setTimeout(() => {
      navigate('/my-orders');
    }, 1500);
  };

  return (
    <div className="cart-container">
      <h2>Your Cart</h2>
      {cart.length === 0 ? (
        <p className="cart-empty">Your cart is empty.</p>
      ) : (
        <>
          <div className="cart-items">
            {cart.map((item) => (
              <div key={item.id} className="cart-item">
                <img src={item.image} alt={item.name} className="cart-item-img" />
                <div className="cart-item-details">
                  <h3>{item.name}</h3>
                  <p>₹{item.price}</p>
                  <div className="qty-controls">
                    <button onClick={() => decreaseQty(item.id)}>-</button>
                    <span>{item.quantity}</span>
                    <button onClick={() => increaseQty(item.id)}>+</button>
                  </div>
                  <button onClick={() => removeFromCart(item.id)} className="remove-btn">
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="cart-summary">
            <h3>Total: ₹{totalCost}</h3>
            <button className="place-order-btn" onClick={handlePlaceOrder}>
              Place Order
            </button>
          </div>
        </>
      )}
    </div>
  );
}
