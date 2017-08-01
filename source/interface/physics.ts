export interface IPhysics {

      /**
       * The mass is self-explanatory. If set to 0, the object won't be affected by the
       * world gravity, and thus won't move at all. The default value is 0.
       * @type {number}
       */
      mass: number;

      /**
       * The friction coefficient represents the resistance when two objects are sliding
       * against each other. 0 means no friction, and 1 means a lot of friction. Its default
       * value is 0.2
       * @type {number}
       */
      restitution: number;

      /**
       * The restitution coefficient represents the bounciness of the material. It's a value
       *     between 0 and 1, with 0 representing no bounciness at all. The default value is
       *    0.2.
       * @type {number}
       */
      friction: number;
}
