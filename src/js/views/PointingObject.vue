<template>

    <div id="pointing-object">

        <canvas id="canvas"></canvas>

    </div>

</template>
<script>

    /**
     * ==================================================================================
     * Rotate object to point at a certain element
     * ==================================================================================
     **/

    import Draw from '../mixins/Draw.js';
    import TrackMouse from '../mixins/TrackMouse.js';


    export default {
        props: {
            //
        },

        mixins: [
            Draw,
            TrackMouse,
        ],

        data: function() {
            return {
                angle: 0,
            };
        },

        mounted: function() {
            this.init();
        },

        methods: {

            init: function() {
                /* Set initial values */
                this.angle = 0;


                this.animateArrow();
            },


            /**
             * ==================================================================================
             * @Methods
             * ==================================================================================
             **/

            /**
             * Animate arrow
             */
            animateArrow: function() {
                /**
                 * Calculate `x` and `y` values
                 */
                let x = this.mouseX - this.canvasHalfWidth,
                    y = this.mouseY - this.canvasHalfHeight;


                /* Calculate degrees using atan func */
                this.angle = Math.atan2(y, x);


                /* First clear all drawings */
                this.clearCanvas();

                /* Just adding in helpers and labels */
                this.drawHelpers();


                /* Save current canvas state before the translation and rotation */
                this.context.save();


                /* Translate and rotate canvas */
                this.context.translate(this.canvasHalfWidth, this.canvasHalfHeight);
                this.context.rotate(this.angle);


                /* Draw the arrow */
                this.drawArrow();


                /* Restore default canvas state */
                this.context.restore();


                /* Repeat render function */
                requestAnimationFrame(this.animateArrow);
            },

            /**
             * Draw arrow
             */
            drawArrow: function() {
                this.context.strokeStyle = "#333";

                this.context.beginPath();
                this.context.moveTo(20, 0);
                this.context.lineTo(-20, 0);
                this.context.moveTo(20, 0);
                this.context.lineTo(10, -10);
                this.context.moveTo(20, 0);
                this.context.lineTo(10, 10);
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