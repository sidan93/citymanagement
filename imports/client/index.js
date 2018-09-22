import { Template } from 'meteor/templating';
import { SpriteFactory } from './sprite_factory';
import { Map } from './map';
import { Game } from './game';

import '/imports/client/interface/events.js';
import '/client/main.html';

let controls;

Template.game.onRendered(function() {
  setTimeout(function() {
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

    // Отключим стандартное окно на правую кнопку мыши
    game.canvas.oncontextmenu = function (e) { e.preventDefault(); }

    function preload()
    {
      Game.init(this);
      SpriteFactory.init(this);
      Map.init(this);
    }

    function create()
    {
      let _this = this;

      Map.draw();

      // Мини камера
      this.minimap = this.cameras.add(0, window.innerHeight * window.devicePixelRatio - 300, 300, 300).setZoom(0.1);
      this.minimap.setBackgroundColor(0x002244);

      // Управление камерой
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
