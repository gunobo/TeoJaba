import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const REGIONS = [
  { id: 1, name: '전주', province: '전라북도', score: 94, monthly: 35, jobs: 1240, youth: '+12%',
    tags: ['청년창업', '문화도시', 'KTX접근'], desc: '한옥마을과 문화 인프라가 풍부한 도시. 청년 지원 정책 전국 최고 수준. KTX 서울 1시간 20분.' },
  { id: 2, name: '제주', province: '제주특별자치도', score: 91, monthly: 55, jobs: 890, youth: '+18%',
    tags: ['원격근무', '자연환경', 'IT지원'], desc: '자연과 함께하는 원격 근무 최적지. IT 인재 유입 지원 활발. 고속 인터넷 인프라 완비.' },
  { id: 3, name: '춘천', province: '강원특별자치도', score: 88, monthly: 38, jobs: 760, youth: '+9%',
    tags: ['자연친화', '수도권근접', '주거지원'], desc: '청정 자연과 수도권 접근성의 조합. 강원 청년 이주 지원 정책으로 주거비 부담 낮음.' },
  { id: 4, name: '광주', province: '광주광역시', score: 87, monthly: 42, jobs: 2100, youth: '+15%',
    tags: ['AI클러스터', '스타트업', '문화산업'], desc: 'AI 스타트업 허브로 급성장. 광주형 일자리와 AI 클러스터로 청년 취업 생태계 성장 중.' },
  { id: 5, name: '부산', province: '부산광역시', score: 85, monthly: 50, jobs: 3500, youth: '+7%',
    tags: ['광역시급', '해양도시', '스타트업'], desc: '제2도시의 인프라와 바다가 있는 삶. 청년 공공임대주택으로 주거 부담 경감.' },
  { id: 6, name: '대구', province: '대경권', score: 83, monthly: 40, jobs: 2800, youth: '+5%',
    tags: ['의류패션', '의료기기', '교육도시'], desc: '의류·패션·의료기기 산업 중심. 청년 직무 교육비 지원으로 경력 개발 가능.' },
  { id: 7, name: '대전', province: '대전광역시', score: 82, monthly: 45, jobs: 2200, youth: '+8%',
    tags: ['과학기술', 'KAIST', '연구도시'], desc: 'KAIST와 대덕연구단지의 도시. 연구직·엔지니어에게 최적. KTX 서울 50분.' },
  { id: 8, name: '여수', province: '전라남도', score: 79, monthly: 30, jobs: 520, youth: '+6%',
    tags: ['관광도시', '해양', '창업'], desc: '밤바다가 아름다운 항구 도시. 주거비 전국 최저 수준. 관광·요식 창업에 특화.' },
];

