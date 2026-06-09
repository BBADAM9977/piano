/**
 * 앱 진입점
 * 화면 전환(곡 선택 ↔ 연주), 게임 흐름, 칭찬/안내 피드백을 관리합니다.
 */

(function () {
  'use strict';

  // ── 칭찬 문구 (계이름 포함) ────────────────────────────────
  var CORRECT_MSG_FNS = [
    function (n) { return '좋아요, ' + n + '! 🌟'; },
    function (n) { return n + ' 찾았어요! ✨'; },
    function ()  { return '멋진 연주예요! 💕'; },
    function ()  { return '예쁜 소리예요! 🎶'; },
    function (n) { return n + '! 잘했어요! 🎵'; },
  ];

  // 오답 안내 (계이름·색깔 건반 힌트 포함)
  var WRONG_MSG_FNS = [
    function (n) { return '이번엔 ' + n + ' 건반을 찾아봐요! 🎵'; },
    function (n) { return n + ' 색깔 건반을 찾아봐요! 🌸'; },
    function ()  { return '천천히 계이름을 보고 눌러봐요! 💕'; },
    function ()  { return '거의 맞았어요, 다시 한 번! ✨'; },
    function (n) { return n + ' 건반이에요! 찾아봐요! 🎶'; },
  ];

  // 완료 화면 메시지
  var COMPLETION_MSGS = [
    '정말 잘했어요!',
    '멋진 연주였어요! 🎶',
    '채채 최고! 🏆',
    '계이름을 잘 찾았어요! 🎵',
    '피아노 요정 같아요! 🧚',
    '한 번 더 연주해볼까요? 🎹',
  ];

  // 정답 파티클 기호
  var PARTICLES = ['♪', '♫', '✦', '⭐'];

  // 메시지 순환 인덱스
  var correctIdx = 0;
  var wrongIdx   = 0;

  function pickCorrectMsg(noteName) {
    var fn = CORRECT_MSG_FNS[correctIdx++ % CORRECT_MSG_FNS.length];
    return fn(noteName);
  }

  function pickWrongMsg(noteName) {
    var fn = WRONG_MSG_FNS[wrongIdx++ % WRONG_MSG_FNS.length];
    return fn(noteName);
  }

  // ══════════════════════════════════════════════════════════

  window.addEventListener('DOMContentLoaded', function () {
    var audioManager = new AudioManager();

    // ── DOM 참조 ─────────────────────────────────────────────
    var selectScreenEl    = document.getElementById('song-select-screen');
    var playScreenEl      = document.getElementById('play-screen');
    var backBtn           = document.getElementById('back-btn');
    var selectContainerEl = document.getElementById('song-list-container');
    var scoreEl           = document.getElementById('score-display');
    var feedbackToast     = document.getElementById('feedback-toast');
    var completionEl      = document.getElementById('completion-overlay');
    var completionMsgEl   = document.getElementById('completion-msg');
    var restartBtn        = document.getElementById('restart-btn');
    var gotoSelectBtn     = document.getElementById('goto-select-btn');
    var appMainEl         = document.getElementById('app-main');

    // ── 곡 선택 화면 ─────────────────────────────────────────
    var songSelectScreen = new SongSelectScreen(selectContainerEl, {
      onSongSelect: function (song) { startGame(song); },
    });

    // ── 연주 화면 컴포넌트 ────────────────────────────────────
    var firstSong    = SONGS.find(function (s) { return !s.locked; });
    var scoreDisplay = new ScoreDisplay(scoreEl, firstSong);
    var gameManager  = new GameManager(firstSong);

    var keyboardEl = document.getElementById('piano-keyboard');
    var keyboard   = new PianoKeyboard(keyboardEl, {
      onKeyPress: function (note) {
        if (gameManager.isComplete) return;

        audioManager.play(note);
        var result = gameManager.check(note);

        if (result === 'correct') {
          var noteName = scoreDisplay.getCurrentNoteName(); // advance 전에 캡처
          keyboard.flashCorrectKey(note);
          scoreDisplay.advance();
          spawnNoteParticle();
          showToast(pickCorrectMsg(noteName), 'correct', 900);
          updateKeyboardHint();

        } else if (result === 'complete') {
          keyboard.flashCorrectKey(note);
          keyboard.setActiveHint(null);
          addTempClass(scoreDisplay.getActiveCardEl(), 'complete-flash', 430);
          setTimeout(showCompletion, 430);

        } else {
          var noteName = scoreDisplay.getCurrentNoteName();
          addTempClass(scoreDisplay.getActiveCardEl(), 'shake', 450);
          showToast(pickWrongMsg(noteName), 'wrong', 1500);
        }
      },
    });

    // ── 화면 전환 ─────────────────────────────────────────────

    function updateKeyboardHint() {
      keyboard.setActiveHint(gameManager.getCurrentNote());
    }

    function startGame(song) {
      scoreDisplay.setSong(song);
      gameManager.setSong(song);
      hideCompletion();
      updateKeyboardHint();

      selectScreenEl.classList.add('screen-hidden');
      playScreenEl.classList.remove('screen-hidden');
      backBtn.removeAttribute('hidden');
    }

    function showSongSelect() {
      playScreenEl.classList.add('screen-hidden');
      selectScreenEl.classList.remove('screen-hidden');
      backBtn.setAttribute('hidden', '');
    }

    // ── 버튼 이벤트 ───────────────────────────────────────────
    backBtn.addEventListener('pointerdown', function (e) {
      e.preventDefault();
      showSongSelect();
    });

    restartBtn.addEventListener('pointerdown', function (e) {
      e.preventDefault();
      hideCompletion();
      gameManager.reset();
      scoreDisplay.reset();
      updateKeyboardHint();
    });

    gotoSelectBtn.addEventListener('pointerdown', function (e) {
      e.preventDefault();
      hideCompletion();
      showSongSelect();
    });

    // ── 피드백 토스트 ─────────────────────────────────────────
    var toastTimer = null;

    function showToast(msg, type, duration) {
      clearTimeout(toastTimer);
      feedbackToast.textContent = msg;
      feedbackToast.className   = 'feedback-toast visible' + (type === 'wrong' ? ' wrong' : '');
      toastTimer = setTimeout(function () {
        feedbackToast.classList.remove('visible');
      }, duration || 1200);
    }

    // ── 음표 파티클 (정답 시 떠오름) ─────────────────────────

    function spawnNoteParticle() {
      var card = scoreDisplay.getActiveCardEl();
      if (!card || !appMainEl) return;

      var cardRect = card.getBoundingClientRect();
      var mainRect = appMainEl.getBoundingClientRect();

      var symbol  = PARTICLES[Math.floor(Math.random() * PARTICLES.length)];
      var offsetX = (Math.random() - 0.5) * 48;

      var particle = document.createElement('span');
      particle.className   = 'note-particle';
      particle.textContent = symbol;
      particle.style.left  = (cardRect.left - mainRect.left + cardRect.width / 2 + offsetX) + 'px';
      particle.style.top   = (cardRect.top  - mainRect.top) + 'px';

      appMainEl.appendChild(particle);
      setTimeout(function () { particle.remove(); }, 900);
    }

    // ── 완료 오버레이 ─────────────────────────────────────────

    function showCompletion() {
      // 완료 메시지 랜덤 선택
      completionMsgEl.textContent = COMPLETION_MSGS[Math.floor(Math.random() * COMPLETION_MSGS.length)];

      // 별 애니메이션 강제 재시작 (다시하기 후 재완료 시)
      completionEl.querySelectorAll('.star').forEach(function (star) {
        star.style.animation = 'none';
        void star.offsetWidth; // 강제 리플로우
        star.style.animation = '';
      });

      // 🎉 아이콘 애니메이션 재시작
      var icon = completionEl.querySelector('.completion-icon');
      icon.style.animation = 'none';
      void icon.offsetWidth;
      icon.style.animation = '';

      completionEl.classList.add('visible');
    }

    function hideCompletion() {
      completionEl.classList.remove('visible');
    }

    // ── 유틸 ──────────────────────────────────────────────────

    function addTempClass(el, cls, duration) {
      if (!el) return;
      el.classList.add(cls);
      setTimeout(function () { el.classList.remove(cls); }, duration);
    }

    window._piano = { audioManager, keyboard, scoreDisplay, gameManager, startGame, showSongSelect };
  });
})();
