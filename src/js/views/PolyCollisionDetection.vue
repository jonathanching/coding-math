<template>

    <div id="polygon-collision">

        <canvas id="canvas"></canvas>

    </div>

</template>
<script>

    /**
     * ==================================================================================
     * Detecting polygon to polygon collision
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
                size: 0,
                rotationSpeed: 0,
                color: null,
                points: [],

                star1: null,
                star2: null,
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
                this.size = 100;
                this.rotationSpeed = 0.01;


                /* Create the 2 `Star` objects */
                let seperator = this.size * 0.8;
                /* Position at the left side */
                this.star1 = this.createStar(new Vector2(this.canvasHalfWidth - seperator, this.canvasHalfHeight));
                /* Position at the right side */
                this.star2 = this.createStar(new Vector2(this.canvasHalfWidth + seperator, this.canvasHalfHeight));


                this.render();
            },


            /**
             * ==================================================================================
             * @Methods
             * ==================================================================================
             **/

            /**
             * Create `Star`
             * @param {Vector2} position
             * @param {int}     angle
             */
            createStar: function(position, angle = 0) {
                let star = {
                    position: position,
                    angle: angle,
                    points: [],
                };

                /* Initialize points */
                this.updatePoints(star);

                return star;
            },


            /**
             * ==================================================================================
             * @Controller
             * ==================================================================================
             **/

            /**
             * Rotate `Star` points
             * @param {Star} star
             * @param {int}  speed
             */
            rotateStar: function(star, speed) {
                star.angle += speed;

                /* Update points */
                this.updatePoints(star);
            },

            /**
             * Update `Star` points on position vector change
             * @param {Star} star
             */
            updatePoints: function(star) {
                let sides = 5,
                    step = Math.PI / sides;

                /* Loop through the specified of number of sides */
                for(var i = 0; i < (sides * 2); i++) {
                    let rotation = (i * step),
                        /* Alternate between the outer & inner radius */
                        radius = i % 2 == 0 ? this.size / 2 : this.size,
                        /* Add in current rotation on the axis calculation */
                        x = star.position.x + Math.cos(star.angle + rotation) * (radius),
                        y = star.position.y + Math.sin(star.angle + rotation) * (radius);

                    star.points[i] = new Vector2(x, y);
                }
            },

            /**
             * Update loop event
             */
            update: function() {

                /* Update `Star` rotation */
                this.rotateStar(this.star1, this.rotationSpeed);


                /* Check polygon collision, change color if it does */
                if(this.checkPolygonCollision(this.star1.points, this.star2.points)) {
                    this.color = "#e74c3c";
                } else {
                    this.color = "333";
                }
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


                /* Draw the polygons... */
                this.drawPoly(this.color, this.star1);
                this.drawPoly("333", this.star2);
            },

            /**
             * Draw a Polygon
             * @param {string} color
             * @param {Star}   star
             */
            drawPoly: function(color, star) {
                this.context.save();
                this.context.fillStyle = color;

                this.context.beginPath();
                /* Loop through the points */
                for(var i = 0; i < star.points.length; i++) {
                    let point = star.points[i];

                    if(i == 0) {
                        this.context.moveTo(point.x, point.y);
                    } else {
                        this.context.lineTo(point.x, point.y);
                    }
                }

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

            /**
             * Check polygon shape collision, change color on collision
             * @param  {array}   points1
             * @param  {array}   points2
             * @return {Boolean}
             */
            checkPolygonCollision: function(points1, points2) {
                /* Loop through each Line segment per polygon */
                for(var i = 0; i < points1.length; i++) {
                    let p1 = points1[i],
                        p2 = points1[(i + 1) % points1.length];

                    for(var o = 0; o < points2.length; o++) {
                        let p3 = points2[o],
                            p4 = points2[(o + 1) % points2.length];

                        /* Using the Line Intersection formula check if the current lines intersect */
                        if(this.isLineIntersecting(p1, p2, p3, p4))
                            return true;
                    }
                }

                return false;
            },

            /**
             * Check if Line segment is intersecting
             * @param {int} p1
             * @param {int} p2
             * @param {int} p3
             * @param {int} p4
             * @param {Boolean}
             */
            isLineIntersecting: function(p1, p2, p3, p4) {
                return (this.isCCW(p1, p3, p4) != this.isCCW(p2, p3, p4)) &&
                       (this.isCCW(p1, p2, p3) != this.isCCW(p1, p2, p4));
            },

            /**
             * Check if direction of the change in slope between 2 edges
             * described by the 3 points specified is counterclockwise
             * @param  {Vector2} p1
             * @param  {Vector2} p2
             * @param  {Vector2} p3
             * @return {Boolean}
             */
            isCCW: function(p1, p2, p3) {
                return (p3.y - p1.y) * (p2.x - p1.x) > (p2.y - p1.y) * (p3.x - p1.x);
            },
        }
    };
</script>