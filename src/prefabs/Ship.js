class Ship extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame, pointValue) {
        super(scene, x, y, texture, frame);
    
        // add self to scene when instantiated
        scene.add.existing(this);
        this.points = pointValue;
        this.moveSpeed = game.settings.shipSpeed; // px/frame
    }

    update() {
        this.x -= this.moveSpeed;

        // wrap around
        if (this.x <= 0 - this.width) {
            this.reset();
        }
    }

    reset() {
        this.x = game.config.width;
    }
}