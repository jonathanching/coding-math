<template>

    <div id="circular-layout">

        <canvas id="canvas"></canvas>

    </div>

</template>
<script>

    /**
     * ==================================================================================
     * Position elements in a Circular layout
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
                radius: 0,
                angle: 0,
                slice: 0,

                noOfObjects: 0,
            };
        },

        mounted: function() {
            this.init();
        },

        methods: {

            init: function() {
                /* Set initial values */
                this.radius = 200;
                this.angle = 0;
                this.noOfObjects = 10;

                /**
                 * Divide the circle (`2π r` or `Math.PI * 2` is equal to `360 degrees`) w/ the no. of objects
                 * we are going to place
                 */
                this.slice = Math.PI * 2 / this.noOfObjects;

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


                for(var i = 0; i < this.noOfObjects; i += 1) {

                    /* Get the current angle by multiplying `i` w/ the `slice` value */
                    this.angle = i * this.slice;

                    /**
                     * Calculate `x` and `y` values
                     */
                    let x = this.canvasHalfWidth + Math.cos(this.angle) * this.radius,
                        y = this.canvasHalfHeight + Math.sin(this.angle) * this.radius;


                    /* Draw balls */
                    this.drawBall(x, y);
                }
            },

            /**
             * Draw a ball
             */
            drawBall: function(x, y) {
                this.context.beginPath();
                this.context.arc(x, y, 10, 0, Math.PI * 2, false);
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

            //
        }
    };
</script>