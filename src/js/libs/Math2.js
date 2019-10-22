/**
 * ==================================================================================
 * Additional Mathematical function not included on the `Math` class
 *
 * ==================================================================================
 **/

export class Math2 {

    /**
     * ==================================================================================
     * @Methods
     * ==================================================================================
     **/

    /**
     * Get `x` & `y` coordinates using Quadratic Bezier curve
     * @param  {Vector2} point  Vector2 object to update
     * @param  {Vector2} p0     starting point
     * @param  {Vector2} p1     control point
     * @param  {Vector2} p2     end point
     * @param  {float}   t      fractional value along the length of the line (0 <= t <= 1)
     */
    static quadraticBezier(point, p0, p1, p2, t) {
        point.x = Math.pow(1 - t, 2) * p0.x +
                  (1 - t) * 2 * t * p1.x +
                  t * t * p2.x;

        point.y = Math.pow(1 - t, 2) * p0.y +
                  (1 - t) * 2 * t * p1.y +
                  t * t * p2.y;
    }

    /**
     * Get `x` & `y` coordinates using Cubic Bezier curve
     * @param  {Vector2} point  Vector2 object to update
     * @param  {Vector2} p0     starting point
     * @param  {Vector2} p1     control point 1
     * @param  {Vector2} p2     control point 2
     * @param  {Vector2} p3     end point
     * @param  {float}   t      fractional value along the length of the line (0 <= t <= 1)
     * @param  {Vector2} pFinal
     * @return {Vector2}
     */
    static cubicBezier(point, p0, p1, p2, p3,  t) {
        point.x = Math.pow(1 - t, 3) * p0.x +
                  Math.pow(1 - t, 2) * 3 * t * p1.x +
                  (1 - t) * 3 * t * t * p2.x +
                  t * t * t * p3.x;

        point.y = Math.pow(1 - t, 3) * p0.y +
                  Math.pow(1 - t, 2) * 3 * t * p1.y +
                  (1 - t) * 3 * t * t * p2.y +
                  t * t * t * p3.y;
    }


    /**
     * Get the value in the range of `min` & `max`
     * @param  {int}   value
     * @param  {int}   min
     * @param  {int}   max
     * @return {Int}
     */
    static clamp(value, min, max) {
        return Math.min(Math.max(value, min), max);
    }

    /**
     * Get the value in one range from another range
     * @return {Int}
     */
    static map(value, sourceMin, sourceMax, destMin, destMax) {
        return Math2.lerp(Math2.norm(value, sourceMin, sourceMax), destMin, destMax);
    }

    /**
     * Get the value's percentage in decimal form on the specified range
     * @param  {int}    value
     * @param  {int}    min
     * @param  {int}    max
     * @return {Float}
     */
    static norm(value, min, max) {
        return (value - min) / (max - min);
    }

    /**
     * Linear Interpolation
     * Get the value between `min` & `max` depending on the `t` value
     * @param  {float} t
     * @param  {float} min
     * @param  {float} max
     * @return {Float}
     */
    static lerp(t, min, max) {
        return (max - min) * t + min;
    }


    /**
     * Convert radians to degrees
     * @param  {float} radian
     * @return {Float}
     */
    static radianToDegrees(radian) {
        return (radian * 180) / Math.PI;
    }

    /**
     * Convert degrees to radians
     * @param  {float} degree
     * @return {Float}
     */
    static degreeToRadians(degree) {
        return (degree * Math.PI) / 180;
    }

    /**
     * Check if `value` is in range of `min` and `max` value
     * @param  {int}     value
     * @param  {int}     min
     * @param  {int}     max
     * @return {Boolean}
     */
    static inRange(value, min, max) {
        return value >= Math.min(min, max) && value <= Math.max(min, max);
    }

    /**
     * Check if the range intersects w/ another range (`min` and `max`)
     * @param  {int}     min0
     * @param  {int}     max0
     * @param  {int}     min1
     * @param  {int}     max1
     * @return {Boolean}
     */
    static rangeIntersect(min0, max0, min1, max1) {
        return Math.max(min0, max0) >= Math.min(min1, max1) &&
               Math.min(min0, max0) <= Math.max(min1, max1);
    }

    /**
     * Round off the value to the number of places specified
     * @param  {int} value
     * @param  {int} places
     * @return {Int}
     */
    static roundToPlaces(value, places) {
        let result = Math.pow(10, places);
        return Math.round(value * result) / result;
    }

    /**
     * Round off the value to its nearest multiple of the specified value
     * @param  {int} value
     * @param  {int} nearest
     * @return {int}
     */
    static roundNearest(value, nearest) {
        return Math.round(value / nearest) * nearest;
    }

    /**
     * Get a random number from `min` to `max`
     * @param  {int} min
     * @param  {int} max
     * @return {int}
     */
    static randomRange(min, max) {
        return min + Math.random() * (max - min);
    }
}