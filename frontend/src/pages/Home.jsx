import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';

function useCountUp(end, duration = 1600) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const started = useRef(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && !started.current) {
        started.current = true;
        let s = 0;
        const step = end / (duration / 16);
        const t = setInterval(() => {
          s += step;
          if (s >= end) { setCount(end); clearInterval(t); } else setCount(Math.floor(s));
        }, 16);
      }
    }, { threshold: 0.4 });
    obs.observe(el);
    return () => obs.disconnect();
  }, [end, duration]);
  return [count, ref];
}

function StatItem({ end, suffix, label }) {
  const [count, ref] = useCountUp(end);
  return (
    <div ref={ref} className="text-center py-8 px-4">
      <p className="text-3xl font-black text-gray-900 tracking-tight">
        {count.toLocaleString()}{suffix}
      </p>
      <p className="text-sm text-gray-500 mt-1">{label}</p>
    </div>
  );
}

const REGIONS = [
  { name: '전주', sub: '전라북도', score: 94, monthly: 35, tag: '청년 지원금 최고', color: 'bg-emerald-50 border-emerald-200', badge: 'text-emerald-700 bg-emerald-100' },
  { name: '제주', sub: '제주특별자치도', score: 91, monthly: 55, tag: '원격근무 최적지', color: 'bg-sky-50 border-sky-200', badge: 'text-sky-700 bg-sky-100' },
  { name: '춘천', sub: '강원특별자치도', score: 88, monthly: 38, tag: '수도권 접근 가능', color: 'bg-violet-50 border-violet-200', badge: 'text-violet-700 bg-violet-100' },
  { name: '광주', sub: '광주광역시', score: 87, monthly: 42, tag: 'AI 스타트업 허브', color: 'bg-orange-50 border-orange-200', badge: 'text-orange-700 bg-orange-100' },
];

