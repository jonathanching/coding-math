<template>

    <div id="bezier-curves">
    
        <canvas id="canvas"></canvas>

    </div>

</template>
<script>

    /**
     * ==================================================================================
     * Creating Quadratic and Cubic Bezier curves
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
                offset: 0,
                radius: 0,
                t: 0,
                tIncrement: 0,

                quadPoint: 0,
                quadPStart: 0,
                quadPFinal: 0,
                quadPB1: 0,

                cubicPoint: 0,
                cubicPStart: 0,
                cubicPFinal: 0,
                cubicPB1: 0,
                cubicPB2: 0,
            };
        },

        mounted: function() {
            this.init();
        },

        methods: {

            init: function() {
                /* Set initial values */
                this.radius = 5;
                this.offset = .5;
                this.tIncrement = 0.01;


                /**
                 * Create quadratic bezier curve points
                 * 
                 */
                
                /* Starting point at the upper left corner */
                this.quadPStart = new Vector2(
                            this.canvasHalfWidth - this.canvasHalfWidth / 2, 
                            this.canvasHalfHeight - this.canvasHalfHeight / 2
                        );

                /* Moving point at the starting point coordinates */
                this.quadPoint = new Vector2(this.quadPStart.x, this.quadPStart.y);

                /* Control point at the upper middle part */
                this.quadPB1 = new Vector2(
                            this.canvasHalfWidth,
                            (this.canvasHalfHeight - this.canvasHalfHeight / 2) * this.offset
                        );

                /* Ending point at the upper right corner */
                this.quadPFinal = new Vector2(
                            this.canvasHalfWidth + this.canvasHalfWidth / 2, 
                            this.canvasHalfHeight / 2
                        );


                /**
                 * Create cubic bezier curve points
                 * 
                 */
                
                /* Starting point at the upper left corner */
                this.cubicPStart = new Vector2(
                            this.canvasHalfWidth - this.canvasHalfWidth / 2, 
                            this.canvasHalfHeight + this.canvasHalfHeight / 2
                        );

                /* Moving point at the starting point coordinates */
                this.cubicPoint = new Vector2(this.cubicPStart.x, this.cubicPStart.y);

                /* Control point at the lower left part */
                this.cubicPB1 = new Vector2(
                            this.canvasHalfWidth - (this.canvasHalfWidth / 2) * this.offset,
                            this.canvasHalfHeight + (this.canvasHalfHeight / 2) * this.offset
                        );
                /* Control point at the lower right part */
                this.cubicPB2 = new Vector2(
                            this.canvasHalfWidth + (this.canvasHalfWidth / 2) * this.offset,
                            this.canvas.height - (this.canvasHalfHeight / 2) * this.offset
                        );

                /* Ending point at the upper right corner */
                this.cubicPFinal = new Vector2(
                            this.canvasHalfWidth + this.canvasHalfWidth / 2, 
                            this.canvasHalfHeight + this.canvasHalfHeight / 2
                        );

                

                this.animateMovement();
            },


            /**
             * ==================================================================================
             * @Methods
             * ==================================================================================
             **/        

            /**
             * Animate cubic bezier movement
             */
            animateMovement: function() {
                /* First clear all drawings */
                this.clearCanvas();

                /* Just adding in helpers and labels */
                this.drawHelpers();


                /**
                 * Calculate `Quadratic bezier` curve coodinate on `t` value
                 * See `Math2.js` `quadraticBezier` method for more details
                 */
                Math2.quadraticBezier(
                        this.quadPoint, 
                        this.quadPStart, this.quadPB1, this.quadPFinal, 
                        this.t
                    );

                /* Draw point to point lines */
                this.drawLine("lightgray", this.quadPStart, this.quadPB1);
                this.drawLine("lightgray", this.quadPB1, this.quadPFinal);

                /* Draw points */
                this.drawBall("green", this.quadPStart.x, this.quadPStart.y);
                this.drawBall("blue", this.quadPFinal.x, this.quadPFinal.y);
                this.drawBall("orange", this.quadPB1.x, this.quadPB1.y);
                this.drawBall("red", this.quadPoint.x, this.quadPoint.y);


                /**
                 * Calculate `Cubic bezier` curve coodinate on `t` value
                 * See `Math2.js` `cubicBezier` method for more details
                 */
                Math2.cubicBezier(
                        this.cubicPoint,
                        this.cubicPStart, this.cubicPB1, this.cubicPB2, this.cubicPFinal,
                        this.t
                    );

                /* Draw point to point lines */
                this.drawLine("lightgray", this.cubicPStart, this.cubicPB1);
                this.drawLine("lightgray", this.cubicPB1, this.cubicPB2);
                this.drawLine("lightgray", this.cubicPB2, this.cubicPFinal);

                /* Draw points */
                this.drawBall("green", this.cubicPStart.x, this.cubicPStart.y);
                this.drawBall("blue", this.cubicPFinal.x, this.cubicPFinal.y);
                this.drawBall("orange", this.cubicPB1.x, this.cubicPB1.y);
                this.drawBall("orange", this.cubicPB2.x, this.cubicPB2.y);
                this.drawBall("red", this.cubicPoint.x, this.cubicPoint.y);


                /**
                 * Increment `t` value per frame
                 * Reverse it once it reaches 1 or 0
                 */
                this.t += this.tIncrement;
                if(this.t > 1 || this.t < 0)
                    this.tIncrement = -this.tIncrement;


                /* Repeat render function */
                requestAnimationFrame(this.animateMovement);
            },

            /**
             * Draw line
             */
            drawLine: function(color, point0, point1) {
                this.context.lineWidth = 1;
                this.context.strokeStyle = color;

                this.context.beginPath();
                this.context.moveTo(point0.x, point0.y);
                this.context.lineTo(point1.x, point1.y);
                this.context.stroke();
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
             * Draw helpers
             */
            drawHelpers: function() {
                this.drawGrid();
                this.drawAxis();
                this.drawLegend();

                this.drawQuadInterLine(this.quadPStart, this.quadPB1, this.quadPFinal);
                this.drawCubicInterLine(this.cubicPStart, this.cubicPB1, this.cubicPB2, this.cubicPFinal);
            },  

            /**
             * Draw quadratic intersection line
             */
            drawQuadInterLine: function(p0, p1, p2) {
                let x1 = Math2.lerp(this.t, p0.x, p1.x), y1 = Math2.lerp(this.t, p0.y, p1.y),
                    x2 = Math2.lerp(this.t, p1.x, p2.x), y2 = Math2.lerp(this.t, p1.y, p2.y);

                this.drawBall("rgba(255, 150, 150, 0.5)", x1, y1);
                this.drawBall("rgba(255, 150, 150, 0.5)", x2, y2);
                this.drawLine("rgba(255, 150, 150, 0.5)", new Vector2(x1, y1), new Vector2(x2, y2));
            },                        

            /**
             * Draw cubic intersection line
             */
            drawCubicInterLine: function(p0, p1, p2, p3) {
                let x1 = Math2.lerp(this.t, p0.x, p1.x), y1 = Math2.lerp(this.t, p0.y, p1.y),
                    x2 = Math2.lerp(this.t, p1.x, p2.x), y2 = Math2.lerp(this.t, p1.y, p2.y),
                    x3 = Math2.lerp(this.t, p2.x, p3.x), y3 = Math2.lerp(this.t, p2.y, p3.y);

                this.drawQuadInterLine(new Vector2(x1, y1), new Vector2(x2, y2), new Vector2(x3, y3));

                this.drawBall("rgba(255, 150, 150, 0.5)", x1, y1);
                this.drawBall("rgba(255, 150, 150, 0.5)", x2, y2);
                this.drawBall("rgba(255, 150, 150, 0.5)", x3, y3);
                this.drawLine("rgba(255, 150, 150, 0.5)", new Vector2(x1, y1), new Vector2(x2, y2));
                this.drawLine("rgba(255, 150, 150, 0.5)", new Vector2(x2, y2), new Vector2(x3, y3));
            },

            /**
             * Draw legend texts
             */
            drawLegend: function() {
                let x = this.canvasHalfHeight + (this.canvasHalfHeight * .5),
                    y = 10, lineHeight = 15;

                this.context.font = "15px Open Sans";

                /* Draw the label per trig function */
                this.context.fillStyle = "#333";
                this.context.fillText("LEGEND", y, x);
                this.context.fillStyle = "black";
                this.context.fillText("Top : Quadratic", y, x += lineHeight);                
                this.context.fillStyle = "black";
                this.context.fillText("Bot : Cubic", y, x += lineHeight);
                x += lineHeight;
                this.context.fillStyle = "green";
                this.context.fillText("Starting points", y, x += lineHeight);
                this.context.fillStyle = "orange";
                this.context.fillText("Control points", y, x += lineHeight);
                this.context.fillStyle = "blue";
                this.context.fillText("Final points", y, x += lineHeight);
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