/**
 * SongSelectScreen
 * SONGS 배열을 읽어 곡 선택 카드 목록을 렌더링합니다.
 *
 * v0.6 확장 포인트:
 *   - locked: false 인 곡이 늘어나면 자동으로 카드가 활성 상태로 표시됩니다.
 *   - SONGS 배열에 곡을 추가하는 것만으로 카드가 생성됩니다.
 */

class SongSelectScreen {
  /**
   * @param {HTMLElement} containerEl
   * @param {object}   options
   * @param {function} [options.onSongSelect] - 플레이 가능 곡 카드 탭 시 호출 (song: PianoSong)
   */
  constructor(containerEl, options = {}) {
    this.container    = containerEl;
    this.onSongSelect = options.onSongSelect || null;
    this._render();
  }

  _render() {
    this.container.innerHTML = '';

    // 안내 문구
    const taglineEl = document.createElement('p');
    taglineEl.className   = 'select-tagline';
    taglineEl.textContent = '오늘은 어떤 노래를 연주해볼까요? 🎵';
    this.container.appendChild(taglineEl);

    // 곡 카드 목록
    const listEl = document.createElement('div');
    listEl.className = 'song-list';

    SONGS.forEach(song => {
      const card = song.locked
        ? this._createLockedCard(song)
        : this._createAvailableCard(song);
      listEl.appendChild(card);
    });

    this.container.appendChild(listEl);
  }

  _createAvailableCard(song) {
    const btn = document.createElement('button');
    btn.className = 'song-card song-card--available';
    btn.setAttribute('aria-label', `${song.title} 연주 시작`);

    const emojiEl = document.createElement('span');
    emojiEl.className   = 'song-card-emoji';
    emojiEl.textContent = song.emoji;
    emojiEl.setAttribute('aria-hidden', 'true');

    const infoEl = document.createElement('div');
    infoEl.className = 'song-card-info';

    const titleEl = document.createElement('span');
    titleEl.className   = 'song-card-title';
    titleEl.textContent = song.title;

    const diffDesc   = ['', '쉬워요', '보통이에요', '어려워요'][song.level] || '쉬워요';
    const lengthDesc = song.length <= 8 ? '짧아요' : '조금 길어요';
    const metaEl = document.createElement('span');
    metaEl.className   = 'song-card-meta';
    metaEl.textContent = `${'⭐'.repeat(song.level)}  ${diffDesc} · ${lengthDesc}`;

    infoEl.appendChild(titleEl);
    infoEl.appendChild(metaEl);

    const arrowEl = document.createElement('span');
    arrowEl.className   = 'song-card-arrow';
    arrowEl.textContent = '▶';
    arrowEl.setAttribute('aria-hidden', 'true');

    btn.appendChild(emojiEl);
    btn.appendChild(infoEl);
    btn.appendChild(arrowEl);

    btn.addEventListener('pointerdown', (e) => {
      e.preventDefault();
      if (this.onSongSelect) this.onSongSelect(song);
    });

    return btn;
  }

  _createLockedCard(song) {
    const card = document.createElement('div');
    card.className = 'song-card song-card--locked';
    card.setAttribute('aria-label', `${song.title} — 준비 중`);

    const emojiEl = document.createElement('span');
    emojiEl.className   = 'song-card-emoji';
    emojiEl.textContent = song.emoji;
    emojiEl.setAttribute('aria-hidden', 'true');

    const infoEl = document.createElement('div');
    infoEl.className = 'song-card-info';

    const titleEl = document.createElement('span');
    titleEl.className   = 'song-card-title';
    titleEl.textContent = song.title;

    const comingEl = document.createElement('span');
    comingEl.className   = 'song-card-coming';
    comingEl.textContent = '🔒 곧 만나요!';

    infoEl.appendChild(titleEl);
    infoEl.appendChild(comingEl);

    card.appendChild(emojiEl);
    card.appendChild(infoEl);

    return card;
  }
}
