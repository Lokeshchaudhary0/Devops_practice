import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import Home from './pages/Home';
import ProductDetailPage from './pages/ProductDetailPage';
import CartPage from './pages/CartPage';
import LoginPage from './pages/LoginPage';

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Routes>
          <Route 
            path="/login" 
            element={<LoginPage />} 
          />
          <Route 
            path="*" 
            element={
              <>
                <Header />
                <main className="flex-grow">
                  <Routes>
                    <Route path="/\" element={<Home />} />
                    <Route path="/product/:id" element={<ProductDetailPage />} />
                    <Route path="/cart" element={<CartPage />} />
                  </Routes>
                </main>
                <Footer />
              </>
            } 
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;