import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const REGIONS = [
  { id: 1,  name: '전주', province: '전라북도', score: 94, monthly: 35, jobs: 1240, youth: '+12%',
    tags: ['청년창업', '문화도시', 'KTX접근'], population: 65, benefit: 5,
    desc: '한옥마을과 문화 인프라가 풍부한 전통·현대 공존 도시. 청년 지원 정책 전국 최고 수준. KTX 서울 1시간 20분. 청년 월세·창업·취업 지원 5종 운영 중.' },
  { id: 2,  name: '제주', province: '제주특별자치도', score: 91, monthly: 55, jobs: 890, youth: '+18%',
    tags: ['원격근무', '자연환경', 'IT지원'], population: 68, benefit: 4,
    desc: '청정 자연 속 원격 근무 최적지. IT·디지털 인재 이주 정착금 300만원 지원. 고속 인터넷 인프라 완비. 로컬 크리에이터 창업 생태계 활성화.' },
  { id: 3,  name: '춘천', province: '강원특별자치도', score: 88, monthly: 38, jobs: 760, youth: '+9%',
    tags: ['자연친화', '수도권근접', '주거지원'], population: 29, benefit: 3,
    desc: '청정 자연과 수도권 접근성의 절묘한 조합. ITX 서울 1시간. 강원 청년 이주 정착금 150만원+월세 보조 지원. 공공임대주택 시세 40% 제공.' },
  { id: 4,  name: '광주', province: '광주광역시', score: 87, monthly: 42, jobs: 2100, youth: '+15%',
    tags: ['AI클러스터', '스타트업', '문화산업'], population: 144, benefit: 5,
    desc: 'AI 스타트업 허브로 급성장 중. 광주형 일자리·AI 클러스터로 청년 취업 생태계 확장. 문화콘텐츠 창업 지원금 최대 1,000만원. 광역시급 생활 인프라.' },
  { id: 5,  name: '부산', province: '부산광역시', score: 85, monthly: 50, jobs: 3500, youth: '+7%',
    tags: ['해양도시', '광역시', '스타트업'], population: 335, benefit: 4,
    desc: '제2도시의 탄탄한 인프라와 바다가 있는 삶. 해양·물류·핀테크 창업 지원 최대 800만원. 청년 중소기업 취업 장려금 월 50만원. 공공임대주택 시세 50%.' },
  { id: 6,  name: '대구', province: '대경권', score: 83, monthly: 40, jobs: 2800, youth: '+5%',
    tags: ['의료기기', '미래차', '로봇'], population: 237, benefit: 4,
    desc: '의료기기·로봇·미래차 신산업 중심. 첨단산업 청년 취업 장려금 월 40만원. 의료기기 창업 지원 최대 700만원. 청년 직무 교육비 200만원 지원.' },
  { id: 7,  name: '대전', province: '대전광역시', score: 82, monthly: 45, jobs: 2200, youth: '+8%',
    tags: ['과학기술', 'KAIST', '딥테크'], population: 146, benefit: 4,
    desc: 'KAIST·충남대·대덕연구단지의 과학기술 도시. KTX 서울 50분. 딥테크 창업 지원 최대 1,500만원. 연구소 인턴십 월 200만원. 행복주택 시세 60%.' },
  { id: 8,  name: '여수', province: '전라남도', score: 79, monthly: 30, jobs: 520, youth: '+6%',
    tags: ['관광도시', '해양', '귀촌'], population: 27, benefit: 3,
    desc: '밤바다가 아름다운 항구 관광도시. 주거비 전국 최저 수준. 귀촌 정착금 200만원. 관광·F&B 창업 지원 400만원. 해양관광 취업 연계 장려금 지원.' },
  { id: 9,  name: '강릉', province: '강원특별자치도', score: 78, monthly: 32, jobs: 480, youth: '+11%',
    tags: ['커피도시', '워케이션', '자연'], population: 21, benefit: 2,
    desc: '전국 1위 커피 소비 도시이자 워케이션 성지. 서울 KTX 2시간. 이주 정착 패키지 총 300만원. 커피·로컬 크리에이터 창업 지원 최대 500만원.' },
  { id: 10, name: '포항', province: '경상북도', score: 77, monthly: 33, jobs: 1850, youth: '+9%',
    tags: ['이차전지', '철강', 'POSTECH'], population: 50, benefit: 2,
    desc: '이차전지·철강·소재 산업 중심. POSTECH 기반 기술 혁신 생태계. 청년 취업 장려금 월 50만원. 행복주택 시세 50%. 이차전지 분야 채용 수요 급증.' },
  { id: 11, name: '청주', province: '충청북도', score: 76, monthly: 36, jobs: 2050, youth: '+10%',
    tags: ['반도체', '바이오', 'SK하이닉스'], population: 85, benefit: 2,
    desc: 'SK하이닉스 기반 반도체 클러스터 성장 중. 청년 취업 장려금 월 40만원. 월세 지원 월 20만원. 오창·청원 산단 중심 바이오·화장품 분야 채용 활발.' },
  { id: 12, name: '전남 나주', province: '전라남도', score: 75, monthly: 28, jobs: 420, youth: '+14%',
    tags: ['에너지밸리', '혁신도시', '공공기관'], population: 11, benefit: 3,
    desc: '한국전력·에너지 공기업 집적 혁신도시. 에너지밸리 스타트업 생태계 조성 중. 주거비 전국 최저 수준. 공공기관 이전 지원 혜택 다수.' },
  { id: 13, name: '천안', province: '충청남도', score: 74, monthly: 42, jobs: 2400, youth: '+6%',
    tags: ['디스플레이', '자동차부품', '수도권근접'], population: 65, benefit: 2,
    desc: 'KTX 서울 40분 최단거리 지방 도시. 삼성디스플레이·현대차 협력사 밀집. 수도권 접근성과 지방 생활비의 장점 결합. 청년 취업 연계 인프라 강화 중.' },
  { id: 14, name: '진주', province: '경상남도', score: 73, monthly: 30, jobs: 680, youth: '+7%',
    tags: ['항공우주', '농업바이오', '혁신도시'], population: 34, benefit: 2,
    desc: '항공우주·국방산업 인프라 성장 중. LH·한국토지주택공사 이전 혁신도시. 진주 실크·전통공예 창업 지원. 주거비 저렴하고 자연환경 우수.' },
  { id: 15, name: '순천', province: '전라남도', score: 72, monthly: 27, jobs: 390, youth: '+8%',
    tags: ['정원도시', '생태환경', '귀촌'], population: 28, benefit: 2,
    desc: '국가정원·생태 자연 1번지. 주거비 전국 최저 수준권. 순천만 국가정원 기반 생태관광 창업 지원. 귀촌 청년 정착금 및 농어업 청년 지원 연계.' },
  { id: 16, name: '익산', province: '전라북도', score: 71, monthly: 25, jobs: 560, youth: '+5%',
    tags: ['식품산업', '의료기기', '귀농'], population: 27, benefit: 2,
    desc: '국가식품클러스터 소재지. 식품·외식 창업 최적지. 월세 전국 최저 수준. 귀농 청년 지원 정착금·농지 임대 연계. KTX 전주·서울 접근 편리.' },
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
