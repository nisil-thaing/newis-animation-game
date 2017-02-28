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

  randomGift: number = 0;
  isGamePaused: boolean = false;
  _renderer: Renderer;
  lastGift: number = -1;

  wheelState: any = {
    '-webkit-animation': 'movegifts 5s linear infinite',
    '-moz-animation': 'movegifts 5s linear infinite',
    '-o-animation': 'movegifts 5s linear infinite'
  };

  @HostListener('document:keypress', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    let keyCode = event.which || event.keyCode
    if (keyCode === 13 || keyCode === 32) {
      this.key = keyCode;
      // console.log(this.key);
      this.isGameStarted = true;
      this.isGamePaused = false;

      (<HTMLElement>document.getElementsByClassName('gifts')[0]).style.left = "0";


      let heartLeft = document.querySelector(".heart #heart-frame").getBoundingClientRect().left;
      let heartRight = document.querySelector(".heart #heart-frame").getBoundingClientRect().right;
      this.randomGift = Math.floor(Math.random() * 5);

      let itemArray = [
        {
          code: 'gift0',
          remain: 100
        },
        {
          code: 'gift1',
          remain: 100
        },
        {
          code: 'gift2',
          remain: 100
        },
        {
          code: 'gift3',
          remain: 100
        },
        {
          code: 'gift4',
          remain: 100
        }
      ];

      setTimeout(() => {
        let refreshId = setInterval(() => {
          let gift0Left = document.querySelector(".gifts #" + itemArray[this.randomGift].code).getBoundingClientRect().left;
          let gift0Right = document.querySelector(".gifts #" + itemArray[this.randomGift].code).getBoundingClientRect().right;

          // console.log(this.randomGift, gift0Left, heartLeft, this.lastGift);

          if (gift0Left > heartLeft + ((heartRight - heartLeft) / 4) && gift0Right < heartRight - ((heartRight - heartLeft) / 4) && this.randomGift > this.lastGift) {
            this.isGamePaused = true;

            let oOfHeartFrame = (heartRight + heartLeft) / 2;
            let oOfGift = (gift0Right + gift0Left) / 2;
            // let parentTransitionValue = 
            // console.log(oOfHeartFrame, oOfGift);
            setTimeout(() => {
              (document.getElementById(itemArray[this.randomGift].code).parentElement).style.left = ((oOfHeartFrame - oOfGift)) + "px";
            }, 500);

            this.lastGift = this.randomGift;
            // alert(this.lastGift);
            clearInterval(refreshId);
          } else {
            this.lastGift--;
          }
        }, 1);
      }, 5000);
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
