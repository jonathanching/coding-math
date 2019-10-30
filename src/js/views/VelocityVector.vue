<template>

    <div id="velocity-vector">

        <canvas id="canvas"></canvas>

    </div>

</template>
<script>

    /**
     * ==================================================================================
     * Moving an element with Velocity
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
                radius: 0,

                particles: [],
                noOfParticles: 0,
            };
        },

        mounted: function() {
            this.init();
        },

        methods: {

            init: function() {
                /* Set initial values */
                this.radius = 7;
                this.noOfParticles = 25;


                /* Create particle objects */
                for(var i = 0; i < this.noOfParticles; i++) {

                    /* Push in the collection all created `particle` object */
                    this.particles.push(
                            new Particle(
                                /* Position at the center of the canvas */
                                this.canvasHalfWidth, this.canvasHalfHeight,
                                /* Randomize speed from 1 - 5 */
                                Math.random() * 4 + 1,
                                /* Randomize angle from 0 - 360 degrees */
                                Math.random() * Math.PI * 2
                            )
                        );
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
                /* Loop through all created `particle` */
                for(var i = 0; i < this.particles.length; i++) {
                    let p = this.particles[i];

                    /**
                     * Adding of velocity to `particle`s current position
                     */
                    p.update();

                    /* Check if out of bounds */
                    if(this.checkOutofBounds(p)) {
                        /* Reset the particle's position, speed and angle */
                        p.position.x = this.canvasHalfWidth;
                        p.position.y = this.canvasHalfHeight;
                        p.velocity.setLength(Math.random() * 4 + 1);
                        p.velocity.setAngle(Math.random() * Math.PI * 2);
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


                /* Loop through all created `particle` */
                for(var i = 0; i < this.particles.length; i++) {
                    let p = this.particles[i];

                    /* Draw the ball */
                    this.drawBall(p.position.x, p.position.y);
                }
            },

            /**
             * Draw a ball
             */
            drawBall: function(x, y) {
                this.context.beginPath();
                this.context.arc(x, y, this.radius, 0, Math.PI * 2, false);
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
             * Check `particle` if outside the screen, reset if it is
             * @param  Particle p
             * @return boolean
             */
            checkOutofBounds: function(p) {
                /* If outside the... */
                if(
                    /* ...right side */
                    p.position.x - this.radius > this.canvas.width ||
                    /* ...left side */
                    p.position.x + this.radius < 0 ||
                    /* ...bottom side */
                    p.position.y - this.radius > this.canvas.height ||
                    /* ...top side */
                    p.position.y + this.radius < 0
                ) {
                    return true;
                }

                return false;
            },
        }
    };
</script>