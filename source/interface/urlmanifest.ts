/**
 * Handle the different sound effects for the different states the user is in, properties are self explanatory
 */
export interface SoundManifest {
      idle: string;
      moving: string;
      flinching: string;
      attacking: string;
      casting: string;
}

/**
 * Provide the url from whic a user can get additional character urls
 */
export interface CharacterManifest {
      name: string,
      url: string,
      sound: SoundManifest
}

/**
 * Provides urls for all map assets, the property names are self descriptive
 */
export interface MapManifest {
      baseUrl: string;
      texture: string;
      heightMap: string;
      skybox: string;
      physics: string; // The phsycs object contains options needed for the physics imposter
}

/**
 * Sets teh physics for the world the game is set in
 */
export interface WorldPhysics {
      gravityVector: {
            x: number;
            y: number;
            z: number;
      }
}

/**
 * Maps the player to the avatar
 */
export interface Player {
      userName: string;
      avatar: string;
}

/*
 * The initial url manifest as recieved from the backend
 */
export interface UrlManifest {

      /**
       * The unique name of the user making this url request
       */
      playerUsername: string;

      /**
       * The base url
       */
      baseUrl: string;

      /**
       * The handshake url used to handshake with the server
       * @deprecated
       */
      handshake: string;

      /**
       * The urls for map assets
       */
      map: MapManifest;

      /**
      * Contains the physics for the world the  map is based in
      */
      world: WorldPhysics;

      /**
       * Holds all the character (avatar) asset urls
       */
      characters: Array<CharacterManifest>;

      /**
       * Maps the players to the characters
       */
      players: Array<Player>;

      campaign: string;
}