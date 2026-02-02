class Menu extends Phaser.Scene {
    constructor() {
        super("menuScene"); // we will refer to this scene with this key
    }

    preload() {
        this.load.image("rocket", "./assets/rocket.png");
        this.load.spritesheet("ship", "./assets/ship.png", {
            frameWidth: 64, frameHeight: 32, startFrame: 0, endFrame: 1
        });
        this.load.image("starfield", "./assets/starfield.png");
        this.load.spritesheet("explosion", "./assets/explosion.png", {
            frameWidth: 64, frameHeight: 32, startFrame: 0, endFrame: 3
        });
        this.load.image("particle", "./assets/particle.png");
        this.load.audio("sfx-select", "./assets/select.wav");
        this.load.audio("sfx-explode", "./assets/explode.wav");
        this.load.audio("sfx-shoot", "./assets/shoot.wav");
    }

    create() {
        // configure anim
        this.anims.create({
            key: "explode",
            frames: this.anims.generateFrameNumbers("explosion", {
                start: 0, end: 3, first: 0
            }),
            frameRate: 15
        });
        // new ship (alien) anim
        this.anims.create({
            key: "alienMove",
            frames: this.anims.generateFrameNumbers("ship", {
                start: 0, end: 1, first: 0
            }),
            frameRate: 4,
            repeat: -1  // forever
        });

        let menuConfig = {
            fontFamily: "Courier",
            fontSize: "28px",
            backgroundColor: "#AA00BB",
            color: "#FFFFFF",
            align: "center",
            padding: {
                top: 5,
                bottom: 5
            },
            fixedWidth: 0
        }
        // menu text
        this.add.text(game.config.width / 2,
            game.config.height / 2 - borderUISize - borderPadding * 4, "COSMIC CRUSADERS PATROL\n(LEGALLY DISTINCT)",
            menuConfig).setOrigin(0.5);
        this.add.text(game.config.width / 2, game.config.height / 2,
            "Use Mouse to move ← → & Click to fire", menuConfig).setOrigin(0.5);
        menuConfig.backgroundColor = "#9977FF";
        menuConfig.color = "#000000";
        this.add.text(game.config.width / 2,
            game.config.height / 2 + borderUISize + borderPadding,
        "Press ← for Novice or → for Expert", menuConfig).setOrigin(0.5);

        // different key definitions in different scene!!
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);

        // make keys for particle effects for timer change
        // renderTexture reference modified from:
        // https://phaser.io/examples/v3.85.0/game-objects/render-texture/view/text-to-render-texture
        let timerModifiers = ["-3", "+1", "+2", "+3"];
        for (let i of timerModifiers) {
            let timerChangeText = this.add.text(0, 0, i + " sec", {
                fontSize: 16,
                color: "#FACADE",   // oh my god it has to be a string with #
                fontStyle: "bold",
                fixedWidth: 70,
            });
            if (i === "-3") { timerChangeText.setColor("#FF0000"); }
            let rt = this.add.renderTexture(0, 0, 100, 15);
            rt.draw(timerChangeText);
            rt.saveTexture("timerChange" + i);
            rt.setVisible(false);
            timerChangeText.setVisible(false);
            // console.log("made key timerChange" + i)
            // console.log(timerChangeText.text);
        }
        // this.add.image(200, 30, "timerChange+3");
    }

    update() {
        if (Phaser.Input.Keyboard.JustDown(keyLEFT)) {
            // easy difficulty
            game.settings = {
                shipSpeed: 3,
                gameTimer: 60000
            };
            this.sound.play("sfx-select");
            this.scene.start("playScene");
        }
        if (Phaser.Input.Keyboard.JustDown(keyRIGHT)) {
            // hard difficulty
            game.settings = {
                shipSpeed: 4,
                gameTimer: 45000
            };
            this.sound.play("sfx-select");
            this.scene.start("playScene");
        }
    }
}