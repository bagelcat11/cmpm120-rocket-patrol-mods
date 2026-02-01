// Rocket prefab (template for multiple objects)
class Rocket extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame);
    
        // Add self to scene when instantiated
        scene.add.existing(this);
        this.isFiring = false;
        this.moveSpeed = 2; // px/frame

        // since Rocket is an instantiated scene, we need to
        // make bindings for sounds from the passed-in Play scene
        this.sfxShot = scene.sound.add("sfx-shoot");

        // since we are using a listener, we can just define this function in
        // the constructor and not need it in update()
        scene.input.on("pointerdown", (pointer) => {
            if (!this.isFiring) {
                this.isFiring = true;
                this.sfxShot.play();
            }
        });
        // allow pointer to be referenced for movement
        this.pointer = scene.input.activePointer;
    }

    update() {
        // move horizontally by tracking mouse if not firing and not going offscreen
        if (!this.isFiring && this.pointer.x > borderUISize + this.width &&
                this.pointer.x < game.config.width - borderUISize - this.width) {
            this.x = this.pointer.x;
        }

        if (this.isFiring && this.y >= borderUISize * 3 + borderPadding) {
            this.y -= this.moveSpeed;
        }

        // reset on miss
        if (this.y <= borderUISize * 3 + borderPadding) {
            this.reset();
        }
    }

    // trigger on collision with ship or screen
    reset() {
        this.isFiring = false;
        this.y = game.config.height - borderUISize - borderPadding;
    }
}