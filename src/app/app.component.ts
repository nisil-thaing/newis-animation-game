import { Component, HostListener, Renderer } from '@angular/core';

@Component({
  selector: '[app-root]',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  settings = {
    assetsPath: '../assets'
  };

  vid: any = document.getElementById("my-audio");
  vid2: any = document.getElementById("my-audio-1");
  vid3: any = document.getElementById("my-audio-2");

  playBackgroundAudio: boolean = false;

  step1Name: string = 'showLogo';
  step2Name: string = 'showGameBackground';

  step: string = '';

  logoClass: string = 'logo_zoomout_default';
  heartFrameClass: string = 'logo_zoomout_default';
  whiteAngelClass: string = 'logo_zoomout_default';

  isFinished = {
    step1: false,
    step2: false,
    step3: false
  };

  key: number;

  isGameStarted: boolean = false;

  randomTime: number = 0;
  isGamePaused: boolean = false;
  _renderer: Renderer;

  /*wheelState: any = {
    '-webkit-animation': 'movegifts 5s linear infinite',
    '-moz-animation': 'movegifts 5s linear infinite',
    '-o-animation': 'movegifts 5s linear infinite'
  };*/

  @HostListener('document:keypress', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    let keyCode = event.which || event.keyCode
    if (keyCode === 13 || keyCode === 32) {
      this.key = keyCode;
      // console.log(this.key);
      this.isGameStarted = true;
      this.isGamePaused = false;

      let heartLeft = document.querySelector(".heart #heart-frame").getBoundingClientRect().left;
      let heartRight = document.querySelector(".heart #heart-frame").getBoundingClientRect().right;

      /*if (document.querySelector(".gifts #gift0")) { 
        console.log(document.querySelector(".gifts #gift0").getBoundingClientRect().left);
      }*/

      setInterval(() => {
        let gift0Left = document.querySelector(".gifts #gift0").getBoundingClientRect().left;
        let gift0Right = document.querySelector(".gifts #gift0").getBoundingClientRect().right;

        console.log(gift0Left, heartLeft);

        if (gift0Left > heartLeft && gift0Left < heartRight) {
          this.isGamePaused = true;
        }
      }, 200);

      // this.randomTime = Math.floor(Math.random() * 3) + 1  ;
     /* setTimeout(() => {
        this.isGamePaused = true;
console.log(document.querySelector(".gifts #gift0").getBoundingClientRect().left);

      }, (this.randomTime * 7000));*/

      // this.wheelState = {
      //   '-webkit-animation': 'movegifts 5s linear infinite',
      //   '-moz-animation': 'movegifts 5s linear infinite',
      //   '-o-animation': 'movegifts 5s linear infinite'
      // };
    
      // setTimeout(() => {
      //   this.wheelState = {
      //     '-webkit-animation-play-state': 'paused', /* Safari 4.0 - 8.0 */
      //     'animation-play-state': 'paused'
      //   };
      // }, (this.randomTime * 1000));
    }
  }

  constructor() {
    this.vid.playbackRate = 1;
    this.vid.loop = true;
    this.vid.play();

    this.showLogo();
  }

  showLogo() {
    this.step = this.step1Name;

    /*setTimeout(() => {
      this.vid2.playbackRate=0.5;
      this.vid2.loop=true;
      this.vid.volume = 0.75;
      this.vid2.play();
    },4000);*/

    setTimeout(() => {
      this.logoClass = 'logo_zoomin_default';

      setTimeout(() => {
        this.logoClass = 'logo_zoomin_left_default';

        this.isFinished.step1 = true;
        this.showGameBackground();
      }, 1000);
    }, 1000);
  }

  showGameBackground() {
    setTimeout(() => {
      this.heartFrameClass = 'logo_zoomin_default';
      this.whiteAngelClass = 'logo_zoomin_default';

      setTimeout(() => {
        this.heartFrameClass = 'logo_zoomin_left_default';
        this.whiteAngelClass = 'logo_zoomin_default';
      }, 1000);
    }, 1000);
  }

  /*runGameStyle() {
    return this.wheelState;
  }*/
}
