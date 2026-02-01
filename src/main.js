/*
    Lynn Gen
    [Rocket Patrol Mods Title TBD]
    Time spent: X
    Mods:
        - x
    Citations:
        - x
*/

let config = {
    type: Phaser.AUTO,
    width: 640,
    height: 480,
    scene: [Menu, Play]
}

const game = new Phaser.Game(config);

const borderUISize = game.config.height / 15;
const borderPadding = borderUISize / 3;

let keyFIRE, keyRESET, keyLEFT, keyRIGHT;