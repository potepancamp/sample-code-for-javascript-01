class StopWatch {
  constructor() {
    this.hour = 0;
    this.minute = 0;
    this.second = 0;
    this.millisecond = 0;
  }

  // タイマーを開始する関数
  start() {
    this.timer = setInterval(this.count.bind(this), 100);
  }

  // タイマーをストップする関数
  stop() {
    clearInterval(this.timer);
  }

  // タイマーをリセットする関数
  reset() {
    this.hour = this.minute = this.second = this.millisecond = 0;
    this.updateNumbers();

    clearInterval(this.timer);
  }

  // 時間をカウントする関数
  count() {
    this.millisecond++

    if (this.millisecond >= 10) {
      [this.millisecond, this.second] = this.carryToNextDigit(this.millisecond, this.second)
      this.updateNumbers();
    }

    if (this.second >= 60) {
      [this.second, this.minute] = this.carryToNextDigit(this.second, this.minute)
      this.updateNumbers();
    }

    if (this.minute >= 60) {
      [this.minute, this.hour] = this.carryToNextDigit(this.minute, this.hour)
      this.updateNumbers();
    }

    this.millisecond.toString();
    $millisecond.text(this.millisecond)
  }

  // 表示時間を更新する関数
  updateNumbers() {
    $hour.text(this.hour);
    $minute.text(this.minute);
    $second.text(this.second);
    $millisecond.text(this.millisecond);
  }

  // 時間を繰り上げる関数
  carryToNextDigit(current, next) {
    current = 0;
    next += 1

    return [current, next]
  }
}

// 要素を非活性化する関数
function makeDisabled(element) {
  element.prop('disabled', true);
}

// 要素を活性化する関数
function makeEnabled(element) {
  element.prop('disabled', false);
}

function start() {
  makeDisabled($startButton);
  makeEnabled($stopButton);
  makeEnabled($resetButton);

  stopWatch.start();
}

function stop() {
  makeEnabled($startButton);
  makeDisabled($stopButton);
  makeEnabled($resetButton);

  stopWatch.stop();
}

function reset() {
  makeEnabled($startButton);
  makeDisabled($stopButton);
  makeDisabled($resetButton);

  stopWatch.reset();
}

// jQueryオブジェクトとして判別するため、「$」を付けています
const $startButton = $("#js-start-button");
const $stopButton = $("#js-stop-button");
const $resetButton = $("#js-reset-button");

const $hour = $("#js-hour");
const $minute = $("#js-minute");
const $second = $("#js-second");
const $millisecond = $("#js-millisecond");

// ストップウォッチオブジェクトをインスタンス化
const stopWatch = new StopWatch();