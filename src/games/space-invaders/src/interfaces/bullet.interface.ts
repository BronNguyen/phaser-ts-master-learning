export interface IBulletConstructor {
  scene: Phaser.Scene;
  bulletProperties: { velocity: Phaser.Math.Vector2 };
  x: number;
  y: number;
  texture: string;
  frame?: string | number;
}
