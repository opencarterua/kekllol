import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import './CartPage.css';  // Импортируйте файл стилей

function CartPage() {
  const { cartItems: encodedCartItems } = useParams();
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    if (encodedCartItems) {
      const decodedCartItems = JSON.parse(decodeURIComponent(encodedCartItems));
      setCartItems(decodedCartItems);
    }
  }, [encodedCartItems]);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');

  const handleQuantityChange = (productId, newQuantity) => {
    const updatedCartItems = cartItems.map((item) =>
      item.id === productId ? { ...item, quantity: newQuantity } : item
    );
    setCartItems(updatedCartItems);
  };

  const handleRemoveItem = (productId) => {
    const updatedCartItems = cartItems.filter((item) => item.id !== productId);
    setCartItems(updatedCartItems);
  };

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + item.product.price * item.quantity, 0);
  };

  return (
    <div className="cart-overlay">
      <div className="cart">
        <div className="cart-form">
          <h3>Checkout</h3>
          <form>
            <label>
              Name:
              <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
            </label>
            <label>
              Email:
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
            </label>
            <label>
              Phone:
              <input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} />
            </label>
            <label>
              Address:
              <input type="text" value={address} onChange={(e) => setAddress(e.target.value)} />
            </label>
          </form>
        </div>
        <div className="cart-items">
          <h3>Your Cart</h3>
          <ul>
            {cartItems.map((cartItem) => (
              <li key={cartItem.id}>
                <div>
                  <span>{cartItem.product.title}</span>
                  <span>{cartItem.product.price} UAH</span>
                </div>
                <div>
                  <button onClick={() => handleQuantityChange(cartItem.id, cartItem.quantity - 1)}>-</button>
                  <span>{cartItem.quantity}</span>
                  <button onClick={() => handleQuantityChange(cartItem.id, cartItem.quantity + 1)}>+</button>
                  <button onClick={() => handleRemoveItem(cartItem.id)}>Remove</button>
                </div>
              </li>
            ))}
          </ul>
          <div className="cart-total">
            <span>Total: {calculateTotal()} UAH</span>
          </div>
        </div>
        <button className="close-cart">Close Cart</button>
      </div>
    </div>
  );
}

export default CartPage;
