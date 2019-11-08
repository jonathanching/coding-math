/**
 * ==================================================================================
 * Collection of helper methods
 *
 * ==================================================================================
 **/

export class Utils {

    /**
     * ==================================================================================
     * @Methods
     * ==================================================================================
     **/

    /**
     * Get a random object depending on specified chances
     * @param  {array}   choices
     * @return {Object}
     */
    static getRandomObj(choices) {
        let total = 0, random;

        /* Get total chance value of all objects */
        for(var i = 0; i < choices.length; i++) {
            total += choices[i].chance;
        }

        /* Get random number from 1 to total */
        random = Math.random() * total;

        /* Loop through the choices */
        for(var i = 0; i < choices.length; i++) {
            let curr = choices[i];

            /* Check if random number is less than the current chance, return if it does */
            if(random < curr.chance)
                return curr;

            /* Reduce the random number by the curr choice's chance value */
            random -= curr.chance;
        }
    }

    /**
     * Get a random color
     * @return {String}
     */
    static getRandomColor() {
    	let r = Math.floor(Math.random() * 255),
	    	g = Math.floor(Math.random() * 255),
	    	b = Math.floor(Math.random() * 255);

    	return "rgb(" + r + "," + g + "," + b + ")";
    }
}