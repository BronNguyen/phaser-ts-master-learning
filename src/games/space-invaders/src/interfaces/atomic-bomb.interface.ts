export interface IBombConstructor {
  scene: Phaser.Scene;
  bombProperties: {
    speed: number;
    // explode_radius: number;
    // bulletType: any;
    bulletsNumber: number;
  };
  x: number;
  y: number;
  texture: string;
  frame?: string | number;
}
