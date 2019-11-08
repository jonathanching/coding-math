<template>

    <div id="forward-kinematics">

        <canvas id="canvas"></canvas>

    </div>

</template>
<script>

    /**
     * ==================================================================================
     * Simulating Forward Kinematics
     * ==================================================================================
     **/

    import { Vector2 } from '../libs/Vector2.js';
    import { Particle } from '../libs/Particle.js';
    import Draw from '../mixins/Draw.js';

    import { FKSystem } from '../elements/Kinematics/FKSystem.js';


    export default {
        props: {
            //
        },

        mixins: [
            Draw,
        ],

        data: function() {
            return {
                angle: 0,
                length: 0,

                arm: null,
            };
        },

        mounted: function() {
            this.init();
        },

        methods: {

            init: function() {
                /* Set initial values */
                this.angle = 0;
                this.length = this.canvasHalfHeight / 6;


                /* Create `Arm` objects */
                this.arm = this.createArms();


                this.render();
            },


            /**
             * ==================================================================================
             * @Methods
             * ==================================================================================
             **/

            /**
             * Create multiple `Arms` from given position
             */
            createArms: function() {
                /* Create `FKSystem` first... */
                let arm = new FKSystem(this.canvasHalfWidth, this.canvasHalfHeight);

                /**
                 * Create arms, by default the initial arm values are:
                 * - Length is specified on the `addArm` method
                 * - Angle or center angle is 0
                 * - Rotation range is a full circle (Math.PI * 2)
                 * - Angle offset is 0
                 */

                arm.addArm(this.length);
                arm.addArm(this.length);
                arm.addArm(this.length);


                return arm;
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
                /* Rotate the `Arms` by incrementing random values on its angles */
                this.arm.rotateArm(1, Math.cos(this.angle) * 2.358);
                this.arm.rotateArm(2, Math.sin(this.angle * .581 + 2) * 2.82);
                this.arm.rotateArm(3, Math.cos(this.angle * 1.24 - 0.4) * 2.41);

                this.angle += 0.05;


                /* Update all `Arm` objects' axis */
                this.arm.update();
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


                this.context.lineWidth = 5;

                /* Draw all `Arm` objects */
                this.arm.draw(this.context);
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