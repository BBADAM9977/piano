/**
 * AudioManager
 * assets/audio/notes/ 폴더의 mp3 파일을 로드하고 재생합니다.
 * 파일이 없거나 로드에 실패해도 앱이 멈추지 않습니다.
 */

const NOTE_PATHS = {
  c4: 'assets/audio/notes/c4.mp3',
  d4: 'assets/audio/notes/d4.mp3',
  e4: 'assets/audio/notes/e4.mp3',
  f4: 'assets/audio/notes/f4.mp3',
  g4: 'assets/audio/notes/g4.mp3',
  a4: 'assets/audio/notes/a4.mp3',
  b4: 'assets/audio/notes/b4.mp3',
  c5: 'assets/audio/notes/c5.mp3',
};

class AudioManager {
  constructor() {
    this._sounds = {};
    this._loadAll();
  }

  _loadAll() {
    for (const [note, path] of Object.entries(NOTE_PATHS)) {
      const audio = new Audio();
      audio.preload = 'auto';
      audio.addEventListener('error', () => {
        console.warn('[AudioManager] 로드 실패:', path);
        this._sounds[note] = null;
      });
      audio.src = path;
      this._sounds[note] = audio;
    }
  }

  /**
   * 음을 재생합니다.
   * @param {string} note - 'c4', 'd4', ... 'c5' 중 하나
   */
  play(note) {
    const audio = this._sounds[note];
    if (!audio) return;
    try {
      audio.currentTime = 0;
      const promise = audio.play();
      if (promise) promise.catch(() => {}); // 자동재생 정책 오류 무시
    } catch (e) {
      // 조용히 무시
    }
  }
}
