<template>

    <div id="circle-collision">

        <canvas id="canvas"></canvas>

    </div>

</template>
<script>

    /**
     * ==================================================================================
     * Detecting circle to circle collision
     * ==================================================================================
     **/

    import { Vector2 } from '../libs/Vector2.js';
    import { Particle } from '../libs/Particle.js';
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
                mouseRadius: 0,
                mouse: null,

                circleColor: null,
                circleRadius: 0,
                circle: null,
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
                this.mouseRadius = 50;
                this.mouse = new Particle(
                                /* Position at the mouse pointer */
                                this.mouseX, this.mouseY,
                                /* Speed and direction not in use */
                                0, 0
                            );

                this.circleColor = "rgba(200, 200, 200, 0.5)";
                this.circleRadius = 100;
                this.circle = new Particle(
                                /* Position at the center of the screen */
                                this.canvasHalfWidth, this.canvasHalfHeight,
                                /* Speed and direction not in use */
                                0, 0
                            );


                this.render();
            },


            /**
             * ==================================================================================
             * @Controller
             * ==================================================================================
             **/

            /**
             * Update loop event
             */
            update: function() {
                /* Check circle collision, change color if it is */
                this.checkCircleCollision();
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


                /* Draw the circles... */
                /* ...static circle */
                this.drawCirc(
                        this.circleColor,
                        this.circle.position.x, this.circle.position.y,
                        this.circleRadius
                    );
                /* ...mouse circle */
                this.drawCirc(
                        this.mouseColor,
                        this.mouseX, this.mouseY,
                        this.mouseRadius
                    );
            },

            /**
             * Draw a circle
             */
            drawCirc: function(color, x, y, radius) {
                this.context.fillStyle = color;

                this.context.beginPath();
                this.context.arc(x, y, radius, 0, Math.PI * 2, false);
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

            /**
             * Check circle shape collision, change color on collision
             */
            checkCircleCollision: function() {

                /**
                 * Check collision by comparing IF:
                 * - The square of the sum of the radii is larger than the distance between the circles
                 * OR
                 * - The square of the distance is greater than the sum of the radii
                 */

                let dx = this.mouse.position.x - this.circle.position.x,
                    dy = this.mouse.position.y - this.circle.position.y;

                if(
                    /* Distance less than... */
                    (dx * dx) + (dy * dy) <
                    /* ...square sum of the radii */
                    (this.circleRadius + this.mouseRadius) * (this.circleRadius + this.mouseRadius)
                ) {
                    this.mouseColor = "rgba(255, 177, 177, 0.5)";
                    this.circleColor = "rgba(255, 150, 150, 0.5)";
                } else {
                    this.mouseColor = "rgba(230, 230, 230, 0.5)";
                    this.circleColor = "rgba(200, 200, 200, 0.5)";
                }
            },
        }
    };
</script>