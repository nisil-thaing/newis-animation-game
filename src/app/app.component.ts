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

  gameMode: any = {
    isTrial: false
  };

  isGameStarted: boolean = false;

  randomGift: number = 0;
  isGamePaused: boolean = false;
  _renderer: Renderer;
  lastGift: number = -1;

  itemArray = [];
  lastUpdated = '';

  gameState: number = 0;

  @HostListener('document:keypress', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    let keyCode = event.which || event.keyCode;
    if (this.isFinished.step1 && !this.isFinished.step2 && (keyCode === 13 || keyCode === 32)) {
      this.key = keyCode;

      this.gameState++;

      let heartLeft = document.querySelector(".heart #heart-frame").getBoundingClientRect().left;
      let heartRight = document.querySelector(".heart #heart-frame").getBoundingClientRect().right;

      if (this.gameState === 1) {
        this.gameMode.isTrial = (this.key === 13);

        (<HTMLElement>document.getElementsByClassName('gifts')[0]).style.left = "0";

        this.randomGift = Math.floor(Math.random() * 5);

        if (!this.gameMode.isTrial) {
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
          } else {
            this.isGameStarted = false;
            this.isGamePaused = true;

            alert("Quà cho ngày hôm nay đã hết, xin bạn vui lòng trở lại vào lần khác!");
          }
        } else {
          this.isGameStarted = true;
          this.isGamePaused = false;

          this.vid.volume = 0.75;
          this.vid3.playbackRate = 1;
          this.vid3.loop = true;
          this.vid3.play();
        }
      }

      if (this.gameState === 2) {
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

                  (<HTMLElement>document.getElementsByClassName('gifts')[0]).style.left = '0';
                  (<HTMLElement>document.getElementsByClassName('gifts')[0]).style.animation = 'none';

                  this.vid3.pause();
                  this.vid2.playbackRate = 1;
                  this.vid2.play();

                  setTimeout(() => {
                    // this.isFinished.step3 = true;
                  }, 5000);
                }, 2000);
              }, 500);

              this.lastGift = this.randomGift;
              this.itemArray[this.randomGift].remain--;

              if (!this.gameMode.isTrial) {
                this.localStorageService.set('gift-items', JSON.stringify(this.itemArray))
              };
              clearInterval(refreshId);
            } else {
              this.lastGift--;
            }
          }, 1);
        }, 1000);
      }
    }
  }

  constructor(private localStorageService: LocalStorageService) {
    window.addEventListener('resize', () => {
      let w: number = window.innerWidth;
      let h: number = window.innerHeight;
      let altimgw: number = document.getElementById('alt-wallpaper').offsetWidth;
      let altimgh: number = document.getElementById('alt-wallpaper').offsetHeight;
      let heartw: number = document.getElementById('heart-frame').offsetWidth;
      let hearth: number = document.getElementById('heart-frame').offsetHeight;

      if (altimgw / altimgh >= w / h) { // small view
        document.getElementById('alt-wallpaper').style.width = 'auto';
        document.getElementById('alt-wallpaper').style.height = '100%';
      } else { // big view
        document.getElementById('alt-wallpaper').style.height = 'auto';
        document.getElementById('alt-wallpaper').style.width = '100%';
      }

      if (w >= 850 && h >= 750) {
        if (w / h < 850 / 750) {
          (<HTMLElement>document.querySelector('.heart #heart-frame')).style.height = '70%';
          (<HTMLElement>document.querySelector('.heart #heart-frame')).style.width = 'auto';
          (<HTMLElement>document.querySelector('.heart #heart-frame')).style.top = '0px';
          (<HTMLElement>document.querySelector('.heart #heart-frame')).style.left = '0px';
          for (let i = 0; i < document.querySelectorAll('.gifts img').length; i++) {
            (<HTMLElement>document.querySelectorAll('.gifts img')[i]).style.width = '200px';
          }
        } else {
          (<HTMLElement>document.querySelector('.heart #heart-frame')).style.height = '100%';
          (<HTMLElement>document.querySelector('.heart #heart-frame')).style.width = 'auto';
          (<HTMLElement>document.querySelector('.heart #heart-frame')).style.top = '-35px';
          (<HTMLElement>document.querySelector('.heart #heart-frame')).style.left = '-90px';
          for (let i = 0; i < document.querySelectorAll('.gifts img').length; i++) {
            (<HTMLElement>document.querySelectorAll('.gifts img')[i]).style.width = '250px';
          }
        }
      } else {
        if (w / h < 850 / 750) {
          (<HTMLElement>document.querySelector('.heart #heart-frame')).style.height = '70%';
          (<HTMLElement>document.querySelector('.heart #heart-frame')).style.width = 'auto';
          (<HTMLElement>document.querySelector('.heart #heart-frame')).style.top = '0px';
          (<HTMLElement>document.querySelector('.heart #heart-frame')).style.left = '0px';
          for (let i = 0; i < document.querySelectorAll('.gifts img').length; i++) {
            (<HTMLElement>document.querySelectorAll('.gifts img')[i]).style.width = '200px';
          }
        } else {
          (<HTMLElement>document.querySelector('.heart #heart-frame')).style.height = '100%';
          (<HTMLElement>document.querySelector('.heart #heart-frame')).style.width = 'auto';
          (<HTMLElement>document.querySelector('.heart #heart-frame')).style.top = '-25px';
          (<HTMLElement>document.querySelector('.heart #heart-frame')).style.left = '-65px';
          for (let i = 0; i < document.querySelectorAll('.gifts img').length; i++) {
            (<HTMLElement>document.querySelectorAll('.gifts img')[i]).style.width = '250px';
          }
        }
      }
    });

    window.addEventListener('load', () => {
      let reloadId = setInterval(() => {
        if (this.isFinished.step1) {
          let w: number = window.innerWidth;
          let h: number = window.innerHeight;
          let altimgw: number = document.getElementById('alt-wallpaper').offsetWidth;
          let altimgh: number = document.getElementById('alt-wallpaper').offsetHeight;
          let heartw: number = document.getElementById('heart-frame').offsetWidth;
          let hearth: number = document.getElementById('heart-frame').offsetHeight;

          if (altimgw / altimgh >= w / h) {
            document.getElementById('alt-wallpaper').style.width = 'auto';
            document.getElementById('alt-wallpaper').style.height = '100%';
          } else {
            document.getElementById('alt-wallpaper').style.height = 'auto';
            document.getElementById('alt-wallpaper').style.width = '100%';
          }

          if (w >= 850 && h >= 750) {
            if (w / h < 850 / 750) {
              (<HTMLElement>document.querySelector('.heart #heart-frame')).style.height = '70%';
              (<HTMLElement>document.querySelector('.heart #heart-frame')).style.width = 'auto';
              (<HTMLElement>document.querySelector('.heart #heart-frame')).style.top = '0px';
              (<HTMLElement>document.querySelector('.heart #heart-frame')).style.left = '0px';
              for (let i = 0; i < document.querySelectorAll('.gifts img').length; i++) {
                (<HTMLElement>document.querySelectorAll('.gifts img')[i]).style.width = '200px';
              }
            } else {
              (<HTMLElement>document.querySelector('.heart #heart-frame')).style.height = '100%';
              (<HTMLElement>document.querySelector('.heart #heart-frame')).style.width = 'auto';
              (<HTMLElement>document.querySelector('.heart #heart-frame')).style.top = '-35px';
              (<HTMLElement>document.querySelector('.heart #heart-frame')).style.left = '-90px';
              for (let i = 0; i < document.querySelectorAll('.gifts img').length; i++) {
                (<HTMLElement>document.querySelectorAll('.gifts img')[i]).style.width = '250px';
              }
            }
          } else {
            if (w / h < 850 / 750) {
              (<HTMLElement>document.querySelector('.heart #heart-frame')).style.height = '70%';
              (<HTMLElement>document.querySelector('.heart #heart-frame')).style.width = 'auto';
              (<HTMLElement>document.querySelector('.heart #heart-frame')).style.top = '0px';
              (<HTMLElement>document.querySelector('.heart #heart-frame')).style.left = '0px';
              for (let i = 0; i < document.querySelectorAll('.gifts img').length; i++) {
                (<HTMLElement>document.querySelectorAll('.gifts img')[i]).style.width = '200px';
              }
            } else {
              (<HTMLElement>document.querySelector('.heart #heart-frame')).style.height = '100%';
              (<HTMLElement>document.querySelector('.heart #heart-frame')).style.width = 'auto';
              (<HTMLElement>document.querySelector('.heart #heart-frame')).style.top = '-25px';
              (<HTMLElement>document.querySelector('.heart #heart-frame')).style.left = '-65px';
              for (let i = 0; i < document.querySelectorAll('.gifts img').length; i++) {
                (<HTMLElement>document.querySelectorAll('.gifts img')[i]).style.width = '250px';
              }
            }
          }

          clearInterval(reloadId);
        }
      }, 1);
    });

    let today = new Date();

    if (!this.localStorageService.get('last-updated')) {
      this.lastUpdated = today.toString();
    } else {
      this.lastUpdated = this.localStorageService.get('last-updated').toString();
    }

    this.localStorageService.set('last-updated', today);

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
      a = a.replace(/\[/g, '');
      a = a.replace(/\]/g, '');
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
          return <any>{
            'width': '400px',
            'position': 'absolute',
            'margin': '0',
            'left': '50%',
            'transform': 'translateX(-50%)'
          };
        }
      }
    }
  }
}
