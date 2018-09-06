import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import { SpriteFactory } from './sprite_factory';
import { Map } from './map';
import { Game } from './game';

import * as dat from 'dat.gui';

import '/client/main.html';

let cursors;
let mouse_cursors;
let camera_constrols;
let curr_action = new ReactiveVar();
let curr_sprite = null;
let last_created = null;

let action_list = {
  0: 'None',
  1: 'BuildHouse',
  2: 'Road'
};

Template.game.onRendered(function() {
  setTimeout(function() {
    console.log(WorldMap.find().fetch());
    console.log(Towns.find().fetch());

    let config = {
      type: Phaser.WEBGL,
      width: window.innerWidth * window.devicePixelRatio,
      height: window.innerHeight * window.devicePixelRatio,
      scene: {
        preload: preload,
        create: create,
        update: update
      }
    };

    let game = new Phaser.Game(config);

    function preload()
    {
      Game.init(this);
      SpriteFactory.init(this);
      Map.init(this);
    }

    function create()
    {
      let _this = this;

      // Создадим gui

      // Создадим карту
      Map.draw();

      // Событие клика
      this.input.on('pointerdown', function(pointer) {
        let cords = _this.cameras.main.getWorldPoint(pointer.x, pointer.y);
        Game.build(cords.x, cords.y);
      });

      this.input.on('pointerup', function(pointer) {
      });

      this.input.on('pointermove', function(pointer) {
      });

      // Мини камера
      this.minimap = this.cameras.add(0, window.innerHeight * window.devicePixelRatio - 300, 300, 300).setZoom(0.1);
      this.minimap.setBackgroundColor(0x002244);

      // Движение основной камеры
      var cursors = this.input.keyboard.createCursorKeys();

      var controlConfig = {
          camera: this.cameras.main,
          left: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A),
          right: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D),
          up: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W),
          down: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S),
          zoomIn: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Q),
          zoomOut: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E),
          acceleration: 0.06,
          drag: 0.0005,
          maxSpeed: 1.0
      };

      controls = new Phaser.Cameras.Controls.SmoothedKeyControl(controlConfig);

      this.input.keyboard.on('keydown_Z', function (event) {
          this.cameras.main.rotation += 0.01;
      }, this);

      this.input.keyboard.on('keydown_X', function (event) {
          this.cameras.main.rotation -= 0.01;
      }, this);

      var cam = this.cameras.main;
      /*
      gui = new dat.GUI();

      var p1 = gui.addFolder('Pointer');
      p1.add(this.input, 'x').listen();
      p1.add(this.input, 'y').listen();
      p1.open();

      var f1 = gui.addFolder('Camera');
      f1.add(cam, 'x').listen();
      f1.add(cam, 'y').listen();
      f1.add(cam, 'scrollX').listen();
      f1.add(cam, 'scrollY').listen();
      f1.add(cam, 'rotation').min(0).step(0.01).listen();
      f1.add(cam, 'zoom', 0.1, 2).step(0.1).listen();
      f1.open();
      */
    }

    function update(time, delta)
    {
      let _this = this;
      
      controls.update(delta);

      this.minimap.scrollX = this.cameras.main.scrollX;
      this.minimap.scrollY = this.cameras.main.scrollY;
    }

  }, 2000);
});

Template.overlay.events({
  'click .button1': function() {
    Game.startBuild('house_03');
    curr_action.set(1);
  },
  'click .button2': function() {
    curr_action.set(2);
  },
  'click .button3': function() {
    curr_action.set(0);
  }
})