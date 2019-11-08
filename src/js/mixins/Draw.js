/**
 * ==================================================================================
 * Canvas helper methods
 *
 * ==================================================================================
 **/

import { Vector2 } from '../libs/Vector2.js';

export default {

    data: function() {
        return {
            fps: 0,
            interval: 0,
            lastTime: 0,
            currentTime: 0,
            delta: 0,

            canvas: null,
            context: null,

            stop: false,
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
        this.__init();

        this.__handleDrawErrors();
    },

    methods: {

        /**
         * ==================================================================================
         * @Methods
         * ==================================================================================
         **/

        /**
         * Initial setup
         */
        __init: function() {
            this.fps = 60;
            this.interval = 1000 / this.fps;
            this.lastTime = (new Date()).getTime();
            this.currentTime = 0;
            this.delta = 0;

            this.canvas = this.getCanvas();
            this.context = this.getCanvasContext();
        },


        /**
         * ==================================================================================
         * @Controller
         * ==================================================================================
         **/

        /**
         * Canvas loop event
         */
        render: function() {
            /* Update timers */
            this.currentTime = (new Date()).getTime();
            this.delta = this.currentTime - this.lastTime;

            if(this.delta > this.interval) {


                this.update();
                this.draw();


                this.lastTime = this.currentTime - (this.delta % this.interval);
            }

            /* Repeat render function */
            if(!this.stop)
                requestAnimationFrame(this.render);
        },

        /**
         * Overiddable function called on every render tick BEFORE `draw` event
         */
        update: function() {},


        /**
         * ==================================================================================
         * @Renderer
         * ==================================================================================
         **/

        /**
         * Overiddable function called on every render tick AFTER `update` event
         */
        draw: function() {},


        /**
         * Clear whole canvas
         * @param {Vector2} origin
         */
        clearCanvas: function(origin = new Vector2(0, 0)) {
            this.context.clearRect(origin.x, origin.y, this.canvas.width, this.canvas.height);
        },

        /**
         * Draw grid & axis helpers
         * @param {Vector2} origin
         */
        drawHelpers: function(origin = new Vector2(0, 0)) {
            this.drawGrid(origin);
            this.drawAxis(origin);
        },

        /**
         * Draw grid on canvas
         * @param {Vector2} origin
         * @param {string}  color
         * @param {int}     spacing
         */
        drawGrid: function(origin = new Vector2(0, 0), color = "#f7f7f7", spacing = 20) {
            this.context.save();

            this.context.translate(-origin.x, -origin.y);
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
         * @param {Vector2} origin
         * @param {string}  color
         */
        drawAxis: function(origin = new Vector2(0, 0), color = "#dedede") {
            let thick = 2.5, hThick = thick / 2,
                left = this.canvas.width * -1, right = this.canvas.width, center = this.canvasHalfWidth,
                middle = this.canvasHalfHeight, bottom = this.canvas.height;

            this.context.save();

            this.context.translate(-origin.x, -origin.y);
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
         * Set FPS
         * @param {int} fps
         */
        setFPS: function(fps) {
            this.fps = fps;
            this.interval = 1000 / fps;
        },


        /**
         * ==================================================================================
         * @Checker
         * ==================================================================================
         **/

        /**
         * Check for missing elements & errors
         */
        __handleDrawErrors: function() {
            if(!this.canvas)
                console.warn('[VUE Warn] Draw.js : `Canvas` element not found.');
        },
    }
};