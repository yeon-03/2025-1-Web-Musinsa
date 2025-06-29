// header.js
// 요소 참조
const popup     = document.getElementById("searchPopup");
const searchBox = document.querySelector(".search-box");
const globalBtn = document.getElementById("globalSearchBtn");
let isPopupOpen = false;

// 팝업 열기
function openSearchPopup() {
  popup.style.display = "block";
  isPopupOpen = true;
}
// 팝업 닫기
function closeSearchPopup() {
  popup.style.display = "none";
  isPopupOpen = false;
}

// // 테마 변경
// function setTheme(tab) {
//   const w = document.getElementById("topWrapper");
//   const l = document.getElementById("logoText");
//   if (tab === "musinsa") {
//     w.style.backgroundColor = "#18181b"; w.style.color = "white"; l.textContent = "MUSINSA";
//   } else if (tab === "beauty") {
//     w.style.backgroundColor = "#f25d5d"; w.style.color = "white"; l.textContent = "MUSINSA BEAUTY";
//   } else {
//     w.style.backgroundColor = "#4aa9ff"; w.style.color = "white"; l.textContent = "MUSINSA PLAYER";
//   }
// }

// 외부 클릭 시 팝업 닫기
document.addEventListener("click", e => {
  if (isPopupOpen &&
      !searchBox.contains(e.target) &&
      !popup.contains(e.target)
  ) closeSearchPopup();
});

// 검색박스 클릭 → 열기 + 전파 차단
searchBox.addEventListener("click", e => {
  e.stopPropagation();
  openSearchPopup();
});

// 팝업 내부 클릭 → 전파 차단
popup.addEventListener("click", e => {
  e.stopPropagation();
});

// // 우측 상단 검색 클릭 → 열기 + 전파 차단
// globalBtn.addEventListener("click", e => {
//   e.stopPropagation();
//   openSearchPopup();
// });

const searchtextbutton = document.querySelectorAll('#h_2 a')[1]
searchtextbutton.href = 'javascript:openSearchPopup()'

if (window.name == 'search') {
  document.querySelector("input").focus();
  window.name = ''
} 