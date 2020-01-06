const fs = require('fs');

// var arr = [];
var formattedNumber = '';
var numberStart = 4;
var numberEnd = 43;

// while(numberStart <= numberEnd+1){
//     console.log('unformatted: '+numberStart);
//     var formattedNumber = ("0" + numberStart).slice(-2);
//     console.log('formatted: '+formattedNumber);
//     arr.push(formattedNumber);
//   }

//make the array of 04-43 for later iteration.
let arr = Array(numberEnd - numberStart + 1)
    .fill()
    .map(() => ("0" + numberStart++).slice(-2));
console.log(arr);

//reading x,y location number from data flie.
function readXY(path_x, path_y, path_data) {
    console.log('start readXY')
    var x_column = fs.readFileSync(path_x, 'ASCII');
    var y_column = fs.readFileSync(path_y, 'ASCII');
    x = x_column.split('\n').slice(0, -1).map((_value) => {
        return _value.replace(/ /gi, '');
    });
    y = y_column.split('\n').slice(0, -1).map((_value) => {
        return _value.replace(/ /gi, '');
    });
    xyzString = read_data(x, y, path_data);
    //console.log('readXY output: ' + xyzString);

    // return 'processing:\t'  + path_x +'\t'+  path_y + '\n' + xyzString;
    return xyzString;
}

//reading x,y's inundation data
function read_data(x, y, path_data) {
    console.log('start read_data: ' + path_data);
    fileContent = fs.readFileSync(path_data, 'ASCII');
    console.log('start read_data_filesync');
    let xyz = [];
    let xyzString = [];
    let rows = fileContent.split('\n').slice(0, -1);
    rows.forEach((line, lineNumber) => {
        // console.log('start read_data_filesync foreach');

        //console.log('start read_data_filesync foreach in lineNumber: ' + lineNumber);
        line.split('\t').slice(0, -1).forEach((value2, column1) => {
            if (value2 != 'NaN') {
                console.log(x[column1] + ' ' + y[lineNumber] + ' ' + Number(value2)); //Number(value2) + ' line: ' + row1 + ', lat:' + y[row1] + ', column: ' + column1 + ' lon: ' + x[column1]);
                xyz.push(x[column1] + ' ' + y[lineNumber] + ' ' + Number(value2));
            }
        });

    });
    console.log('finish read_data array xyz: ' + xyz);
    xyzString = xyz.join('\n');
    console.log('read_data output xyzString: ' + xyzString);
    return xyzString;
}

// write the dataset of x,y,inun to output files
function writeXY(opt, xyzString) {
    fs.appendFileSync(opt, xyzString + '\n', 'utf8');
    // fs.writeFileSync(opt, 'test string', 'utf8');
}

for (i=1; i<=18; i++) {
    for (let sZone of arr) {
    var xyzString = [];
    //if (LayerNum === '28') {
    var filePath = 'D:/inun/20191206result/T01T18/T' + ('0' + i).slice(-2);
    var filePath_x = filePath + '/location_data/' + 'Layer' + sZone + '_x.dat';
    var filePath_y = filePath + '/location_data/' + 'Layer' + sZone + '_y.dat';
    var filePath_data = filePath + '/max_inundation' + '/T' + ('0' + i).slice(-2) + '_layer' + sZone + '_inundation.dat';
    // var opt = filePath + '/T01_inun' + LayerNum + '.xyz';
    var opt = 'D:/inun/inundation/20190806run' + '/total_' + sZone + '.txt';

    console.log('-------------processing layer number: ' + sZone + '----------------');
    console.log(filePath);
    console.log(filePath_x);
    console.log(filePath_y);
    console.log(filePath_data);
    console.log(opt);

    //get the dataset from readXY()
    xyzString = readXY(filePath_x, filePath_y, filePath_data);
    //console.log(xyzString);
    //writeXY(opt, xyzString) //comment for testing

    console.log('-------------End of: ' + sZone + '----------------');
    console.log();
    }
}
