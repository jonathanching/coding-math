/**
 * ==================================================================================
 * Particle class
 *
 * ==================================================================================
 **/

import { Vector2 } from './Vector2.js';

export class Particle {

    constructor(x, y, speed, direction, gravity = 0) {
        this.position = new Vector2(x, y);
        this.velocity = new Vector2(0, 0);
        this.gravity = new Vector2(0, gravity);


        /* Set default collections */
        this.springs = [];
        this.gravitations = [];


        /* Set default values */
        this.radius = 0;
        this.mass = 1;
        this.bounce = 0;
        this.friction = null;

        this.velocity.setLength(speed);
        this.velocity.setAngle(direction);
    }


    /**
     * ==================================================================================
     * @Methods
     * ==================================================================================
     **/

    /**
     * Add acceleration to current velocity
     * @param  Vector2 accel
     */
    accelerate(accel) {
        this.velocity.addTo(accel);
    }

    /**
     * Get angle to `p2` object
     * @param  Particle p2
     * @return integer
     */
    angleTo(p2) {
        return Math.atan2(p2.position.y - this.position.y, p2.position.x - this.position.x);
    }

    /**
     * Get distance to `p2` element
     * @param  Particle p2
     * @return integer
     */
    distanceTo(p2) {
        let dX = p2.position.x - this.position.x,
            dY = p2.position.y - this.position.y;

        return Math.sqrt(dX * dX + dY * dY);
    }


    /**
     * Add `spring` point object to collection
     * @param int point
     * @param int k
     * @param int length
     */
    addSpring(point, k, length) {
        /* Prevent duplicate on collection */
        this.removeSpring(point);
        this.springs.push({
                point: point,
                k: k,
                length: length
            });
    }

    /**
     * Remove `spring` point object to collection
     * @param int point
     */
    removeSpring(point) {
        for(var i = 0; i < this.springs.length; i++) {
            if(point === this.springs[i].point)
                return this.springs.splice(i, 1);
        }
    }

    /**
     * Adds in a `spring` force vector toward the `p2` element to the `velocity` vector
     * @param int point
     * @param int k
     * @param int length
     */
    springTo(point, k, length) {
        /**
         * Calculate `spring force` (`f = kx`)
         *
         * `f` = Force
         * `k` = Spring stiffness
         * `x` = Distance
         */
        /* Get distance vector of `spring point` to object */
        let distance = point.subtract(this.position);
        /* Move `spring point` by the `offset` value */
        distance.setLength(distance.getLength() - length);

        /* `f = kx` */
        let springForce = distance.multiply(k);


        /* Add `spring` force to the velocity */
        this.velocity.addTo(springForce);
    }

    /**
     * Add in all `spring` force vector to the velocity
     */
    handleSpring() {
        for(var i = 0; i < this.springs.length; i++) {
            let spring = this.springs[i];
            this.springTo(spring.point, spring.k, spring.length);
        }
    }


    /**
     * Add `gravitation` object to collection
     * @param Particle gravitation
     */
    addGravitation(gravitation) {
        /* Prevent duplicate on collection */
        this.removeGravitation(gravitation);
        this.gravitations.push(gravitation);
    }

    /**
     * Remove `gravitation` object to collection
     * @param Particle gravitation
     */
    removeGravitation(gravitation) {
        for(var i = 0; i < this.gravitations.length; i++) {
            if(gravitation === this.gravitations[i])
                return this.gravitation.splice(i, 1);
        }
    }

    /**
     * Adds in a `gravity` force vector pointing toward the `p2` element to the `velocity` vector
     * @param  Particle p2
     */
    gravitateTo(p2) {
        /**
         * Calculate the `gravitational` force (f = GMm / r²)
         *
         * F = Force of gravity
         * G = Gravitational constant (6.67 * 10^-11 N x m^2 / kg^2)
         * M = Mass of one object
         * m = Mass of other object
         * r = Distance between the two objects
         *
         * We can simplify this by disregarding the `G` value. As `G` is used to primarily normalize
         * or proportion the force/acceleration value and prevent it from being too large
         *
         * New simplified formula will be (f = Mm / r²)
         */
        let gravForce = new Vector2(0, 0),
            distance = this.distanceTo(p2);


        /* Get the vector equavalent by setting the `gravitational` force as the length/magnitude of a vector... */
        gravForce.setLength(this.mass * p2.mass / (distance * distance));
        /* ...then setting the angle facing the other object */
        gravForce.setAngle(this.angleTo(p2));


        /* Add to `velocity` */
        this.velocity.addTo(gravForce);
    }

    /**
     * Add in all `gravitation` force vector to the velocity
     */
    handleGravitation() {
        for(var i = 0; i < this.gravitations.length; i++) {
            let gravitation = this.gravitations[i];
            this.gravitateTo(gravitation);
        }
    }


    /**
     * ==================================================================================
     * @Controller
     * ==================================================================================
     **/

    update() {

        /* Add the `spring` forces to the velocity */
        this.handleSpring();

        /* Add the `gravitation` forces to the velocity */
        this.handleGravitation();


        /* Subtract friction to current velocity */
        if(this.friction)
            this.velocity.multiplyBy(this.friction);

        /* Add gravity to current velocity */
        this.velocity.addTo(this.gravity);



        /* Add velocity to current position */
        this.position.addTo(this.velocity);
    }


    /**
     * ==================================================================================
     * @Getter/Setter
     * ==================================================================================
     **/

    //
}