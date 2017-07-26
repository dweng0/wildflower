export interface ManifestItem {
      name: string;
      url: string;
}

export interface UrlManifest {
      handshake: string;
      map: string;
      mapModels: Array<ManifestItem>;
      characters: Array<ManifestItem>;
}