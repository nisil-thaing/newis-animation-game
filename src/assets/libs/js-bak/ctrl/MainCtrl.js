"use strict";
// Create a new module
var mainCtrl = angular.module('MainCtrl', []);

mainCtrl.controller('mainCtrl',['$scope','$interval','$timeout','browser','$element','$document',
	function($scope,$interval,$timeout,browser,$element,$document){
		
		var vid = document.getElementById("my-audio");
		var vid2 = document.getElementById("my-audio-1");
		var vid3 = document.getElementById("my-audio-2");
		vid.playbackRate = 1;
		vid.loop = true;
		vid.play();

		// $scope.AudioElm= angular.element($document.find('#my-audio'));
		// $scope.AudioElm.play();

		var userAgent = browser();

		var fall_style_1 = "fall_1";
		var fall_style_2 = "fall_2";
		$scope.translatefallballoon = fall_style_1;
		$scope.translateFinalSkinLogo = '';

		var _step1Name = 'showLogo';
		var _step2Name = 'showBalloon';
		var _step3Name = 'showProductGift';
		var _step4Name = 'showFinalSkinLogo';

		$scope.step = '';
		$scope.giftproduct = '';
		$scope.arrGift = ['imgs/product_1.png',
							//'imgs/product_2.png',
							'imgs/product_3.png'];

		$scope.arrGiftbk = ['imgs/product_1.png','imgs/product_3.png','imgs/product_1.png',
							'imgs/product_3.png','imgs/product_1.png','imgs/product_3.png',
							'imgs/product_1.png','imgs/product_3.png','imgs/product_1.png',
							'imgs/product_3.png','imgs/product_1.png','imgs/product_3.png',
							'imgs/product_1.png','imgs/product_3.png','imgs/product_1.png',
							'imgs/product_3.png','imgs/product_1.png','imgs/product_3.png',
							'imgs/product_1.png','imgs/product_3.png'];


		$scope.style_logo = {
			//width:0,
			//height:0,
			//left: 450
		};


		var startZoomLogo;
		$scope.stopZoomLogo = function() {
	      	if (angular.isDefined(startZoomLogo)) {
	            $interval.cancel(startZoomLogo);
	            startZoomLogo = undefined;
	      	}
	    };
	    
	    var i = 0.5;
	    var flagRunningWheel = false;
	    $scope.goToOnSpace = function(event,stepName){
	    	//nếu đang quay thì ko thể nhấn quay tiếp dc nữa
	    	vid.pause();
	    	if(flagRunningWheel){
	    		return;
	    	}
	    	if ((event.keyCode === 32 || event.charCode === 32)&& stepName == _step2Name) {
	    		$('.wheel').removeAttr('style');

	    		if(userAgent == 'chrome' || userAgent == 'safari'){
	    			 $('.wheel').css('transition', '-webkit-transform 6s cubic-bezier(.42,.16,.3,.69)');
	    		}else{
	    			  $('.wheel').css('transition', '-moz-transform 6s cubic-bezier(.42,.16,.3,.69)');
	    		}
        
	    		var deg = 3000 + Math.round(Math.random() * 500);
	    		deg = ((-1) ^ i) * deg;
	    		if(userAgent == 'chrome' || userAgent == 'safari'){
	    			$('.wheel').css('-webkit-transform', 'rotate(' + deg + 'deg)');
	    		}
	    		else{
	    			$('.wheel').css('-moz-transform', 'rotate(' + deg + 'deg)');
	    		}

	    		$timeout(function(){
	    			vid2.playbackRate = 0.75;
	    		},1500);
	    		$timeout(function(){
	    			vid2.playbackRate = 1;
	    		},2800);
	    		
	    		$timeout(function(){
	    			vid2.playbackRate = 0.5;
	    		},3500);
	    		if(i>2){
	    			i = 1;
	    		}else{
	    			i = i++;
	    		}
	    		
	    		flagRunningWheel = true;

	    		$timeout(function() {
	    			flagRunningWheel = false;
	    			$scope.step3();
	    		}, 6500);
		    }
		    else if((event.keyCode === 32|| event.charCode === 32) && stepName == _step3Name)
		    {
		    	$scope.step2();
		    }
	    };

	    //bước đầu tiên mới vào web hiển thị logo
	    $scope.logo_class='logo_zoomout_default';
		$scope.step1 = function(){
			$scope.step = _step1Name;
			var my_audio_3 = document.getElementById('my-audio-3');

			
			playAudioHariwon = false;

			$timeout(function(){
				vid2.playbackRate=0.5;
				vid2.loop=true;
				vid.volume = 0.75;
				vid2.play();
			},4000);


			$timeout(function(){
				$scope.logo_class='logo_zoomin_default';
				$scope.opacity = "opacity";
				my_audio_3.play();
			},1000);
			$timeout(function(){
				$scope.logo_class='logo_zoomin_left_default';
			},2000);
		};

		var playAudioHariwon = true;
		//step 2 hidden logo và show các bong bóng nước
		$scope.step2 = function(){
			if(!vid3.paused){
				vid3.pause();
			}
			if(vid.paused){
				vid.play();
			}
			// $timeout(function(){
			// 	vid.pause();
			// },10000);
			
			$scope.step = _step2Name;
			// $timeout(function() {
			// 	$scope.opacity = "opacity";
			// }, 1000);;
			
			
			
				vid2.playbackRate=0.5;
				vid2.loop=true;
				vid.volume = 0.75;
				vid2.play();
			
			
			var startWaterBalloonMusicAgain = $interval(function(){
				if($scope.step != _step2Name  && !vid2.paused){
					vid2.pause();
				}
			},1)

			var moveLogoInterval;
			moveLogoInterval= $interval(function(){
	            	moveLogoInterval = undefined;
	            	$scope.translatefallballoon = fall_style_2;
	            	$scope.show_product_1 = "balloon_1";
	            	$timeout(function(){
	            		$scope.balloon_1 = "balloon_1";
	            	},500);
	            	$timeout(function(){
	            		$scope.balloon_2 = "balloon_2";
	            	},1000);
	            	$timeout(function(){
	            		$scope.balloon_3 = "balloon_3";
	            	},500);
	            	$timeout(function(){
	            		$scope.balloon_4 = "balloon_4";
	            	},1000);
	            	$timeout(function(){
	            		$scope.balloon_5 = "balloon_5";
	            	},1500);
	            	$timeout(function(){
	            		$scope.show_product_2 = "balloon_2";
	            	},1000);
	            	$timeout(function(){
	            		$scope.show_product_3 = "balloon_3";
	            	},1000);
			},100);
		};

		var _arrGift = [];
		//step 3 show random product
		$scope.step3 = function(){
			$scope.step = _step3Name;
			
			if(_arrGift.length == 0){
				_arrGift = $scope.arrGiftbk;
			}

			vid3.play();
			var index = Math.floor(Math.random() * _arrGift.length);
			$scope.giftproduct = _arrGift[index];
			_arrGift.splice(index,1);
		}

		$scope.loganshow = "logan";
		$scope.translateFinalSkinLogo = "translateFinalSkinLogo";
		//step 4 show logo and logan
		$scope.step4 = function(){
			$scope.step = _step4Name;
			$scope.translateFinalSkinLogo = "translateFinalSkinLogo1";
			$scope.loganshow = "logan-show";
			$timeout(function() {
				$scope.loganshow = "logan-show opacity";
			}, 2000);
			// var checkReturnStep2 = $interval(function(){
			// 	if(vid3.paused){
			// 		$scope.step2();
			// 		$interval.cancel(checkReturnStep2);
			// 		checkReturnStep2=undefined;
			// 	}
			// },2000);
		}

		$scope.init = function(){
			//bước đầu tiên mới vào web hiển thị logo
			$scope.step1();
			$timeout(function(){
				$scope.step2();
			},3000);
		};

		// $timeout(function(){
			
		// },5000);

		$scope.init();
}])