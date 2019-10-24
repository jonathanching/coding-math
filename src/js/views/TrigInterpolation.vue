<template>

    <div id="animation-ease">

        <canvas id="canvas"></canvas>

    </div>

</template>
<script>

    /**
     * ==================================================================================
     * Animation using Sine and Cosine
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
                speed: 0,
                angle: 0,
                amplitude: 0,

                leftSide: 0,
                rightSide: 0,
            };
        },

        mounted: function() {
            this.init();
        },

        methods: {

            init: function() {
                /* Set initial values */
                this.speed = 0.1;
                this.angle = 0;
                this.amplitude = this.canvas.height * .2;

                /* Set positional values */
                this.leftSide = this.canvasHalfWidth - (this.canvasHalfWidth * .5);
                this.rightSide = this.canvasHalfWidth + (this.canvasHalfWidth * .5);


                this.animate();
            },


            /**
             * ==================================================================================
             * @Methods
             * ==================================================================================
             **/

            /**
             * Animate
             */
            animate: function() {
                /**
                 * Calculate Sine and Cosine values
                 * Multiplying the value by the `amplitude` will return a value ranging from `+amplitude` to `-amplitude`
                 * (ex: If `amplitude` is equal to 100, value will range from 100 to -100).
                 */
                let sineY = this.canvasHalfHeight + Math.sin(this.angle) * this.amplitude,
                    cosY = this.canvasHalfHeight + Math.cos(this.angle) * this.amplitude;


                /* First clear all drawings */
                this.clearCanvas();

                /* Just adding in helpers and labels */
                this.drawHelpers();


                /* Draw the balls for Sine and Cosine */
                this.drawBall("red", this.leftSide, sineY);
                this.drawBall("blue", this.rightSide, cosY);


                /* Add in speed value to the angle */
                this.angle += this.speed;


                /* Repeat render function */
                requestAnimationFrame(this.animate);
            },

            /**
             * Draw a ball
             */
            drawBall: function(color, x, y) {
                this.context.fillStyle = color;

                this.context.beginPath();
                this.context.arc(x, y, 50, 0, Math.PI * 2, false);
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
                this.context.fillText("Sine", y, x += lineHeight);
                this.context.fillStyle = "blue";
                this.context.fillText("Cosine", y, x += lineHeight);
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