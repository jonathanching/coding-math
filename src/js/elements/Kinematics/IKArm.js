/**
 * ==================================================================================
 * Inverse Kinematics Arm element
 *
 * ==================================================================================
 **/


export class IKArm {

    constructor(length, angle = 0, x = 0, y = 0) {
    	this.length = length;
    	this.angle = angle;
    	this.x = x;
    	this.y = y;

        this.init();
    }


    /**
     * ==================================================================================
     * @Methods
     * ==================================================================================
     **/

    /**
     * Initial setup
     */
    init() {
        this.parent = null;
    }


    /**
     * ==================================================================================
     * @Controller
     * ==================================================================================
     **/

    /**
     * Move all `Arm` axis to specified coordinates
     * @param  {int} x
     * @param  {int} y
     */
    drag(x, y) {
        /* Rotate to coordinates */
        this.pointAt(x, y);
        /* Set axis to coordinates */
        this.x = x - Math.cos(this.angle) * this.length;
        this.y = y - Math.sin(this.angle) * this.length;

        /* Update parent if it exists */
        if(this.parent) {
            this.parent.drag(this.x, this.y);
        }
    }

    /**
     * Change angle to specified coordinates
     * @param  {int} x
     * @param  {int} y
     */
    pointAt(x, y) {
        let dx = x - this.x,
            dy = y - this.y;

        this.angle = Math.atan2(dy, dx);
    }


    /**
     * Update coordinates
     */
    update() {
    	/* Check if has parent, check `axis` for changes */
    	if(this.parent) {
    		this.x = this.parent.getEndX();
    		this.y = this.parent.getEndY();
    	}
    }


    /**
     * ==================================================================================
     * @Renderer
     * ==================================================================================
     **/

    /**
     * Draw the `Arm`
     * @param {CanvasRenderingContext2D} context
     */
    draw(context) {
    	context.save();

    	context.beginPath();
    	context.moveTo(this.x, this.y);
    	context.lineTo(this.getEndX(), this.getEndY());
    	context.stroke();

    	context.restore();
    }


    /**
     * ==================================================================================
     * @Getter/Setter
     * ==================================================================================
     **/

    /**
     * Get the end values of `x` & `y` coordinates depending on specified length and angle
     * @return {Int}
     */
    getEndX() { return this.x + Math.cos(this.angle) * this.length; }
    getEndY() { return this.y + Math.sin(this.angle) * this.length; }

    /**
     * Set parent `Arm`
     * @param {IKArm} parent
     */
    setParent(parent) {
    	this.parent = parent;

    	/* Update `x` & `y` to parents end coordinates */
    	this.x = parent.getEndX();
    	this.y = parent.getEndY();
    }


    /**
     * ==================================================================================
     * @Checker
     * ==================================================================================
     **/

    //
}
