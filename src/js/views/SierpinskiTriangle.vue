<template>

    <div id="sierpinski-triangle">

        <canvas id="canvas"></canvas>

    </div>

</template>
<script>

    /**
     * ==================================================================================
     * Drawing the Sierpinski Triangle fractal
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
                size1: 0,
                size2: 0,

                triangle1: null,
                triangle2: null,
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
                this.iteration = 7;
                this.size1 = this.canvasHalfHeight * 0.75;
                this.size2 = this.size1 / 2;


                /* For the first implementation, create `Triangle` object positioned at the left side */
                this.triangle1 = this.createTriangle(
                    new Vector2(this.canvasHalfWidth / 2, this.canvasHalfHeight), this.size1
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
             * Calculate and draw the `Sierpinski` triangle by getting the mid points of each
             * side of the `Triangle` and creating smaller `Triangles` from the new points
             * @param {int} top
             * @param {int} right
             * @param {int} left
             * @param {int} iteration
             */
            sierpinski1: function(top, right, left, iteration) {
                /* Check number of iterations... */
                if(iteration) {

                    let nextIteration = iteration - 1,
                        /* Get all the middle points per line segment/side */
                        trMid = new Vector2(
                                    (top.x + right.x) / 2,
                                    (top.y + right.y) / 2
                                ),
                        rlMid = new Vector2(
                                    (right.x + left.x) / 2,
                                    (right.y + left.y) / 2
                                ),
                        ltMid = new Vector2(
                                    (left.x + top.x) / 2,
                                    (left.y + top.y) / 2
                                );


                    /* Iterate on each `Sub-triangle` created */
                    this.sierpinski1(top, trMid, ltMid, nextIteration);
                    this.sierpinski1(trMid, right, rlMid, nextIteration);
                    this.sierpinski1(ltMid, rlMid, left, nextIteration);


                /* ...draw triangle if end of iteration */
                } else {

                    this.drawTriangle(top, right, left);
                }
            },

            /**
             * Calculate and draw the `Sierpinski` triangle by creating 3 line segments from a given point
             * w/ an angle of 60deg between each other
             * @param {Vector2} position
             * @param {int}     size
             * @param {int}     iteration
             */
            sierpinski2: function(position, size, iteration) {
                /* Check number of iterations */
                if(iteration) {

                    let nextIteration = iteration - 1,
                        nextSize = size / 2,
                        /* Get 3 points to create the line segments */
                        points = this.createTriangle(position, size);


                    /* Iterate on each end of point */
                    this.sierpinski2(points[0], nextSize, nextIteration);
                    this.sierpinski2(points[1], nextSize, nextIteration);
                    this.sierpinski2(points[2], nextSize, nextIteration);


                    /* Draw line from center to the 3 points */
                    this.drawLine(position, points[0]);
                    this.drawLine(position, points[1]);
                    this.drawLine(position, points[2]);
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


                /**
                 * Implementation 1
                 */
                this.sierpinski1(this.triangle1[0], this.triangle1[1], this.triangle1[2], this.iteration);


                /**
                 * Implementation 2
                 */
                this.sierpinski2(
                    new Vector2(this.canvasHalfWidth + (this.canvasHalfWidth / 2), this.canvasHalfHeight),
                    this.size2,
                    this.iteration
                );
            },


            /**
             * Draw a line
             * @param {Vector2} p1
             * @param {Vector2} p2
             */
            drawLine: function(p1, p2) {
                this.context.save();

                this.context.beginPath();
                this.context.moveTo(p1.x, p1.y);
                this.context.lineTo(p2.x, p2.y);
                this.context.stroke();

                this.context.restore();
            },

            /**
             * Draw the triangle
             * @param {int} p1
             * @param {int} p2
             * @param {int} p3
             */
            drawTriangle: function(p1, p2, p3) {
                this.context.save();

                this.context.beginPath();
                this.context.moveTo(p1.x, p1.y);
                this.context.lineTo(p2.x, p2.y);
                this.context.lineTo(p3.x, p3.y);
                this.context.fill();

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