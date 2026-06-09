/**
 * PianoSong — 하나의 곡을 나타내는 데이터 모델
 *
 * 필드:
 *   id     - 곡 고유 식별자
 *   title  - 화면 표시 제목
 *   emoji  - 곡 선택 카드에 표시할 이모지
 *   level  - 난이도 (1=쉬움, 2=보통, 3=어려움)
 *   locked - true이면 곡 선택 화면에서 잠금 상태로 표시
 *   notes  - SongNote[] 배열 (연주 순서)
 */

class PianoSong {
  /**
   * @param {object}     params
   * @param {string}     params.id
   * @param {string}     params.title
   * @param {string}     [params.emoji='🎵']
   * @param {number}     [params.level=1]
   * @param {boolean}    [params.locked=false]
   * @param {SongNote[]} [params.notes=[]]
   */
  constructor({ id, title, emoji = '🎵', level = 1, locked = false, notes = [] }) {
    this.id     = id;
    this.title  = title;
    this.emoji  = emoji;
    this.level  = level;
    this.locked = locked;
    this.notes  = notes;
  }

  /** 곡의 총 음표 수를 반환합니다. */
  get length() {
    return this.notes.length;
  }
}
