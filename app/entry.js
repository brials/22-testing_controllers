'use strict';

require('./scss/core.scss');

const angular = require('angular');
const cowsay = require('cowsay-browser');

const cowsayApp = angular.module('cowsayApp', []);

cowsayApp.controller('CowsayController', ['$log', CowsayController]);

function CowsayController($log) {
  $log.debug('CowsayController');

  this.title = 'cow creator.';
  this.subTitle = 'make it, view it, and undo it!';
  this.history = [];
  this.historyTitle = 'view it!';
  this.historySubTitle = 'checkout the cow you just made';

  cowsay.list((err, cowfiles) => {
    this.cowfiles = cowfiles;
    this.current = this.cowfiles[0];
  });

  this.update = function(input){
    $log.debug('cowsayCtrl.update()');
    return cowsay.say({ text:input || 'mooooo', f: this.current});
  };

  this.speak = function(input) {
    $log.debug('cowsayCtrl.speak()');
    this.spoken = this.update(input);
    this.history.push(this.spoken);
  };

  this.undo = function(){
    $log.debug('cowsayCtrl.undo()');
    this.history.pop();
    this.spoken = this.history.pop() || '';
  };
}

cowsayApp.controller('NavController', ['$log', NavController]);

function NavController($log) {
  $log.debug('NavController');

  this.routes = [
    {
      name:'home',
      url: '/home'
    },
    {
      name: 'about',
      url: '/about-us'
    },
    {
      name: 'contact',
      url: '/contact-us'
    }
  ];
}
