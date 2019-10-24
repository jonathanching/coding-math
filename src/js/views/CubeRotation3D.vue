<template>

    <div id="cube-rotation-3d">

        <canvas id="canvas"></canvas>

    </div>

</template>
<script>

    /**
     * ==================================================================================
     * Rotating a Cube in 3D
     * ==================================================================================
     **/

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
                centerZ: 0,
                rotationSpeed: 0,

                /* Focal length */
                fl: 300,

                cube: null,
            };
        },

        mounted: function() {
            this.init();
        },

        methods: {

            init: function() {
                /* Set initial values */
                this.size = 500;
                this.centerZ = 800;
                this.rotationSpeed = 0.005;


                /* Create `Cube` object */
                this.createCube();

                this.animate();
            },


            /**
             * ==================================================================================
             * @Methods
             * ==================================================================================
             **/

            /**
             * Create `Cube`
             */
            createCube() {
                /* Object will just be a collection of its points */
                this.cube = [];


                let halfSize = this.size / 2;
                /* Create points on the top part... */
                this.cube[0] = {  x: -halfSize, y:  -halfSize, z: halfSize };
                this.cube[1] = {  x: +halfSize, y:  -halfSize, z: halfSize };
                this.cube[2] = {  x: +halfSize, y:  -halfSize, z: -halfSize };
                this.cube[3] = {  x: -halfSize, y:  -halfSize, z: -halfSize };
                /* ...bottom part */
                this.cube[4] = {  x: -halfSize, y:  +halfSize, z: halfSize };
                this.cube[5] = {  x: +halfSize, y:  +halfSize, z: halfSize };
                this.cube[6] = {  x: +halfSize, y:  +halfSize, z: -halfSize };
                this.cube[7] = {  x: -halfSize, y:  +halfSize, z: -halfSize };
            },

            /**
             * Animate cube
             */
            animate() {
                /* First clear all drawings */
                this.clearCanvas();

                /* Just adding in helpers and labels */
                this.drawHelpers();


                /* Update `Cube` points when being projected in 3D */
                this.projectCube();
                /* Rotate `Cube` on different axises */
                this.rotateCube('x', this.rotationSpeed);
                this.rotateCube('y', this.rotationSpeed);
                this.rotateCube('z', this.rotationSpeed);

                /* Draw `Cube` */
                this.drawCube();


                /* Repeat render function */
                requestAnimationFrame(this.animate);
            },

            /**
             * Draw a cube
             */
            drawCube: function() {
                this.context.save();

                /* Draw top side... */
                this.drawLine(0, 1, 2, 3, 0);
                /* ...bottom side */
                this.drawLine(4, 5, 6, 7, 4);
                /* ...connect the top & bottom part */
                this.drawLine(0, 4);
                this.drawLine(1, 5);
                this.drawLine(2, 6);
                this.drawLine(3, 7);

                this.context.restore();
            },


            /**
             * Draw a line to the specified coordinates using the `Cube` points
             * @param {string} color
             */
            drawLine: function() {
                this.context.beginPath();

                /* Get first point */
                let p = this.cube[arguments[0]];
                this.context.moveTo(p.sX, p.sY);

                /* Loop through the specified points starting from the 2nd argument */
                for(var i = 1; i < arguments.length; i++) {
                    p = this.cube[arguments[i]];
                    this.context.lineTo(p.sX, p.sY);
                }


                this.context.stroke();
            },


            /**
             * ==================================================================================
             * @Controller
             * ==================================================================================
             **/

            /**
             * Update points for 3D projection
             */
            projectCube: function() {
                for(var i = 0; i < this.cube.length; i++) {
                    let point = this.cube[i],
                        /* Calculate offset */
                        xOffset = this.canvasHalfWidth,
                        yOffset = this.canvasHalfHeight,
                        /* Calculate perspective factor */
                        scale = this.fl / (this.fl + point.z + this.centerZ);

                    point.sX = xOffset + point.x * scale;
                    point.sY = yOffset + point.y * scale;
                }
            },

            /**
             * Rotate points of `Cube` on the specified axis
             * @param {string} axis
             * @param {int}    angle
             */
            rotateCube: function(axis, angle) {
                let cos = Math.cos(angle),
                    sin = Math.sin(angle);

                for(var i = 0; i < this.cube.length; i++) {
                    let point = this.cube[i],
                        x = point.x, y = point.y, z = point.z;

                        /* Update specified axis using Rotation matrix formulas on Two dimension */
                        switch (axis.toLowerCase()) {
                            case 'x':

                                y = point.y * cos - point.z * sin,
                                z = point.z * cos + point.y * sin;

                            break;
                            case 'y':

                                x = point.x * cos - point.z * sin,
                                z = point.z * cos + point.x * sin;

                            break;
                            case 'z':

                                x = point.x * cos - point.y * sin,
                                y = point.y * cos + point.x * sin;

                            break;
                        }


                    /* Update the `Cube` points */
                    point.x = x;
                    point.y = y;
                    point.z = z;
                }
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