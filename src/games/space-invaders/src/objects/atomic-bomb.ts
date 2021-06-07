import { Bullet } from './bullet';
import { IBombConstructor } from '../interfaces/atomic-bomb.interface';

export class AtomicBomb extends Phaser.GameObjects.Image {
  body: Phaser.Physics.Arcade.Body;

  // private bombSpeed: number;
  private bulletType: any;
  public bullets: Bullet[];
  private bulletsNumber: number;

  constructor(aParams: IBombConstructor) {
    super(aParams.scene, aParams.x, aParams.y, aParams.texture);

    this.initVariables(aParams);
    this.initImage();
    this.initPhysics();

    this.scene.add.existing(this);
  }

  private initVariables(aParams: IBombConstructor): void {
    // this.bombSpeed = aParams.bombProperties.speed;
    this.bulletsNumber = aParams.bombProperties.bulletsNumber;
  }

  private initImage(): void {
    this.setOrigin(0.5, 0.5);
  }

  private initPhysics(): void {
    this.scene.physics.world.enable(this);
    // this.body.setVelocityY(this.bombSpeed);
    this.launch();
    this.body.setSize(2, 16);
  }

  private explode() {
    for (let i = 0; i < this.bulletsNumber; i++) {
      this.scene.events.emit(
        'bullet-fired',
        new Bullet({
          scene: this.scene,
          bulletProperties: {
            velocity: new Phaser.Math.Vector2(
              Math.cos((2 * (i * Math.PI)) / this.bulletsNumber) * 100,
              Math.sin((2 * (i * Math.PI)) / this.bulletsNumber) * 100
            )
          },
          x: this.x,
          y: this.y,
          texture: 'bullet'
        }).setRotation((2 * i * Math.PI) / this.bulletsNumber + Math.PI / 2)
      );
    }
    this.destroy();
  }

  private launch() {
    this.scene.add.tween({
      targets: this,
      duration: 400,
      yoyo: false,
      repeat: 0,
      y: 100,
      ease: 'Linear',
      onComplete: () => {
        this.explode();
      }
    });
  }

  update(): void {
    if (this.y < 0 || this.y > this.scene.sys.canvas.height) {
      this.destroy();
    }
  }
}
