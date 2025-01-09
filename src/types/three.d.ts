declare module 'three' {
  export class Scene {
    background: any;
    add(obj: any): void;
    clear(): void;
  }

  export class PerspectiveCamera {
    constructor(fov: number, aspect: number, near: number, far: number);
    position: { z: number };
    aspect: number;
    updateProjectionMatrix(): void;
  }

  export class WebGLRenderer {
    constructor(params: { antialias?: boolean; alpha?: boolean; powerPreference?: string });
    setPixelRatio(ratio: number): void;
    setSize(width: number, height: number): void;
    render(scene: Scene, camera: PerspectiveCamera): void;
    domElement: HTMLCanvasElement;
    dispose(): void;
  }

  export class BoxGeometry {
    constructor(width?: number, height?: number, depth?: number);
    dispose(): void;
  }

  export class MeshBasicMaterial {
    constructor(params: { color?: number; transparent?: boolean; opacity?: number });
    dispose(): void;
  }

  export class Mesh {
    constructor(geometry: BoxGeometry, material: MeshBasicMaterial);
    rotation: { x: number; y: number };
  }

  export class Color {
    constructor(hex: number);
    setAlpha(alpha: number): void;
  }
}
