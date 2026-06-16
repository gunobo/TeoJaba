import React, { useState } from 'react';

const BENEFITS = [
  // 전주
  { id: 1,  region: '전주', category: 'housing', title: '청년 월세 지원금', amount: '월 20만원', duration: '최대 2년', deadline: '2026.12.31', desc: '전주시 거주 만 19~39세 무주택 청년. 보증금 5천만원·월세 60만원 이하 주택. 소득 중위 150% 이하 신청 가능. 매월 20만원 최대 24개월 지원.', tag: '주거' },
  { id: 2,  region: '전주', category: 'startup', title: '청년 창업 도약 패키지', amount: '최대 500만원', duration: '1년', deadline: '2026.09.30', desc: '전주시 이주 청년(만 39세 이하) 창업 아이디어 공모 선발 시 사업화 자금·멘토링·공간 지원. 우수팀 서울 IR 연계.', tag: '창업' },
  { id: 3,  region: '전주', category: 'education', title: '문화예술 청년 활동 지원금', amount: '최대 150만원', duration: '연 1회', deadline: '2026.07.31', desc: '전주시 거주 문화예술인 청년(만 39세 이하). 전시·공연·출판 등 문화활동 비용. 결과보고서 제출 필수.', tag: '문화' },
  { id: 4,  region: '전주', category: 'job', title: '전주형 청년 취업 장려금', amount: '월 30만원', duration: '12개월', deadline: '상시', desc: '전주시 소재 중소·중견기업 신규 취업 청년(만 34세 이하). 월 30만원×12개월 총 360만원 지원. 6개월 이상 재직 유지 조건.', tag: '취업' },
  { id: 5,  region: '전주', category: 'housing', title: '청년 전세 보증금 무이자 대출', amount: '최대 3,000만원', duration: '최대 4년', deadline: '상시', desc: '전주시 거주 만 19~34세 청년. 전세보증금 최대 3,000만원 무이자 지원(시 재원). 소득 중위 120% 이하.', tag: '주거' },

  // 제주
  { id: 6,  region: '제주', category: 'job', title: 'IT·디지털 인재 이주 정착금', amount: '최대 300만원', duration: '정착금 1회', deadline: '상시', desc: '제주 이주 IT 개발자·UX디자이너·데이터분석가 대상. 이사비 100만원+정착금 200만원. 6개월 이상 거주·재직 조건.', tag: '취업' },
  { id: 7,  region: '제주', category: 'housing', title: '제주 청년 주거안심 지원', amount: '월 15만원', duration: '최대 2년', deadline: '2026.12.31', desc: '제주도 전입 만 19~39세 청년 무주택자. 월세 보조 15만원. 월세 50만원 이하 주택 거주자. 제주 주소 전입 후 3개월 이상 거주 조건.', tag: '주거' },
  { id: 8,  region: '제주', category: 'startup', title: '제주 로컬 크리에이터 육성 지원', amount: '최대 1,000만원', duration: '1년', deadline: '2026.06.30', desc: '제주 특산물·문화 기반 로컬 창업팀(팀당 최대 1,000만원). 제주창조경제혁신센터 입주 지원 연계. 관광·F&B·공예 분야 우대.', tag: '창업' },
  { id: 9,  region: '제주', category: 'education', title: '제주 디지털 전환 교육비 지원', amount: '최대 200만원', duration: '연 1회', deadline: '2026.10.31', desc: '제주 거주 만 39세 이하 청년. 클라우드·AI·데이터 분야 국비·민간 교육과정 수강비 최대 200만원 지원.', tag: '교육' },

  // 춘천
  { id: 10, region: '춘천', category: 'settlement', title: '강원 청년 이주 정착 지원금', amount: '150만원', duration: '1회', deadline: '2026.11.30', desc: '강원특별자치도 외부에서 전입한 만 18~39세 청년. 1인 150만원 지원. 전입일로부터 6개월 이상 거주 유지 필수.', tag: '정착금' },
  { id: 11, region: '춘천', category: 'job', title: '춘천 청년 취업 지원 프로그램', amount: '월 20만원', duration: '6개월', deadline: '상시', desc: '춘천시 소재 기업 취업 만 34세 이하 청년. 취업 장려금 월 20만원×6개월. 직무역량 강화 교육 병행 제공.', tag: '취업' },
  { id: 12, region: '춘천', category: 'startup', title: '강원 청년 로컬 창업 지원', amount: '최대 500만원', duration: '1년', deadline: '2026.08.31', desc: '강원도 내 창업 만 39세 이하 청년(팀). 로컬 관광·식품·자연 테마 창업 우대. 강원창업보육센터 연계 공간 지원.', tag: '창업' },
  { id: 13, region: '춘천', category: 'housing', title: '춘천 청년 공공임대 특별공급', amount: '시세 40% 임대', deadline: '상시', duration: '최대 6년', desc: '춘천시 청년 공공임대주택(전용 26~36㎡). 시세 40% 수준 임대료. 만 19~39세 무주택 청년 우선 공급. 소득 기준 중위 120% 이하.', tag: '주거' },

  // 광주
  { id: 14, region: '광주', category: 'job', title: '광주형 일자리 청년 채용 장려금', amount: '월 30만원', duration: '12개월', deadline: '상시', desc: '광주형 일자리 참여 기업 신규 취업 청년(만 34세 이하). 월 30만원 총 360만원. 인근 문화·여가 바우처 20만원 추가 지급.', tag: '취업' },
  { id: 15, region: '광주', category: 'startup', title: 'AI 스타트업 인큐베이팅', amount: '최대 1,000만원', duration: '6개월', deadline: '2026.10.15', desc: '광주 인공지능 클러스터 입주 스타트업(대표자 만 39세 이하). 사무공간+초기 자금 최대 1,000만원. AI·자율주행·스마트팩토리 분야 우대.', tag: '창업' },
  { id: 16, region: '광주', category: 'housing', title: '광주 청년 주거 바우처', amount: '월 18만원', duration: '최대 2년', deadline: '2026.12.31', desc: '광주 거주 만 19~34세 청년 무주택자. 월 18만원 바우처(주거비 직접 지원). 소득 중위 130% 이하. 전세·월세 모두 신청 가능.', tag: '주거' },
  { id: 17, region: '광주', category: 'education', title: '광주 AI·SW 직무 교육 지원', amount: '최대 300만원', duration: '연 1회', deadline: '2026.09.30', desc: '광주 거주 만 39세 이하 청년. AI·SW 관련 부트캠프·자격증 교육 수강비 최대 300만원. 수료 후 취업연계 지원.', tag: '교육' },
  { id: 18, region: '광주', category: 'startup', title: '광주 문화콘텐츠 청년 창업지원', amount: '최대 600만원', duration: '1년', deadline: '2026.07.31', desc: '광주 거주 만 39세 이하 청년. 미디어·영상·웹툰·음악 등 문화콘텐츠 분야 창업팀 지원. 영상 스튜디오 무상 제공 연계.', tag: '창업' },

  // 부산
  { id: 19, region: '부산', category: 'housing', title: '부산 청년 공공임대주택', amount: '시세 50% 임대', duration: '최대 6년', deadline: '상시', desc: '부산시 청년(만 19~39세) 공공임대. 시세 50% 수준. 전용 16~26㎡, 교통 편리 지역 위주 공급. 소득 중위 120% 이하.', tag: '주거' },
  { id: 20, region: '부산', category: 'job', title: '부산 청년 중소기업 취업 지원금', amount: '월 50만원', duration: '12개월', deadline: '상시', desc: '부산 소재 중소기업 신규 취업 청년(만 34세 이하). 월 50만원×12개월 총 600만원. 정규직 전환 시 추가 100만원 지급.', tag: '취업' },
  { id: 21, region: '부산', category: 'startup', title: '부산 해양·스타트업 지원', amount: '최대 800만원', duration: '1년', deadline: '2026.08.31', desc: '부산 해양산업·물류·핀테크·바이오 분야 청년 창업팀. 사무공간+자금 최대 800만원. 부산창업지원센터 입주 연계.', tag: '창업' },
  { id: 22, region: '부산', category: 'education', title: '부산 청년 국제 역량 강화 지원', amount: '최대 200만원', duration: '연 1회', deadline: '2026.06.30', desc: '부산 거주 만 34세 이하 청년. 외국어·국제무역·해운물류 자격증 취득 교육비 최대 200만원. 부산항 연계 취업 지원.', tag: '교육' },
  { id: 23, region: '부산', category: 'housing', title: '부산 청년 전세 이자 지원', amount: '연 2% 이자 지원', duration: '최대 3년', deadline: '상시', desc: '부산 거주 만 19~39세 청년 전세자. 전세대출 이자 연 2% 지원(최대 1,200만원). 전세보증금 3억 이하 대상.', tag: '주거' },

  // 대구
  { id: 24, region: '대구', category: 'education', title: '대구 청년 직무역량 교육비 지원', amount: '최대 200만원', duration: '연 1회', deadline: '2026.08.31', desc: '대구 거주 만 39세 이하 청년. 국가공인·민간자격증 취득, 직무 부트캠프 수강비 최대 200만원. 의료기기·패션·로봇 분야 우대.', tag: '교육' },
  { id: 25, region: '대구', category: 'job', title: '대구 첨단산업 청년 채용 보조금', amount: '월 40만원', duration: '12개월', deadline: '상시', desc: '대구 소재 의료기기·로봇·미래차 분야 기업 신규 취업 청년. 월 40만원×12개월. 기업-청년 매칭 취업박람회 연계.', tag: '취업' },
  { id: 26, region: '대구', category: 'startup', title: '대구 의료기기 청년 창업 지원', amount: '최대 700만원', duration: '1년', deadline: '2026.09.30', desc: '대구·경북 의료기기·헬스케어 분야 청년 창업팀. 시제품 제작비·인증비 포함 최대 700만원. 의료기기 전문 멘토링 제공.', tag: '창업' },
  { id: 27, region: '대구', category: 'housing', title: '대구 청년 주거안정 월세 지원', amount: '월 15만원', duration: '최대 2년', deadline: '2026.12.31', desc: '대구 거주 만 19~34세 청년 무주택자. 월세 15만원 지원. 전년도 소득 3,600만원 이하. 대구 전입 3개월 이상 조건.', tag: '주거' },

  // 대전
  { id: 28, region: '대전', category: 'job', title: '대전 연구·개발 청년 인턴십', amount: '월 200만원', duration: '6개월', deadline: '2026.09.30', desc: '대덕연구단지 소재 정부출연연구소 인턴십. 월 200만원 이상 수당. 만 34세 이하 이공계 졸업(예정)자. 정규직 전환 우대.', tag: '취업' },
  { id: 29, region: '대전', category: 'startup', title: '대전 딥테크 스타트업 지원', amount: '최대 1,500만원', duration: '1년', deadline: '2026.07.31', desc: '대전 소재 AI·바이오·반도체 딥테크 창업팀(만 39세 이하 대표). 연구개발비+사업화비 최대 1,500만원. KAIST·충남대 연계 기술 지도.', tag: '창업' },
  { id: 30, region: '대전', category: 'housing', title: '대전 청년 행복주택', amount: '시세 60% 임대', duration: '최대 6년', deadline: '상시', desc: '대전 행복주택(역세권·연구단지 인근). 시세 60% 임대. 전용 16~36㎡. 청년·신혼부부 우선. 대중교통 접근성 최우수 지역 위주.', tag: '주거' },
  { id: 31, region: '대전', category: 'education', title: '대전 과학기술 청년 교육 바우처', amount: '최대 250만원', duration: '연 1회', deadline: '2026.10.31', desc: '대전 거주 만 39세 이하 청년. AI·반도체·바이오 분야 교육과정 수강비 최대 250만원. 정부출연연 인턴십 연계 우선 지원.', tag: '교육' },

  // 여수
  { id: 32, region: '여수', category: 'startup', title: '여수 관광·F&B 청년 창업 지원', amount: '최대 400만원', duration: '1년', deadline: '2026.08.31', desc: '여수 귀촌·이주 청년 관광·요식업 창업팀(만 39세 이하). 초기 자금 최대 400만원. 여수시 관광특구 내 공유주방·공간 연계.', tag: '창업' },
  { id: 33, region: '여수', category: 'settlement', title: '여수 청년 귀촌 정착 지원금', amount: '200만원', duration: '1회', deadline: '2026.12.31', desc: '수도권에서 여수시로 귀촌한 만 18~39세 청년(전입 후 1년 이내 신청). 정착 일시금 200만원. 농어업 종사 시 추가 100만원.', tag: '정착금' },
  { id: 34, region: '여수', category: 'job', title: '여수 청년 해양관광 취업 연계', amount: '월 25만원', duration: '6개월', deadline: '2026.09.30', desc: '여수시 해양관광·수산·항만 분야 취업 청년(만 34세 이하). 6개월 취업 장려금 월 25만원. 여수엑스포관광단지 연계 취업 우선 지원.', tag: '취업' },

  // 강릉
  { id: 35, region: '강릉', category: 'settlement', title: '강릉 청년 이주 정착 패키지', amount: '총 300만원', duration: '1회+월세', deadline: '2026.11.30', desc: '강릉시 이주 만 18~39세 청년. 정착금 200만원(1회)+월세 보조 월 10만원(12개월). 강릉 실거주 1년 유지 필수.', tag: '정착금' },
  { id: 36, region: '강릉', category: 'startup', title: '강릉 커피·로컬 크리에이터 지원', amount: '최대 500만원', duration: '1년', deadline: '2026.07.31', desc: '강릉 특화 커피·관광·공예 분야 청년 창업팀. 최대 500만원 지원+강릉 커피거리 팝업 기회 제공. 강릉시 청년창업팀 인큐베이팅 연계.', tag: '창업' },

  // 포항
  { id: 37, region: '포항', category: 'job', title: '포항 이차전지·철강 청년 채용 지원', amount: '월 50만원', duration: '12개월', deadline: '상시', desc: '포항 소재 이차전지·철강·소재 분야 기업 신규 취업 청년(만 34세 이하). 월 50만원×12개월 총 600만원. POSTECH 연계 기술 교육 제공.', tag: '취업' },
  { id: 38, region: '포항', category: 'housing', title: '포항 청년 행복주택 특별공급', amount: '시세 50% 임대', duration: '최대 6년', deadline: '상시', desc: '포항 청년(만 19~39세) 행복주택. 시세 50% 이하. 포스코·이차전지 클러스터 인근 위치. 대중교통 접근 우수.', tag: '주거' },

  // 청주
  { id: 39, region: '청주', category: 'job', title: '청주 반도체·바이오 청년 취업 지원', amount: '월 40만원', duration: '12개월', deadline: '상시', desc: '청주 오창·청원 산단 소재 반도체·바이오·화장품 기업 신규 취업 청년. 월 40만원×12개월. SK하이닉스 협력사 취업 연계 우대.', tag: '취업' },
  { id: 40, region: '청주', category: 'housing', title: '충북 청년 월세 지원', amount: '월 20만원', duration: '최대 2년', deadline: '2026.12.31', desc: '충북 거주 만 19~34세 청년 무주택자. 월 20만원 최대 24개월. 소득 중위 150% 이하. 청주·충주·제천 등 충북 전 지역 신청 가능.', tag: '주거' },
];

const REGIONS = ['전체', '전주', '제주', '춘천', '광주', '부산', '대구', '대전', '여수', '강릉', '포항', '청주'];

const CATS = [
  { id: 'all', label: '전체' },
  { id: 'housing', label: '주거' },
  { id: 'job', label: '취업' },
  { id: 'startup', label: '창업' },
  { id: 'education', label: '교육' },
  { id: 'settlement', label: '정착금' },
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
