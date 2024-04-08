export default class PlayerSprite extends Phaser.Physics.Arcade.Sprite {
    
    mainScene;
    
    // constructor
    constructor(scene, x, y, key) {
        super(scene, x, y, key);
 
        // add the player to the scnee
        scene.add.existing(this);
 
        // add physics body to platform
        scene.physics.add.existing(this);
 
        // save the scene which called this class
        this.mainScene = scene;
    }
}