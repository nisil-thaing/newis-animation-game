import { Component, HostListener, Renderer } from '@angular/core';
import { LocalStorageService } from 'angular-2-local-storage';

@Component({
  selector: '[app-root]',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  settings = {
    assetsPath: './assets'
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

  itemArray = [];
  lastUpdated = '';

  @HostListener('document:keypress', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    let keyCode = event.which || event.keyCode
    if (this.isFinished.step1 && !this.isFinished.step2 && (keyCode === 13 || keyCode === 32)) {
      this.key = keyCode;

      (<HTMLElement>document.getElementsByClassName('gifts')[0]).style.left = "0";

      let heartLeft = document.querySelector(".heart #heart-frame").getBoundingClientRect().left;
      let heartRight = document.querySelector(".heart #heart-frame").getBoundingClientRect().right;

      this.randomGift = Math.floor(Math.random() * 5);
      let giftRemaining = this.itemArray.filter((item) => {
        return item.remain > 0;
      });

      if (giftRemaining.length > 0) {

        this.randomGift = this.getRandomGift();

        this.isGameStarted = true;
        this.isGamePaused = false;

        this.vid.volume = 0.75;
        this.vid3.playbackRate = 1;
        this.vid3.loop = true;
        this.vid3.play();


        setTimeout(() => {
          let refreshId = setInterval(() => {
            heartLeft = document.querySelector(".heart #heart-frame").getBoundingClientRect().left;
            heartRight = document.querySelector(".heart #heart-frame").getBoundingClientRect().right;

            let gift0Left = document.querySelector(".gifts #" + this.itemArray[this.randomGift].code).getBoundingClientRect().left;
            let gift0Right = document.querySelector(".gifts #" + this.itemArray[this.randomGift].code).getBoundingClientRect().right;

            if (gift0Left > heartLeft + ((heartRight - heartLeft) / 4) && gift0Right < heartRight - ((heartRight - heartLeft) / 4) && this.randomGift > this.lastGift) {
              this.isGamePaused = true;

              let oOfHeartFrame = (heartRight + heartLeft) / 2;
              let oOfGift = (gift0Right + gift0Left) / 2;

              setTimeout(() => {
                (document.getElementById(this.itemArray[this.randomGift].code).parentElement).style.left = ((oOfHeartFrame - oOfGift)) + "px";

                setTimeout(() => {
                  this.isFinished.step2 = true;

                  this.vid3.pause();
                  this.vid2.playbackRate = 1;
                  this.vid2.play();

                  setTimeout(() => {
                    this.isFinished.step3 = true;
                  }, 5000);
                }, 1000);
              }, 500);

              this.lastGift = this.randomGift;
              this.itemArray[this.randomGift].remain--;

              this.localStorageService.set('gift-items', JSON.stringify(this.itemArray));
              clearInterval(refreshId);
            } else {
              this.lastGift--;
            }
          }, 1);
        }, 5000);
      } else {
        this.isGameStarted = false;
        this.isGamePaused = true;

        alert("Quà cho ngày hôm nay đã hết, xin bạn vui lòng trở lại vào lần khác!");
      }
    }
  }

  constructor(private localStorageService: LocalStorageService) {
    let today = new Date();

    if (!this.localStorageService.get('last-updated')) {
      this.lastUpdated = today.toString();
      this.localStorageService.set('last-updated', today);
    } else {
      this.lastUpdated = this.localStorageService.get('last-updated').toString();      
    }

    let lastUpdated = new Date(this.lastUpdated);
    if ((lastUpdated.getDate() !== today.getDate() || lastUpdated.getMonth() !== today.getMonth() || lastUpdated.getFullYear() !== today.getFullYear()) || (!this.localStorageService.get('gift-items'))) {
      this.itemArray = [
        {
          code: 'gift0',
          assetPath: '/imgs/bo-noi.png',
          remain: 1,
          showName: 'Bộ nồi thủy tinh cao cấp Lumiarc',
          overTime: 0,
          maxOverTime: 0
        },
        {
          code: 'gift1',
          assetPath: '/imgs/tui-xach.png',
          remain: 3,
          showName: 'Bộ 5 túi đồ cho mẹ',
          overTime: 0,
          maxOverTime: 0
        },
        {
          code: 'gift2',
          assetPath: '/imgs/qua-newis.png',
          remain: 6,
          showName: '1 gói tã Newis trung',
          overTime: 0,
          maxOverTime: 0
        },
        {
          code: 'gift3',
          assetPath: '/imgs/mu-len.png',
          remain: 30,
          showName: 'Nón xinh cho bé',
          overTime: 0,
          maxOverTime: 10
        },
        {
          code: 'gift4',
          assetPath: '/imgs/khan-tre-em.png',
          remain: 60,
          showName: 'Lốc khăn sữa cao cấp',
          overTime: 0,
          maxOverTime: 10
        }
      ];

      this.itemArray.forEach((item) => {
        item.remain = item.remain - item.overTime;
        item.overTime = 0;
      });

      this.localStorageService.set('gift-items', JSON.stringify(this.itemArray));
    } else {
      let a = JSON.stringify(this.localStorageService.get('gift-items').toString());
      a = a.replace(/\[/g,'');
      a = a.replace(/\]/g,'');
      a = a.replace(/\},/g, '}, ');
      let strar = JSON.parse(a);
      let arr = strar.split(', ');

      arr = arr.map((item) => JSON.parse(item));

      this.itemArray = arr;
      console.log(this.itemArray);
    }

    let giftRemaining = this.itemArray.filter((item) => {
      return item.remain > 0;
    });

    if (giftRemaining.length === 0) {
      this.itemArray.forEach((it) => {
        if (it.remain === 0 && it.overTime < it.maxOverTime) {
          it.remain++;
          it.overTime++;
        }
      });
    }

    this.vid.playbackRate = 1;
    this.vid.loop = true;
    this.vid.play();

    this.showLogo();
  }

  getRandomGift() {
    let maxRemainingGifts: number = 0;
    let cloneItemArray = this.itemArray.slice();
    
    cloneItemArray.sort((a, b) => {
      return a.remain - b.remain;
    });

    maxRemainingGifts = cloneItemArray[cloneItemArray.length - 1].remain;

    let randomNumber = Math.random() * maxRemainingGifts;

    let chosenGift = cloneItemArray.find((item) => {
      return item.remain >= randomNumber;
    });

    return this.itemArray.indexOf(chosenGift);
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

  showFinalGift(item) {
    if (!this.isGameStarted && !this.isFinished.step2) {
      return {
        'opacity': '0'
      };
    } else {
      if (this.isGamePaused && this.isFinished.step2) {
        if (item.code != this.itemArray[this.randomGift].code) {
          return {
            'opacity': '0'
          };
        } else {
          return <any> {
            'width': '300px'
          };
        }  
      }
    }
  }
}
