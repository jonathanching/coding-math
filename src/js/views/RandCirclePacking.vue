<template>

    <div id="circle-packing">

        <canvas id="canvas"></canvas>

    </div>

</template>
<script>

    /**
     * ==================================================================================
     * Packing circles on a given space
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
                boxX: 0,
                boxY: 0,
                boxWidth: 0,
                boxHeight: 0,

                minRadius: 7,
                maxRadius: 40,

                circleSpacing: 0,
                circles: [],
            };
        },

        mounted: function() {
            this.init();
        },

        methods: {

            init: function() {
                /* Set initial values */
                this.boxWidth = this.canvas.width * 0.7;
                this.boxHeight = this.canvas.height * 0.5;
                this.boxX = this.canvasHalfWidth - (this.boxWidth / 2);
                this.boxY = this.canvasHalfHeight - (this.boxHeight / 2);

                this.circleSpacing = 5;



                /* Just adding in helpers and labels */
                this.drawHelpers();
                /* Draw the boundery box */
                this.drawRect(this.boxX, this.boxY, this.boxWidth, this.boxHeight);


                this.render();
            },


            /**
             * ==================================================================================
             * @Methods
             * ==================================================================================
             **/

            /**
             * Create `Circle` object
             * @param  {Vector2} position
             * @return {Circle}
             */
            createCircle: function(position = null) {
                let pos = position || this.getRandomPosition();
                return {
                    x: pos.x,
                    y: pos.y,
                    radius: this.minRadius
                };
            },


            /**
             * ==================================================================================
             * @Controller
             * ==================================================================================
             **/

            /**
             * Spawn `Circle` objects
             */
            updateCircles: function() {
                /* Create new `Circle` w/ randomize position */
                let circle = this.createCircle(),
                    counter = 0;

                /* Check for collision w/ other `Circles` */
                while(!this.isValid(circle)) {
                    /* Generate a new position & update if it does */
                    let newPos = this.getRandomPosition();

                    circle.x = newPos.x;
                    circle.y = newPos.y;


                    /* Add in counter to stop the loop when space is full */
                    counter++;
                    if(counter > 10000) {
                        this.stop = true;
                        return;
                    }
                }


                /* Check for maximum size possible */
                while(this.isValid(circle)) {
                    circle.radius++;
                }

                /* Lessen the radius a bit to show some space between the `Circles` */
                circle.radius -= this.circleSpacing;


                /* Add to collection */
                this.circles.push(circle);
            },


            /**
             * Update loop event
             */
            update: function() {
                /* Add in new `Circle` until there are space */
                if(!this.stop)
                    this.updateCircles();
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
                /* Draw all the `Circle` objects */
                for(var i = 0; i < this.circles.length; i++) {
                    let c = this.circles[i];

                    this.drawCirc(c.x, c.y, c.radius);
                }
            },

            /**
             * Draw a rectangle
             * @param {int} x
             * @param {int} y
             * @param {int} width
             * @param {int} height
             */
            drawRect: function(x, y, width, height) {
                this.context.strokeStyle = '#333';
                this.context.lineWidth = 5;
                this.context.strokeRect(x, y, width, height);
            },

            /**
             * Draw a circle
             * @param {int} x
             * @param {int} y
             * @param {int} radius
             */
            drawCirc: function(x, y, radius) {
                this.context.fillStyle = '#333';

                this.context.beginPath();
                this.context.arc(x, y, radius, 0, Math.PI * 2);
                this.context.fill();
            },


            /**
             * ==================================================================================
             * @Getter/Setter
             * ==================================================================================
             **/

            /**
             * Get random position w/n the bounding box
             * @return {Object}
             */
            getRandomPosition: function() {
                return {
                    x: Math2.randomRange(this.boxX, this.boxX + this.boxWidth),
                    y: Math2.randomRange(this.boxY, this.boxY + this.boxHeight)
                };
            },


            /**
             * ==================================================================================
             * @Checker
             * ==================================================================================
             **/

            /**
             * Check if `Circle` location is valud
             * @param  {Circle}  c1
             * @return {Boolean}
             */
            isValid: function(c1) {
                /* Check for radius size */
                if(c1.radius > this.maxRadius)
                    return false;

                /* Check for collision */
                for(var i = 0; i < this.circles.length; i++) {
                    let c2 = this.circles[i];
                    if(this.checkCircleCollision(c1, c2)) {
                        return false
                    }
                }

                return true;
            },

            /**
             * Check circle shape collision
             * @param {Circle} c1
             * @param {Circle} c2
             */
            checkCircleCollision: function(c1, c2) {

                /**
                 * Check collision by comparing IF:
                 * - The square of the sum of the radii is larger than the distance between the circles
                 * OR
                 * - The square of the distance is greater than the sum of the radii
                 */

                let dx = c1.x - c2.x,
                    dy = c1.y - c2.y;

                if(
                    /* Distance less than... */
                    (dx * dx) + (dy * dy) <
                    /* ...square sum of the radii */
                    (c1.radius + c2.radius) * (c1.radius + c2.radius)
                ) {
                    return true;
                } else {
                    return false;
                }
            },
        }
    };
</script>