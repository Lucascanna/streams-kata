# streams-kata

Programming Kata made of 3 exercises about streams.

Before starting, please download the [london_crime_by_lsoa.csv](https://www.kaggle.com/jboysen/london-crime/) and place it in the root of this directory.
# Exercise 1

Write a function that takes as input a filePath and returns the number of bytes of that file.
You need to write this function twice:
1. the count takes place in memory
2. the count is done using streams

Write your code in the files `./01-count-bytes/lib/count-bytes-in-memory.js` and `./01-count-bytes/lib/count-bytes-streamd.js`.

Then, executes the command `npm run test01` to check if your  implementation is correct.

To check the difference between the two implementations in terms of efficiency, run the following two commands:
```
time node ./01-count-bytes/index.js ./london_crime_by_lsoa.csv streams
time node ./01-count-bytes/index.js ./london_crime_by_lsoa.csv memory
```


