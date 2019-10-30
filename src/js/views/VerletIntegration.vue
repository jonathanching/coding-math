<template>

    <div id="verlet-integration">

        <canvas id="canvas"></canvas>

    </div>

</template>
<script>

    /**
     * ==================================================================================
     * Simulating a pendulum w/ Verlet Integration
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
                gravity: 0,
                friction: 0,
                bounce: 0,
                stiffness: 0,
                radius: 0,

                ropeMass: 0,
                bobMass: 0,
                size: 0,
                parts: 0,

                pendulum: null,
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
                this.iteration = 5;
                this.gravity = 0.5;
                this.bounce = 0.9;
                this.friction = 0.999;
                this.stiffness = 4;
                this.radius = 2;

                this.ropeMass = 1;
                this.bobMass = 1;
                this.size = this.canvasHalfHeight;
                this.parts = 10;


                /* Create `Pendulum` object */
                this.pendulum = this.createPendulum(
                                    /* Position almost at the top of the screen */
                                    this.canvasHalfWidth, this.canvasHalfHeight / 3,
                                    this.size, this.parts
                                );


                this.render();
            },


            /**
             * ==================================================================================
             * @Methods
             * ==================================================================================
             **/

            /**
             * Create `Pendulum` from given position
             * @param {int}  x
             * @param {int}  y
             * @param {int}  size
             * @param {int}  n
             */
            createPendulum: function(x, y, size, n) {
                /* Get incrementing length */
                let length = Math.round(size / n),
                    /* Just a collection of points & sticks */
                    pendulum = {
                        points: [],
                        sticks: [],
                    };


                /* Create `n` number of points */
                for(var i = 0; i < n; i++) {
                    /* Fix in place the first point */
                    let fixed = i === 0 ? true : false;

                    pendulum.points.push(this.createPoint(x, y, fixed, this.radius, this.ropeMass, false));

                    /* Add length for next point */
                    y += length;
                }

                /* Create the bob at the end of the points */
                let bobLength = y + length
                pendulum.points.push(this.createPoint(x, bobLength, false, length, this.bobMass, true));


                /* Create pairing of points */
                for(var i = 0; i < pendulum.points.length; i++) {
                    let curr = pendulum.points[i],
                        next = pendulum.points[i + 1];

                    /* Proceed only if there is still a pair */
                    if(curr && next) {
                        pendulum.sticks.push({
                            start: curr, end: next,
                            length: Math2.distance(curr, next),
                            stiffness: this.stiffness
                        });
                    }
                }


                return pendulum;
            },

            /**
             * Create point
             * @param  {object}   point
             * @param  {boolean}  fixed
             * @param  {int}      radius
             * @param  {int}      mass
             * @param  {boolean}  fill
             * @return {Object}
             */
            createPoint: function(x, y, fixed, radius, mass, fill) {
                return {
                    x: x,
                    y: y,
                    oldX: x,
                    oldY: y,
                    fixed: fixed,
                    radius: radius,
                    mass: mass,
                    fill: fill
                };
            },


            /**
             * ==================================================================================
             * @Controller
             * ==================================================================================
             **/

            /**
             * Update the points on the `Pendulum`
             */
            updatePoints: function() {
                for(var i = 0; i < this.pendulum.points.length; i++) {
                    let point = this.pendulum.points[i];

                    /* Only update points that are not fixed */
                    if(!point.fixed) {
                        /* Calculate velocity by subtracting the old position to the new position and adding in the friction */
                        let dX = (point.x - point.oldX) * this.friction,
                            dY = (point.y - point.oldY) * this.friction;

                        /* Set the current position as the old position */
                        point.oldX = point.x;
                        point.oldY = point.y;
                        /* Set the new position as the current position */
                        point.x += dX;
                        point.y += dY;
                        /* Apply gravity */
                        point.y += this.gravity * point.mass;
                    }
                }
            },

            /**
             * Constrain the points on the `Pendulum`
             */
            constrainPoints: function() {
                for(var i = 0; i < this.pendulum.points.length; i++) {
                    let point = this.pendulum.points[i];

                    /* Only update points that are not fixed */
                    if(!point.fixed) {
                        /* Get the future coordinates */
                        let dX = (point.x - point.oldX) * this.friction,
                            dY = (point.y - point.oldY) * this.friction;

                        /* Check if out of bounds, if so update the curr & old axis and add the bounce velocity */
                        /* Right side... */
                        if(point.x > this.canvas.width) {
                            point.x = this.canvas.width;
                            point.oldX = point.x + dX * this.bounce;
                        /* ...left side */
                        } else if(point.x < 0) {
                            point.x = 0;
                            point.oldX = point.x + dX * this.bounce;
                        }

                        /* ...bottom */
                        if(point.y > this.canvas.height) {
                            point.y = this.canvas.height;
                            point.oldY = point.y + dY * this.bounce;
                        /* ...top */
                        } else if(point.y < 0) {
                            point.y = 0;
                            point.oldY = point.y + dY * this.bounce;
                        }
                    }
                }
            },

            /**
             * Update the sticks on the `Pendulum`
             */
            updateSticks: function() {
                for(var i = 0; i < this.pendulum.sticks.length; i++) {
                    let stick = this.pendulum.sticks[i];


                    /* Get current length of stick */
                    let dX = stick.end.x - stick.start.x,
                        dY = stick.end.y - stick.start.y,
                        distance = Math.sqrt(dX * dX + dY * dY),
                        /* Get difference of current length to correct length */
                        difference = stick.length - distance,
                        /* Get offset value to correct the specified length */
                        percent = difference / distance / 2,
                        offsetX = dX * percent,
                        offsetY = dY * percent;

                    /* Subtract the offset to the start if its not fixed */
                    if(!stick.start.fixed) {
                        stick.start.x -= offsetX;
                        stick.start.y -= offsetY;
                    }

                    /* Subtract the offset to the end if its not fixed */
                    if(!stick.end.fixed) {
                        stick.end.x += offsetX;
                        stick.end.y += offsetY;
                    }
                }
            },

            /**
             * Update the bob's velocity
             */
            updateBob: function() {
                let sticky = this.pendulum.points[this.pendulum.points.length - 1],
                    range = Math2.randomRange(-Math.PI / 3, Math.PI / 3),
                    minimum = 0.25;

                /* If either the next `x` or `y` is less than the specified minimum */
                if(
                    Math.abs(sticky.x - sticky.oldX) <= minimum &&
                    Math.abs(sticky.y - sticky.oldY) <= minimum
                ) {
                    /* Add a randomize force to the bob */
                    let dX = sticky.x + Math.cos(range) * 50,
                        dY = sticky.y + Math.sin(range) * 50;

                    sticky.x = dX;
                    sticky.y = dY;
                }
            },

            /**
             * Update loop event
             */
            update: function() {
                /* Push the bob when its less than a certain velocity */
                this.updateBob();

                /* Update the `Pendulum` points & sticks */
                this.updatePoints();
                for(var i = 0; i < this.iteration; i++) {
                    this.updateSticks();
                    this.constrainPoints();
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


                /* Draw the `Pendulum` */
                this.drawPendulum();
            },


            /**
             * Draw the `Pendulum`
             */
            drawPendulum: function() {
                /* Loop through the points */
                for(var i = 0; i < this.pendulum.points.length; i++) {
                    let point = this.pendulum.points[i];

                    this.drawCircle(point);
                }

                /* Loop through the sticks */
                for(var i = 0; i < this.pendulum.sticks.length; i++) {
                    let stick = this.pendulum.sticks[i];

                    this.drawLine(stick.start, stick.end);
                }
            },


            /**
             * Draw a circle
             * @param {Object} point
             */
            drawCircle: function(point) {
                this.context.save();

                this.context.beginPath();
                this.context.arc(point.x, point.y, point.radius, 0, Math.PI * 2);

                if(point.fill) {
                    this.context.fill();
                } else {
                    this.context.stroke();
                }

                this.context.restore();
            },

            /**
             * Draw a line
             * @param {Object} p1
             * @param {Object} p2
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