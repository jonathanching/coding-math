/**
 * ==================================================================================
 * Forward Kinematics Arm element
 *
 * ==================================================================================
 **/


export class FKArm {

    constructor(length, centerAngle = 0, rotationRange = Math.PI * 2, angleOffset = 0, x = 0, y = 0) {
    	this.length = length;
    	this.centerAngle = centerAngle;
        this.rotationRange = rotationRange;
        this.angleOffset = angleOffset;
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
        this.setAngle(this.centerAngle);
    }


    /**
     * ==================================================================================
     * @Controller
     * ==================================================================================
     **/

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
     * Set angle value
     * @param {int} angle
     */
    setAngle(angle) {
        this.angle = this.centerAngle + Math.sin(angle + this.angleOffset) * this.rotationRange;
    }

    /**
     * Get the end values of `x` & `y` coordinates depending on
     * specified length and angle combined w/ the total parent angles
     * @return {Int}
     */
    getEndX() { return this.x + Math.cos(this.getEndAngle()) * this.length; }
    getEndY() { return this.y + Math.sin(this.getEndAngle()) * this.length; }

    /**
     * Get end angle
     * @return {Int}
     */
    getEndAngle() {
    	let angle = this.angle,
    		parent = this.parent;

    	/* Calculate total angle of all interconnected `Arms` */
    	while(parent) {
    		angle += parent.angle;
    		parent = parent.parent;
    	}

    	return angle;
    }

    /**
     * Set parent `Arm`
     * @param {FKArm} parent
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
