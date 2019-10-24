<template>

    <div id="spring-animation">

        <canvas id="canvas"></canvas>

    </div>

</template>
<script>

    /**
     * ==================================================================================
     * Simulating object motion on a spring
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
                springColor: null,
                springRadius: 0,
                spring: null,

                ballColor: null,
                ballRadius: 0,
                ball: null,

                k: 0,
            };
        },

        mounted: function() {
            this.init();
        },

        methods: {

            init: function() {
                /* Set initial values */
                this.springColor = "gray";
                this.springRadius = 10;
                this.spring = new Vector2(
                                /* Position at the center of the screen */
                                this.canvasHalfWidth, this.canvasHalfHeight,
                            );

                this.ballColor = "black";
                this.ballRadius = 15;
                this.ball = new Particle(
                                /* Position randomly */
                                Math.random() * this.canvas.width, Math.random() * this.canvas.height,
                                /* Set initial speed */
                                100,
                                /* Set random angle */
                                Math.random() * Math.PI * 2,
                            );

                /**
                 * Add in `friction`, this will be multiplied to the `velocity `
                 * vector per frame to decrease it
                 */
                this.ball.friction = 0.9;

                /**
                 * Set the stiffness of the spring
                 * Higher numbers are more stiff, lower number are more lose
                 */
                this.k = 0.15;

                /**
                 * Set the distance or spring length between the `ball` and `spring` point
                 * (Should be in `pixels`)
                 */
                this.offset = 0;


                /**
                 * Attach the `spring point` to the `ball` object
                 * See `Particle.js` `springTo` method for complete details
                 */
                this.ball.addSpring(this.spring, this.k, this.offset);


                this.animateCircle();
            },


            /**
             * ==================================================================================
             * @Methods
             * ==================================================================================
             **/

            /**
             * Animate circles
             */
            animateCircle: function() {
                /* First clear all drawings */
                this.clearCanvas();

                /* Just adding in helpers and labels */
                this.drawHelpers();


                /**
                 * Adding of spring force to ball`s velocity
                 * Adding of velocity to ball`s current position
                 */
                this.ball.update();


                /* Draw the circles... */
                /* ...spring point */
                this.drawBall(this.springColor, this.spring.x, this.spring.y, this.springRadius);

                /* ...line between spring and object */
                this.drawLine(this.spring.x, this.spring.y, this.ball.position.x, this.ball.position.y);

                /* ...ball object */
                this.drawBall(this.ballColor, this.ball.position.x, this.ball.position.y, this.ballRadius);


                /* Check object movement, throw object again on stop */
                if(this.ball.velocity.getLength() <= 0.01) {
                    this.ball.position.x = Math.random() * this.canvas.width;
                    this.ball.position.y = Math.random() * this.canvas.height;
                    this.ball.velocity.setLength(50);
                    this.ball.velocity.setAngle(Math.random() * Math.PI * 2);
                }


                /* Repeat render function */
                requestAnimationFrame(this.animateCircle);
            },

            /**
             * Draw a ball
             */
            drawBall: function(color, x, y, radius) {
                this.context.fillStyle = color;

                this.context.beginPath();
                this.context.arc(x, y, radius, 0, Math.PI * 2, false);
                this.context.fill();
            },

            /**
             * Draw a line
             */
            drawLine: function(x0, y0, x1, y1) {
                this.context.beginPath();
                this.context.moveTo(x0, y0);
                this.context.lineTo(x1, y1);
                this.context.stroke();
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