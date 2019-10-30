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