/**
 * ==================================================================================
 * Forward Kinematics System element
 *
 * ==================================================================================
 **/

import { FKArm } from './FKArm.js';

export class FKSystem {

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
        //
    }


    /**
     * Add `Arm` object, attach to previous `Arm`
     * @param {int} length
     * @param {int} centerAngle
     * @param {int} rotationRange
     * @param {int} angleOffset
     */
    addArm(length, centerAngle, rotationRange, angleOffset) {
        let lastArm = this.getLastArm(false),
            arm = new FKArm(length, centerAngle, rotationRange, angleOffset, this.baseX, this.baseY);

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
     * Rotate specified `Arm` to angle
     * @param  {int} index
     * @param  {int} angle
     */
    rotateArm(index, angle) {
        let arm = this.getArm(index);

        /* Update angle */
        if(arm)
            arm.angle = angle;
    }


    /**
     * Update all `Arm` angles
     * @param {int} angle
     */
    updateAngle(angle) {
        for(var i = 0; i < this.arms.length; i++) {
            let segment = this.arms[i];

            segment.setAngle(angle);
        }
    }

    /**
     * Run `update` event on all `Arm` objects
     */
    update() {
        for(var i = 0; i < this.arms.length; i++) {
            let arm = this.arms[i];

            arm.update();
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
     * Set rotation of angle speed value
     * @param {int} speed
     */
    setRotationSpeed(speed) {
        this.angleSpeed = speed;
    }


    /**
     * ==================================================================================
     * @Checker
     * ==================================================================================
     **/

    //
}
