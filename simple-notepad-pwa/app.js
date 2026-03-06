const textarea = document.getElementById('note');
const status = document.querySelector('.status');

const STORAGE_KEY = 'simple-notepad-content';
let saveTimeout;

// 載入上次內容
function loadNote() {
  const saved = localStorage.getItem(STORAGE_KEY);
  if (saved) {
    textarea.value = saved;
  }
}

// 儲存
function saveNote() {
  localStorage.setItem(STORAGE_KEY, textarea.value);
  status.textContent = '已儲存';
}

// 輸入後延遲儲存（debounce）
textarea.addEventListener('input', () => {
  status.textContent = '儲存中...';
  clearTimeout(saveTimeout);
  saveTimeout = setTimeout(() => {
    saveNote();
  }, 800);
});

// 初始化
loadNote();
textarea.focus();

// 可選：按 Ctrl+S 強制儲存
document.addEventListener('keydown', e => {
  if (e.ctrlKey && e.key === 's') {
    e.preventDefault();
    saveNote();
    status.textContent = '已強制儲存';
  }
});