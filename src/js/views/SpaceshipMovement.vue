<template>

    <div id="spaceship-movement">

        <canvas id="canvas"></canvas>

    </div>

</template>
<script>

    /**
     * ==================================================================================
     * Classic ASTEROIDS spaceship movement
     * ==================================================================================
     **/

    import { Vector2 } from '../libs/Vector2.js';
    import { Particle } from '../libs/Particle.js';
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
                radius: 0,
                speed: 0,

                character: null,
                movement: 0,
                direction: 0,
                rotation: 0,

                isForward: false, isBackward: false,
                isLeft: false, isRight: false,
            };
        },

        mounted: function() {
            this.init();
        },

        methods: {

            init: function() {
                /* Set initial values */
                this.radius = 10;
                this.speed = 0.05;


                /* Create character objects */
                this.movement = new Vector2(0, 0);
                this.direction = -Math.PI / 2;
                this.rotation = 0.08;
                this.character = new Particle(
                                    /* Position at the center of the canvas */
                                    this.canvasHalfWidth, this.canvasHalfHeight,
                                    /* Set initial velocity to 0 */
                                    0,
                                    /* Point directly upward (90deg) */
                                    -Math.PI / 2
                                );


                this.bindControllerEvents();
                this.render();
            },


            /**
             * ==================================================================================
             * @Methods
             * ==================================================================================
             **/

            /**
             * Bind Arrow keys for the movement events
             */
            bindControllerEvents: function() {
                /* Enable `movement` triggers value on keyup */
                this.bindKeyEvents('keydown', true);
                /* Disable `movement` triggers value on keyup */
                this.bindKeyEvents('keyup', false);
            },

            /**
             * Bind key `movement` event
             * @param String   eventName
             * @param Boolean  bool
             */
            bindKeyEvents: function(eventName, bool) {
                document.body.addEventListener(eventName, (e) => {
                    /* If key code is... */
                    switch(e.keyCode) {
                        /* ...up */
                        case 38: this.isForward = bool; break;
                        /* ...down */
                        case 40: this.isBackward = bool; break;
                        /* ...left */
                        case 37: this.isLeft = bool; break;
                        /* ...right */
                        case 39: this.isRight = bool; break;
                    };
                });
            },


            /**
             * ==================================================================================
             * @Controller
             * ==================================================================================
             **/

            /**
             * Handle character `movement` events
             */
            handleMovement: function() {
                /* Add forward momentum */
                if(this.isForward)
                    this.movement = this.getAcceleration();
                /* Add reverse momentum */
                if(this.isBackward)
                    this.movement = this.getAcceleration(false);
                /* Remove movement when not moving forward or backward */
                if(!this.isForward && !this.isBackward)
                    this.movement.clear();


                /* Rotate left or right */
                if(this.isLeft) this.direction -= this.rotation;
                if(this.isRight) this.direction += this.rotation;
            },

            /**
             * Update loop event
             */
            update: function() {

                /* Add vector to `movement` or `rotation` depending on action keys pushed */
                this.handleMovement();

                /**
                 * Add in the movement (`acceleration vector`) to the velocity vector
                 * per each time step, this increases the element's speed overtime
                 */
                this.character.accelerate(this.movement);

                /**
                 * Adding of gravity to `particle`s current velocity
                 * Adding of velocity to `particle`s current position
                 */
                this.character.update();


                /* Check if out of bounds, redraw on opposite side */
                this.checkOutofBounds();
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


                /* Draw the character */
                this.drawCharacter(this.character.position.x, this.character.position.y);
            },

            /**
             * Draw a character
             */
            drawCharacter: function(x, y) {
                /* Draw a simple circle */
                this.context.beginPath();
                this.context.fillStyle = "black";
                this.context.arc(x, y, this.radius, 0, Math.PI * 2, false);
                this.context.fill();

                /* Draw a simple small circle inside the body */
                let headPosition = this.getHeadPosition();

                this.context.beginPath();
                this.context.fillStyle = "red";
                this.context.arc(headPosition.x, headPosition.y, this.radius / 2, 0, Math.PI * 2, false);
                this.context.fill();
            },

            /**
             * Draw helpers
             */
            drawHelpers: function() {
                this.drawGrid();
                this.drawAxis();
                this.drawLegend();
            },

            /**
             * Draw legend texts
             */
            drawLegend: function() {
                let x = this.canvasHalfHeight + (this.canvasHalfHeight * .5),
                    y = 10, lineHeight = 20;

                this.context.font = "17px Open Sans";

                /* Draw the controls instructions */
                this.context.fillStyle = "#333";
                this.context.fillText("CONTROLS", y, x);
                this.context.fillText("Arrow Up        :   Move forward", y, x += lineHeight);
                this.context.fillText("Arrow Down  :   Move backward", y, x += lineHeight);
                this.context.fillText("Arrow Left      :   Rotate left", y, x += lineHeight);
                this.context.fillText("Arrow Right   :   Rotate right", y, x += lineHeight);
            },


            /**
             * ==================================================================================
             * @Getter/Setter
             * ==================================================================================
             **/

            /**
             * Get forward acceleration vector base on the character's facing `direction` and `speed`
             * @param  boolean dir Forward or reverse
             * @return Vector
             */
            getAcceleration: function(isForward = true) {
                let front = this.getFrontPosition(),
                    finalVector = null;

                /* Normalize `front` vector */
                front.normalize();
                /* Multiply to `speed` to reduce within the set proper `acceleration` value */
                finalVector = front.multiply(this.speed);


                /* Check direction, multiply to a `-` value if for backward movement */
                if(!isForward)
                    return finalVector.multiply(-1);

                return finalVector;
            },

            /**
             * Get character's front facing position
             * @return Vector2
             */
            getFrontPosition: function() {
                return this.getHeadPosition().subtract(this.character.position);
            },

            /**
             * Get character's head vector
             * @return Vector2
             */
            getHeadPosition: function() {
                return new Vector2(
                        this.character.position.x + (Math.cos(this.direction) * this.radius / 2),
                        this.character.position.y + (Math.sin(this.direction) * this.radius / 2)
                    );
            },


            /**
             * ==================================================================================
             * @Checker
             * ==================================================================================
             **/

            /**
             * Check `character` if outside the screen, redraw on the opposite side
             * @return boolean
             */
            checkOutofBounds: function() {
                /* If outside the... */
                /* ...right side */
                if(this.character.position.x - this.radius > this.canvas.width) {
                    this.character.position.x = 0;
                }
                /* ...left side */
                else if(this.character.position.x + this.radius < 0) {
                    this.character.position.x = this.canvas.width;
                }
                /* ...bottom side */
                else if(this.character.position.y - this.radius > this.canvas.height) {
                    this.character.position.y = 0;
                }
                /* ...top side */
                else if(this.character.position.y + this.radius < 0) {
                    this.character.position.y = this.canvas.height;
                }
            },
        }
    };
</script>