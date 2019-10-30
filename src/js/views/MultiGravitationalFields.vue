<template>

    <div id="interplanetary-gravity">

        <canvas id="canvas"></canvas>

    </div>

</template>
<script>

    /**
     * ==================================================================================
     * Particles on multiple gravitational fields
     * ==================================================================================
     **/

    import { Vector2 } from '../libs/Vector2.js';
    import { Particle } from '../libs/Particle.js';
    import Draw from '../mixins/Draw.js';


    export default {
        props: {
            //
        },

        mixins: [
            Draw,
        ],

        data: function() {
            return {
                planet1: null,
                planet2: null,
                planetMass: 0,
                planetRadius: 0,

                asteroids: [],
                asteroidEmitter: {
                    position: { x: 0, y: 0 },
                    speed: 0,
                    angle: 0,
                },
                asteroidRadius: 0,
                noOfAsteroids: 0,
            };
        },

        mounted: function() {
            this.init();
        },

        methods: {

            init: function() {
                /* Set initial variables */
                this.asteroidRadius = 3;
                this.noOfAsteroids = 100;

                this.planetMass1 = 8000;
                this.planetMass2 = 25000;
                this.planetRadius = 15;


                /**
                 * Create the Planet `gravitational` object
                 *
                 */

                /* Create planet 1 at the upper left side of the canvas */
                this.planet1 = new Particle(this.canvasHalfWidth / 2, this.canvasHalfHeight, 0, 0);
                this.planet1.mass = this.planetMass1;
                this.planet1.radius = this.planetRadius;

                /* Create planet 2 position at the middle of the canvas */
                this.planet2 = new Particle(this.canvasHalfWidth + this.canvasHalfWidth / 2, this.canvasHalfHeight, 0, 0);
                this.planet2.mass = this.planetMass2;
                this.planet2.radius = this.planetRadius;


                /**
                 * Create the `asteroid` objects
                 *
                 */

                /* Set `asteroid` base position, angle and speed */
                /* Position at the top left side of the earth */
                this.asteroidEmitter.position.x = 0;
                this.asteroidEmitter.position.y = this.canvasHalfHeight;

                for(var i = 0; i < this.noOfAsteroids; i++) {
                    let asteroid = new Particle(
                            this.asteroidEmitter.position.x, this.asteroidEmitter.position.y,
                            /* Set random `speed` from 5-6 */
                            Math.random() * 2 + 5,
                            /* Point the angle straight up (45deg) then add in a randomize angle of 0.1 */
                            Math.PI / 4 + (Math.random() * .2 - .1)
                        );

                    asteroid.radius = 3;


                    /**
                     * Attach a `gravitation` to the other planet object
                     * See `Particle.js` `gravitateTo` method for complete details
                     */
                    asteroid.addGravitation(this.planet1);
                    asteroid.addGravitation(this.planet2);


                    /* Add to `asteroid` collection */
                    this.asteroids.push(asteroid);
                }


                this.render();
            },


            /**
             * ==================================================================================
             * @Controller
             * ==================================================================================
             **/

            /**
             * Update loop event
             */
            update: function() {
                /* Update and draw all `asteroids` */
                for(var i = 0; i < this.asteroids.length; i++) {
                    let asteroid = this.asteroids[i];

                    /**
                     * Adding of gravity to `particle`s current velocity
                     * Adding of velocity to `particle`s current position
                     */
                    asteroid.update();


                    /* Check out of bounds asteroid, redraw if so */
                    if(this.checkOutofBounds(asteroid)) {
                        asteroid.position.x = this.asteroidEmitter.position.x;
                        asteroid.position.y = this.asteroidEmitter.position.y;
                        asteroid.velocity.setLength(Math.random() * 2 + 5);
                        asteroid.velocity.setAngle(Math.PI / 4 + (Math.random() * .2 - .1));
                    }
                }
            },


            /**
             * ==================================================================================
             * @Renderer
             * ==================================================================================
             **/

            /**
             * Draw loop event
             */
            draw: function() {
                /* First clear all drawings */
                this.clearCanvas();

                /* Just adding in helpers and labels */
                this.drawHelpers();


                /* Update and draw all `asteroids` */
                for(var i = 0; i < this.asteroids.length; i++) {
                    let asteroid = this.asteroids[i];

                    /* Draw ball */
                    this.drawBall("blue", asteroid.position.x, asteroid.position.y, asteroid.radius);
                }


                /* Draw planets */
                this.drawBall("red", this.planet1.position.x, this.planet1.position.y, this.planet1.radius);
                this.drawBall("red", this.planet2.position.x, this.planet2.position.y, this.planet2.radius);
            },

            /**
             * Draw a ball
             * @param string color
             * @param int    x
             * @param int    y
             */
            drawBall: function(color, x, y, radius = 10) {
                this.context.fillStyle = color;

                this.context.beginPath();
                this.context.arc(x, y, radius, 0, Math.PI * 2, false);
                this.context.fill();
            },


            /**
             * ==================================================================================
             * @Getter/Setter
             * ==================================================================================
             **/

            //


            /**
             * ==================================================================================
             * @Checker
             * ==================================================================================
             **/

            /**
             * Check `particle` if outside the screen or collides w/ other planets, reset if it is
             * @param  Particle p
             * @return boolean
             */
            checkOutofBounds: function(p) {

                if(
                    /* If outside the canvas on... */
                    /* ...right side */
                    p.position.x - p.radius > this.canvas.width ||
                    /* ...left side */
                    p.position.x + p.radius < 0 ||
                    /* ...bottom side */
                    p.position.y - p.radius > this.canvas.height ||
                    /* ...top side */
                    p.position.y + p.radius < 0 ||

                    /* If inside the planets... */
                    p.distanceTo(this.planet1) <= this.planet1.radius + p.radius ||
                    p.distanceTo(this.planet2) <= this.planet2.radius + p.radius
                ) {
                    return true;
                }

                return false;
            },
        }
    };
</script>