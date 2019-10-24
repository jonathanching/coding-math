<template>

    <div id="fractal-tree">

        <canvas id="canvas"></canvas>

    </div>

</template>
<script>

    /**
     * ==================================================================================
     * Creating a Tree patterned Fractal
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
                tree1Iteration: 0,
                tree1BranchAngleA: 0,
                tree1BranchAngleACurr: 0,
                tree1BranchAngleAInc: 0,
                tree1BranchAngleB: 0,
                tree1BranchAngleBCurr: 0,
                tree1BranchAngleBInc: 0,
                tree1TrunkRatio: 0,
                tree1Start: 0,
                tree1End: 0,

                tree2Iteration: 0,
                tree2RectAngle: 0,
                tree2RectAngleCurr: 0,
                tree2RectAngleInc: 0,
                tree2Start: 0,
                tree2End: 0,
                tree2Size: 0,
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
                /* Set tree 1 values */
                this.tree1Iteration = 10;
                this.tree1BranchAngleA = 0.1;
                this.tree1BranchAngleACurr = 0;
                this.tree1BranchAngleAInc = 0.01;
                this.tree1BranchAngleB = 0;
                this.tree1BranchAngleBCurr = 0;
                this.tree1BranchAngleBInc = 0.015;
                this.tree1TrunkRatio = 0.35;

                /* Set main branch points of first tree, position at the left side */
                let tree1X = this.canvasHalfWidth / 2,
                    tree1Size = this.canvasHalfHeight / 2;
                this.tree1Start = new Vector2(tree1X, this.canvas.height - (tree1Size));
                this.tree1End = new Vector2(this.canvasHalfWidth / 2, this.canvasHalfHeight / 2);


                /* Set tree 2 values */
                this.tree2Iteration = 10;
                this.tree2RectAngle = 0;
                this.tree2RectAngleCurr = 0;
                this.tree2RectAngleInc = 0.01;
                this.tree2Size = tree1Size / 4;

                /* Set main branch points of second tree, position at the right side */
                let tree2X = this.canvas.width - (this.canvasHalfWidth / 2) - (this.tree2Size / 2);
                this.tree2Start = new Vector2(tree2X, this.canvas.height - (tree1Size));


                this.animateFractal();
            },


            /**
             * ==================================================================================
             * @Methods
             * ==================================================================================
             **/

            /**
             * Animate fractal
             */
            animateFractal: function() {
                /* First clear all drawings */
                this.clearCanvas();

                /* Just adding in helpers and labels */
                this.drawHelpers();



                /* Update both tree 1 branches' angles differently */
                this.tree1BranchAngleA = Math.cos(this.tree1BranchAngleACurr += this.tree1BranchAngleAInc) * Math.PI / 2;
                this.tree1BranchAngleB = Math.cos(this.tree1BranchAngleBCurr += this.tree1BranchAngleBInc) * Math.PI / 2;

                /* Draw Fractal tree made from Line segments */
                this.tree1(this.tree1Start, this.tree1End, this.tree1Iteration);



                /* Update tree 2 branch's angle */
                this.tree2RectAngle = -Math.PI / 4 + Math.sin(this.tree2RectAngleCurr += this.tree2RectAngleInc) * Math.PI / 4;

                /* Draw Fractal tree made from Squares */
                this.tree2(this.tree2Start, this.tree2Size, 0, this.tree2Iteration);



                /* Repeat render function */
                requestAnimationFrame(this.animateFractal);
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
             * Draw a rectangle
             * @param {Vector2} point
             * @param {int}     width
             * @param {int}     height
             * @param {int}     angle
             */
            drawRectangle: function(point, width, height, angle) {
                this.context.translate(point.x, point.y);
                this.context.rotate(angle);
                this.context.fillRect(0, 0, width, height);
            },


            /**
             * ==================================================================================
             * @Controller
             * ==================================================================================
             **/

            /**
             * Calculating a Fractal w/ a Tree pattern using line segments
             * @param {Vector2}  p1
             * @param {Vector2}  p2
             * @param {int}      iteration
             */
            tree1: function(p1, p2, iteration) {
                let nextIteration = iteration - 1,
                    dX = p2.x - p1.x,
                    dY = p2.y - p1.y,
                    distance = Math.sqrt(dX * dX + dY * dY),
                    angle = Math.atan2(dY, dX),
                    length = distance * (1 - this.tree1TrunkRatio),
                    /* Get middle branch... */
                    pA = {
                        x: p1.x + dX * this.tree1TrunkRatio,
                        y: p1.y + dY * this.tree1TrunkRatio,
                    },
                    /* ...left branch */
                    pB = {
                        x: pA.x + Math.cos(angle - this.tree1BranchAngleA) * length,
                        y: pA.y + Math.sin(angle - this.tree1BranchAngleA) * length,
                    },
                    /* ...right branch */
                    pC = {
                        x: pA.x + Math.cos(angle + this.tree1BranchAngleB) * length,
                        y: pA.y + Math.sin(angle + this.tree1BranchAngleB) * length,
                    };


                /* Always draw the main branch */
                this.drawLine(p1, pA);


                /* Check number of iterations... */
                if(iteration) {

                    /* Iterate on each line segment */
                    this.tree1(pA, pB, nextIteration);
                    this.tree1(pA, pC, nextIteration);

                /* ...draw branches if end of iteration */
                } else {
                    this.drawLine(pA, pB);
                    this.drawLine(pA, pC);
                }
            },

            /**
             * Calculating a Fractal w/ a Tree pattern using squares
             * @param {Vector2}  point
             * @param {int}      size
             * @param {int}      angle
             * @param {int}      iteration
             */
            tree2: function(point, size, angle, iteration) {
                let nextIteration = iteration - 1;

                this.context.save();
                this.drawRectangle(new Vector2(point.x, point.y), size, -size, angle);


                /* Get left side values */
                let x1 = 0,
                    y1 = -size,
                    size1 = Math.abs(Math.cos(this.tree2RectAngle) * size),
                    angle1 = this.tree2RectAngle;

                if(iteration) {
                    /* Iterate on each left side's square */
                    this.tree2(new Vector2(x1, y1), size1, angle1, nextIteration);
                } else {
                    this.context.save();
                    this.drawRectangle(new Vector2(x1, y1), size1, -size1, angle1);
                    this.context.restore();
                }


                /* Get right side values */
                let x2 = x1 + Math.cos(this.tree2RectAngle) * size1,
                    y2 = y1 + Math.sin(this.tree2RectAngle) * size1,
                    size2 = Math.abs(Math.sin(this.tree2RectAngle)) * size,
                    angle2 = angle1 + (Math.PI / 2);

                if(iteration) {
                    /* Iterate on each right side's square */
                    this.tree2(new Vector2(x2, y2), size2, angle2, nextIteration);
                } else {
                    this.context.save();
                    this.drawRectangle(new Vector2(x2, y2), size2, -size2, angle2);
                    this.context.restore();
                }


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