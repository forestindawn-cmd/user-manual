/* ═══════════════════════════════════════════════
   공구관리시스템 v4.2 사용설명서 — script.js
   UNDEFIANCE
═══════════════════════════════════════════════ */

'use strict';

// ═══════════════════════
// 섹션 데이터 (검색용)
// ═══════════════════════
const SECTIONS = {
  intro:         { title: '시스템 소개', label: '📖 시스템 소개' },
  setup:         { title: '초기 설정', label: '⚙️ 초기 설정' },
  master:        { title: '마스터 데이터 등록', label: '📋 마스터 데이터' },
  calendar:      { title: '캘린더 동기화', label: '📅 캘린더 동기화' },
  home:          { title: '홈 대시보드', label: '🏠 홈 대시보드' },
  'sales-overview': { title: '공구매출 탭', label: '📊 공구매출' },
  'sales-input': { title: '판매입력 탭', label: '💵 판매입력' },
  checklist:     { title: '정산 체크리스트', label: '✅ 정산 체크리스트' },
  kakao:         { title: '카톡 템플릿', label: '💬 카톡 템플릿' },
  settlement:    { title: '정산서 생성', label: '📋 정산서 생성' },
  sample:        { title: '샘플관리 탭', label: '📦 샘플관리' },
  target:        { title: '매출목표 탭', label: '🎯 매출목표' },
  system:        { title: '설정 및 관리', label: '🔧 설정 및 관리' },
  scenarios:     { title: '실전 시나리오', label: '🗺️ 실전 시나리오' },
  faq:           { title: 'FAQ', label: '❓ FAQ' },
  troubleshoot:  { title: '트러블슈팅', label: '🛠️ 트러블슈팅' },
  templates:     { title: '카톡 템플릿 전체 목록', label: '📝 카톡 템플릿 목록' },
};

