import {UrlManifest, ManifestItem, MapManifest} from '../../source/interface/urlmanifest';

export class DummyManifestData {
      handshake: string;
      map: MapManifest;
      mapModels: Array<ManifestItem>;
      characters: Array<ManifestItem>;
      constructor() {
            this.handshake = "http://google.com";
            this.map = {
                  texture: "lol",
                  heightMap: "lol",
                  skybox: "lol"
            }
            this.mapModels = [];
            this.characters = [];

            this.getMapModels();
            this.getCharacters();
      }

      getMapModels(): void {
            this.mapModels.push({
                  name: "brush",
                  url: "/brush"
            },
            {
                  name: "groundTexture",
                  url: "/ground"
            },
            {
                  name: "skybox",
                  url: "/skybox"
            })
      }

      getCharacters(): void {
            this.characters.push({
                  name: "brush",
                  url: "/brush"
            },
            {
                  name: "groundTexture",
                  url: "/ground"
            },
            {
                  name: "skybox",
                  url: "/skybox"
            })
      }
}