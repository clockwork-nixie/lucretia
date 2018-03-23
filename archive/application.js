"use strict";

import SplashScene from './scenes/splash'
import GameScene from './scenes/main'


let config = {
    type: Phaser.AUTO,
    parent: 'content',
    width: 800,
    height: 600,
    scene: [
      SplashScene,
      GameScene
    ]
}

let game = new Phaser.Game(config)