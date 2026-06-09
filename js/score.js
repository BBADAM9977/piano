/**
 * ScoreDisplay
 * 현재 눌러야 할 음을 크게 표시하고, 이어지는 음을 미리 보여줍니다.
 *
 * 화면 구성:
 *   곡 제목 → 진행 바 → 진행 힌트 문구 → 현재 음 카드 → 다음 음 미리보기
 *
 * 색상은 NOTE_COLORS(note-colors.js)를 단일 출처로 참조합니다.
 *
 * 공개 API:
 *   getCurrentNote()     — 현재 음 note 식별자 ('c4' 등)
 *   getCurrentNoteName() — 현재 음 계이름 ('미' 등)
 *   getActiveCardEl()    — 애니메이션 대상 DOM 요소
 *   advance()            — 다음 음으로 이동 (마지막이면 false)
 *   reset()              — 첫 음으로 초기화
 *   setSong(song)        — 곡 교체 및 악보 재렌더링
 */

class ScoreDisplay {
  /**
   * @param {HTMLElement} containerEl
   * @param {PianoSong}   song
   */
  constructor(containerEl, song) {
    this.container        = containerEl;
    this.song             = song;
    this.currentNoteIndex = 0;

    this._currentCardEl   = null;
    this._currentNameEl   = null;
    this._upcomingListEl  = null;
    this._progressFillEl  = null;
    this._progressHintEl  = null;

    this._render();
  }

  _render() {
    this.container.innerHTML = '';

    // 곡 제목
    const titleEl = document.createElement('div');
    titleEl.className   = 'score-title';
    titleEl.textContent = this.song.title;
    this.container.appendChild(titleEl);

    // 진행 바
    const progressBarEl = document.createElement('div');
    progressBarEl.className = 'score-progress-bar';
    const progressFillEl = document.createElement('div');
    progressFillEl.className = 'score-progress-fill';
    progressBarEl.appendChild(progressFillEl);
    this._progressFillEl = progressFillEl;
    this.container.appendChild(progressBarEl);

    // 진행 힌트 문구
    const progressHintEl = document.createElement('p');
    progressHintEl.className = 'progress-hint-text';
    this._progressHintEl = progressHintEl;
    this.container.appendChild(progressHintEl);

    // 현재 음 카드
    const currentCardEl = document.createElement('div');
    currentCardEl.className = 'current-note-card';

    const hintEl = document.createElement('p');
    hintEl.className   = 'current-note-hint';
    hintEl.textContent = '이번에 누를 음';

    const nameEl = document.createElement('p');
    nameEl.className = 'current-note-name';

    currentCardEl.appendChild(hintEl);
    currentCardEl.appendChild(nameEl);
    this._currentCardEl = currentCardEl;
    this._currentNameEl = nameEl;
    this.container.appendChild(currentCardEl);

    // 다음 음 미리보기
    const upcomingEl = document.createElement('div');
    upcomingEl.className = 'upcoming-notes';

    const upcomingLabelEl = document.createElement('p');
    upcomingLabelEl.className   = 'upcoming-label';
    upcomingLabelEl.textContent = '다음 음';

    const upcomingListEl = document.createElement('div');
    upcomingListEl.className = 'upcoming-list';

    upcomingEl.appendChild(upcomingLabelEl);
    upcomingEl.appendChild(upcomingListEl);
    this._upcomingListEl = upcomingListEl;
    this.container.appendChild(upcomingEl);

    this._updateDisplay();
  }

  _getProgressHintMsg() {
    const total = this.song.length;
    const idx   = this.currentNoteIndex;
    if (idx === 0)         return '계이름을 보고 따라 눌러봐요! 🎵';
    if (idx === total - 1) return '마지막 음이에요! 🎉';
    const pct = idx / total;
    if (pct < 0.25) return '좋아요, 계속 가볼까요? 🌟';
    if (pct < 0.50) return '멋지게 연주 중이에요! ✨';
    if (pct < 0.75) return '조금만 더! 💪';
    return '거의 다 왔어요! 🎶';
  }

  _updateDisplay() {
    const note = this.song.notes[this.currentNoteIndex];
    if (!note) return;

    // NOTE_COLORS를 단일 출처로 사용
    const color = NOTE_COLORS[note.name] || '#FFE0F0';

    // 현재 음 카드
    this._currentCardEl.style.setProperty('--key-color', color);
    this._currentNameEl.textContent = note.name;

    // 진행 힌트
    this._progressHintEl.textContent = this._getProgressHintMsg();

    // 다음 음 미리보기 (화살표 구분, 계이름별 색상 적용)
    this._upcomingListEl.innerHTML = '';
    const total     = this.song.length;
    const nextStart = this.currentNoteIndex + 1;
    const nextEnd   = Math.min(nextStart + 4, total);

    if (nextStart >= total) {
      const lastMsgEl = document.createElement('span');
      lastMsgEl.className   = 'upcoming-last-msg';
      lastMsgEl.textContent = '마지막 음이에요! 🎉';
      this._upcomingListEl.appendChild(lastMsgEl);
    } else {
      for (let i = nextStart; i < nextEnd; i++) {
        if (i > nextStart) {
          const arrowEl = document.createElement('span');
          arrowEl.className   = 'upcoming-arrow';
          arrowEl.textContent = '→';
          this._upcomingListEl.appendChild(arrowEl);
        }

        const upNote  = this.song.notes[i];
        const upColor = NOTE_COLORS[upNote.name] || '#FFE0F0';

        const upEl = document.createElement('span');
        upEl.className = 'upcoming-note' + (i >= nextStart + 2 ? ' upcoming-note--dim' : '');
        upEl.textContent = upNote.name;
        upEl.style.setProperty('--key-color', upColor);
        this._upcomingListEl.appendChild(upEl);
      }
    }

    // 진행 바
    this._progressFillEl.style.width = (this.currentNoteIndex / total * 100) + '%';
  }

  // ── 공개 API ────────────────────────────────────────────────

  getCurrentNote() {
    const note = this.song.notes[this.currentNoteIndex];
    return note ? note.note : null;
  }

  getCurrentNoteName() {
    const note = this.song.notes[this.currentNoteIndex];
    return note ? note.name : '';
  }

  getActiveCardEl() {
    return this._currentCardEl;
  }

  setCurrentIndex(index) {
    if (index < 0 || index >= this.song.length) return;
    this.currentNoteIndex = index;
    this._updateDisplay();
  }

  advance() {
    const next = this.currentNoteIndex + 1;
    if (next < this.song.length) {
      this.currentNoteIndex = next;
      this._updateDisplay();
      // 음 변경 시 카드 팝-인 애니메이션
      const card = this._currentCardEl;
      card.classList.remove('note-advance');
      void card.offsetWidth;
      card.classList.add('note-advance');
      setTimeout(() => card.classList.remove('note-advance'), 380);
      return true;
    }
    return false;
  }

  reset() {
    this.setCurrentIndex(0);
  }

  setSong(song) {
    this.song             = song;
    this.currentNoteIndex = 0;
    this._render();
  }
}
