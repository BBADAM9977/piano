/**
 * SongNote — 곡 안의 음표 하나를 나타내는 데이터 모델
 *
 * 역할 분리:
 *   - number / name  : 숫자 악보 표시용
 *   - note           : 건반 식별자 (AudioManager · PianoKeyboard 와 일치)
 *   - audioFile      : 연결된 음원 파일명 (AudioManager 리팩터링 시 활용)
 *   - lyric          : 가사 표시용 선택값 (v0.5 이후 활용)
 */

class SongNote {
  /**
   * @param {object} params
   * @param {string} params.note       - 건반 식별자: 'c4', 'd4', ... 'c5'
   * @param {number} params.number     - 숫자 악보 번호: 1~8
   * @param {string} params.name       - 계이름: '도', '레', '미', ...
   * @param {string} params.audioFile  - 음원 파일명: 'c4.mp3', 'd4.mp3', ...
   * @param {string} [params.lyric]    - 가사 (선택값, 기본값 '')
   */
  constructor({ note, number, name, audioFile, lyric = '' }) {
    this.note      = note;
    this.number    = number;
    this.name      = name;
    this.audioFile = audioFile;
    this.lyric     = lyric;
  }
}
