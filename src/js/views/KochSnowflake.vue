<template>

    <div id="koch-snowflake">

        <canvas id="canvas"></canvas>

    </div>

</template>
<script>

    /**
     * ==================================================================================
     * Drawing the Snowflake fractal
     * ==================================================================================
     **/

    import { Vector2 } from '../libs/Vector2.js';
    import { Math2 } from '../libs/Math2.js';
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
                iteration: 0,
                size: 0,
            };
        },

        watch: {
            //
        },

        mounted: function() {
            this.init();
        },

        methods: {

            init: function() {
                /* Set initial values */
                this.iteration = 4;
                this.size = this.canvasHalfHeight * 0.75;


                /* Create `Triangle` object */
                this.triangle = this.createTriangle(
                        /* Position at the center */
                        new Vector2(this.canvasHalfWidth, this.canvasHalfHeight), this.size
                    );


                this.draw();
            },


            /**
             * ==================================================================================
             * @Methods
             * ==================================================================================
             **/

            /**
             * Create `Triangle` from given position
             * @param {Vector2} position
             * @param {int}     radius
             * @param {int}     slice
             */
            createTriangle: function(position, radius, slice = Math.PI * 2 / 3) {
                /* Object will just be a collection of its points */
                let triangle = [];

                /* Create the 3 points of the triangle (Clockwise) */
                for(var i = 0; i < 3; i++) {
                        /* Increment by 120deg every loop */
                    let angle = (-Math.PI / 2) + i * (slice),
                        /* Calculate `x` & `y` axis */
                        x = position.x + Math.cos(angle) * radius,
                        y = position.y + Math.sin(angle) * radius;

                    triangle[i] = new Vector2(x, y);
                }


                return triangle;
            },


            /**
             * ==================================================================================
             * @Controller
             * ==================================================================================
             **/

            /**
             * Calculate and draw the `Koch Snowflake`
             * @param {Vector2}  p1
             * @param {Vector2}  p2
             * @param {int}      iteration
             */
            koch: function(p1, p2, iteration) {

                let nextIteration = iteration - 1,
                    /* Get center coordinates */
                    dX = p2.x - p1.x,
                    dY = p2.y - p1.y,
                    /* Get length & angle */
                    distance = Math.sqrt(dX * dX + dY * dY),
                    unit = distance / 3,
                    angle = Math.atan2(dY, dX),
                    /* Get points */
                    pA = new Vector2(
                            p1.x + dX / 3,
                            p1.y + dY / 3
                         ),
                    pB = new Vector2(
                            pA.x + Math.cos(angle - Math.PI / 3) * unit,
                            pA.y + Math.sin(angle - Math.PI / 3) * unit
                         ),
                    pC = new Vector2(
                            p2.x - dX / 3,
                            p2.y - dY / 3
                         );


                /* Check number of iterations... */
                if(iteration) {

                    /* Iterate on each line segment */
                    this.koch(p1, pA, nextIteration);
                    this.koch(pA, pB, nextIteration);
                    this.koch(pB, pC, nextIteration);
                    this.koch(pC, p2, nextIteration);

                /* ...draw if end of iteration */
                } else {

                    this.drawLine([p1, pA, pB, pC, p2]);
                }
            },

            /**
             * Update loop event
             */
            update: function() {

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


                /* Draw the `Koch` fractal from each of the `Triangle` side */
                for(var i = 0; i < this.triangle.length; i++) {
                    let curr = this.triangle[i],
                        next = this.triangle[(i + 1) % this.triangle.length];

                    this.koch(curr, next, this.iteration);
                }


                /* Repeat render function */
                requestAnimationFrame(this.animateFractal);
            },


            /**
             * Draw a line
             * @param {array} arr
             */
            drawLine: function(arr) {
                this.context.save();

                this.context.beginPath();
                for(var i = 0; i < arr.length; i++) {
                    let point = arr[i];

                    if(i === 0) {
                        this.context.moveTo(point.x, point.y);
                    } else {
                        this.context.lineTo(point.x, point.y);
                    }
                }
                this.context.stroke();

                this.context.restore();
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