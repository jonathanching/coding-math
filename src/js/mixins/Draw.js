/**
 * ==================================================================================
 * Canvas helper methods
 *
 * ==================================================================================
 **/

export default {

    data: function() {
        return {
            canvas: null,
            context: null,
        };
    },

    computed: {
        canvasHalfHeight: function() {
            return this.canvas.height / 2;
        },

        canvasHalfWidth: function() {
            return this.canvas.width / 2;
        },
    },

    mounted: function() {
        this.canvas = this.getCanvas();
        this.context = this.getCanvasContext();

        this.handleDrawErrors();
    },

    methods: {

        /**
         * ==================================================================================
         * @Methods
         * ==================================================================================
         **/

        /**
         * Clear whole canvas
         */
        clearCanvas: function() {
            this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
        },


        /**
         * Draw grid & axis helpers
         */
        drawHelpers: function() {
            this.drawGrid();
            this.drawAxis();
        },

        /**
         * Draw grid on canvas
         * @param integer spacing
         */
        drawGrid: function(color = "#f7f7f7", spacing = 20) {
            this.context.save();

            this.context.translate(0, 0);
            this.context.strokeStyle = color;
            this.context.lineWidth = 2;

            this.context.beginPath();
            /* Draw horizontal lines */
            for(var x = 0; x < this.canvas.width; x += spacing) {
                this.context.moveTo(x, 0);
                this.context.lineTo(x, this.canvas.height);
            }

            /* Draw vertical lines */
            for(var y = 0; y <= this.canvas.height; y += spacing) {
                this.context.moveTo(0, y);
                this.context.lineTo(this.canvas.width, y);
            }
            this.context.stroke();

            this.context.restore();
        },

        /**
         * Draw axis on canvas
         */
        drawAxis: function(color = "#dedede") {
            let thick = 2.5, hThick = thick / 2,
                left = this.canvas.width * -1, right = this.canvas.width, center = this.canvasHalfWidth,
                middle = this.canvasHalfHeight, bottom = this.canvas.height;

            this.context.save();

            this.context.translate(0, 0);
            this.context.strokeStyle = color;
            this.context.lineWidth = thick;

            this.context.beginPath();
            /* Draw horizontal */
            this.context.moveTo(left, middle - hThick);
            this.context.lineTo(right, middle - hThick);

            /* Draw vertical */
            this.context.moveTo(center - hThick, 0);
            this.context.lineTo(center - hThick, bottom);
            this.context.stroke();

            this.context.restore();
        },


        /**
         * ==================================================================================
         * @Getter/Setter
         * ==================================================================================
         **/

        /**
         * Get canvas element
         * @param  string id
         * @return Canvas
         */
        getCanvas: function(id = "canvas") {
            let canvas = document.getElementById(id);

            /* Set proper size */
            if(canvas)
                canvas.width = window.innerWidth;
                canvas.height = window.innerHeight;

            return canvas;
        },

        /**
         * Get canvas context object
         * @return Context
         */
        getCanvasContext: function() {
            if(this.canvas)
                return this.canvas.getContext('2d');

            return null;
        },


        /**
         * ==================================================================================
         * @Checker
         * ==================================================================================
         **/

        /**
         * Check for missing elements & errors
         */
        handleDrawErrors: function() {
            if(!this.canvas)
                console.warn('[VUE Warn] Draw.js : `Canvas` element not found.');
        },
    }
};