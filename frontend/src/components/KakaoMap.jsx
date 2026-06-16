import React, { useEffect, useRef } from 'react';

// 지역별 좌표
const REGION_COORDS = {
  '전주':  { lat: 35.8242, lng: 127.1479 },
  '제주':  { lat: 33.4996, lng: 126.5312 },
  '춘천':  { lat: 37.8813, lng: 127.7298 },
  '광주':  { lat: 35.1595, lng: 126.8526 },
  '부산':  { lat: 35.1796, lng: 129.0756 },
  '대구':  { lat: 35.8714, lng: 128.6014 },
  '대전':  { lat: 36.3504, lng: 127.3845 },
  '여수':  { lat: 34.7604, lng: 127.6622 },
  '강릉':  { lat: 37.7519, lng: 128.8761 },
  '전주':  { lat: 35.8242, lng: 127.1479 },
  '청주':  { lat: 36.6424, lng: 127.4890 },
  '포항':  { lat: 36.0190, lng: 129.3435 },
};

// 점수에 따른 마커 색상
function getScoreColor(score) {
  if (score >= 90) return '#16a34a';
  if (score >= 85) return '#2563eb';
  if (score >= 80) return '#f97316';
  return '#6b7280';
}

export default function KakaoMap({ regions = [] }) {
  const mapRef = useRef(null);
  const mapInstance = useRef(null);

  useEffect(() => {
    if (!window.kakao || !window.kakao.maps || !mapRef.current) return;

    const { kakao } = window;

    // 지도 생성 (한국 중심)
    const options = {
      center: new kakao.maps.LatLng(36.5, 127.8),
      level: 13,
    };

    const map = new kakao.maps.Map(mapRef.current, options);
    mapInstance.current = map;

    // 각 지역 마커 + 커스텀 오버레이 생성
    regions.forEach(region => {
      const coords = REGION_COORDS[region.name];
      if (!coords) return;

      const position = new kakao.maps.LatLng(coords.lat, coords.lng);
      const color = getScoreColor(region.score);

      // 커스텀 마커 (점수 표시)
      const content = `
        <div style="
          position: relative;
          display: flex;
          flex-direction: column;
          align-items: center;
          cursor: pointer;
        ">
          <div style="
            background: ${color};
            color: white;
            border-radius: 12px;
            padding: 6px 10px;
            font-size: 12px;
            font-weight: 700;
            font-family: 'Noto Sans KR', sans-serif;
            white-space: nowrap;
            box-shadow: 0 2px 8px rgba(0,0,0,0.25);
            border: 2px solid white;
          ">
            ${region.name} ${region.score}점
          </div>
          <div style="
            width: 0; height: 0;
            border-left: 6px solid transparent;
            border-right: 6px solid transparent;
            border-top: 8px solid ${color};
            margin-top: -1px;
          "></div>
        </div>
      `;

      const overlay = new kakao.maps.CustomOverlay({
        position,
        content,
        yAnchor: 1.1,
      });

      overlay.setMap(map);
    });

    // 지도 컨트롤 추가
    const zoomControl = new kakao.maps.ZoomControl();
    map.addControl(zoomControl, kakao.maps.ControlPosition.RIGHT);

  }, [regions]);

  return (
    <div className="w-full rounded-2xl overflow-hidden border border-gray-200" style={{ height: 420 }}>
      <div ref={mapRef} style={{ width: '100%', height: '100%' }} />
    </div>
  );
}