export default function Regions() {
  const [search, setSearch] = useState('');
  const [sort, setSort] = useState('score');
  const [view, setView] = useState('grid');

  const list = REGIONS
    .filter(r => !search || r.name.includes(search) || r.province.includes(search) || r.tags.some(t => t.includes(search)))
    .sort((a, b) => sort === 'score' ? b.score - a.score : sort === 'housing' ? a.monthly - b.monthly : b.jobs - a.jobs);

  return (
    <div className="min-h-screen pt-14 bg-white">
      {/* 헤더 */}
      <div className="bg-gray-950 py-20 px-5">
        <div className="max-w-6xl mx-auto">
          <p className="text-xs font-bold text-green-400 tracking-widest uppercase mb-4">전국 지역 탐색</p>
          <h1 className="text-4xl font-black text-white tracking-tight mb-3">지역 탐색</h1>
          <p className="text-gray-400">전국 지방 지역의 정보를 한눈에 비교해보세요</p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-5 py-10">
        {/* 컨트롤 */}
        <div className="flex gap-3 mb-8 flex-wrap items-center">
          <div className="relative flex-1 min-w-48">
            <svg className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input value={search} onChange={e => setSearch(e.target.value)} placeholder="지역명, 특징 검색..."
              className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl text-sm outline-none focus:border-gray-400 transition-colors" />
          </div>

          <select value={sort} onChange={e => setSort(e.target.value)}
            className="px-4 py-2.5 border border-gray-200 rounded-xl text-sm outline-none cursor-pointer">
            <option value="score">매칭 점수순</option>
            <option value="housing">월세 낮은순</option>
            <option value="jobs">일자리 많은순</option>
          </select>

          <div className="flex bg-gray-100 rounded-xl p-1">
            {[['grid', '⊞'], ['list', '☰']].map(([v, icon]) => (
              <button key={v} onClick={() => setView(v)}
                className={`w-9 h-9 rounded-lg text-sm transition-colors ${view === v ? 'bg-white shadow-sm text-gray-900' : 'text-gray-400 hover:text-gray-600'}`}>
                {icon}
              </button>
            ))}
          </div>
        </div>

        <p className="text-sm text-gray-400 mb-6"><span className="font-bold text-gray-900">{list.length}개</span> 지역</p>

        {/* 그리드 뷰 */}
        {view === 'grid' && (
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {list.map((r, i) => (
              <Link to="/recommend" key={r.id} className="group block bg-white border border-gray-200 rounded-2xl p-5 hover:border-gray-400 hover:shadow-md transition-all">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-bold text-gray-300">#{i + 1}</span>
                  <span className="text-xs font-bold text-green-600 bg-green-50 px-2 py-0.5 rounded-full">{r.score}점</span>
                </div>
                <p className="text-xl font-black text-gray-900 mb-0.5">{r.name}</p>
                <p className="text-xs text-gray-400 mb-3">{r.province}</p>
                <div className="flex flex-wrap gap-1 mb-4">
                  {r.tags.slice(0, 2).map(t => (
                    <span key={t} className="text-xs text-gray-500 bg-gray-100 px-2 py-0.5 rounded-md">#{t}</span>
                  ))}
                </div>
                <div className="space-y-1.5 text-xs text-gray-500">
                  <div className="flex justify-between">
                    <span>평균 월세</span>
                    <span className="font-semibold text-gray-800">{r.monthly}만원</span>
                  </div>
                  <div className="flex justify-between">
                    <span>일자리 수</span>
                    <span className="font-semibold text-gray-800">{r.jobs}개</span>
                  </div>
                  <div className="flex justify-between">
                    <span>청년 유입</span>
                    <span className="font-semibold text-green-600">{r.youth}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}

        {/* 리스트 뷰 */}
        {view === 'list' && (
          <div className="space-y-2">
            {list.map((r, i) => (
              <Link to="/recommend" key={r.id} className="flex items-center gap-5 bg-white border border-gray-200 rounded-2xl px-5 py-4 hover:border-gray-400 hover:shadow-sm transition-all">
                <span className="text-sm font-bold text-gray-300 w-6 shrink-0">#{i + 1}</span>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 mb-1">
                    <p className="font-black text-gray-900">{r.name}</p>
                    <p className="text-xs text-gray-400">{r.province}</p>
                    {r.tags.slice(0, 2).map(t => (
                      <span key={t} className="text-xs text-gray-500 bg-gray-100 px-2 py-0.5 rounded-md hidden sm:inline">#{t}</span>
                    ))}
                  </div>
                  <p className="text-xs text-gray-500 truncate">{r.desc}</p>
                </div>
                <div className="flex gap-6 shrink-0 text-xs text-right">
                  <div>
                    <p className="font-bold text-gray-900">{r.monthly}만</p>
                    <p className="text-gray-400">월세</p>
                  </div>
                  <div>
                    <p className="font-bold text-gray-900">{r.jobs}</p>
                    <p className="text-gray-400">일자리</p>
                  </div>
                  <div>
                    <p className="font-bold text-green-600">{r.score}점</p>
                    <p className="text-gray-400">매칭</p>
                  </div>
                </div>
                <span className="text-gray-400 text-sm group-hover:translate-x-0.5 transition-transform">→</span>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
