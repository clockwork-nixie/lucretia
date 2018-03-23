"use strict";

import IsometricScene from '../utilities/isometricScene'


class MainScene extends IsometricScene {
    constructor() {
        super({ key: 'MainScene' })
        this.mouse = { x: 0, y: 0 };
        this.currentTile = null;
    }

    create() {
        this.buildMap('map', 'tiles');
        this.cameras.main.setSize(1600, 800);

        this.input.on('pointermove', function (pointer) {
            this.mouse.x = pointer.x;
            this.mouse.y = pointer.y;
        }, this);

        this.input.on('pointerdown', function (pointer) {
            var hit = this.hitTile(this.mouse.x, this.mouse.y);

            if (hit) {
                if (this.currentTile) {
                    this.currentTile.sprite.clearTint();

                    if (this.currentTile.sprite !== hit.sprite) {
                        hit.sprite.setTint(0xFF0000);
                        this.currentTile = hit;
                    } else {
                        this.currentTile = null;
                    }
                } else {
                    hit.sprite.setTint(0xFF0000);
                    this.currentTile = hit;
                }
            }
        }, this);
    }

    preload() {
        this.load.json('map', '../assets/isometric-grass-and-water.json');
        this.load.spritesheet('tiles', '../assets/isometric-grass-and-water.png', { frameWidth: 64, frameHeight: 64 });
    }

    update() {
        if (this.input.activePointer.isDown) {
            if (this.origDragPoint) {
                this.cameras.main.x -= this.origDragPoint.x - this.input.activePointer.position.x;
                this.cameras.main.y -= this.origDragPoint.y - this.input.activePointer.position.y;
            }
            this.origDragPoint = this.input.activePointer.position.clone();
        }
        else
        {
            this.origDragPoint = null;
        }
    }
}

export default MainScene;