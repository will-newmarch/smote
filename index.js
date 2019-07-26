/**
 * SMOTE
 * Resamples a dataset by applying the Synthetic Minority Oversampling TEchnique (SMOTE).
 */
class SMOTE {

    /**
     * Construct an instance of the class
     * @param {Array} initialVectors two dimensional array of initial vectors
     */
    constructor(initialVectors) {
        if(!initialVectors) throw "Please supply your real vectors!";
        this.initialVectors = initialVectors;
        this.nearestNeighbourCount = 5;
    }

    /**
     * Set the number of nearest neighbours to use when generating mid-points
     * @param {Number} count 
     */
    setNearestNeighbourCount(count) {
        this.nearestNeighbourCount = count;
    }

    /**
     * Generate an array of new vectors
     * @param {Number} count 
     */
    generate(count) {
        const fakeVectors = [];
        for(let i = 0; i < count; i++) {
            const randomIndex = Math.floor(Math.random()*this.initialVectors.length);
            const initialVector = this.initialVectors[randomIndex];
            const nearestNeighbours = this.getNearestNeighbours(initialVector);
            const neighbour = nearestNeighbours[Math.floor(Math.random()*nearestNeighbours.length)];
            const newVector = this.generateMidPoint(initialVector,neighbour);
            fakeVectors.push(newVector);
        }
        return fakeVectors;
    }

    /**
     * Generate a random mid-point between two vectors
     * @param {Array} vector1 
     * @param {Array} vector2 
     */
    generateMidPoint(vector1,vector2) {
        const distance = Math.random();
        const generatedVector = vector1.map((v,i) => vector1[i] + (vector2[i]-vector1[i])*distance);
        return generatedVector;
    }

    /**
     * Get the random neighbour
     */
    getRandomNeighbour() {
        const randomIndex = Math.floor(Math.random()*this.initialVectors.length);
        return this.initialVectors[randomIndex];
    }

    /**
     * Get the nearest neighbour of the vector as per the initialVectors
     * @param {Array} vector 
     * @param {Number} count 
     */
    getNearestNeighbours(vector,count) {
        let vectorDistances = [];
        for(let i = 0, count = this.initialVectors.length; i < count; i++) {
            if(this.initialVectors[i] === vector) continue;
            const distance = Math.abs(this.getDistance(this.initialVectors[i],vector));
            vectorDistances.push([distance,this.initialVectors[i]]);
        }
        return vectorDistances.sort((a,b) => a[0] - b[0]).slice(0,this.nearestNeighbourCount).map(v => v[1]);
    }

    /**
     * Get the nearest neighbour of the vector as per the initialVectors
     * @param {Array} vector 
     */
    getNearestNeighbour(vector) {
        let minDistance = Infinity;
        let closestVector = null;
        for(let i = 0, count = this.initialVectors.length; i < count; i++) {
            if(this.initialVectors[i] === vector) continue;
            const distance = Math.abs(this.getDistance(this.initialVectors[i],vector));
            if(distance < minDistance) {
                minDistance = distance;
                closestVector = this.initialVectors[i];
            }
        }
        return closestVector;
    }

    /**
     * Get distance between two vectors
     * @param {Array} vector1 
     * @param {Array} vector2 
     */
    getDistance(vector1,vector2) {
        const d = vector1.map((v,i) => vector1[i]-vector2[i]);
        return Math.sqrt( d.reduce((a,v) => a+(v*v),0) );
    }
}

module.exports = SMOTE;