import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => setMenuOpen(false), [location]);

  const isHome = location.pathname === '/';
  const transparent = isHome && !scrolled;

  const links = [
    { to: '/recommend', label: '지역 추천' },
    { to: '/benefits', label: '혜택 정보' },
    { to: '/regions', label: '지역 탐색' },
  ];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      transparent
        ? 'bg-transparent border-transparent'
        : 'bg-white/95 backdrop-blur-sm border-b border-gray-100'
    }`}>
      <div className="max-w-6xl mx-auto px-5 flex items-center justify-between h-14">
        {/* 로고 */}
        <Link to="/" className="flex items-center gap-2">
          <span className={`text-lg font-black tracking-tight ${transparent ? 'text-white' : 'text-gray-900'}`}>
            터잡아
          </span>
        </Link>

        {/* 데스크톱 링크 */}
        <div className="hidden md:flex items-center gap-1">
          {links.map(l => (
            <Link key={l.to} to={l.to} className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              location.pathname === l.to
                ? transparent ? 'text-white bg-white/20' : 'text-green-700 bg-green-50'
                : transparent
                  ? 'text-white/80 hover:text-white hover:bg-white/15'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
            }`}>
              {l.label}
            </Link>
          ))}
          <Link to="/recommend" className="ml-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white text-sm font-semibold rounded-lg transition-colors">
            내 지역 찾기
          </Link>
        </div>

        {/* 모바일 메뉴 버튼 */}
        <button onClick={() => setMenuOpen(!menuOpen)} className={`md:hidden p-2 rounded-lg ${transparent ? 'text-white' : 'text-gray-700'}`}>
          <div className="space-y-1.5">
            <span className={`block h-0.5 w-5 transition-all ${transparent ? 'bg-white' : 'bg-gray-700'} ${menuOpen ? 'rotate-45 translate-y-2' : ''}`} />
            <span className={`block h-0.5 w-5 transition-all ${transparent ? 'bg-white' : 'bg-gray-700'} ${menuOpen ? 'opacity-0' : ''}`} />
            <span className={`block h-0.5 w-5 transition-all ${transparent ? 'bg-white' : 'bg-gray-700'} ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
          </div>
        </button>
      </div>

      {/* 모바일 메뉴 */}
      {menuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 px-5 py-3 space-y-1">
          {links.map(l => (
            <Link key={l.to} to={l.to} className={`block px-4 py-2.5 rounded-lg text-sm font-medium ${
              location.pathname === l.to ? 'text-green-700 bg-green-50' : 'text-gray-700'
            }`}>
              {l.label}
            </Link>
          ))}
          <Link to="/recommend" className="block mt-2 px-4 py-2.5 bg-green-600 text-white text-sm font-semibold rounded-lg text-center">
            내 지역 찾기
          </Link>
        </div>
      )}
    </nav>
  );
}
