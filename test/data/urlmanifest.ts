import {UrlManifest, MapManifest} from '../../source/interface/urlmanifest';

export class DummyManifestData {
      baseUrl: string;
      handshake: string;
      map: MapManifest;
      mapModels: any;
      characters: any;
      constructor() {
            this.baseUrl = "http://localhost:9876";
            this.handshake = "http://localhost:9876";
            this.map = {
                  baseUrl: "/testmap",
                  texture: "/textureIdstuff",
                  heightMap: "/heightmapstuff",
                  skybox: "/skyboxstuff",
                  physics: "/physics"
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