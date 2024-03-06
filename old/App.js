// App.js

import React, { useState, useEffect } from 'react';
import './App.css';

function MainPage() {
  const [stores, setStores] = useState([]);
  const [selectedStore, setSelectedStore] = useState('Magazin_1');
  const [products, setProducts] = useState([]);

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
        <h2>Products in {selectedStore}</h2>
        <ul className='product-list'>
          {products.map((product) => (
            <li key={product._id} className="product-item">
              <div>
                <img src={product.imageURL} alt={product.title} />
                <h3>{product.title}</h3>
                <p>{product.price} UAH</p>
                <button className='cartBtn'>Add to cart</button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default MainPage;
