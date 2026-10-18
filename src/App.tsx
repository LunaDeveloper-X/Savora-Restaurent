import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import Home from '@/pages/Home';
import Menu from '@/pages/Menu';
import About from '@/pages/About';
import Gallery from '@/pages/Gallery';
import Reservations from '@/pages/Reservations';
import Contact from '@/pages/Contact';
import { CartProvider } from '@/context/CartContext';
import { FavoritesProvider } from '@/context/FavoritesContext';
import CartDrawer from '@/components/menu/CartDrawer';
import FavoritesDrawer from '@/components/menu/FavoritesDrawer';

function App() {
  return (
    <FavoritesProvider>
      <CartProvider>
        <Router>
          <Routes>
            <Route element={<Layout />}>
              <Route path="/" element={<Home />} />
              <Route path="/menu" element={<Menu />} />
              <Route path="/about" element={<About />} />
              <Route path="/gallery" element={<Gallery />} />
              <Route path="/reservations" element={<Reservations />} />
              <Route path="/contact" element={<Contact />} />
            </Route>
          </Routes>
          <CartDrawer />
          <FavoritesDrawer />
        </Router>
      </CartProvider>
    </FavoritesProvider>
  );
}

export default App;