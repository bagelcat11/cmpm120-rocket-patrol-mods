class Play extends Phaser.Scene {
    constructor() {
        super("playScene"); // we will refer to this scene with this key
    }

    create() {
        let w = game.config.width, h = game.config.height;
        let GREEN = 0x00FF00, WHITE = 0xFFFFFF;

        // add scrolling BG
        // using 'this' means it can be accessed anywhere in the scene
        this.starfield = this.add.tileSprite(0, 0, 640, 480, "starfield").setOrigin(0, 0);

        // add player ("rocket" is the texture)
        this.p1 = new Rocket(this, w / 2, h - borderUISize - borderPadding,
            "rocket").setOrigin(0.5, 0);

        // add ships with higher ones having more points
        // place them offstage in a staggered pattern
        this.ship3 = new Ship(this, w + borderUISize * 6, borderUISize * 4,
            "ship", 0, 30).setOrigin(0, 0);
        this.ship2 = new Ship(this, w + borderUISize * 3, borderUISize * 5 + borderPadding * 2,
            "ship", 0, 20).setOrigin(0, 0);
        this.ship1 = new Ship(this, w, borderUISize * 6 + borderPadding * 4,
            "ship", 0, 10).setOrigin(0, 0);

        // add UI BG and borders
        this.add.rectangle(0, borderUISize + borderPadding, w, borderUISize * 2,
            GREEN).setOrigin(0, 0);
        
        this.add.rectangle(0, 0, w, borderUISize, WHITE).setOrigin(0, 0);
        this.add.rectangle(0, h - borderUISize, w, borderUISize, WHITE).setOrigin(0, 0);
        this.add.rectangle(0, 0, borderUISize, h, WHITE).setOrigin(0, 0);
        this.add.rectangle(w - borderUISize, 0, borderUISize, h, WHITE).setOrigin(0, 0);

        // define keybinds
        // firing and moving are done with the mouse and handled in the Rocket class
        keyRESET = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
        // L/R are just for UI selection
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);

        // setup score
        this.p1Score = 0;
        let scoreConfig = {
            fontFamily: "Courier",
            fontSize: "28px",
            backgroundColor: "#F3B141",
            color: "#843605",
            align: "right",
            padding: {
                top: 5,
                bottom: 5
            },
            fixedWidth: 100
        }
        this.scoreLeft = this.add.text(borderUISize + borderPadding,
            borderUISize + borderPadding * 2, this.p1Score, scoreConfig);
        
        // setup timer, game end
        this.gameOver = false;
        // delayedCall = oneshot timer
        // time (ms), callback func, args to callback, context 
        scoreConfig.fixedWidth = 0;
        this.clock = this.time.delayedCall(game.settings.gameTimer, () => {
            this.add.text(w / 2, h / 2, "GAME OVER", scoreConfig).setOrigin(0.5);
            this.add.text(w / 2, h / 2 + 64, "Press (R) to Restart or ← for Menu",
                scoreConfig).setOrigin(0.5);
            this.gameOver = true;
        }, null, this);

        // create particle emitter for extra explosion effect
        // modified from Phaser Examples "Explode Test"
        // https://phaser.io/examples/v3.55.0/game-objects/particle-emitter/view/explode-test

        // really this is just a config object because when we want the emitter
        // to trigger, we just add it to the scene and call start(),
        // so that will be done in shipExplode() and we will pass this
        this.particlesConfig = {
            scale: {start: 4, end: 0},
            speed: {min: -400, max: 400},
            angle: {min: 0, max: 360},
            tint: {start: 0xFF0000, end: 0x0000FF},
            blendMode: 'SCREEN',
            count: 1,
            frequency: 25,
            lifespan: 2000,
            gravityY: 400,
            duration: 100,
        };
    }

    update() {
        // check for game restart
        if (this.gameOver && Phaser.Input.Keyboard.JustDown(keyRESET)) {
            this.sound.play("sfx-select");
            this.scene.restart();
        }
        if (this.gameOver && Phaser.Input.Keyboard.JustDown(keyLEFT)) {
            this.sound.play("sfx-select");
            this.scene.start("menuScene");
        }
        
        // scroll BG
        this.starfield.tilePositionX -= 1;
        // run sprite updates
        if (!this.gameOver) {
            this.p1.update();
            this.ship1.update();
            this.ship2.update();
            this.ship3.update();
        }

        // check for collisions
        if (this.checkCollision(this.p1, this.ship3)) {
            this.shipExplode(this.ship3);
            this.p1.reset();
        }
        if (this.checkCollision(this.p1, this.ship2)) {
            this.shipExplode(this.ship2);
            this.p1.reset();
        }
        if (this.checkCollision(this.p1, this.ship1)) {
            this.shipExplode(this.ship1);
            this.p1.reset();
        }
    }

    // helper Axis-Aligned Bounding Boxes collision checker
    checkCollision(rocket, ship) {
        return (rocket.x < ship.x + ship.width &&
            rocket.x + rocket.width > ship.x &&
            rocket.y < ship.y + ship.height &&
            rocket.height + rocket.y > ship.y);
    }

    // helper for ship explosion anim
    shipExplode(ship) {
        // hide temporarily
        ship.alpha = 0;
        let explosion = this.add.sprite(ship.x, ship.y, "explosion").setOrigin(0, 0);
        explosion.anims.play("explode");
        let particles = this.add.particles(ship.x, ship.y, "particle",
            this.particlesConfig);
        particles.start();
        
        // callback after explosion animation ends
        explosion.on("animationcomplete", () => {
            ship.reset();
            ship.alpha = 1;
            explosion.destroy();
        })
        // callback after particle emission ends
        particles.on("complete", () => {
            particles.destroy();
        });

        // update score
        this.p1Score += ship.points;
        this.scoreLeft.text = this.p1Score;
        this.sound.play("sfx-explode");
    }
}