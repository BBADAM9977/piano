/**
 * 곡 데이터 목록
 *
 * 새 곡 추가 방법:
 *   1. PianoSong 인스턴스를 SONGS 배열에 append합니다.
 *   2. locked: false 로 설정하고 notes 배열을 채웁니다.
 *   3. locked: true 인 채로 두면 곡 선택 화면에서 "곧 만나요!" 상태로 표시됩니다.
 */

const SONGS = [

  new PianoSong({
    id:    'chaechae-practice',
    title: '채채 연습곡',
    emoji: '🌸',
    level: 1,
    notes: [
      new SongNote({ note: 'c4', number: 1, name: '도', audioFile: 'c4.mp3' }),
      new SongNote({ note: 'd4', number: 2, name: '레', audioFile: 'd4.mp3' }),
      new SongNote({ note: 'e4', number: 3, name: '미', audioFile: 'e4.mp3' }),
      new SongNote({ note: 'd4', number: 2, name: '레', audioFile: 'd4.mp3' }),
      new SongNote({ note: 'c4', number: 1, name: '도', audioFile: 'c4.mp3' }),
    ],
  }),

  new PianoSong({
    id:    'airplane',
    title: '비행기',
    emoji: '✈️',
    level: 1,
    notes: [
      // 3 2 1 2 3 3 3
      new SongNote({ note: 'e4', number: 3, name: '미', audioFile: 'e4.mp3' }),
      new SongNote({ note: 'd4', number: 2, name: '레', audioFile: 'd4.mp3' }),
      new SongNote({ note: 'c4', number: 1, name: '도', audioFile: 'c4.mp3' }),
      new SongNote({ note: 'd4', number: 2, name: '레', audioFile: 'd4.mp3' }),
      new SongNote({ note: 'e4', number: 3, name: '미', audioFile: 'e4.mp3' }),
      new SongNote({ note: 'e4', number: 3, name: '미', audioFile: 'e4.mp3' }),
      new SongNote({ note: 'e4', number: 3, name: '미', audioFile: 'e4.mp3' }),
      // 2 2 2
      new SongNote({ note: 'd4', number: 2, name: '레', audioFile: 'd4.mp3' }),
      new SongNote({ note: 'd4', number: 2, name: '레', audioFile: 'd4.mp3' }),
      new SongNote({ note: 'd4', number: 2, name: '레', audioFile: 'd4.mp3' }),
      // 3 5 5
      new SongNote({ note: 'e4', number: 3, name: '미', audioFile: 'e4.mp3' }),
      new SongNote({ note: 'g4', number: 5, name: '솔', audioFile: 'g4.mp3' }),
      new SongNote({ note: 'g4', number: 5, name: '솔', audioFile: 'g4.mp3' }),
      // 3 2 1 2 3 3 3
      new SongNote({ note: 'e4', number: 3, name: '미', audioFile: 'e4.mp3' }),
      new SongNote({ note: 'd4', number: 2, name: '레', audioFile: 'd4.mp3' }),
      new SongNote({ note: 'c4', number: 1, name: '도', audioFile: 'c4.mp3' }),
      new SongNote({ note: 'd4', number: 2, name: '레', audioFile: 'd4.mp3' }),
      new SongNote({ note: 'e4', number: 3, name: '미', audioFile: 'e4.mp3' }),
      new SongNote({ note: 'e4', number: 3, name: '미', audioFile: 'e4.mp3' }),
      new SongNote({ note: 'e4', number: 3, name: '미', audioFile: 'e4.mp3' }),
      // 2 2 3 2 1
      new SongNote({ note: 'd4', number: 2, name: '레', audioFile: 'd4.mp3' }),
      new SongNote({ note: 'd4', number: 2, name: '레', audioFile: 'd4.mp3' }),
      new SongNote({ note: 'e4', number: 3, name: '미', audioFile: 'e4.mp3' }),
      new SongNote({ note: 'd4', number: 2, name: '레', audioFile: 'd4.mp3' }),
      new SongNote({ note: 'c4', number: 1, name: '도', audioFile: 'c4.mp3' }),
    ],
  }),

  new PianoSong({
    id:    'school-bell',
    title: '학교종',
    emoji: '🔔',
    level: 1,
    notes: [
      // 5 5 6 6 5 5 3
      new SongNote({ note: 'g4', number: 5, name: '솔', audioFile: 'g4.mp3' }),
      new SongNote({ note: 'g4', number: 5, name: '솔', audioFile: 'g4.mp3' }),
      new SongNote({ note: 'a4', number: 6, name: '라', audioFile: 'a4.mp3' }),
      new SongNote({ note: 'a4', number: 6, name: '라', audioFile: 'a4.mp3' }),
      new SongNote({ note: 'g4', number: 5, name: '솔', audioFile: 'g4.mp3' }),
      new SongNote({ note: 'g4', number: 5, name: '솔', audioFile: 'g4.mp3' }),
      new SongNote({ note: 'e4', number: 3, name: '미', audioFile: 'e4.mp3' }),
      // 5 5 3 3 2
      new SongNote({ note: 'g4', number: 5, name: '솔', audioFile: 'g4.mp3' }),
      new SongNote({ note: 'g4', number: 5, name: '솔', audioFile: 'g4.mp3' }),
      new SongNote({ note: 'e4', number: 3, name: '미', audioFile: 'e4.mp3' }),
      new SongNote({ note: 'e4', number: 3, name: '미', audioFile: 'e4.mp3' }),
      new SongNote({ note: 'd4', number: 2, name: '레', audioFile: 'd4.mp3' }),
      // 5 5 6 6 5 5 3
      new SongNote({ note: 'g4', number: 5, name: '솔', audioFile: 'g4.mp3' }),
      new SongNote({ note: 'g4', number: 5, name: '솔', audioFile: 'g4.mp3' }),
      new SongNote({ note: 'a4', number: 6, name: '라', audioFile: 'a4.mp3' }),
      new SongNote({ note: 'a4', number: 6, name: '라', audioFile: 'a4.mp3' }),
      new SongNote({ note: 'g4', number: 5, name: '솔', audioFile: 'g4.mp3' }),
      new SongNote({ note: 'g4', number: 5, name: '솔', audioFile: 'g4.mp3' }),
      new SongNote({ note: 'e4', number: 3, name: '미', audioFile: 'e4.mp3' }),
      // 5 3 2 3 1
      new SongNote({ note: 'g4', number: 5, name: '솔', audioFile: 'g4.mp3' }),
      new SongNote({ note: 'e4', number: 3, name: '미', audioFile: 'e4.mp3' }),
      new SongNote({ note: 'd4', number: 2, name: '레', audioFile: 'd4.mp3' }),
      new SongNote({ note: 'e4', number: 3, name: '미', audioFile: 'e4.mp3' }),
      new SongNote({ note: 'c4', number: 1, name: '도', audioFile: 'c4.mp3' }),
    ],
  }),

];
