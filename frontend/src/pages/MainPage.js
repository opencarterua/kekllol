import React, { useState, useEffect } from 'react';
import './App.css';
import { Link } from 'react-router-dom';


function MainPage() {
  const [stores, setStores] = useState([]);
  const [selectedStore, setSelectedStore] = useState('Magazin_1');
  const [products, setProducts] = useState([]);
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    // Загрузка списка магазинов при монтировании компонента
    fetch(`${window.location.protocol}//${window.location.hostname}:5555/stores`)
      .then((response) => response.json())
      .then((data) => setStores(data))
      .catch((error) => console.error(error));
  }, []);

  useEffect(() => {
    // Загрузка товаров при изменении выбранного магазина
    if (selectedStore) {
      fetch(`${window.location.protocol}//${window.location.hostname}:5555/products/${selectedStore}`)
        .then((response) => response.json())
        .then((data) => setProducts(data))
        .catch((error) => console.error(error));
    }
  }, [selectedStore]);

  const handleStoreClick = (storeName) => {
    setSelectedStore(storeName);
  };

  const handleAddToCart = (product) => {
    // Проверяем, есть ли товар с таким идентификатором уже в корзине
    const existingCartItem = cartItems.find((item) => item.id === product._id);

    if (existingCartItem) {
      // Если товар уже в корзине, обновляем количество
      const updatedCartItems = cartItems.map((item) =>
        item.id === product._id ? { ...item, quantity: item.quantity + 1 } : item
      );

      setCartItems(updatedCartItems);
    }
    else {
      // Если товара нет в корзине, добавляем новый экземпляр
      const updatedCartItems = [...cartItems, { id: product._id, product, quantity: 1 }];
      setCartItems(updatedCartItems);
    }
  };

  // Определяем, есть ли товар в корзине
  const isProductInCart = (productId) => {
    return cartItems.some((item) => item.id === productId);
  };

  useEffect(() => {
    console.log('Cart Items:', cartItems);
  }, [cartItems]);

  return (
    <div className="app">
      <div className="store-panel">
        <h2>Stores</h2>

        <ul>
          {stores.map((store) => (
            <li key={store} onClick={() => handleStoreClick(store)} className={`store-li ${selectedStore === store ? 'active' : ''}`}>
              {store}
            </li>
          ))}
        </ul>
      </div>
      <div className="product-panel">
        <div className='carttitle'>
          <h2>Products in {selectedStore}</h2>
          <div className="my-cart">
            <Link to={`/cart/${encodeURIComponent(JSON.stringify(cartItems))}`}>
              <button className='cartBtnMain'>{`My Cart (${cartItems.length})`}</button>
            </Link>
          </div>
        </div>
        <ul className='product-list'>
          {products.map((product) => (
            <li key={product._id} className="product-item">
              <div>
                <img src={product.imageURL} alt={product.title} />
                <h3>{product.title}</h3>
                <p>{product.price} UAH</p>
                <button
                  className={`cartBtn ${isProductInCart(product._id) ? 'disabled' : ''}`}
                  onClick={() => handleAddToCart(product)}
                  disabled={isProductInCart(product._id)}
                >
                  {isProductInCart(product._id) ? 'Added to Cart' : 'Add to Cart'}
                </button>
              </div>
            </li>
          ))}
        </ul>

      </div>
    </div>
  );
}

export default MainPage;
