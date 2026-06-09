import React from 'react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-gray-950 text-gray-400">
      <div className="max-w-6xl mx-auto px-5 py-14">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 pb-10 border-b border-gray-800">
          {/* 브랜드 */}
          <div className="col-span-2 md:col-span-1">
            <p className="text-white font-black text-xl mb-3">터잡아</p>
            <p className="text-sm text-gray-500 leading-relaxed">
              지방 정착을 꿈꾸는 청년들을 위한<br />지역 매칭 플랫폼
            </p>
            <p className="text-xs text-gray-600 mt-4">
              부산소프트웨어마이스터고등학교
            </p>
          </div>

          {[
            { title: '서비스', items: [['지역 추천', '/recommend'], ['혜택 정보', '/benefits'], ['지역 탐색', '/regions']] },
            { title: '안내', items: [['서비스 소개', '/'], ['이용 가이드', '/'], ['자주 묻는 질문', '/']] },
            { title: '지원', items: [['개인정보처리방침', '/'], ['이용약관', '/'], ['고객센터', '/']] },
          ].map(s => (
            <div key={s.title}>
              <p className="text-white text-sm font-semibold mb-4">{s.title}</p>
              <ul className="space-y-2.5">
                {s.items.map(([label, to]) => (
                  <li key={label}>
                    <Link to={to} className="text-sm text-gray-500 hover:text-gray-300 transition-colors">{label}</Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="pt-8 flex flex-col md:flex-row justify-between gap-3 text-xs text-gray-600">
          <p>© 2025 터잡아(TeoJaba). All rights reserved.</p>
          <p>contact@teojaba.kr</p>
        </div>
      </div>
    </footer>
  );
}
