import React from 'react';
import './App.css';
import ProductList from './components/ProductListComponent/ProductListComponent';

const currencies = ['RUB', 'EUR', 'USD'];

function App() {
  return (
    <div className="container">
        <h1>Корзина</h1>
        <ProductList currencies={currencies}/>
    </div>
  );
}

export default App;
