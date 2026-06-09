import React from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Recommend from './pages/Recommend';
import Benefits from './pages/Benefits';
import Regions from './pages/Regions';

function ScrollToTop() {
  const { pathname } = useLocation();
  React.useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  return null;
}

function Layout() {
  return (
    <>
      <ScrollToTop />
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/recommend" element={<Recommend />} />
          <Route path="/benefits" element={<Benefits />} />
          <Route path="/regions" element={<Regions />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </>
  );
}

function NotFound() {
  return (
    <div className="min-h-screen pt-14 flex flex-col items-center justify-center text-center px-5">
      <p className="text-6xl mb-6">🗺️</p>
      <h1 className="text-2xl font-black text-gray-900 mb-3">페이지를 찾을 수 없습니다</h1>
      <p className="text-gray-500 mb-8 text-sm">요청하신 페이지가 존재하지 않습니다.</p>
      <a href="/" className="bg-green-600 hover:bg-green-700 text-white font-bold px-6 py-3 rounded-xl text-sm transition-colors">
        홈으로 돌아가기
      </a>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Layout />
    </BrowserRouter>
  );
}
