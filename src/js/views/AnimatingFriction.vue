<template>

    <div id="animating-friction">

        <canvas id="canvas"></canvas>

    </div>

</template>
<script>

    /**
     * ==================================================================================
     * Adding in friction on movement animation
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
                speed: [],

                particles: [],
                noOfParticles: 3,
            };
        },

        mounted: function() {
            this.init();
        },

        methods: {

            init: function() {
                /* Set initial values */
                this.radius = 10;

                /**
                 * Set a higher `speed` value to compensate w/ the addition
                 * of `friction` value on the movement calculation
                 */
                this.speed[0] = 25;
                this.speed[1] = 30;
                this.speed[2] = 20;


                /* Create particle objects */
                this.createParticles();


                this.animateParticles();
            },


            /**
             * ==================================================================================
             * @Methods
             * ==================================================================================
             **/

            /**
             * Create the particle objects
             */
            createParticles: function() {
                let pX = this.canvasHalfWidth / 2,
                    pY = this.canvasHalfHeight / 2;


                for(var i = 1; i <= this.noOfParticles; i++) {
                    let p = new Particle(
                                /* Position to the left side */
                                pX, pY * i,
                                /* Set speed */
                                this.speed[i - 1],
                                /* Move to the right (0deg) */
                                0
                            );

                    /**
                     * Set the `friction`, this will be multiplied to the `velocity `
                     * vector per frame to decrease it
                     */
                    p.friction = 0.97;

                    this.particles.push(p);
                }
            },

            /**
             * Animate particles
             */
            animateParticles: function() {
                /* First clear all drawings */
                this.clearCanvas();

                /* Just adding in helpers and labels */
                this.drawHelpers();


                for(var i = 0; i < this.particles.length; i++) {
                    let p = this.particles[i];


                    /**
                     * Subtracting friction to `particle`s current velocity
                     * Adding of velocity to `particle`s current position
                     */
                    p.update();


                    /* Draw the ball */
                    this.drawBall(p.position.x, p.position.y);


                    /* Check if particle is still moving */
                    if(this.checkVelocity(p))
                        this.particles.splice(i, 1);
                }


                /* If all particles are deleted, create another batch */
                if(!this.particles.length)
                    this.createParticles();


                /* Repeat render function */
                requestAnimationFrame(this.animateParticles);
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
             * Check `particle` if still moving, reset if it is
             * @param  particle p
             * @return boolean
             */
            checkVelocity: function(p) {
                /* If outside the... */
                if(p.velocity.x <= 0.01)
                    return true;

                return false;
            },
        }
    };
</script>