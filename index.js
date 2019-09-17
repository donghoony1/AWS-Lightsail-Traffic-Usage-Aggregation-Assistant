const fs = require('fs');
const AWS = require('aws-sdk');

AWS.config = new AWS.Config();
const AWS_Credentials = JSON.parse(fs.readFileSync('./_configuration.json'));
const AWS_Credentials_Required = ['accessKeyId', 'secretAccessKey', 'region'];
for(let i = 0; i < AWS_Credentials_Required.length; i++) {
  if(AWS_Credentials[AWS_Credentials_Required[i]] === `${AWS_Credentials_Required[i]} Goes Here`) {
    throw new Error(`AWS 리소스에 엑세스하기 위한 ${AWS_Credentials_Required[i]}가 유효하지 않습니다. _configuration.json을 확인하십시오.`);
  }
}
AWS.config.loadFromPath('./_configuration.json');

const Lightsail = new AWS.Lightsail({ apiVersion: '2016-11-28' });

const Result_Data_Type_NL = [
  'Bits',
  'Kilobits',
  'Megabits',
  'Gigabits',
  'Terabits',
  'Bytes',
  'Kilobytes',
  'Megabytes',
  'Gigabytes',
  'Terabytes',
  'Bits/sec',
  'Kilobits/sec',
  'Megabits/sec',
  'Gigabits/sec',
  'Terabits/sec',
  'Bytes/sec',
  'Kilobytes/sec',
  'Megabytes/sec',
  'Gigabytes/sec',
  'Terabytes/sec'
]

const Instance_Name = process.argv[2];
const Metric_Name = process.argv[3];
const Result_Data_Type = Number(Result_Data_Type_NL.findIndex(x => {return x === process.argv[4];}));
const Time_Start = process.argv[5].replace('_', ' ');
const Time_End = process.argv[6].replace('_', ' ');
const Time_Diff = (Date.parse(Time_End) - Date.parse(Time_Start)) / 1000;

let params = {
  instanceName: Instance_Name,
  metricName: Metric_Name,
  startTime: new Date(Time_Start),
  endTime: new Date(Time_End),
  period: 2700000,
  statistics: [
    'Sum'
  ],
  unit: 'Bytes'
};
Lightsail.getInstanceMetricData(params, function(err, data) {
  if(err) throw new Error(err);

  let Total = 0;
  for(let i = 0; i < data['metricData'].length; i++) {
    Total = Total + data['metricData'][i]['sum'];
  }
  let Result_Data_Type_C = Result_Data_Type;
  if(10 <= Result_Data_Type_C) {
    Total = Total / Time_Diff;
    Result_Data_Type_C = Result_Data_Type_C - 10;
  }
  if(0 <= Result_Data_Type_C && Result_Data_Type_C < 5) {
    Total = Total * 8;
  } else if(5 <= Result_Data_Type_C && Result_Data_Type_C < 10) {
    Result_Data_Type_C = Result_Data_Type_C - 5;
  }
  for(let i = 0; i < Result_Data_Type_C; i++) {
    Total = Total / 1024;
  }

  console.log(`\n\n==============================================================\n\n\n`+
              `# ${Instance_Name}의 Traffic 통계입니다.\n\n`+
              ` * 집계 유형: ${Metric_Name}\n`+
              ` * 집계 기간: ${Time_Start} ~ ${Time_End}(${Time_Diff}초)\n`+
              ` * 데이터: ${Total} ${Result_Data_Type_NL[Result_Data_Type]}\n\n\n`+
              `# 코드 제작자 정보\n\n`+
              ` * Dong-Hoon Yoo\n`+
              ` * yoodonghoon01@gmail.com\n`+
              ` * https://github.com/donghoony1/AWS-Lightsail-Traffic-Usage-Aggregation-Assistant\n\n\n`+
              `==============================================================\n\n`);
});