// ═══════════════════════
// 카톡 템플릿 데이터
// ═══════════════════════
const TEMPLATES = [
  // ① 샘플
  { id: '1-1',  cat: '샘플', stage: '① 샘플',    title: '주소 확인 요청 (주소 있음)',    target: '셀러' },
  { id: '1-2',  cat: '샘플', stage: '① 샘플',    title: '주소 확인 요청 (주소 없음)',    target: '셀러' },
  { id: '1-3',  cat: '샘플', stage: '① 샘플',    title: '샘플 발송 요청',               target: '업체' },
  { id: '1-4',  cat: '샘플', stage: '① 샘플',    title: '샘플 발송 안내 (송장)',         target: '셀러' },
  { id: '1-5',  cat: '샘플', stage: '① 샘플',    title: '샘플 도착 확인',               target: '셀러' },
  { id: '1-6',  cat: '샘플', stage: '① 샘플',    title: '샘플 추가 요청',               target: '업체' },
  { id: '1-7',  cat: '샘플', stage: '① 샘플',    title: '샘플 회수 안내',               target: '셀러' },
  { id: '1-8',  cat: '샘플', stage: '① 샘플',    title: '샘플 회수 완료 전달',          target: '업체' },
  { id: '1-9',  cat: '샘플', stage: '① 샘플',    title: '샘플 불량 재발송 요청',        target: '업체' },
  { id: '1-10', cat: '샘플', stage: '① 샘플',    title: '샘플 도착 지연 문의',          target: '업체' },
  // ② 공구 준비
  { id: '2-1',  cat: '준비', stage: '② 공구 준비', title: '공구 일정 확정 안내',          target: '셀러' },
  { id: '2-2',  cat: '준비', stage: '② 공구 준비', title: '공구 일정 조율 요청 (셀러)',    target: '셀러' },
  { id: '2-2b', cat: '준비', stage: '② 공구 준비', title: '공구 일정 조율 요청 (업체)',    target: '업체' },
  { id: '2-3',  cat: '준비', stage: '② 공구 준비', title: '공구 링크 요청',               target: '업체' },
  { id: '2-4a', cat: '준비', stage: '② 공구 준비', title: '공구 링크 + 오픈 시간 안내',   target: '셀러' },
  { id: '2-4b', cat: '준비', stage: '② 공구 준비', title: '공구 링크 + 오픈 시간 문의',   target: '셀러' },
  { id: '2-4c', cat: '준비', stage: '② 공구 준비', title: '오픈 시간 공유',               target: '업체' },
  { id: '2-5',  cat: '준비', stage: '② 공구 준비', title: '콘텐츠 촬영 리마인더',         target: '셀러' },
  { id: '2-6',  cat: '준비', stage: '② 공구 준비', title: '공구 오픈 리마인더',           target: '셀러' },
  { id: '2-7',  cat: '준비', stage: '② 공구 준비', title: '상세페이지/이미지 요청',       target: '업체' },
  { id: '2-8',  cat: '준비', stage: '② 공구 준비', title: '상세페이지 변경 확인',         target: '업체' },
  { id: '2-9',  cat: '준비', stage: '② 공구 준비', title: '공구 취소 안내 (셀러 사정)',   target: '업체' },
  { id: '2-10', cat: '준비', stage: '② 공구 준비', title: 'CS 고객센터 링크 전달',        target: '셀러' },
  { id: '2-11', cat: '준비', stage: '② 공구 준비', title: '제품 FAQ 전달',               target: '셀러' },
  // ③ 공구 진행
  { id: '3-1a', cat: '진행', stage: '③ 공구 진행', title: '판매현황 요청',               target: '업체' },
  { id: '3-1b', cat: '진행', stage: '③ 공구 진행', title: '판매현황 공유 (업체→셀러)',   target: '셀러' },
  { id: '3-1c', cat: '진행', stage: '③ 공구 진행', title: '판매현황 공유 (직접)',        target: '셀러' },
  { id: '3-2',  cat: '진행', stage: '③ 공구 진행', title: '공구 마감 안내',              target: '셀러' },
  { id: '3-3',  cat: '진행', stage: '③ 공구 진행', title: '공구 마감 결과',              target: '셀러' },
  { id: '3-3b', cat: '진행', stage: '③ 공구 진행', title: '마감 결과 + 월 2회 정산 안내', target: '셀러' },
  { id: '3-4',  cat: '진행', stage: '③ 공구 진행', title: '주문 취합 완료',              target: '셀러' },
  { id: '3-5',  cat: '진행', stage: '③ 공구 진행', title: '업체에 최종 판매현황',        target: '업체' },
  { id: '3-6',  cat: '진행', stage: '③ 공구 진행', title: '공구 연장 안내',              target: '셀러' },
  { id: '3-6b', cat: '진행', stage: '③ 공구 진행', title: '공구 연장 가능 여부 문의',    target: '업체' },
  { id: '3-7',  cat: '진행', stage: '③ 공구 진행', title: '품절 안내',                  target: '셀러' },
  // ④ 발주/배송
  { id: '4-1',  cat: '발주', stage: '④ 발주/배송', title: '발주서 전달',                target: '업체' },
  { id: '4-2',  cat: '발주', stage: '④ 발주/배송', title: '송장번호 요청',              target: '업체' },
  // ⑤ 정산
  { id: '5-1a', cat: '정산', stage: '⑤ 정산',    title: '정산 요청 (제조사)',           target: '업체' },
  { id: '5-1b', cat: '정산', stage: '⑤ 정산',    title: '정산서 확인 완료',             target: '업체' },
  { id: '5-1c', cat: '정산', stage: '⑤ 정산',    title: '정산서 전달 (제조사)',         target: '업체' },
  { id: '5-1d', cat: '정산', stage: '⑤ 정산',    title: '세금계산서 발행 + 입금요청',   target: '업체' },
  { id: '5-1e', cat: '정산', stage: '⑤ 정산',    title: '입금 확인 (제조사)',           target: '업체' },
  { id: '5-1f', cat: '정산', stage: '⑤ 정산',    title: '정산서 오류 정정',             target: '업체' },
  { id: '5-2a', cat: '정산', stage: '⑤ 정산',    title: '정산서 전달 (벤더사)',         target: '업체' },
  { id: '5-2b', cat: '정산', stage: '⑤ 정산',    title: '세금계산서 요청 (벤더사)',     target: '업체' },
  { id: '5-2c', cat: '정산', stage: '⑤ 정산',    title: '입금 완료 (벤더사)',           target: '업체' },
  { id: '5-3',  cat: '정산', stage: '⑤ 정산',    title: '정산 유형 확인 + 서류 요청 (신규셀러)', target: '셀러' },
  { id: '5-4',  cat: '정산', stage: '⑤ 정산',    title: '정산서 전달 (셀러)',           target: '셀러' },
  { id: '5-5a', cat: '정산', stage: '⑤ 정산',    title: '세금계산서 요청 (셀러)',       target: '셀러' },
  { id: '5-5b', cat: '정산', stage: '⑤ 정산',    title: '입금 완료 (사업자)',           target: '셀러' },
  { id: '5-5c', cat: '정산', stage: '⑤ 정산',    title: '세금계산서 발행 리마인더',     target: '셀러' },
  { id: '5-6a', cat: '정산', stage: '⑤ 정산',    title: '입금 완료 (현금영수증)',       target: '셀러' },
  { id: '5-7a', cat: '정산', stage: '⑤ 정산',    title: '입금 완료 (3.3%)',             target: '셀러' },
  // ⑥ CS/이슈
  { id: '6-1',  cat: 'CS',   stage: '⑥ CS/이슈', title: '불량 교환 요청',              target: '업체' },
  { id: '6-2',  cat: 'CS',   stage: '⑥ CS/이슈', title: '교환 진행 안내',              target: '셀러' },
  { id: '6-3',  cat: 'CS',   stage: '⑥ CS/이슈', title: '반품 요청',                  target: '업체' },
  { id: '6-4',  cat: 'CS',   stage: '⑥ CS/이슈', title: '환불 처리 안내',              target: '셀러' },
  { id: '6-5',  cat: 'CS',   stage: '⑥ CS/이슈', title: '배송 누락 확인',              target: '업체' },
  { id: '6-6',  cat: 'CS',   stage: '⑥ CS/이슈', title: '오배송 처리',                target: '업체' },
  { id: '6-7',  cat: 'CS',   stage: '⑥ CS/이슈', title: '일정 변경 안내',              target: '셀러' },
  { id: '6-8',  cat: 'CS',   stage: '⑥ CS/이슈', title: '공구 취소 안내',              target: '셀러' },
  { id: '6-9',  cat: 'CS',   stage: '⑥ CS/이슈', title: '고객 클레임 전달',            target: '업체' },
  { id: '6-10', cat: 'CS',   stage: '⑥ CS/이슈', title: '파손 배송 처리',              target: '업체' },
  { id: '6-11', cat: 'CS',   stage: '⑥ CS/이슈', title: '교환 송장 안내',              target: '셀러' },
  { id: '6-12', cat: 'CS',   stage: '⑥ CS/이슈', title: '환불 지연 문의',              target: '업체' },
  // ⑦ 관계유지
  { id: '7-1',  cat: '관계', stage: '⑦ 관계 유지', title: '재공구 제안',               target: '셀러' },
  { id: '7-2',  cat: '관계', stage: '⑦ 관계 유지', title: '신제품 소개',               target: '셀러' },
  { id: '7-3',  cat: '관계', stage: '⑦ 관계 유지', title: '공구 결과 리포트',          target: '셀러' },
  { id: '7-4',  cat: '관계', stage: '⑦ 관계 유지', title: '감사 인사',                 target: '업체/셀러' },
  { id: '7-5',  cat: '관계', stage: '⑦ 관계 유지', title: '명절/시즌 인사',            target: '업체/셀러' },
  { id: '7-6',  cat: '관계', stage: '⑦ 관계 유지', title: '신규 셀러 섭외',            target: '셀러' },
  { id: '7-7',  cat: '관계', stage: '⑦ 관계 유지', title: '신상품 문의',               target: '업체' },
];

