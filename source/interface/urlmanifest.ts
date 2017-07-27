export interface ManifestItem {
      name: string;
      url: string;
}

export interface MapManifest {
      texture: string;
      heightMap: string;
      skybox: string;
}

export interface UrlManifest {
      handshake: string;
      map: MapManifest;
      mapModels: Array<ManifestItem>;
      characters: Array<ManifestItem>;
}
