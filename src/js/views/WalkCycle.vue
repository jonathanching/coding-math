<template>

    <div id="walk-cycle ">

        <canvas id="canvas"></canvas>

    </div>

</template>
<script>

    /**
     * ==================================================================================
     * Simulating a walk cycle w/ Kinematics
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
                leg2Angle: 0,
                leg1Angle: 0,
                length: 0,
                speed: 0,

                leg1: null,
                leg2: null,
            };
        },

        mounted: function() {
            this.init();
        },

        methods: {

            init: function() {
                /* Set initial values */
                this.leg1Angle = 0;
                this.leg2Angle = Math.PI;
                this.length = this.canvasHalfHeight / 2;
                this.speed = 0.05;


                /* Create `FKSystem` object */
                this.leg1 = this.createLeg();
                this.leg2 = this.createLeg();


                this.render();
            },


            /**
             * ==================================================================================
             * @Methods
             * ==================================================================================
             **/

            /**
             * Create leg w/ the `FKSystem` object
             */
            createLeg: function() {
                /* Position at the top center */
                let leg = new FKSystem(this.canvasHalfWidth, this.canvasHalfHeight / 2);

                /* Create upper leg... */
                leg.addArm(this.length, Math.PI / 2, Math.PI / 4);
                /* ...lower leg */
                leg.addArm(this.length - 20, Math.PI / 4, Math.PI / 4, -1.5);


                return leg;
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

                /* Update each leg segment's angle to animate walking */
                this.leg1.updateAngle(this.leg1Angle);
                this.leg2.updateAngle(this.leg2Angle);

                this.leg1Angle += this.speed;
                this.leg2Angle += this.speed;


                /* Update the `FKSystem` segments */
                this.leg1.update();
                this.leg2.update();
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

                /* Draw the `FKSystem` segments */
                this.leg1.draw(this.context);
                this.leg2.draw(this.context);
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