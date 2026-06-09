import React, { useState } from 'react';

const BENEFITS = [
  { id: 1, region: '전주', category: 'housing', title: '청년 주거 지원금', amount: '월 20만원', duration: '최대 2년', deadline: '2025.12.31', desc: '전주시 거주 만 19~39세 청년. 월세 보조 20만원. 소득 중위 150% 이하 신청 가능.', tag: '주거' },
  { id: 2, region: '전주', category: 'startup', title: '청년 창업 지원금', amount: '최대 300만원', duration: '1회', deadline: '2025.09.30', desc: '전주시 이주 청년 창업 아이디어 공모 선발 시 사업화 자금 최대 300만원 지원.', tag: '창업' },
  { id: 3, region: '제주', category: 'job', title: 'IT 인재 이주 지원', amount: '최대 200만원', duration: '정착금 1회', deadline: '상시', desc: '제주 이주 IT 개발자·디자이너 대상. 이사비 및 정착금 지원. 6개월 이상 거주 조건.', tag: '취업' },
  { id: 4, region: '춘천', category: 'housing', title: '강원 청년 이주 정착금', amount: '100만원', duration: '1회', deadline: '2025.11.30', desc: '강원도 내 전입 만 18~39세 청년 대상 1회성 정착금 지원.', tag: '정착금' },
  { id: 5, region: '광주', category: 'job', title: '광주형 일자리 취업 지원', amount: '월 30만원', duration: '12개월', deadline: '상시', desc: '광주 소재 중소기업 취업 청년 대상. 고용 장려금 및 역량 강화 교육 제공.', tag: '취업' },
  { id: 6, region: '광주', category: 'startup', title: 'AI 창업 인큐베이팅', amount: '최대 500만원', duration: '6개월', deadline: '2025.10.15', desc: '광주 AI 클러스터 입주 스타트업 대상. 사무공간 제공 및 초기 자금 최대 500만원.', tag: '창업' },
  { id: 7, region: '부산', category: 'housing', title: '청년 공공임대주택', amount: '시세 50% 임대', duration: '최대 6년', deadline: '상시', desc: '부산시 청년 공공임대주택. 시세 50% 이하 임대료로 안정적인 주거 환경 제공.', tag: '주거' },
  { id: 8, region: '대구', category: 'education', title: '청년 직무 교육비 지원', amount: '최대 150만원', duration: '연 1회', deadline: '2025.08.31', desc: '대구시 거주 만 39세 이하 청년 직무 교육 수강비 지원. 국가 공인 자격증 포함.', tag: '교육' },
  { id: 9, region: '전주', category: 'education', title: '문화예술 청년 지원금', amount: '최대 100만원', duration: '연 1회', deadline: '2025.07.31', desc: '전주시 거주 문화예술인 청년 활동 지원금. 전시·공연 등 문화활동 비용 지원.', tag: '문화' },
];

const REGIONS = ['전체', '전주', '제주', '춘천', '광주', '부산', '대구'];
const CATS = [
  { id: 'all', label: '전체' },
  { id: 'housing', label: '주거' },
  { id: 'job', label: '취업' },
  { id: 'startup', label: '창업' },
  { id: 'education', label: '교육' },
];

const TAG_COLORS = {
  주거: 'text-sky-700 bg-sky-50',
  창업: 'text-orange-700 bg-orange-50',
  취업: 'text-green-700 bg-green-50',
  정착금: 'text-violet-700 bg-violet-50',
  교육: 'text-teal-700 bg-teal-50',
  문화: 'text-pink-700 bg-pink-50',
};

