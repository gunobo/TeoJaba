import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import KakaoMap from '../components/KakaoMap';

const JOBS = [
  { id: 'it', label: 'IT·개발', emoji: '💻' },
  { id: 'design', label: '디자인·창작', emoji: '🎨' },
  { id: 'medical', label: '의료·보건', emoji: '🏥' },
  { id: 'education', label: '교육·강의', emoji: '📚' },
  { id: 'manufacturing', label: '제조·생산', emoji: '🏭' },
  { id: 'service', label: '서비스·요식', emoji: '☕' },
  { id: 'agriculture', label: '농업·귀농', emoji: '🌾' },
  { id: 'freelance', label: '프리랜서·원격', emoji: '🌐' },
];

const LIFESTYLES = [
  { id: 'nature', label: '자연 친화', emoji: '🌲' },
  { id: 'city', label: '도심 편의', emoji: '🏙️' },
  { id: 'culture', label: '문화·예술', emoji: '🎭' },
  { id: 'sports', label: '스포츠·액티비티', emoji: '⛷️' },
  { id: 'food', label: '음식·미식', emoji: '🍜' },
  { id: 'quiet', label: '조용한 환경', emoji: '🌙' },
];

const INFRA = [
  { id: 'transport', label: 'KTX·고속도로', emoji: '🚄' },
  { id: 'hospital', label: '의료 시설', emoji: '🏨' },
  { id: 'school', label: '교육 환경', emoji: '🏫' },
  { id: 'shopping', label: '쇼핑·마트', emoji: '🛍️' },
  { id: 'housing', label: '저렴한 주거비', emoji: '🏠' },
  { id: 'job', label: '일자리 풍부', emoji: '💼' },
];

const RESULTS = [
  {
    rank: 1, name: '전주', province: '전라북도', score: 94,
    monthly: 35, jobCount: 1240, benefit: 500,
    desc: '청년 지원 정책 전국 최고 수준. KTX 서울 1시간 20분. 한옥마을·문화 인프라 풍부. 월세·창업·취업 5종 지원 동시 운영.',
    highlights: ['청년 창업 도약 패키지 최대 500만원', '월세 지원 월 20만원 (최대 2년)', '전세 보증금 무이자 대출 3,000만원', 'KTX 서울 1시간 20분'],
  },
  {
    rank: 2, name: '제주', province: '제주특별자치도', score: 91,
    monthly: 55, jobCount: 890, benefit: 300,
    desc: '청정 자연 속 원격 근무 최적지. IT·디지털 인재 이주 정착금 300만원. 로컬 크리에이터 창업 생태계 급성장.',
    highlights: ['IT 인재 이주 정착금 최대 300만원', '로컬 크리에이터 창업 지원 1,000만원', '주거 안심 지원 월 15만원', '디지털 교육비 지원 200만원'],
  },
  {
    rank: 3, name: '광주', province: '광주광역시', score: 87,
    monthly: 42, jobCount: 2100, benefit: 1000,
    desc: 'AI 스타트업 허브로 급성장. 광주형 일자리·AI 클러스터 취업 생태계 성장. 광역시급 인프라로 생활 편의성 우수.',
    highlights: ['AI 스타트업 인큐베이팅 최대 1,000만원', '광주형 일자리 장려금 월 30만원', '문화콘텐츠 창업 지원 600만원', 'AI·SW 교육비 지원 300만원'],
  },
  {
    rank: 4, name: '대전', province: '대전광역시', score: 82,
    monthly: 45, jobCount: 2200, benefit: 1500,
    desc: 'KAIST·대덕연구단지 기반 과학기술 도시. KTX 서울 50분. 딥테크 창업 지원 전국 최고. 연구직·엔지니어 최적지.',
    highlights: ['딥테크 창업 지원 최대 1,500만원', '연구소 인턴십 월 200만원', '행복주택 시세 60%', '과학기술 교육 바우처 250만원'],
  },
];

