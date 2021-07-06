# streams-kata

Programming Kata made of 3 exercises about streams.

Before starting, please download the [london_crime_by_lsoa.csv](https://www.kaggle.com/jboysen/london-crime/downloads/london-crime.zip/1), unzip it and place it in the root of this directory.
## Exercise 1

Write a function that takes as input a filePath and returns the number of bytes of that file.
You need to write this function twice:
1. the count takes place in memory
2. the count is done using streams

Write your code in the files `./01-count-bytes/lib/count-bytes-in-memory.js` and `./01-count-bytes/lib/count-bytes-streamd.js`.

Then, executes the command `npm run test01` to check if your  implementation is correct.

### Memory and time consumption

To check the difference between the two implementations in terms of efficiency, run the following two commands:
```
time node ./01-count-bytes/index.js ./london_crime_by_lsoa.csv streams
time node ./01-count-bytes/index.js ./london_crime_by_lsoa.csv memory
```

## Exercise 2

Write a function that takes as input a csv file like the following
```csv
lsoa_code,borough,major_category,minor_category,value,year,month
E01001116,Croydon,Burglary,Burglary in Other Buildings,0,2016,11
E01001646,Greenwich,Violence Against the Person,Other violence,0,2016,11
E01000677,Bromley,Violence Against the Person,Other violence,1,2015,5
E01003774,Redbridge,Burglary,Burglary in Other Buildings,0,2013,3
E01004563,Wandsworth,Robbery,Personal Property,3,2014,6
E01004563,Wandsworth,Robbery,Personal Property,0,2015,10
E01001342,Ealing,Violence Against the Person,Offensive Weapon,0,2012,7
E01001320,Ealing,Theft and Handling,Other Theft,1,2012,5
E01001320,Ealing,Robbery,Other Theft,0,2015,5
E01002633,Hounslow,Robbery,Personal Property,4,2013,4
E01003496,Newham,Criminal Damage,Criminal Damage To Other Building,0,2016,9
```
This data represents the number of criminal reports in London by month, bourough and major/minor category of the crime.

Your function must takes as input a filePath and must write a file at the path `<inputFilePath>.analysis.csv` with the following requirements:
* First line of the file should contain the header of the input file
* The following lines should be all the lines of the input file having `year==2016`
* The last three lines sholud contain statistics about the input file:
  *  The third last line should contain, for each year, the increment of crimes with respect to the previous year. E.g.
  ```
  2016:0,2017:12,2018:-4,2019:24
  ```
  *  The second last line should contain the most three dangerous boroughs of London. E.g.
  ```
  Kingston,Croydon,Redbridge
  ```
  *  The last line should contain, for each borough, the most common major category. E.g.
  ```
  Kingston:robbery,Redbridge:burglary,Ealing:violence
  ```

Write your code in the file `./02-crimes-analysis/lib/crime-analysis.js`.

Then, executes the command `npm run test02` to check if your  implementation is correct.

To run your script with a large file, you can also run
```
node ./02-crimes-analysis/index.js ./london_crime_by_lsoa.csv
```

## Exercise 3

Write the Fastify handler of an HTTP POST route that takes as input a `text/plain` body with the same content of the input file in exercise 2 and returns as HTTP response body the same content of the output file in exercise 2.

You can reuse the code of Exercise 2.

<div class="panel panel-warning">
TIP
{: .panel-heading}
<div class="panel-body">
Remember that with `request.raw` and `reply.raw` you can access the Node.js Request and Reply which are input and output streams, respectively.
</div>
</div>

Write your code in the file `./03-http-crimes-analysis/lib/http-crime-analysis.js`.

Then, executes the command `npm run test03` to check if your  implementation is correct.

To run your script with a large file, you can also run
```
node ./03-http-crimes-analysis/index.js
```
and then execute the POST request to your locally running server.