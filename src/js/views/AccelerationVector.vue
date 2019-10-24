<template>

    <div id="acceleration-vector">

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
                this.speed[0] = new Vector2(0.05, 0);
                this.speed[1] = new Vector2(0.07, 0);
                this.speed[2] = new Vector2(0.1, 0);


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
                    this.particles.push(
                            new Particle(
                                /* Position to the left side */
                                pX, pY * i,
                                /* Initial speed should be 0 */
                                0,
                                /* Move to the right (0deg) */
                                0
                            )
                        );
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
                     * Add in the acceleration vector to the velocity vector
                     * per each time step, this increases the element's speed overtime
                     */
                    p.accelerate(this.speed[i]);


                    /**
                     * Adding of velocity to `particle`s current position
                     */
                    p.update();


                    /* Draw the ball */
                    this.drawBall(p.position.x, p.position.y);


                    /* Check if out of bounds, delete particle object if so */
                    if(this.checkOutofBounds(p))
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