// ═══════════════════════
// 섹션 이동
// ═══════════════════════
function goToSection(sectionId) {
  // 모든 섹션 숨기기
  document.querySelectorAll('.section').forEach(function(s) {
    s.classList.remove('active');
  });
  // 대상 섹션 보이기
  var target = document.getElementById(sectionId);
  if (target) {
    target.classList.add('active');
    document.getElementById('content').scrollTop = 0;
    window.scrollTo(0, 0);
  }

  // 네비 활성화
  document.querySelectorAll('.nav-item').forEach(function(item) {
    item.classList.remove('active');
    if (item.getAttribute('data-section') === sectionId) {
      item.classList.add('active');
    }
  });

  // 브레드크럼 업데이트
  var sectionInfo = SECTIONS[sectionId];
  if (sectionInfo) {
    document.getElementById('breadcrumb').textContent = sectionInfo.title;
  }

  // URL 해시 업데이트
  history.pushState(null, '', '#' + sectionId);

  // 모바일: 사이드바 닫기
  closeSidebar();
}

// ═══════════════════════
// 사이드바 토글
// ═══════════════════════
function openSidebar() {
  document.getElementById('sidebar').classList.add('open');
  document.getElementById('overlay').classList.add('show');
  document.body.style.overflow = 'hidden';
}

