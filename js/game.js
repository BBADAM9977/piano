/**
 * GameManager
 * 정답 판정과 currentNoteIndex 상태를 관리합니다.
 *
 * v0.5 확장 포인트:
 *   - setSong(song) : 곡 선택 화면에서 선택한 PianoSong으로 교체
 */

class GameManager {
  /**
   * @param {PianoSong} song
   */
  constructor(song) {
    this.song = song;
    this.currentNoteIndex = 0;
  }

  /**
   * 눌린 건반이 현재 정답인지 판정합니다.
   * @param {string} note - 건반 식별자 'c4', 'd4', ... 'c5'
   * @returns {'correct' | 'complete' | 'wrong'}
   */
  check(note) {
    if (this.isComplete) return 'wrong';

    const songNote = this.song.notes[this.currentNoteIndex];
    if (note !== songNote.note) return 'wrong';

    const isLast = this.currentNoteIndex === this.song.length - 1;
    this.currentNoteIndex++;
    return isLast ? 'complete' : 'correct';
  }

  /** 처음부터 다시 시작합니다. */
  reset() {
    this.currentNoteIndex = 0;
  }

  /**
   * 곡을 교체하고 인덱스를 초기화합니다. (v0.5 곡 선택 화면에서 사용)
   * @param {PianoSong} song
   */
  setSong(song) {
    this.song = song;
    this.currentNoteIndex = 0;
  }

  /** 현재 눌러야 할 건반 식별자를 반환합니다. ('c4' 형태) */
  getCurrentNote() {
    const songNote = this.song.notes[this.currentNoteIndex];
    return songNote ? songNote.note : null;
  }

  /** 곡이 완주 상태인지 반환합니다. */
  get isComplete() {
    return this.currentNoteIndex >= this.song.length;
  }
}
