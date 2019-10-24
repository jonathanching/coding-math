<template>

    <div id="circular-anim">

        <canvas id="canvas"></canvas>

    </div>

</template>
<script>

    /**
     * ==================================================================================
     * Circular, Ellipses and Lissajous Curve animations
     * ==================================================================================
     **/

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
                circleRadius: 0,

                ellipseXRadius: 0,
                ellipseYRadius: 0,

                lissajousXRadius: 0,
                lissajousYRadius: 0,
                lissajousXSpeed: 0,
                lissajousYSpeed: 0,
                lissajousXAngle: 0,
                lissajousYAngle: 0,

                speed: 0,
                angle: 0,

                sectionLength: 0,
                sectionLengthCenter: 0,
                cirleX: 0,
                ellipseX: 0,
                lissajousX: 0,
            };
        },

        mounted: function() {
            this.init();
        },

        methods: {

            init: function() {
                /* Set initial values */
                this.circleRadius = 100;

                this.ellipseXRadius = 75;
                this.ellipseYRadius = 150;

                this.lissajousXRadius = 75;
                this.lissajousYRadius = 150;
                this.lissajousXAngle = 0;
                this.lissajousYAngle = 0;
                this.lissajousXSpeed = 0.08;
                this.lissajousYSpeed = 0.13;


                this.speed = 0.08;
                this.angle = 0;


                /* Set position values */
                this.sectionLength = this.canvas.width / 3;
                this.sectionLengthCenter = this.sectionLength / 2;

                this.circleX = this.sectionLengthCenter;
                this.ellipseX = this.sectionLengthCenter + this.sectionLength;
                this.lissajousX = this.sectionLengthCenter + (this.sectionLength * 2);


                this.animateBalls();
            },


            /**
             * ==================================================================================
             * @Methods
             * ==================================================================================
             **/

            /**
             * Animate balls
             */
            animateBalls: function() {
                /* First clear all drawings */
                this.clearCanvas();

                /* Just adding in helpers and labels */
                this.drawHelpers();


                /**
                 * Draw the animations
                 *
                 * If we create a right triange w/ the `hypotenuse` as the `radian` part on a circle
                 * we can then use `Cosine` to get the `x` value and `Sine` to get the `y` value
                 *
                 * x = r cosA
                 * y = r sinA
                 */
                this.drawCircular();
                this.drawEllipse();
                this.drawLissajous();


                /* Add in speed value to the angle */
                this.angle += this.speed;

                this.lissajousXAngle += this.lissajousXSpeed;
                this.lissajousYAngle += this.lissajousYSpeed;


                /* Repeat render function */
                requestAnimationFrame(this.animateBalls);
            },

            /**
             * Draw ball in circular motion
             */
            drawCircular: function() {
                /**
                 * Calculate `x` and `y`
                 */
                let x = this.circleX + Math.cos(this.angle) * this.circleRadius,
                    y = this.canvasHalfHeight + Math.sin(this.angle) * this.circleRadius;


                /* Draw the ball */
                this.drawBall("red", x, y);
            },

            /**
             * Draw ball in ellipse motion
             */
            drawEllipse: function() {
                /**
                 * Calculate `x` and `y`
                 */
                let x = this.ellipseX + Math.cos(this.angle) * this.ellipseXRadius,
                    y = this.canvasHalfHeight + Math.sin(this.angle) * this.ellipseYRadius;


                /* Draw the ball */
                this.drawBall("blue", x, y);
            },

            /**
             * Draw ball in lissajouse curve motion
             */
            drawLissajous: function() {
                /**
                 * Calculate `x` and `y`
                 */
                let x = this.lissajousX + Math.cos(this.lissajousXAngle) * this.lissajousXRadius,
                    y = this.canvasHalfHeight + Math.sin(this.lissajousYAngle) * this.lissajousYRadius;


                /* Draw the ball */
                this.drawBall("green", x, y);
            },

            /**
             * Draw a ball
             */
            drawBall: function(color, x, y) {
                this.context.fillStyle = color;

                this.context.beginPath();
                this.context.arc(x, y, 10, 0, Math.PI * 2, false);
                this.context.fill();
            },

            /**
             * Draw helpers
             */
            drawHelpers: function() {
                this.drawGrid();
                this.drawAxis();
                this.drawLegend();
            },

            /**
             * Draw legend texts
             */
            drawLegend: function() {
                let x = this.canvasHalfHeight + (this.canvasHalfHeight * .5),
                    y = 10, lineHeight = 25;

                this.context.font = "20px Open Sans";

                /* Draw the label per trig function */
                this.context.fillStyle = "#333";
                this.context.fillText("LEGEND", y, x);
                this.context.fillStyle = "red";
                this.context.fillText("Circular", y, x += lineHeight);
                this.context.fillStyle = "blue";
                this.context.fillText("Ellipse", y, x += lineHeight);
                this.context.fillStyle = "green";
                this.context.fillText("Lissajous", y, x += lineHeight);
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