function BenefitCard({ b }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="bg-white border border-gray-200 rounded-2xl p-5 hover:border-gray-300 transition-colors">
      <div className="flex items-start justify-between mb-3">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${TAG_COLORS[b.tag] || 'text-gray-600 bg-gray-100'}`}>
              {b.tag}
            </span>
            <span className="text-xs text-gray-400">{b.region}</span>
          </div>
          <h3 className="text-base font-bold text-gray-900">{b.title}</h3>
        </div>
        <p className="text-lg font-black text-gray-900 text-right shrink-0 ml-3">{b.amount}</p>
      </div>

      <div className="flex gap-4 text-xs text-gray-400 mb-4">
        <span>기간 · <span className="text-gray-600 font-medium">{b.duration}</span></span>
        <span>마감 · <span className="text-gray-600 font-medium">{b.deadline}</span></span>
      </div>

      {open && (
        <p className="text-sm text-gray-600 leading-relaxed mb-4 pt-3 border-t border-gray-100">{b.desc}</p>
      )}

      <div className="flex gap-2">
        <button onClick={() => setOpen(!open)} className="flex-1 py-2 border border-gray-200 rounded-lg text-xs font-medium text-gray-500 hover:bg-gray-50 transition-colors">
          {open ? '접기' : '상세 보기'}
        </button>
        <button className="flex-1 py-2 bg-gray-900 hover:bg-gray-700 text-white rounded-lg text-xs font-semibold transition-colors">
          신청하기
        </button>
      </div>
    </div>
  );
}

export default function Benefits() {
  const [region, setRegion] = useState('전체');
  const [cat, setCat] = useState('all');
  const [search, setSearch] = useState('');

  const list = BENEFITS.filter(b => {
    const rMatch = region === '전체' || b.region === region;
    const cMatch = cat === 'all' || b.category === cat;
    const sMatch = !search || b.title.includes(search) || b.region.includes(search);
    return rMatch && cMatch && sMatch;
  });

  return (
    <div className="min-h-screen pt-14 bg-white">
      {/* 헤더 */}
      <div className="bg-gray-950 py-20 px-5">
        <div className="max-w-6xl mx-auto">
          <p className="text-xs font-bold text-green-400 tracking-widest uppercase mb-4">지자체 혜택 통합 안내</p>
          <h1 className="text-4xl font-black text-white tracking-tight mb-3">혜택 정보</h1>
          <p className="text-gray-400">전국 지자체의 청년 이주 혜택을 한 곳에서 찾아보세요</p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-5 py-10">
        {/* 필터 */}
        <div className="bg-white border border-gray-200 rounded-2xl p-5 mb-8">
          {/* 검색 */}
          <div className="relative mb-5">
            <svg className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input value={search} onChange={e => setSearch(e.target.value)}
              placeholder="혜택명, 지역으로 검색..."
              className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm outline-none focus:border-gray-400 transition-colors" />
          </div>

          {/* 지역 */}
          <div className="mb-4">
            <p className="text-xs font-semibold text-gray-400 mb-2.5 tracking-wider">지역</p>
            <div className="flex gap-2 flex-wrap">
              {REGIONS.map(r => (
                <button key={r} onClick={() => setRegion(r)}
                  className={`px-3.5 py-1.5 rounded-lg text-xs font-medium border transition-colors ${
                    region === r ? 'border-gray-900 bg-gray-900 text-white' : 'border-gray-200 text-gray-600 hover:border-gray-300'
                  }`}>
                  {r}
                </button>
              ))}
            </div>
          </div>

          {/* 유형 */}
          <div>
            <p className="text-xs font-semibold text-gray-400 mb-2.5 tracking-wider">유형</p>
            <div className="flex gap-2 flex-wrap">
              {CATS.map(c => (
                <button key={c.id} onClick={() => setCat(c.id)}
                  className={`px-3.5 py-1.5 rounded-lg text-xs font-medium border transition-colors ${
                    cat === c.id ? 'border-green-600 bg-green-600 text-white' : 'border-gray-200 text-gray-600 hover:border-gray-300'
                  }`}>
                  {c.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between mb-5">
          <p className="text-sm text-gray-500"><span className="font-bold text-gray-900">{list.length}개</span>의 혜택</p>
        </div>

        {list.length === 0 ? (
          <div className="text-center py-20 text-gray-400">
            <p className="text-4xl mb-4">🔍</p>
            <p className="font-medium">조건에 맞는 혜택이 없습니다</p>
            <p className="text-sm mt-1">다른 조건으로 검색해보세요</p>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {list.map(b => <BenefitCard key={b.id} b={b} />)}
          </div>
        )}

        <div className="mt-10 bg-gray-50 border border-gray-100 rounded-2xl p-5">
          <p className="text-sm text-gray-500 leading-relaxed">
            혜택 정보는 <strong className="text-gray-700">공공데이터포털 API</strong> 및 각 지자체 공식 홈페이지에서 정기적으로 수집됩니다.
            변경될 수 있으니 신청 전 반드시 해당 기관에 확인하세요.
          </p>
        </div>
      </div>
    </div>
  );
}
