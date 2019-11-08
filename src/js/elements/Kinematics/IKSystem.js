/**
 * ==================================================================================
 * Inverse Kinematics System element
 *
 * ==================================================================================
 **/

import { IKArm } from './IKArm.js';

export class IKSystem {

    constructor(x, y) {
        this.baseX = x;
        this.baseY = y;
        this.arms = [];

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
        this.isFixed = false;
    }


    /**
     * Add `Arm` object, attach to previous `Arm`
     * @param {int} length
     * @param {int} angle
     */
    addArm(length, angle) {
        let lastArm = this.getLastArm(false),
            arm = new IKArm(length, angle, this.baseX, this.baseY);

        /* Set last `Arm` as parent if it exists */
        if(lastArm)
            arm.setParent(lastArm);

        /* Add to collection */
        this.arms.push(arm);
    }


    /**
     * ==================================================================================
     * @Controller
     * ==================================================================================
     **/

    /**
     * Drag specified `Arm` to coordinates
     * @param  {int} x
     * @param  {int} y
     */
    drag(x, y) {
        let arm = this.getLastArm();
        if(arm)
            arm.drag(x, y);
    }

    /**
     * Reach specified `Arm` to coordinates
     * @param  {int} index
     * @param  {int} x
     * @param  {int} y
     */
    reach(x, y) {
        this.drag(x, y);

        /* Activate fixed state */
        this.isFixed = true;
    }


    /**
     * Run `update` event on all `Arm` objects
     */
    update() {
        for(var i = 0; i < this.arms.length; i++) {
            let arm = this.arms[i];

            arm.update();

            /* If on fixed state, revert first `Arm` axis to the base axis */
            if(this.isFixed && !arm.parent) {
                arm.x = this.baseX;
                arm.y = this.baseY;
            }
        }
    }


    /**
     * ==================================================================================
     * @Renderer
     * ==================================================================================
     **/

    /**
     * Run `draw` event on all `Arm` objects
     * @param {CanvasRenderingContext2D} context
     */
    draw(context) {
        for(var i = 0; i < this.arms.length; i++) {
            let arm = this.arms[i];

            arm.draw(context);
        }
    }


    /**
     * ==================================================================================
     * @Getter/Setter
     * ==================================================================================
     **/

    /**
     * Get last `Arm` object
     * @param  {bool} warning
     * @return {Arm}
     */
    getLastArm(warning = true) {
        return this.getArm(this.arms.length, warning);
    }

    /**
     * Get specified arm
     * @param  {int} index
     * @param  {bool} warning
     * @return {Arm}
     */
    getArm(index, warning = true) {
        let arm = this.arms[index - 1];

        /* Check if `Arm` exists */
        if(warning && !arm) {
            console.warn('[IKSystem Warn] rotateArm: No `Arm` on index ' + index + ' found!');
            return null;
        }

        return arm;
    }


    /**
     * ==================================================================================
     * @Checker
     * ==================================================================================
     **/

    //
}