function closeSidebar() {
  document.getElementById('sidebar').classList.remove('open');
  document.getElementById('overlay').classList.remove('show');
  document.body.style.overflow = '';
}

// ═══════════════════════
// 다크모드
// ═══════════════════════
function initTheme() {
  var saved = localStorage.getItem('theme');
  var prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  if (saved === 'dark' || (!saved && prefersDark)) {
    document.body.classList.add('dark');
    document.getElementById('themeBtn').textContent = '☀️';
  }
}

function toggleTheme() {
  var isDark = document.body.classList.toggle('dark');
  localStorage.setItem('theme', isDark ? 'dark' : 'light');
  document.getElementById('themeBtn').textContent = isDark ? '☀️' : '🌙';
}

// ═══════════════════════
// FAQ 토글
// ═══════════════════════
function toggleFaq(el) {
  el.classList.toggle('open');
  var answer = el.nextElementSibling;
  answer.classList.toggle('open');
}

// ═══════════════════════
// 카톡 템플릿 렌더링
// ═══════════════════════
function renderTemplates(list) {
  var tbody = document.getElementById('templateTableBody');
  if (!tbody) return;

  var html = '';
  list.forEach(function(t) {
    var targetColor = t.target.indexOf('셀러') >= 0
      ? 'color:#2D8A5E; background:rgba(45,138,94,0.1);'
      : t.target.indexOf('업체') >= 0
      ? 'color:#D4600A; background:rgba(212,96,10,0.1);'
      : 'color:#2D3561; background:rgba(45,53,97,0.1);';

    html += '<tr>'
      + '<td><code style="font-family:\'JetBrains Mono\',monospace; font-size:12px; color:var(--main);">' + t.id + '</code></td>'
      + '<td><span style="font-size:11px; color:var(--text-3);">' + t.stage + '</span></td>'
      + '<td style="font-weight:500;">' + t.title + '</td>'
      + '<td><span style="font-size:11px; font-weight:700; padding:2px 8px; border-radius:20px; ' + targetColor + '">' + t.target + '</span></td>'
      + '</tr>';
  });

  tbody.innerHTML = html || '<tr><td colspan="4" style="text-align:center; color:var(--text-3); padding:24px;">해당하는 템플릿이 없습니다.</td></tr>';
}

function filterTemplates(btn, cat) {
  document.querySelectorAll('.tpl-filter-btn').forEach(function(b) {
    b.classList.remove('active');
  });
  btn.classList.add('active');

  var filtered = cat === 'all'
    ? TEMPLATES
    : TEMPLATES.filter(function(t) { return t.cat === cat; });

  renderTemplates(filtered);
}

// ═══════════════════════
// 검색
// ═══════════════════════
var searchData = [];

