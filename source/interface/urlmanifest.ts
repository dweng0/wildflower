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

export interface UrlManifest {
      baseUrl: string;
      handshake: string;
      map: MapManifest;
      mapModels: Array<ManifestItem>;
      characters: Array<ManifestItem>;
}