export default function Home() {
  return (
    <div className="min-h-screen">

      {/* ── Hero ── */}
      <section className="relative bg-gray-950 min-h-[88vh] flex items-center overflow-hidden">
        {/* 배경 텍스처 */}
        <div className="absolute inset-0 opacity-[0.03]"
          style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)', backgroundSize: '32px 32px' }} />

        {/* 오른쪽 장식 */}
        <div className="absolute right-0 top-0 bottom-0 w-1/2 hidden lg:block overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-gray-950 via-gray-950/60 to-transparent z-10" />
          <div className="absolute right-12 top-1/2 -translate-y-1/2 grid grid-cols-2 gap-3 opacity-60">
            {['전주 94점', '제주 91점', '춘천 88점', '광주 87점', '부산 85점', '대구 83점', '대전 82점', '강릉 78점'].map((t, i) => (
              <div key={i} className="bg-white/8 border border-white/10 rounded-xl px-4 py-3 backdrop-blur-sm">
                <p className="text-white/90 text-sm font-medium">{t}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="relative z-10 max-w-6xl mx-auto px-5 py-28">
          <div className="max-w-xl">
            <span className="inline-block text-green-400 text-xs font-bold tracking-widest uppercase mb-5">
              지방소멸을 막는 청년 이주 플랫폼
            </span>
            <h1 className="text-5xl lg:text-6xl font-black text-white leading-[1.15] tracking-tight mb-6">
              당신의 터를<br />
              <span className="text-green-400">지방에서</span><br />
              잡아보세요
            </h1>
            <p className="text-gray-400 text-lg leading-relaxed mb-10">
              직종·생활 조건을 입력하면 맞춤 지역을 추천하고,<br />
              일자리·주거·지자체 혜택을 한눈에 확인하세요.
            </p>
            <div className="flex gap-3 flex-wrap">
              <Link to="/recommend"
                className="inline-flex items-center gap-2 bg-green-500 hover:bg-green-400 text-white font-bold px-6 py-3.5 rounded-xl text-sm transition-colors">
                내 지역 찾기 →
              </Link>
              <Link to="/benefits"
                className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/15 text-white font-medium px-6 py-3.5 rounded-xl text-sm border border-white/10 transition-colors">
                혜택 정보 보기
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── 통계 ── */}
      <section className="border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-5 grid grid-cols-2 md:grid-cols-4 divide-x divide-y md:divide-y-0 divide-gray-100">
          <StatItem end={16} suffix="개" label="추천 지역" />
          <StatItem end={40} suffix="개+" label="청년 지원 혜택" />
          <StatItem end={1240} suffix="개+" label="연계 일자리" />
          <StatItem end={300} suffix="만원" label="평균 이주 지원금" />
        </div>
      </section>

      {/* ── 서비스 소개 ── */}
      <section className="py-24 max-w-6xl mx-auto px-5">
        <div className="mb-14">
          <p className="text-xs font-bold text-green-600 tracking-widest uppercase mb-3">How it works</p>
          <h2 className="text-3xl font-black text-gray-900 tracking-tight">3분이면 충분해요</h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {[
            { step: '01', title: '조건 입력', desc: '직종, 선호 환경, 중요 인프라를 선택합니다. 3단계로 구성된 간단한 퀴즈예요.' },
            { step: '02', title: '지역 추천', desc: '입력한 조건을 분석해 전국 243개 지역을 점수화하여 지도 위에 보여드립니다.' },
            { step: '03', title: '혜택 확인', desc: '추천 지역의 일자리·주거·이주 지원금을 한눈에 비교하고 신청할 수 있어요.' },
          ].map(({ step, title, desc }) => (
            <div key={step} className="group">
              <p className="text-6xl font-black text-gray-100 group-hover:text-green-100 transition-colors leading-none mb-5">{step}</p>
              <h3 className="text-lg font-bold text-gray-900 mb-3">{title}</h3>
              <p className="text-sm text-gray-500 leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── 인기 지역 ── */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-5">
          <div className="flex items-end justify-between mb-10">
            <div>
              <p className="text-xs font-bold text-green-600 tracking-widest uppercase mb-2">이번 달 인기</p>
              <h2 className="text-2xl font-black text-gray-900 tracking-tight">추천 지역 TOP 4</h2>
            </div>
            <Link to="/regions" className="text-sm text-gray-500 hover:text-gray-900 transition-colors">전체 보기 →</Link>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {REGIONS.map((r, i) => (
              <Link to="/recommend" key={r.name} className={`group block border rounded-2xl p-5 hover:shadow-md transition-shadow ${r.color}`}>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-bold text-gray-400">#{i + 1}</span>
                  <span className={`text-xs font-bold px-2 py-1 rounded-full ${r.badge}`}>{r.score}점</span>
                </div>
                <p className="text-xl font-black text-gray-900 mb-0.5">{r.name}</p>
                <p className="text-xs text-gray-500 mb-4">{r.sub}</p>
                <div className="flex items-center justify-between">
                  <p className="text-xs text-gray-600">평균 월세 <span className="font-bold text-gray-900">{r.monthly}만원</span></p>
                  <span className="text-xs text-gray-400 group-hover:translate-x-0.5 transition-transform">→</span>
                </div>
                <p className="text-xs text-gray-500 mt-3 pt-3 border-t border-black/5">{r.tag}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── 왜 터잡아인가 ── */}
      <section className="py-24 max-w-6xl mx-auto px-5">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <p className="text-xs font-bold text-green-600 tracking-widest uppercase mb-4">왜 터잡아인가</p>
            <h2 className="text-3xl font-black text-gray-900 tracking-tight leading-tight mb-6">
              지방 이주가 어려운 건<br />
              정보가 없어서입니다
            </h2>
            <p className="text-gray-500 leading-relaxed mb-8">
              2022년 기준 전국 인구의 <strong className="text-gray-800">50.5%</strong>가 수도권에 집중되어 있습니다.
              지방에 살고 싶어도 일자리, 주거, 혜택 정보가 파편화되어 있어 결정을 내리지 못하는 청년이 많습니다.
              터잡아는 그 장벽을 없앱니다.
            </p>
            <div className="space-y-3">
              {[
                '기존 취업 플랫폼은 수도권 중심 — 지방 일자리 정보 부족',
                '지자체 혜택은 각 홈페이지에 파편화 — 찾기 너무 어려움',
                '이주 결정에 필요한 정보를 한 곳에서 제공하는 서비스 없음',
              ].map(t => (
                <div key={t} className="flex gap-3 items-start">
                  <span className="mt-1 shrink-0 w-4 h-4 rounded-full bg-green-500 flex items-center justify-center">
                    <svg className="w-2.5 h-2.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  </span>
                  <p className="text-sm text-gray-600 leading-relaxed">{t}</p>
                </div>
              ))}
            </div>
          </div>

          {/* 수치 카드들 */}
          <div className="grid grid-cols-2 gap-3">
            {[
              { label: '수도권 인구 집중도', value: '50.5%', sub: '전국 인구 기준', accent: 'text-red-500' },
              { label: '1000대 기업 매출', value: '86%', sub: '수도권 집중', accent: 'text-orange-500' },
              { label: '평균 주거비 절감', value: '-40%', sub: '지방 이주 시', accent: 'text-green-600' },
              { label: '지자체 청년 지원금', value: '250만원', sub: '전국 평균', accent: 'text-blue-600' },
            ].map(({ label, value, sub, accent }) => (
              <div key={label} className="bg-white border border-gray-100 rounded-2xl p-5 hover:border-gray-200 transition-colors">
                <p className={`text-2xl font-black ${accent} mb-1`}>{value}</p>
                <p className="text-sm font-semibold text-gray-800 mb-0.5">{label}</p>
                <p className="text-xs text-gray-400">{sub}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="bg-gray-950 py-24">
        <div className="max-w-2xl mx-auto px-5 text-center">
          <h2 className="text-3xl font-black text-white tracking-tight mb-4">
            지금 내 지역을 찾아보세요
          </h2>
          <p className="text-gray-400 mb-8 text-lg">
            3분 안에 완료. 무료입니다.
          </p>
          <Link to="/recommend"
            className="inline-flex items-center gap-2 bg-green-500 hover:bg-green-400 text-white font-bold px-8 py-4 rounded-xl text-base transition-colors">
            내 지역 찾기 →
          </Link>
        </div>
      </section>
    </div>
  );
}
