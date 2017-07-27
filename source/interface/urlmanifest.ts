export interface ManifestItem {
      name: string;
      url: string;
}

export interface MapManifest {
      baseUrl: string;
      texture: string;
      heightMap: string;
      skybox: string;
}

export interface UrlManifest {
      baseUrl: string;
      handshake: string;
      map: MapManifest;
      mapModels: Array<ManifestItem>;
      characters: Array<ManifestItem>;
}
