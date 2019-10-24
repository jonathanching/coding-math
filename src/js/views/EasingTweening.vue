<template>

    <div id="easing-tweening">

        <canvas id="canvas"></canvas>

    </div>

</template>
<script>

    /**
     * ==================================================================================
     * Easing & Tweening in Animation
     * ==================================================================================
     **/

    import { Tween } from '../libs/Tween.js';
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
                margin: 0,
                duration: 0,

                balls: [],
                noOfBalls: 0,
            };
        },

        mounted: function() {
            this.init();
        },

        methods: {

            init: function() {
                /* Set initial values */
                this.radius = 5;
                this.margin = 75;
                this.duration = 3500;
                this.noOfBalls = 10;


                /* Set ball sizing and positioning */
                let ballHeight =  this.canvas.height / this.noOfBalls;

                /* Create ball objects */
                for(var i = 1; i <= this.noOfBalls; i++) {
                    /* Push in the collection all created ball object */
                    this.balls.push({
                            x: this.canvasHalfWidth / 2,
                            /* Position the balls vertically on the left side of the screen */
                            y: (ballHeight * i) - (ballHeight / 2),
                        });
                }


                this.animation();
            },


            /**
             * ==================================================================================
             * @Methods
             * ==================================================================================
             **/

            /**
             * Animating all `ball` elements
             */
            animation: function() {
                for(var i = 0; i < this.balls.length; i++) {
                    let ball = this.balls[i],
                        easeFunc = null;

                    /**
                     * Showcase all the diff. easing types
                     * See `Tween.js` `Easing` methods for complete details
                     */
                    switch(i) {
                        case 0:
                            ball.color = "red";
                            easeFunc = Tween.easeInOutQuad;
                        break;
                        case 1:
                            ball.color = "orange";
                            easeFunc = Tween.easeInOutCubic;
                        break;
                        case 2:
                            ball.color = "pink";
                            easeFunc = Tween.easeInOutQuart;
                        break;
                        case 3:
                            ball.color = "green";
                            easeFunc = Tween.easeInOutQuint;
                        break;
                        case 4:
                            ball.color = "blue";
                            easeFunc = Tween.easeInOutSine;
                        break;
                        case 5:
                            ball.color = "violet";
                            easeFunc = Tween.easeInOutExpo;
                        break;
                        case 6:
                            ball.color = "black";
                            easeFunc = Tween.easeInOutCirc;
                        break;
                        case 7:
                            ball.color = "gray";
                            easeFunc = Tween.easeInOutElastic;
                        break;
                        case 8:
                            ball.color = "brown";
                            easeFunc = Tween.easeInOutBack;
                        break;
                        case 9:
                            ball.color = "#9c27b0";
                            easeFunc = Tween.easeInOutBounce;
                        break;
                    }


                    /* Register tween on the `ball` */
                    this.animateBall(true, ball, easeFunc);
                }
            },

            /**
             * Animate ball left or right
             * @param boolean direction
             * @param obj     ball
             * @param func    easing
             */
            animateBall: function(direction, ball, easing) {
                new Tween(
                        ball,
                        /* Move to the right or left */
                        {
                            x: (direction ?
                                    this.canvas.width - this.margin :
                                    this.canvasHalfWidth / 2),
                        },
                        this.duration,
                        easing,
                        this.draw,
                        /* On complete, reverse tween */
                        () => { this.animateBall(!direction, ball, easing); }
                    );
            },

            /**
             * Draw all element on the canvas
             */
            draw: function() {
                /* First clear all drawings */
                this.clearCanvas();

                /* Just adding in helpers and labels */
                this.drawHelpers();


                /* Loop through all created ball */
                for(var i = 0; i < this.balls.length; i++) {
                    let p = this.balls[i];

                    /* Draw the ball */
                    this.drawBall(p.color, p.x, p.y);
                }
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
            },

            /**
             * Draw legend texts
             */
            drawLegend: function() {
                let x = this.canvasHalfHeight + this.margin,
                    y = 10, lineHeight = 20;

                this.context.font = "17px Open Sans";

                /* Draw the controls instructions */
                this.context.fillStyle = "#333";
                this.context.fillText("LEGEND", y, x);
                this.context.fillStyle = "red";
                this.context.fillText("Quadratic", y, x += lineHeight);
                this.context.fillStyle = "orange";
                this.context.fillText("Cubic", y, x += lineHeight);
                this.context.fillStyle = "pink";
                this.context.fillText("Quartic", y, x += lineHeight);
                this.context.fillStyle = "green";
                this.context.fillText("Quintic", y, x += lineHeight);
                this.context.fillStyle = "blue";
                this.context.fillText("Sinusoidal", y, x += lineHeight);
                this.context.fillStyle = "violet";
                this.context.fillText("Exponential", y, x += lineHeight);
                this.context.fillStyle = "black";
                this.context.fillText("Circular", y, x += lineHeight);
                this.context.fillStyle = "gray";
                this.context.fillText("Elastic", y, x += lineHeight);
                this.context.fillStyle = "brown";
                this.context.fillText("Backing", y, x += lineHeight);
                this.context.fillStyle = "#9c27b0";
                this.context.fillText("Bounce", y, x += lineHeight);
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