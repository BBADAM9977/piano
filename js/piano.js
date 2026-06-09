/**
 * PianoKeyboard
 * 건반 데이터 정의 + DOM 렌더링 + 누르기 이벤트 처리
 *
 * NOTE_COLORS(note-colors.js)를 단일 색상 출처로 사용합니다.
 */

const PIANO_KEYS = [
  { id: 1, note: 'c4', label: '도',   color: NOTE_COLORS['도'] },
  { id: 2, note: 'd4', label: '레',   color: NOTE_COLORS['레'] },
  { id: 3, note: 'e4', label: '미',   color: NOTE_COLORS['미'] },
  { id: 4, note: 'f4', label: '파',   color: NOTE_COLORS['파'] },
  { id: 5, note: 'g4', label: '솔',   color: NOTE_COLORS['솔'] },
  { id: 6, note: 'a4', label: '라',   color: NOTE_COLORS['라'] },
  { id: 7, note: 'b4', label: '시',   color: NOTE_COLORS['시'] },
  { id: 8, note: 'c5', label: '도↑', color: NOTE_COLORS['도↑'] },
];

class PianoKeyboard {
  /**
   * @param {HTMLElement} containerEl
   * @param {object}  options
   * @param {function} [options.onKeyPress]
   */
  constructor(containerEl, options = {}) {
    this.container       = containerEl;
    this.onKeyPress      = options.onKeyPress || null;
    this._keyEls         = {};
    this._activeHintNote = null;
    this._render();
  }

  _render() {
    this.container.innerHTML = '';

    PIANO_KEYS.forEach(keyData => {
      const btn = document.createElement('button');
      btn.className = 'piano-key';
      btn.dataset.note = keyData.note;
      btn.style.backgroundColor = keyData.color;
      btn.setAttribute('aria-label', `${keyData.label} 건반`);

      const labelEl = document.createElement('span');
      labelEl.className   = 'key-label';
      labelEl.textContent = keyData.label;

      btn.appendChild(labelEl);
      this.container.appendChild(btn);
      this._keyEls[keyData.note] = btn;

      btn.addEventListener('pointerdown', (e) => {
        e.preventDefault();
        btn.setPointerCapture(e.pointerId);
        this._press(btn, keyData.note);
      });
      btn.addEventListener('pointerup',     () => this._release(btn));
      btn.addEventListener('pointercancel', () => this._release(btn));
      btn.addEventListener('pointerleave',  () => this._release(btn));
    });
  }

  _press(el, note) {
    el.classList.add('pressed');
    if (this.onKeyPress) this.onKeyPress(note);
  }

  _release(el) {
    el.classList.remove('pressed');
  }

  /**
   * 현재 눌러야 할 건반을 강조 표시합니다. null이면 강조 해제.
   * 건반 자체 색상을 glow 색상으로 사용해 계이름 색상 연결을 강화합니다.
   */
  setActiveHint(note) {
    // 이전 강조 해제
    if (this._activeHintNote && this._keyEls[this._activeHintNote]) {
      const prevEl = this._keyEls[this._activeHintNote];
      prevEl.classList.remove('key-active');
      prevEl.style.removeProperty('--glow-color');
    }
    this._activeHintNote = note;

    // 새 강조 적용
    if (note && this._keyEls[note]) {
      const el      = this._keyEls[note];
      const keyData = PIANO_KEYS.find(k => k.note === note);
      if (keyData) {
        // 건반 고유 색상의 ~67% 투명도 (hex AA = 170/255 ≈ 67%)
        el.style.setProperty('--glow-color', keyData.color + 'AA');
      }
      el.classList.add('key-active');
    }
  }

  /** 정답 건반을 잠깐 빛나게 합니다. */
  flashCorrectKey(note) {
    const el = this._keyEls[note];
    if (!el) return;
    el.classList.remove('key-correct');
    void el.offsetWidth;
    el.classList.add('key-correct');
    setTimeout(() => el.classList.remove('key-correct'), 350);
  }

  /** 건반을 잠깐 눌린 상태로 표시합니다. */
  flashKey(note, duration = 250) {
    const el = this._keyEls[note];
    if (!el) return;
    el.classList.add('pressed');
    setTimeout(() => el.classList.remove('pressed'), duration);
  }

  setHighlight(note, active) {
    const el = this._keyEls[note];
    if (el) el.classList.toggle('highlight', active);
  }
}
