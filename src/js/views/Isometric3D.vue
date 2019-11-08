<template>

    <div id="isometric-3d">

        <canvas id="canvas"></canvas>

    </div>

</template>
<script>

    /**
     * ==================================================================================
     * Plotting a 3D map using Isometric Projection
     * ==================================================================================
     **/

    import { Vector2 } from '../libs/Vector2.js';
    import { Math2 } from '../libs/Math2.js';
    import { Utils } from '../libs/Utils.js';
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
                origin: null,
                tileSize: 0,
                tileWidth: 0,
                tileHeight: 0,

                count: 0,
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
                this.area = 0;
                this.tileSize = 25;
                /* Set the ratio for the tile to `2 to 1` */
                this.tileWidth = Math2.percentOf(this.canvas.width, 65) / this.tileSize;
                this.tileHeight = this.tileWidth / 2;
                /* Set origin on the top center of the screen */
                this.origin = new Vector2(this.canvasHalfWidth, this.canvasHalfHeight / 2);



                /* Set origin before drawing anything */
                this.context.translate(this.origin.x, this.origin.y);


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
                this.clearCanvas(new Vector2(-this.origin.x, -this.origin.y));

                /* Just adding in helpers and labels */
                this.drawHelpers(this.origin);


                this.area += 0.01;
                /* Create `n` number of tiles */
                for(var x = 0; x < this.tileSize; x++) {
                    for(var y = 0; y < this.tileSize; y++) {
                        let tileHalfSize = this.tileSize / 2,
                            /* Get distance of tile from the center */
                            dX = tileHalfSize - x,
                            dY = tileHalfSize - y,
                            dist = Math.sqrt(dX * dX + dY * dY),
                            /* Animate the `z` value base on the distance on the center & the inc. value */
                            z = Math.sin(dist * Math.sin(this.area)) * 2 + 2;

                        this.drawBlock(x, y, z);
                    }
                }
            },

            /**
             * Draw a map tile
             * @param {int}  x
             * @param {int}  y
             * @param {int}  z
             */
            drawBlock: function(x, y, z) {
                this.context.save();

                /* Change origin to top corner of the tile */
                this.context.translate((x - y) * (this.tileWidth / 2), (x + y) * (this.tileHeight / 2));

                /* Calculate `z` offset */
                let zOffset = -z * this.tileHeight,
                    /* Assign block side colors */
                    topColor = '#f1f2f6',
                    leftColor = '#ced6e0',
                    rightColor = '#dfe4ea';


                /* Draw the top side... */
                this.drawPolygon([
                        /* Top corner */
                        new Vector2(0, 0),
                        /* Right corner */
                        new Vector2(this.tileWidth / 2, this.tileHeight / 2),
                        /* Bottom corner */
                        new Vector2(0, this.tileHeight),
                        /* Left corner */
                        new Vector2(-this.tileWidth / 2, this.tileHeight / 2),
                    ], topColor,
                        /* Apply `z` offset on the `y` axis to all points */
                        0, zOffset,
                    );
                /* ...left side, only put the `z` offset on the top side */
                this.drawPolygon([
                        /* Top corner */
                        new Vector2(-this.tileWidth / 2, this.tileHeight / 2 + zOffset),
                        /* Right corner */
                        new Vector2(0, this.tileHeight + zOffset),
                        /* Bottom corner */
                        new Vector2(0, this.tileHeight),
                        /* Left corner */
                        new Vector2(-this.tileWidth / 2, this.tileHeight / 2),
                    ], leftColor);
                /* ...right side, only put the `z` offset on the top side  */
                this.drawPolygon([
                        /* Top corner */
                        new Vector2(this.tileWidth / 2, this.tileHeight / 2 + zOffset),
                        /* Right corner */
                        new Vector2(0, this.tileHeight + zOffset),
                        /* Bottom corner */
                        new Vector2(0, this.tileHeight),
                        /* Left corner */
                        new Vector2(this.tileWidth / 2, this.tileHeight / 2),
                    ], rightColor);

                this.context.restore();
            },


            /**
             * Draw a polygon
             * @param {array}  arr
             * @param {string} color
             * @param {int}    xOffset
             * @param {int}    yOffset
             */
            drawPolygon: function(arr, color = "black", xOffset = 0, yOffset = 0) {
                this.context.beginPath();
                this.context.fillStyle = color;
                for(var i = 0; i < arr.length; i++) {
                    let point = arr[i],
                        x = point.x + xOffset,
                        y = point.y + yOffset;

                    if(i === 0) {
                        this.context.moveTo(x, y);
                    } else {
                        this.context.lineTo(x, y);
                    }
                }
                this.context.fill();
            },


            /**
             * ==================================================================================
             * @Controller
             * ==================================================================================
             **/

            //


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