class MainScene extends Phaser.Scene {
    constructor() {
        super({
            key: 'MainScene',
            physics: {
                impact: {
                    gravity: 300,
                    setBounds: {
                        width: 800,
                        height: 600,
                    }
                }
            }
        })
    }

    preload() {
        this.load.spritesheet('dude', '../assets/dude.png', { frameWidth: 32, frameHeight: 48 });
        this.load.json('map', '../assets/isometric-grass-and-water.json');
        this.load.spritesheet('tiles', '../assets/isometric-grass-and-water.png', { frameWidth: 64, frameHeight: 64 });
    }

    create() {
        this.dude = this
            .impact
            .add.image(300, 300, 'dude', 4)
            .setActive()
            .setVelocity(0, 0)
            .setBounce(0.2);
    }

    update() {
        // TODO
    }
}

export default MainScene;