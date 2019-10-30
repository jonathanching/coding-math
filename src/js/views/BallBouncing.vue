<template>

    <div id="ball-bouncing">

        <canvas id="canvas"></canvas>

    </div>

</template>
<script>

    /**
     * ==================================================================================
     * Ball bouncing animation
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

                ball: null,
            };
        },

        mounted: function() {
            this.init();
        },

        methods: {

            init: function() {
                /* Set initial values */
                this.radius = 20;

                this.ball = new Particle(
                                /* Position at left side of the canvas */
                                this.canvasHalfWidth / 2, this.canvasHalfHeight,
                                /* Set speed */
                                10,
                                /* Throw to the upper right (45deg) */
                                -Math.PI / 4,
                                /**
                                 * Set gravity value. This will create a `Vector2` class on the `Particle`
                                 * object w/ the specified value put on the `y` property
                                 */
                                0.1
                            );

                /**
                 * Set the value for the loss of velocity per bounce/collision
                 * Must be a - number
                 */
                this.ball.bounce = -0.75;


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
                 * Adding of gravity to `ball`s current velocity. This increases the downward pulling
                 * force overtime
                 *
                 * Adding of velocity to `ball`s current position
                 */
                this.ball.update();


                /* Check wall collision for bouncing effect */
                this.checkWallCollision();
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


                /* Draw the ball */
                this.drawBall("black", this.ball.position.x, this.ball.position.y);
            },

            /**
             * Draw a ball
             */
            drawBall: function(color, x, y) {
                this.context.fillStyle = color;

                this.context.beginPath();
                this.context.arc(x, y, this.radius, 0, Math.PI * 2, false);
                this.context.fill();
            },


            /**
             * ==================================================================================
             * @Checker
             * ==================================================================================
             **/

            /**
             * Check `ball` collision to wall, bounce if it does
             */
            checkWallCollision: function() {
                /* If colliding on the... */
                /* ...right side */
                if(this.ball.position.x + this.radius > this.canvas.width) {

                    /* Position at the right side edge */
                    this.ball.position.x = this.canvas.width - this.radius;
                    /* Reverse velocity`s `x` value to point to the left side */
                    this.ball.velocity.x = this.ball.velocity.x * this.ball.bounce;

                /* ...left side */
                } else if(this.ball.position.x - this.radius < 0) {

                    /* Position at the left side edge */
                    this.ball.position.x = this.radius;
                    /* Reverse velocity`s `x` value to point to the right side */
                    this.ball.velocity.x = this.ball.velocity.x * this.ball.bounce;

                /* ...bottom side */
                } else if(this.ball.position.y + this.radius > this.canvas.height) {

                    /* Position at the top side edge */
                    this.ball.position.y = this.canvas.height - this.radius;
                    /* Reverse velocity`s `y` value to point to the bottom side */
                    this.ball.velocity.y = this.ball.velocity.y * this.ball.bounce;

                /* ...top side */
                } else if(this.ball.position.y - this.radius < 0) {

                    /* Position at the bottom side edge */
                    this.ball.position.y = this.radius;
                    /* Reverse velocity`s `y` value to point to the top side */
                    this.ball.velocity.y = this.ball.velocity.y * this.ball.bounce;

                }
            },
        }
    };
</script>