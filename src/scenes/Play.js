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

        // add UI BG and borders
        this.add.rectangle(0, borderUISize + borderPadding, w, borderUISize * 2,
            GREEN).setOrigin(0, 0);
        
        this.add.rectangle(0, 0, w, borderUISize, WHITE).setOrigin(0, 0);
        this.add.rectangle(0, h - borderUISize, w, borderUISize, WHITE).setOrigin(0, 0);
        this.add.rectangle(0, 0, borderUISize, h, WHITE).setOrigin(0, 0);
        this.add.rectangle(w - borderUISize, 0, borderUISize, h, WHITE).setOrigin(0, 0);

        // add player
        this.p1 = new Rocket(this, w / 2, h - borderUISize - borderPadding,
            "rocket").setOrigin(0.5, 0);

        // define keybinds
        keyFIRE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F);
        keyRESET = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
    }

    update() {
        this.starfield.tilePositionX -= 1;
        // run Rocket update
        this.p1.update();
    }
}