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


                this.animateCircle();
            },


            /**
             * ==================================================================================
             * @Methods
             * ==================================================================================
             **/

            /**
             * Animate circles
             */
            animateCircle: function() {
                /* First clear all drawings */
                this.clearCanvas();

                /* Just adding in helpers and labels */
                this.drawHelpers();


                /* Check circle collision, change color if it is */
                this.checkCircleCollision();

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


                /* Repeat render function */
                requestAnimationFrame(this.animateCircle);
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
             * Check circle shape collision, change color on collision
             */
            checkCircleCollision: function() {

                /**
                 * Check collision by comparing IF:
                 * - The distance of the circles is less than the total radius
                 * of both circles
                 */
                if(this.circle.distanceTo(this.mouse) <= this.circleRadius + this.mouseRadius) {
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