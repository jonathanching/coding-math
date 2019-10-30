<template>

    <div id="interplanetary-gravity">

        <canvas id="canvas"></canvas>

    </div>

</template>
<script>

    /**
     * ==================================================================================
     * Simulating Planetary Orbits
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
                earth: null,
                moon: null,
            };
        },

        mounted: function() {
            this.init();
        },

        methods: {

            init: function() {
                /* Set initial variables */
                this.earth = new Particle(
                                /* Position at the center of the canvas */
                                this.canvasHalfWidth, this.canvasHalfHeight,
                                /* Set initial `speed` and `direction` to 0 */
                                0, 0
                            );

                this.moon = new Particle(
                                /* Position at the right side of the earth */
                                this.earth.position.x + 200, this.canvasHalfHeight,
                                /* Set initial `speed` */
                                8,
                                /* Set initial angle straight up (90deg) */
                                -Math.PI / 2
                            );

                /* Set earth's mass to affect the `moon` element */
                this.earth.mass = 22500;


                /**
                 * Attach a `gravitation` to `moon` from `earth` object
                 * See `Particle.js` `gravitateTo` method for complete details
                 */
                this.moon.addGravitation(this.earth);


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
                /**
                 * Adding of gravity to `particle`s current velocity
                 * Adding of velocity to `particle`s current position
                 */
                this.moon.update();
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


                /* Draw earth and moon */
                this.drawBall("green", this.earth.position.x, this.earth.position.y, 25);
                this.drawBall("blue", this.moon.position.x, this.moon.position.y, 5);
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

            //
        }
    };
</script>