function Chip({ item, selected, onToggle }) {
  const active = selected.includes(item.id);
  return (
    <button onClick={() => onToggle(item.id)} className={`flex items-center gap-2 px-4 py-2.5 rounded-xl border text-sm font-medium transition-all ${
      active
        ? 'border-green-600 bg-green-50 text-green-700'
        : 'border-gray-200 bg-white text-gray-600 hover:border-gray-300'
    }`}>
      <span>{item.emoji}</span>
      <span>{item.label}</span>
      {active && (
        <svg className="w-3.5 h-3.5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
        </svg>
      )}
    </button>
  );
}

function ResultCard({ r }) {
  const [open, setOpen] = useState(false);
  return (
    <div className={`bg-white border rounded-2xl p-6 ${r.rank === 1 ? 'border-green-500 ring-1 ring-green-500/30' : 'border-gray-200'}`}>
      {r.rank === 1 && (
        <span className="inline-block text-xs font-bold text-green-700 bg-green-100 px-2.5 py-1 rounded-full mb-4">
          🏆 최고 추천
        </span>
      )}
      <div className="flex items-start justify-between mb-3">
        <div>
          <p className="text-xl font-black text-gray-900">{r.name}</p>
          <p className="text-xs text-gray-400 mt-0.5">{r.province}</p>
        </div>
        <div className="text-right">
          <p className="text-2xl font-black text-green-600">{r.score}</p>
          <p className="text-xs text-gray-400">매칭 점수</p>
        </div>
      </div>

      <p className="text-sm text-gray-600 leading-relaxed mb-5">{r.desc}</p>

      <div className="grid grid-cols-3 gap-2 mb-5">
        {[['평균 월세', `${r.monthly}만원`], ['일자리 수', `${r.jobCount}개`], ['이주 지원금', `${r.benefit}만원`]].map(([l, v]) => (
          <div key={l} className="bg-gray-50 rounded-xl p-3 text-center">
            <p className="text-sm font-bold text-gray-900">{v}</p>
            <p className="text-xs text-gray-400 mt-0.5">{l}</p>
          </div>
        ))}
      </div>

      {open && (
        <ul className="mb-5 space-y-2">
          {r.highlights.map(h => (
            <li key={h} className="flex gap-2 text-sm text-gray-600 items-center">
              <span className="w-1.5 h-1.5 rounded-full bg-green-500 shrink-0" />
              {h}
            </li>
          ))}
        </ul>
      )}

      <div className="flex gap-2">
        <button onClick={() => setOpen(!open)} className="flex-1 py-2.5 border border-gray-200 rounded-xl text-xs font-semibold text-gray-600 hover:bg-gray-50 transition-colors">
          {open ? '접기 ↑' : '자세히 ↓'}
        </button>
        <Link to="/benefits" className="flex-1 py-2.5 bg-green-600 hover:bg-green-700 text-white rounded-xl text-xs font-semibold text-center transition-colors">
          혜택 확인
        </Link>
      </div>
    </div>
  );
}

