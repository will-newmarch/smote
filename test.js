
'use strict';

const SMOTE = require('./index.js');

test('generates points between vectors with identical values', () => {

    const min = 1;
    const max = 3;

    const initialVectors = [
        [min,min],
        [max,max]
    ];

    const smote = new SMOTE(initialVectors);
    const newVectors = smote.generate(5);
    for(let vector of newVectors) {
        expect(vector[0] > min).toBe(true);
        expect(vector[0] < max).toBe(true);
        expect(vector[1] > min).toBe(true);
        expect(vector[1] < max).toBe(true);
        expect(vector[0]).toEqual(vector[1]);
    }

});

test('generates points between vectors with mismatched values', () => {

    const minX = 1;
    const maxX = 3;
    const minY = -2;
    const maxY = 12;

    const initialVectors = [
        [minX,minY],
        [maxX,maxY]
    ];

    const smote = new SMOTE(initialVectors);
    const newVectors = smote.generate(5);
    for(let vector of newVectors) {
        expect(vector[0] > 1).toBe(true);
        expect(vector[0] < 3).toBe(true);
        expect(vector[1] > -2).toBe(true);
        expect(vector[1] < 12).toBe(true);
    }

});

test('generates points between vectors with many dimensions', () => {

    const initialVectors = [
        [1,2,6,3,4,5,9,5,6,7,4],
        [8,4,2,5,8,0,5,2,5,8,3]
    ];

    const smote = new SMOTE(initialVectors);
    const newVectors = smote.generate(5);
    for(let vector of newVectors) {
        for(let value of vector) {
            expect(isNaN(value)).toBe(false);
        }
    }

});