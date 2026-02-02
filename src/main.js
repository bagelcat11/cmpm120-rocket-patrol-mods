/*
    Lynn Gen
    Cosmic Crusaders Patrol (Legally Distinct)
    Time spent: 7 hrs
    Mods:
        - (5 pts) Mouse control for player movement and mouseclick to fire
        - (5 pts) Particle explosion when rocket hits ship
        - (5 pts) Add time to clock on successful hit (1 sec per 10 pts)
                    and subtract time for misses (-3 sec)
        - (3 pts) Onscreen timer
    Citations:
        - Particle explosion:
            Modified from Phaser Examples "Explode Test"
            https://phaser.io/examples/v3.55.0/game-objects/particle-emitter/view/explode-test
        - Text to texture for timer update particles:
            Modified from Phaser Examples "Text To Render Texture"
            https://phaser.io/examples/v3.85.0/game-objects/render-texture/view/text-to-render-texture
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