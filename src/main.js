/*
    Lynn Gen
    [Rocket Patrol Mods Title TBD]
    Time spent: X
    Mods:
        - (5 pts) Mouse control for player movement and mouseclick to fire
        - (5 pts) Particle explosion when rocket hits ship
    Citations:
        - Particle explosion:
            Modified from Phaser Examples "Explode Test"
            https://phaser.io/examples/v3.55.0/game-objects/particle-emitter/view/explode-test
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