export default function Recommend() {
  const [step, setStep] = useState(0);
  const [jobs, setJobs] = useState([]);
  const [lifestyles, setLifestyles] = useState([]);
  const [infra, setInfra] = useState([]);

  const toggle = setter => id => setter(p => p.includes(id) ? p.filter(i => i !== id) : [...p, id]);

  const STEPS = [
    { title: '어떤 직종에서 일하고 싶으세요?', sub: '현재 직종 또는 희망 직종을 선택해주세요', items: JOBS, selected: jobs, toggle: toggle(setJobs) },
    { title: '어떤 생활 환경을 원하세요?', sub: '지방에서 즐기고 싶은 라이프스타일을 골라주세요', items: LIFESTYLES, selected: lifestyles, toggle: toggle(setLifestyles) },
    { title: '가장 중요한 인프라는요?', sub: '이주 시 꼭 필요한 조건을 선택해주세요', items: INFRA, selected: infra, toggle: toggle(setInfra) },
  ];

  if (step === 0) {
    return (
      <div className="min-h-screen pt-14 bg-white flex items-center">
        <div className="max-w-lg mx-auto px-5 py-20 text-center">
          <h1 className="text-4xl font-black text-gray-900 tracking-tight mb-4">내 지역 찾기</h1>
          <p className="text-gray-500 text-lg mb-10">3가지 질문으로 맞춤 지역을 추천해드립니다.<br />2~3분이면 완료돼요.</p>
          <div className="flex justify-center gap-6 mb-12 text-sm text-gray-500">
            {['직종 선택', '라이프스타일', '인프라 조건'].map((l, i) => (
              <div key={l} className="flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-gray-100 text-gray-400 text-xs font-bold flex items-center justify-center">{i + 1}</span>
                {l}
              </div>
            ))}
          </div>
          <button onClick={() => setStep(1)}
            className="bg-green-600 hover:bg-green-700 text-white font-bold px-8 py-3.5 rounded-xl text-sm transition-colors">
            시작하기 →
          </button>
        </div>
      </div>
    );
  }

  if (step === 4) {
    return (
      <div className="min-h-screen pt-14 bg-gray-50">
        <div className="max-w-3xl mx-auto px-5 py-14">
          <div className="text-center mb-10">
            <h1 className="text-3xl font-black text-gray-900 tracking-tight mb-2">추천 지역</h1>
            <p className="text-gray-500">조건을 분석해 최적의 지역을 찾았어요</p>
          </div>

          {/* 카카오맵 */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-sm font-bold text-gray-700">지도에서 보기</h2>
              <div className="flex items-center gap-3 text-xs text-gray-400">
                <span className="flex items-center gap-1"><span className="inline-block w-2.5 h-2.5 rounded-sm bg-green-600"></span> 90점+</span>
                <span className="flex items-center gap-1"><span className="inline-block w-2.5 h-2.5 rounded-sm bg-blue-600"></span> 85점+</span>
                <span className="flex items-center gap-1"><span className="inline-block w-2.5 h-2.5 rounded-sm bg-orange-500"></span> 80점+</span>
              </div>
            </div>
            <KakaoMap regions={RESULTS} />
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            {RESULTS.map(r => <ResultCard key={r.rank} r={r} />)}
          </div>
          <div className="text-center mt-8">
            <button onClick={() => setStep(0)} className="text-sm text-gray-500 hover:text-gray-900 underline underline-offset-2 transition-colors">
              다시 검색하기
            </button>
          </div>
        </div>
      </div>
    );
  }

  const cur = STEPS[step - 1];
  const progress = Math.round((step / 3) * 100);

  return (
    <div className="min-h-screen pt-14 bg-white">
      <div className="max-w-2xl mx-auto px-5 py-14">
        {/* 진행 바 */}
        <div className="mb-10">
          <div className="flex justify-between text-xs text-gray-400 mb-2">
            <span>{step} / 3</span>
            <span>{progress}%</span>
          </div>
          <div className="h-1 bg-gray-100 rounded-full overflow-hidden">
            <div className="h-full bg-green-500 rounded-full transition-all duration-500" style={{ width: `${progress}%` }} />
          </div>
        </div>

        <h2 className="text-2xl font-black text-gray-900 mb-1.5">{cur.title}</h2>
        <p className="text-sm text-gray-400 mb-8">{cur.sub}</p>

        <div className="flex flex-wrap gap-2.5 mb-12">
          {cur.items.map(item => (
            <Chip key={item.id} item={item} selected={cur.selected} onToggle={cur.toggle} />
          ))}
        </div>

        <div className="flex justify-between items-center">
          <button onClick={() => setStep(s => s - 1)} className="text-sm text-gray-500 hover:text-gray-900 transition-colors flex items-center gap-1.5">
            ← 이전
          </button>
          <span className="text-sm text-gray-400">
            {cur.selected.length > 0
              ? <span className="text-green-600 font-semibold">{cur.selected.length}개 선택</span>
              : '1개 이상 선택해주세요'}
          </span>
          <button
            onClick={() => step < 3 ? setStep(s => s + 1) : setStep(4)}
            disabled={cur.selected.length === 0}
            className={`px-5 py-2.5 rounded-xl text-sm font-bold transition-colors ${
              cur.selected.length > 0
                ? 'bg-green-600 hover:bg-green-700 text-white'
                : 'bg-gray-100 text-gray-400 cursor-not-allowed'
            }`}>
            {step < 3 ? '다음 →' : '결과 보기 →'}
          </button>
        </div>
      </div>
    </div>
  );
}
