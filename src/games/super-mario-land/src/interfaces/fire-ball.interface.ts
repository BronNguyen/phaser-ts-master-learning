export interface IFireBallConstructor {
    scene: Phaser.Scene;
    x: number;
    y: number;
    direction: number;
    texture: string;
    frame?: string | number;
  }