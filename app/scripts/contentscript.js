'use strict';

window.addEventListener("load", function() {
  var app = angular.module('LunchPlanner', []);

  var html = document.querySelector('html');
  html.setAttribute('ng-app', '');
  html.setAttribute('ng-csp', '');

  var viewport = document.querySelector('.transformWrapper');
  viewport.setAttribute('ng-controller', 'MainController');

  var recipesContainer = document.querySelector('.GridItems');

  app.controller('MainController', function ($scope) {
    $scope.isRandomized = false;
    var recipes = recipesContainer.querySelectorAll('.item');

    var weeklyMenuContainer = document.createElement('div');
      weeklyMenuContainer.setAttribute('class', 'weekly-menu');
      weeklyMenuContainer.setAttribute('ng-class', "{'randomized': isRandomized}");

    document.querySelector('.BoardHeader').appendChild(weeklyMenuContainer);

    $scope.randomizeList = function() {
        $scope.isRandomized = true;
        var recipesShuffled = [];

        recipesShuffled = getRandom(recipes,4);

        while (weeklyMenuContainer.firstChild) {
            weeklyMenuContainer.removeChild(weeklyMenuContainer.firstChild);
        }

        recipesShuffled.map(function(recipe) {
            var clonned = recipe.cloneNode(true);
            weeklyMenuContainer.appendChild(clonned);
        });
    };

    $scope.resetList = function() {
        $scope.isRandomized = false;
        while (weeklyMenuContainer.firstChild) {
            weeklyMenuContainer.removeChild(weeklyMenuContainer.firstChild);
        }
    };
  });

  var myDirective = document.createElement('div');
  myDirective.setAttribute('my-directive', '');
  document.querySelector('.boardHeaderWrapper').appendChild(myDirective);


  app.directive('myDirective', [ '$sce', function($sce) {
      return {
        //restrict: 'EA',
        //replace: true,
        templateUrl: $sce.trustAsResourceUrl(chrome.extension.getURL('templates/lunchPlanner.html'))
      };
    }]);

  angular.bootstrap(html, ['LunchPlanner'], []);
});

function getRandom(arr, n) {
    var result = new Array(n),
        len = arr.length,
        taken = new Array(len);
    if (n > len)
        throw new RangeError("getRandom: more elements taken than available");
    while (n--) {
        var x = Math.floor(Math.random() * len);
        result[n] = arr[x in taken ? taken[x] : x];
        taken[x] = --len;
    }
    return result;
}
