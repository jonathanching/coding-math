<template>

    <div id="reach-inverse-kinematics">

        <canvas id="canvas"></canvas>

    </div>

</template>
<script>

    /**
     * ==================================================================================
     * Simulate Reaching w/ Inverse Kinematics
     * ==================================================================================
     **/

    import { Vector2 } from '../libs/Vector2.js';
    import { Particle } from '../libs/Particle.js';
    import Draw from '../mixins/Draw.js';
    import TrackMouse from '../mixins/TrackMouse.js';

    import { IKSystem } from '../elements/Kinematics/IKSystem.js';


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
                this.length = this.canvasHalfHeight / 4;


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
                /* Create `IKSystem` first... */
                let arm = new IKSystem(this.canvasHalfWidth, this.canvasHalfHeight);


                /**
                 * Create arms, by default the initial arm values are:
                 * - Length is specified on the `addArm` method
                 * - Angle or center angle is 0
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

                this.angle += 0.05;

                /**
                 * Reach the last arm on the current mouse coordinate.
                 * This will set the `Arm's` angle and current `x` & `y` to the specified coordinate
                 */
                this.arm.reach(
                        this.mouseX,
                        this.mouseY
                    );



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