function buildSearchIndex() {
  var data = [];
  Object.keys(SECTIONS).forEach(function(sectionId) {
    var section = document.getElementById(sectionId);
    if (!section) return;

    // h2, h3 타이틀 수집
    var headings = section.querySelectorAll('h2, h3');
    headings.forEach(function(h) {
      data.push({
        sectionId: sectionId,
        sectionLabel: SECTIONS[sectionId].label,
        title: h.textContent.trim(),
        type: 'heading',
      });
    });

    // 본문 텍스트 수집 (첫 500자)
    var text = section.textContent.replace(/\s+/g, ' ').trim().slice(0, 500);
    data.push({
      sectionId: sectionId,
      sectionLabel: SECTIONS[sectionId].label,
      title: SECTIONS[sectionId].title,
      text: text,
      type: 'section',
    });
  });

  // 템플릿도 검색 인덱스에 추가
  TEMPLATES.forEach(function(t) {
    data.push({
      sectionId: 'templates',
      sectionLabel: '📝 카톡 템플릿 목록',
      title: '[' + t.id + '] ' + t.title,
      type: 'template',
    });
  });

  searchData = data;
}

function doSearch(query) {
  if (!query || query.length < 2) return [];
  var q = query.toLowerCase();
  var results = [];
  var seen = new Set();

  searchData.forEach(function(item) {
    var titleMatch = item.title.toLowerCase().indexOf(q);
    var textMatch = item.text && item.text.toLowerCase().indexOf(q);

    if (titleMatch >= 0 || textMatch >= 0) {
      var key = item.sectionId + '|' + item.title.slice(0, 50);
      if (!seen.has(key)) {
        seen.add(key);
        results.push({
          sectionId: item.sectionId,
          sectionLabel: item.sectionLabel,
          title: item.title,
          matchPos: titleMatch >= 0 ? titleMatch : 999,
          query: q,
        });
      }
    }
  });

  // 관련도 정렬
  results.sort(function(a, b) { return a.matchPos - b.matchPos; });
  return results.slice(0, 8);
}

function renderSearchResults(results, query) {
  var el = document.getElementById('searchResults');
  if (!results.length) {
    el.innerHTML = '<div class="search-no-result">🔍 "<strong>' + escapeHtml(query) + '</strong>"에 대한 결과가 없습니다.</div>';
    el.classList.add('show');
    return;
  }

  var html = '';
  results.forEach(function(r) {
    var highlighted = highlightText(r.title, query);
    html += '<div class="search-result-item" onclick="goToSection(\'' + r.sectionId + '\')">'
      + '<div class="search-result-title">' + highlighted + '</div>'
      + '<div class="search-result-section">' + r.sectionLabel + '</div>'
      + '</div>';
  });

  el.innerHTML = html;
  el.classList.add('show');
}

function highlightText(text, query) {
  var idx = text.toLowerCase().indexOf(query.toLowerCase());
  if (idx < 0) return escapeHtml(text);
  return escapeHtml(text.slice(0, idx))
    + '<span class="search-result-highlight">' + escapeHtml(text.slice(idx, idx + query.length)) + '</span>'
    + escapeHtml(text.slice(idx + query.length));
}

