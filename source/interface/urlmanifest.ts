export interface ManifestItem {
      name: string;
      url: string;
}

export interface MapManifest {
      baseUrl: string;
      texture: string;
      heightMap: string;
      skybox: string;
      physics: string; // The phsycs object contains options needed for the physics imposter
}

export interface WorldPhysics {
      gravityVector: {
            x: number;
            y: number;
            z: number;
      }
}

export interface UrlManifest {
      baseUrl: string;
      handshake: string;
      map: MapManifest;
      world: WorldPhysics;
      mapModels: Array<ManifestItem>;
      characters: Array<ManifestItem>;
}
