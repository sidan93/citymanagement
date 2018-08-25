import { Template } from 'meteor/templating';

import '/client/main.html'

let cursors;

Template.game.onRendered(function() {
  setTimeout(function() {
    console.log(WorldMap.find().fetch());
    console.log(Towns.find().fetch());

    let config = {
      type: Phaser.CANVAS,
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
    }

    function create()
    {
      let _this = this;

      WorldMap.find().fetch().forEach(function(map) {
        for (let i = 0; i < map.data.length; i++)
          for (let j = 0; j < map.data[i].length; j++) {
            let curr = map.data[i][j];
            let terr = _this.add.sprite(curr.position.x * 30, curr.position.y * 30, curr.terrain % 2 ? 'grass_01' : 'terr_01')
          }
      });

      let towns = Towns.find().fetch();
      towns.forEach(function(town) {
        let townObj = _this.add.sprite(town.position.x, town.position.y, 'house_01');
        townObj.scaleX = 0.1;
        townObj.scaleY = 0.1;

        townObj.setInteractive();

        townObj.on('pointerdown', function() {
        });
      });

      cursors = game.input.keyboard.createCursorKeys();
    }

    function update() {
      if (cursors.up.isDown)
      {
        this.cameras.main.setScroll(this.cameras.main.x, this.cameras.main + 4);
      }
      else if (cursors.down.isDown)
      {
        this.cameras.main.y -= 4;
      }
      if (cursors.left.isDown)
      {
        this.cameras.main.x += 4;
      }
      else if (cursors.right.isDown)
      {
        this.cameras.main.x -= 4;
      }

    }

  }, 1000);
});
