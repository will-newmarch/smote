
# SMOTE

Resamples a dataset by applying the Synthetic Minority Oversampling TEchnique (SMOTE).

Use SMOTE to balance an imbalanced dataset in order to improve model accuracy when training.

Pass a two-dimensional array of vectors into an instance of SMOTE and run generate, passing in the count of synthesised vectors you would like to create.

Synthesised vectors will be returned.

```
// Include the library.
const SMOTE = require('smote');

// Two-dimensional array of vectors used to generate synthetic data points.
const initialVectors = [
	[2,9],
	[-7,3]
];

// Pass in your real data vectors.
const smote = new SMOTE(initialVectors);
    
// Here we generate 5 synthetic data points to bolster our training data with an balance an imbalanced data set.
const newVectors = smote.generate(5);
```