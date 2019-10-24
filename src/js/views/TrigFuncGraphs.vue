<template>

    <div id="trig-func-graph">

        <canvas id="canvas"></canvas>

    </div>

</template>
<script>

    /**
     * ==================================================================================
     * Graph/Wave of Trigonometric Functions
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
                spacing: 0,
            };
        },

        mounted: function() {
            this.init();
        },

        methods: {

            init: function() {
                /* Margin of the elements to draw later */
                this.spacing = 200;


                this.draw();
            },


            /**
             * ==================================================================================
             * @Methods
             * ==================================================================================
             **/

            /**
             * Draw on canvas element
             */
            draw: function() {
                /* Just adding in helpers and labels */
                this.drawHelpers();

                this.drawWave();
            },

            /**
             * Draw graph/wave
             */
            drawWave: function() {
                let x = 0;


                /* Just positioning the wave on the center screen */
                this.context.translate(0, this.canvasHalfHeight);

                /* As the canvas `Y` axis is reversed, we need to reverse the canvas to properly show the wave */
                this.context.scale(1, -1);

                /**
                 * `Math.PI * 2` or `2π r` is equavalent to 1 circle (`360 degrees`)
                 * Multiplying it twice just to extend the wave seen
                 */
                for(var angle = 0; angle < (Math.PI * 2) * 2; angle += 0.01) {
                    x = angle * this.spacing;

                    /**
                     * Calculate Sine, Cosine and Tangent
                     */
                    let sineY = Math.sin(angle) * this.spacing,
                        cosY = Math.cos(angle) * this.spacing,
                        tanY = Math.tan(angle) * this.spacing;

                    /* Draw the Sine, Cosine and Tangent wave */
                    this.drawLine("red", x, sineY);
                    this.drawLine("blue", x, cosY);
                    this.drawLine("green", x, tanY);
                }
            },

            /**
             * Draw trig function lines
             */
            drawLine: function(color, x, y) {
                this.context.fillStyle = color;
                this.context.fillRect(x, y, 5, 5);
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
                this.context.fillStyle = "green";
                this.context.fillText("Tangent", y, x += lineHeight);
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