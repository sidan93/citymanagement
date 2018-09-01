import { Template } from 'meteor/templating';
import * as dat from 'dat.gui';

import '/client/main.html'

let cursors;
let mouse_cursors;
let camera_constrols;

Template.game.onRendered(function() {
  setTimeout(function() {
    console.log(WorldMap.find().fetch());
    console.log(Towns.find().fetch());

    let config = {
      type: Phaser.WEBGL,
      width: 800,
      height: 800,
      scene: {
        preload: preload,
        create: create,
        update: update
      }
    };

    let game = new Phaser.Game(config);

    function preload()
    {
      let _this = this;
      _this.load.image('house_01', '/assets/house_01.png');
      _this.load.image('grass_01', '/assets/grass_01.jpg');
      _this.load.image('terr_01', '/assets/terr_01.jpg');

      _this.load.html('gui', '/assets/gui/gui.html')
    }

    function create()
    {
      let _this = this;

      // Создадим gui

      // Создадим карту
      WorldMap.find().fetch().forEach(function(item) {
        for (let i = 0; i < item.data.length; i++) {
          for (let j = 0; j < item.data[i].length; j++) {
            _this.make.sprite({
              key: item.data[i][j].terrain % 2 ? 'terr_01' : 'grass_01',
              x: i * 20,
              y: j * 20
            });
          }
        }
      }); 

      // Создадим дома
      /*
      Towns.find().fetch().forEach(function(item) {
        let i = _this.make.sprite({
          key: 'house_01',
          x: item.position.x,
          y: item.position.y,
          scale: {
            x: 0.1,
            y: 0.1
          }
        });
      });
      */

      var cursors = this.input.keyboard.createCursorKeys();

      var controlConfig = {
          camera: this.cameras.main,
          left: cursors.left,
          right: cursors.right,
          up: cursors.up,
          down: cursors.down,
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
    }
    function update(time, delta)
    {
      controls.update(delta);
    }

  }, 2000);
});