<template>

    <div id="rectangle-collision">

        <canvas id="canvas"></canvas>

    </div>

</template>
<script>

    /**
     * ==================================================================================
     * Detecting rectangle to rectangle collision
     * ==================================================================================
     **/

    import { Vector2 } from '../libs/Vector2.js';
    import { Particle } from '../libs/Particle.js';
    import { Math2 } from '../libs/Math2.js';
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
                mouseColor: null,
                mouseWidth: 0, mouseHeight: 0,
                mouse: null,

                rectangleColor: null,
                rectangleWidth: 0, rectangleHeight: 0,
                rectangle: null,
            };
        },

        watch: {

            /**
             * Update `mouse` particle's `x` and `y` values on mouse position change
             */
            mouseX: function() {
                if(this.mouse && (this.mouse.position.x != this.mouseX))
                    this.mouse.position.x = this.mouseX;
            },
            mouseY: function() {
                if(this.mouse && (this.mouse.position.y != this.mouseY))
                    this.mouse.position.y = this.mouseY;
            },
        },

        mounted: function() {
            this.init();
        },

        methods: {

            init: function() {
                /* Set initial values */
                this.mouseColor = "rgba(230, 230, 230, 0.5)";
                this.mouseHeight = 75;
                this.mouseWidth = this.mouseHeight * 2;
                this.mouse = new Particle(
                                /* Position at the mouse pointer */
                                this.mouseX, this.mouseY,
                                /* Speed and direction not in use */
                                0, 0
                            );

                this.rectangleColor = "rgba(200, 200, 200, 0.5)";
                this.rectangleHeight = 100;
                this.rectangleWidth = this.rectangleHeight * 2;
                this.rectangle = new Particle(
                                /**
                                 * Position at the center of the screen, take into account that the origin
                                 * of `rect` is on the upper left side
                                 */
                                this.canvasHalfWidth - (this.rectangleWidth / 2), this.canvasHalfHeight - (this.rectangleHeight / 2),
                                /* Speed and direction not in use */
                                0, 0
                            );


                this.animateRectangle();
            },


            /**
             * ==================================================================================
             * @Methods
             * ==================================================================================
             **/

            /**
             * Animate rectangles
             */
            animateRectangle: function() {
                /* First clear all drawings */
                this.clearCanvas();

                /* Just adding in helpers and labels */
                this.drawHelpers();


                /* Check rectangle collision, change color if it is */
                this.checkRectangleCollision();

                /* Draw the rectangles... */
                /* ...static rectangle */
                this.drawRect(
                        this.rectangleColor,
                        this.rectangle.position.x, this.rectangle.position.y,
                        this.rectangleWidth, this.rectangleHeight
                    );
                /* ...mouse rectangle */
                this.drawRect(
                        this.mouseColor,
                        this.mouse.position.x, this.mouse.position.y,
                        this.mouseWidth, this.mouseHeight
                    );


                /* Repeat render function */
                requestAnimationFrame(this.animateRectangle);
            },

            /**
             * Draw a rectangle
             */
            drawRect: function(color, x, y, width, height) {
                this.context.fillStyle = color;

                this.context.beginPath();
                this.context.rect(x, y, width, height);
                this.context.fill();
            },

            /**
             * Draw helpers
             */
            drawHelpers: function() {
                this.drawGrid();
                this.drawAxis();
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

            /**
             * Check rectangle shape collision, change color on collision
             */
            checkRectangleCollision: function() {

                /**
                 * Check collision by comparing IF:
                 * - Either rect.'s `x` value is in between the other rect.'s `x` and `x` + `width` value
                 * &&
                 * - Either rect.'s `y` value is in between the other rect.'s `y` and `y` + `height` value
                 */
                if(
                    Math2.rangeIntersect(
                        this.rectangle.position.x, this.rectangle.position.x + this.rectangleWidth,
                        this.mouse.position.x, this.mouse.position.x + this.mouseWidth,
                    ) &&
                    Math2.rangeIntersect(
                        this.rectangle.position.y, this.rectangle.position.y + this.rectangleHeight,
                        this.mouse.position.y, this.mouse.position.y + this.mouseHeight,
                    )
                ) {
                    this.mouseColor = "rgba(255, 177, 177, 0.5)";
                    this.rectangleColor = "rgba(255, 150, 150, 0.5)";
                } else {
                    this.mouseColor = "rgba(230, 230, 230, 0.5)";
                    this.rectangleColor = "rgba(200, 200, 200, 0.5)";
                }
            },
        }
    };
</script>