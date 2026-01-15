// Rocket prefab (template for multiple objects)
class Rocket extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame);
    
        // Add self to scene when instantiated
        scene.add.existing(this);
        this.isFiring = false;
        this.moveSpeed = 2; // px/frame
    }

    update() {
        // move horizontally if not firing and not going offscreen
        if (!this.isFiring) {
            if (keyLEFT.isDown && this.x >= borderUISize + this.width) {
                this.x -= this.moveSpeed;
            } else if (keyRIGHT.isDown &&
                    this.x <= game.config.width - borderUISize - this.width) {
                this.x += this.moveSpeed;
            }
        }

        // fire and move ship
        if (Phaser.Input.Keyboard.JustDown(keyFIRE)) {
            this.isFiring = true;
        }
        if (this.isFiring && this.y >= borderUISize * 3 + borderPadding) {
            this.y -= this.moveSpeed;
        }

        // reset on miss
        if (this.y <= borderUISize * 3 + borderPadding) {
            this.isFiring = false;
            this.y = game.config.height - borderUISize - borderPadding;
        }
    }
}