function escapeHtml(str) {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function hideSearchResults() {
  document.getElementById('searchResults').classList.remove('show');
}

// ═══════════════════════
// 스크롤 진행 표시기
// ═══════════════════════
function addScrollProgress() {
  var bar = document.createElement('div');
  bar.style.cssText = 'position:fixed; top:0; left:0; height:3px; background:linear-gradient(90deg,#E84855,#C9A84C); z-index:1000; transition:width 0.1s; pointer-events:none;';
  bar.id = 'scrollBar';
  document.body.appendChild(bar);

  window.addEventListener('scroll', function() {
    var scrolled = (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100;
    bar.style.width = Math.min(scrolled, 100) + '%';
  }, { passive: true });
}

// ═══════════════════════
// 복사 버튼 (코드블록)
// ═══════════════════════
function addCopyButtons() {
  document.querySelectorAll('.code-block').forEach(function(block) {
    var code = block.querySelector('code');
    if (!code) return;

    var btn = document.createElement('button');
    btn.textContent = '복사';
    btn.style.cssText = 'position:absolute; top:8px; right:8px; padding:3px 10px; border:1px solid rgba(255,255,255,0.15); background:rgba(255,255,255,0.08); color:rgba(255,255,255,0.65); border-radius:5px; font-size:11px; cursor:pointer; font-family:inherit; transition:all 0.2s;';

    btn.addEventListener('click', function() {
      var text = code.textContent;
      if (navigator.clipboard) {
        navigator.clipboard.writeText(text).then(function() {
          btn.textContent = '✓ 복사됨';
          btn.style.background = 'rgba(45,138,94,0.3)';
          btn.style.borderColor = 'rgba(45,138,94,0.5)';
          setTimeout(function() {
            btn.textContent = '복사';
            btn.style.background = 'rgba(255,255,255,0.08)';
            btn.style.borderColor = 'rgba(255,255,255,0.15)';
          }, 2000);
        });
      }
    });

    block.style.position = 'relative';
    block.appendChild(btn);
  });
}

// ═══════════════════════
// 앵커 직접 링크 (#hash)
// ═══════════════════════
function handleHashNavigation() {
  var hash = window.location.hash.replace('#', '');
  if (hash && SECTIONS[hash]) {
    goToSection(hash);
  }
}

// ═══════════════════════
// 초기화
// ═══════════════════════
document.addEventListener('DOMContentLoaded', function() {

  // 테마 초기화
  initTheme();

  // 스크롤 진행 표시기
  addScrollProgress();

  // 템플릿 초기 렌더링
  renderTemplates(TEMPLATES);

  // 검색 인덱스 구축 (약간 딜레이)
  setTimeout(buildSearchIndex, 300);

  // 복사 버튼
  addCopyButtons();

  // 해시 네비게이션
  handleHashNavigation();

  // ── 이벤트 리스너 ──

  // 메뉴 버튼
  document.getElementById('menuBtn').addEventListener('click', function() {
    var sidebar = document.getElementById('sidebar');
    if (sidebar.classList.contains('open')) {
      closeSidebar();
    } else {
      openSidebar();
    }
  });

  // 오버레이 클릭 닫기
  document.getElementById('overlay').addEventListener('click', closeSidebar);

  // 다크모드 버튼
  document.getElementById('themeBtn').addEventListener('click', toggleTheme);

  // 사이드바 네비게이션
  document.getElementById('sidebarNav').addEventListener('click', function(e) {
    var item = e.target.closest('.nav-item');
    if (!item) return;
    e.preventDefault();
    var sectionId = item.getAttribute('data-section');
    if (sectionId) goToSection(sectionId);
  });

  // 검색 입력
  var searchInput = document.getElementById('searchInput');
  var searchTimeout = null;

  searchInput.addEventListener('input', function() {
    clearTimeout(searchTimeout);
    var q = this.value.trim();
    if (!q || q.length < 2) {
      hideSearchResults();
      return;
    }
    searchTimeout = setTimeout(function() {
      var results = doSearch(q);
      renderSearchResults(results, q);
    }, 200);
  });

  searchInput.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
      hideSearchResults();
      searchInput.value = '';
    }
  });

  // 검색 외부 클릭 시 닫기
  document.addEventListener('click', function(e) {
    if (!e.target.closest('.sidebar-search') && !e.target.closest('.search-results')) {
      hideSearchResults();
    }
  });

  // 키보드 단축키
  document.addEventListener('keydown', function(e) {
    // Ctrl+K 또는 Cmd+K: 검색 포커스
    if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
      e.preventDefault();
      if (window.innerWidth <= 900) openSidebar();
      setTimeout(function() { searchInput.focus(); }, 100);
    }
  });

  // hash 변경 감지
  window.addEventListener('hashchange', handleHashNavigation);

  // ── 활성 섹션 하이라이트 (IntersectionObserver) ──
  // 단순 버전: 네비 클릭 기반으로 이미 처리됨

  console.log('%c🛒 공구관리시스템 v4.2 사용설명서', 'color:#2D3561; font-size:16px; font-weight:900;');
  console.log('%cDeveloped by UNDEFIANCE', 'color:#C9A84C; font-size:12px;');
});
