<template>

    <div id="ifs-fractals">

        <pre id="counter">{{ count }}<br>Iterations</pre>
        <canvas id="canvas"></canvas>

    </div>

</template>
<script>

    /**
     * ==================================================================================
     * Drawing IFS Fractals
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
                count: 0,
                iteration: 0,
                maxIteration: 0,
                size: 0,

                fernScale: 0,
                treeScale: 0,

                fernRule: [],
                treeRule: [],
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
                this.iteration = 500;
                this.maxIteration = 500000;
                this.size = 0.5;
                this.fernScale = this.canvas.height * .07;
                this.treeScale = this.canvas.height * .35;


                /* Setup matrix rules */
                this.setupFernRule();
                this.setupTreeRule();



                /* Just adding in helpers and labels */
                this.drawHelpers();

                this.render();
            },


            /**
             * ==================================================================================
             * @Methods
             * ==================================================================================
             **/

            /**
             * Create the Barnsley Fern's matrix rule
             */
            setupFernRule: function() {
                this.fernRule = [{
                    a: 0.85,
                    b: 0.04,
                    c: -0.04,
                    d: 0.85,
                    tx: 0,
                    ty: 1.6,
                    weight: 0.65,
                    color: 'red'
                }, {
                    a: -0.15,
                    b: 0.28,
                    c: 0.26,
                    d: 0.24,
                    tx: 0,
                    ty: 0.44,
                    weight: 0.07,
                    color: 'green'
                }, {
                    a: 0.2,
                    b: -0.26,
                    c: 0.23,
                    d: 0.22,
                    tx: 0,
                    ty: 1.6,
                    weight: 0.07,
                    color: 'blue'
                }, {
                    a: 0,
                    b: 0,
                    c: 0,
                    d: 0.16,
                    tx: 0,
                    ty: 0,
                    weight: 0.21,
                    color: 'yellow'
                }];
            },


            /**
             * Create the Fractal Tree's matrix rule
             */
            setupTreeRule: function() {
                this.treeRule = [{
                    a: 0.05,
                    b: 0,
                    c: 0,
                    d: 0.6,
                    tx: 0,
                    ty: 0,
                    weight: 0.17,
                    color: ''
                }, {
                    a: 0.05,
                    b: 0,
                    c: 0,
                    d: -0.5,
                    tx: 0,
                    ty: 1,
                    weight: 0.17,
                    color: ''
                }, {
                    a: 0.46,
                    b: -0.321,
                    c: 0.386,
                    d: 0.383,
                    tx: 0,
                    ty: 0.6,
                    weight: 0.17,
                    color: ''
                }, {
                    a: 0.47,
                    b: -0.154,
                    c: 0.171,
                    d: 0.423,
                    tx: 0,
                    ty: 1.1,
                    weight: 0.17,
                    color: ''
                }, {
                    a: 0.433,
                    b: 0.275,
                    c: -0.25,
                    d: 0.476,
                    tx: 0,
                    ty: 1,
                    weight: 0.16,
                    color: ''
                }, {
                    a: 0.421,
                    b: 0.257,
                    c: -0.353,
                    d: 0.306,
                    tx: 0,
                    ty: 0.7,
                    weight: 0.16,
                    color: ''
                }];
            },

            /**
             * ==================================================================================
             * @Controller
             * ==================================================================================
             **/

            /**
             * Draw a IFS Fractal that forming a Fern using Barnsley Fern's matrix formula
             */
            fern: function() {
                this.context.save();

                /* Position at the left side */
                this.context.translate(this.canvasHalfWidth / 2, this.canvasHalfHeight + this.canvasHalfHeight / 2);

                /* Run IFS */
                this.iterate(this.fernRule, this.fernScale);

                this.context.restore();
            },

            /**
             * Draw a IFS Fractal that forming a Tree
             */
            tree: function() {
                this.context.save();

                /* Position at the right side */
                this.context.translate(this.canvasHalfWidth + (this.canvasHalfWidth / 2), this.canvasHalfHeight + this.canvasHalfHeight / 2);

                /* Run IFS */
                this.iterate(this.treeRule, this.treeScale);

                this.context.restore();
            },


            /**
             * Run the specified matrix rule
             * @param  {array} rules
             * @param  {int}   scale
             */
            iterate: function(rules, scale) {
                /* Set `x` & `y` initial value to random */
                let x = Math.random(),
                    y = Math.random();

                for(var i = 0; i < this.iteration; i++) {
                    /* Get randomize rule */
                    let rule = this.getRule(rules),
                        /**
                         * Calculate next point using the 2D transformation matrix
                         * using the specified rule
                         */
                        x1 = x * rule.a + y * rule.b + rule.tx,
                        y1 = x * rule.c + y * rule.d + rule.ty;

                    /* Assign the next coordinate */
                    x = x1;
                    y = y1;

                    /* Draw point from new axis */
                    this.drawSquare(x, y, scale, rule.color);
                }
            },


            /**
             * Update loop event
             */
            update: function() {
                //
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
                /* Stop drawing after `n` loops */
                if((this.count + this.iteration) > this.maxIteration) return;


                this.fern();
                this.tree();

                this.count += this.iteration;
            },

            /**
             * Draw a square
             * @param {int}     x
             * @param {int}     y
             * @param {int}     scale
             * @param {string}  color
             */
            drawSquare: function(x, y, scale, color) {
                this.context.save();

                this.context.fillStyle = 'black';//color;
                this.context.fillRect(x * scale, -y * scale, this.size, this.size);

                this.context.restore();
            },


            /**
             * ==================================================================================
             * @Getter/Setter
             * ==================================================================================
             **/

            /**
             * Get random rule
             * @param  {array}  rules
             * @return {Object}
             */
            getRule: function(rules) {
                let random = Math.random();

                /* Loop through the rules */
                for(var i = 0; i < rules.length; i++) {
                    let rule = rules[i];

                    /* Check if random number is less than the current chance, return if it does */
                    if(random < rule.weight)
                        return rule;

                    /* Reduce the random number by the curr choice's chance value */
                    random -= rule.weight;
                }
            },


            /**
             * ==================================================================================
             * @Checker
             * ==================================================================================
             **/

            //
        }
    };
</script>