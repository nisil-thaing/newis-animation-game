import { Component } from '@angular/core';

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
}
