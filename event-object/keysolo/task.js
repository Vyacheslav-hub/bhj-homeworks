class Game {
  constructor(container) {
    this.container = container;
    this.wordElement = container.querySelector('.word');
    this.winsElement = container.querySelector('.status__wins');
    this.lossElement = container.querySelector('.status__loss');
    this.timerElement = container.querySelector('#timer');  // Добавили таймер
    
    this.timerInterval = null; //переменная для хранения идентификатора интервала, который используется для отсчёта времени. 
                              //Нам нужно его хранить, чтобы сбрасывать таймер, когда пользователь завершает ввод слова или проигрывает.

    this.timeRemaining = 0; // переменная для хранения оставшегося времени на ввод текущего слова.

    this.reset();

    this.registerEvents();
  }

  reset() {
    this.setNewWord();
    this.winsElement.textContent = 0;
    this.lossElement.textContent = 0;
  }

  registerEvents() {
    document.addEventListener('keydown', (event) => {
      
      const currentSymbol = this.currentSymbol.textContent;

      let inputSymbol = event.key;

      if (inputSymbol.toLocaleLowerCase() === currentSymbol.toLocaleLowerCase()) {
        this.success()
      } else {
        this.fail();
      }
    })
  }

  success() {
    if(this.currentSymbol.classList.contains("symbol_current")) this.currentSymbol.classList.remove("symbol_current");
    this.currentSymbol.classList.add('symbol_correct');
    this.currentSymbol = this.currentSymbol.nextElementSibling;

    if (this.currentSymbol !== null) {
      this.currentSymbol.classList.add('symbol_current');
      return;
    }
    
    if (++this.winsElement.textContent === 10) {
      alert('Победа!');
      this.reset();
    }
    this.setNewWord();
    
  }

  fail() {
    if (++this.lossElement.textContent === 5) {
      alert('Вы проиграли!');
      this.reset();
    } 
    this.setNewWord();
  }

  setNewWord() {
    const word = this.getWord();
    this.renderWord(word);

    this.startTimer(word.length); // Запускаем таймер, зависящий от длины слова
  }

  getWord() {
    const words = [
        'bob',
        'awesome',
        'netology',
        'hello',
        'kitty',
        'rock',
        'youtube',
        'popcorn',
        'cinema',
        'love',
        'javascript'
      ],
      index = Math.floor(Math.random() * words.length);

    return words[index];
  }

  renderWord(word) {
    const html = [...word]
      .map(
        (s, i) =>
          `<span class="symbol ${i === 0 ? 'symbol_current': ''}">${s}</span>`
      )
      .join('');
    this.wordElement.innerHTML = html;

    this.currentSymbol = this.wordElement.querySelector('.symbol_current');
  }

  startTimer(seconds) {
    this.timeRemaining = seconds;
    this.timerElement.textContent = this.timeRemaining;

    this.restartInterval();
  }

  startInterval() {
    this.timerInterval = setInterval(() => {
      this.timeRemaining--;
      this.timerElement.textContent = this.timeRemaining;
  
      if (this.timeRemaining <= 0) {
        this.fail(); // Если время истекло — вызываем fail
        //this.stopInterval();
      }
    }, 1000); // Обновление таймера каждую секунду
  }

  stopInterval() {
    clearInterval(this.timerInterval);
  }

  restartInterval() {
    this.stopInterval();
    this.startInterval();
  }
}

new Game(document.getElementById('game'));