<template>

    <div id="gravity-vector">
    
        <canvas id="canvas"></canvas>

    </div>

</template>
<script>

    /**
     * ==================================================================================
     * Simulating gravity to an object
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
                this.radius = 6;
                this.noOfParticles = 50;


                /* Create particle objects */
                for(var i = 0; i < this.noOfParticles; i++) {

                    /* Push in the collection all created `particle` object */
                    this.particles.push(
                            new Particle(
                                /* Position at the center bottom of the canvas */
                                this.canvasHalfWidth, this.canvas.height,
                                /* Randomize speed from 5 - 11 */
                                Math.random() * 6 + 5,
                                /* Point the angle straight up (90deg) then add in a randomize angle of 0.1 */
                                -Math.PI / 2 + (Math.random() * .2 - .1),
                                /**
                                 * Set gravity value. This will create a `Vector2` class on the `Particle`
                                 * object w/ the specified value put on the `y` property
                                 */
                                0.1
                            )
                        );
                }


                this.animateParticles();
            },


            /**
             * ==================================================================================
             * @Methods
             * ==================================================================================
             **/

            /**
             * Animate particle
             */
            animateParticles: function() {
                /* First clear all drawings */
                this.clearCanvas();

                /* Just adding in helpers and labels */
                this.drawHelpers();


                /* Loop through all created `particle` */
                for(var i = 0; i < this.particles.length; i++) {
                    let p = this.particles[i];

                    /**
                     * Adding of gravity to `particle`s current velocity. This increases the downward pulling 
                     * force overtime
                     *
                     * Adding of velocity to `particle`s current position
                     */
                    p.update();


                    /* Draw the ball */
                    this.drawBall(p.position.x, p.position.y);


                    /* Check if out of bounds */
                    if(this.checkOutofBounds(p)) {
                        /* Reset the particle's position, speed and angle */
                        p.position.x = this.canvasHalfWidth;
                        p.position.y = this.canvas.height;
                        p.velocity.setLength(Math.random() * 6 + 5);
                        p.velocity.setAngle(-Math.PI / 2 + (Math.random() * .2 - .1));
                    }
                }



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
             * Draw helpers
             */
            drawHelpers: function() {
                this.drawGrid(); 
                this.drawAxis();
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