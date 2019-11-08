<template>

    <div id="weighted-random">

        <canvas id="canvas"></canvas>

    </div>

</template>
<script>

    /**
     * ==================================================================================
     * Algorithm for flexible randomization
     * ==================================================================================
     **/

    import { Tween } from '../libs/Tween.js';
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
                margin: 0,
                barStack: 0,
                barWidth: 0,

                totalChance: 0,
                choices: [],
            };
        },

        mounted: function() {
            this.init();
        },

        methods: {

            init: function() {
                /* Set initial values */
                this.iteration = 1500;
                this.choices = [
                    /**
                     * Create choices
                     * Total value of `chance` doesn't need to be 1 or 100 as calculation
                     * of randomness will be base on its total
                     */
                    { color: '#1abc9c', chance: 1, total: 0 },
                    { color: '#9b59b6', chance: 7, total: 0 },
                    { color: '#3498db', chance: 3, total: 0 },
                    { color: '#2ecc71', chance: 5, total: 0 },
                    { color: '#34495e', chance: 8, total: 0 },
                ];
                this.margin = 50;
                this.barStack = 1;
                this.barWidth = (this.canvas.width - (this.margin * 2) - (this.margin * (this.choices.length - 1))) / this.choices.length;


                this.randomize();
                this.draw();
            },


            /**
             * ==================================================================================
             * @Controller
             * ==================================================================================
             **/

            /**
             * Randomize choices
             */
            randomize: function() {
                /* Get total chance value of all objects */
                for(var i = 0; i < this.choices.length; i++) {
                    this.totalChance += this.choices[i].chance;
                }

                /* Iterate by `n` times */
                for(var i = 0; i < this.iteration; i++) {
                    /* Run random increment */
                    this.incrementRandomly();
                }
            },

            /**
             * Randomly increment 1 object's total value
             */
            incrementRandomly: function() {
                /* Get random number from 1 to `totalChance` */
                let random = Math.random() * this.totalChance;

                /* Loop through the choices */
                for(var i = 0; i < this.choices.length; i++) {
                    let curr = this.choices[i];

                    /* Check if random number is less than the current chance, return if it does */
                    if(random < curr.chance)
                        return curr.total++;

                    /* Reduce the random number by the curr choice's chance value */
                    random -= curr.chance;
                }
            },


            /**
             * ==================================================================================
             * @Renderer
             * ==================================================================================
             **/

            /**
             * Draw all element on the canvas
             */
            draw: function() {
                /* First clear all drawings */
                this.clearCanvas();

                /* Just adding in helpers and labels */
                this.drawHelpers();


                for(var i = 0; i < this.choices.length; i++) {
                    let choice = this.choices[i],
                        x = i * (this.barWidth + this.margin),
                        rx = x + this.margin;

                    /* Draw bar & label of each choices */
                    this.drawBar(rx, choice.total * this.barStack, choice.color);
                    this.drawLabel(rx + (this.barWidth / 2),
                            /* Calculate percentage chance value */
                            (Math.round(choice.chance / this.totalChance * 100)) + '%'
                        );
                }
            },

            /**
             * Draw the bar
             * @param {int}    x
             * @param {int}    height
             * @param {string} color
             */
            drawBar: function(x, height, color) {
                this.context.save();

                this.context.fillStyle = color;
                this.context.fillRect(x, this.canvas.height, this.barWidth, -height);
                this.context.strokeRect(x, this.canvas.height, this.barWidth, -height);

                this.context.restore();
            },

            /**
             * Draw the label
             * @param {int}    x
             * @param {string} label
             */
            drawLabel: function(x, label) {
                let lineHeight = 20;

                this.context.save();

                this.context.font = "20px Open Sans";
                this.context.fillStyle = '#fff';
                this.context.fillText(label, x, this.canvas.height - lineHeight);

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