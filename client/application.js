"use strict";

import MainScene from './scenes/main';

console.log(
    '%c Clockwork Nixie v[AIV]{version}[/AIV] %c https://github.com/clockwork-nixie',
    'background: linear-gradient(yellow, red); color: white; border-radius: 7px',
    'background: white; color: black;');  

let configuration = {
    type: Phaser.AUTO,
    backgroundColor: '#ababab',
    parent: 'content',
    width: 800,
    height: 600,
    scene: [ MainScene ]
};

let game = new Phaser.Game(configuration);