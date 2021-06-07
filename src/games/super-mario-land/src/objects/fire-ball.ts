import { IFireBallConstructor } from '../interfaces/fire-ball.interface';

export default class FireBall extends Phaser.GameObjects.Image {
  lifeSpan: number;
  body: Phaser.Physics.Arcade.Body;
  velocityX: number;

  constructor(aParams: IFireBallConstructor) {
    super(aParams.scene, aParams.x, aParams.y, aParams.texture, aParams.frame);
    this.velocityX = 150 * aParams.direction;
    this.lifeSpan = 4000;
    this.scene.physics.world.enable(this);
    this.scene.add.existing(this);
    this.scene.physics.add.existing(this);
    this.body.bounce = new Phaser.Math.Vector2(0, 1);
    this.scene.add.tween({
      targets: this,
      duration: 200,
      yoyo:true,
      repeat: true,
      props: {
        rotation: 180,
      }
    })
  }

  update(time:number, delta:number) {
    this.body.setVelocityX(this.velocityX);
    this.lifeSpan -= delta;
    if(this.lifeSpan <= 0) {
      this.destroy();
      this.lifeSpan = 4000;
    }
  }
}
