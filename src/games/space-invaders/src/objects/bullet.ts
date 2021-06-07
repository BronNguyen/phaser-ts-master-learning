import { IBulletConstructor } from '../interfaces/bullet.interface';

export class Bullet extends Phaser.GameObjects.Image {
  body: Phaser.Physics.Arcade.Body;

  private bulletVelocity: Phaser.Math.Vector2;

  constructor(aParams: IBulletConstructor) {
    super(aParams.scene, aParams.x, aParams.y, aParams.texture);

    this.initVariables(aParams);
    this.initImage();
    this.initPhysics();

    this.scene.add.existing(this);
  }

  private initVariables(aParams: IBulletConstructor): void {
    this.bulletVelocity = aParams.bulletProperties.velocity;
  }

  private initImage(): void {
    this.setOrigin(0.5, 0.5);
  }

  private initPhysics(): void {
    this.scene.physics.world.enable(this);
    this.body.setVelocity(this.bulletVelocity.x, this.bulletVelocity.y);
    this.body.setSize(1, 8);
  }

  update(): void {
    if (this.y < 0 || this.y > this.scene.sys.canvas.height) {
      this.destroy();
    }
  }
}
