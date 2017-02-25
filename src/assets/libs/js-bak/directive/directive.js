"use strict";
var myDirective =  angular.module('myDirective', []);


myDirective.directive('myaudio',function(){
	return {
		 restrict: 'E',
		 templateUrl:'js/directive/myaudio.html'
	}
});