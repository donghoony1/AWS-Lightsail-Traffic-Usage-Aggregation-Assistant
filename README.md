# AWS Lightsail Traffic Usage Aggregation Assistant v1.0.0
AWS Lightsail 인스턴스의 트래픽 사용량 집계를 돕는 간단한 Node.JS 코드입니다.

AWSCLI의 집계 명령어가 여러모로 쓰기 불편해서 별도로 제작했습니다!

## 설치하기
```
git clone https://github.com/donghoony1/AWS-Lightsail-Traffic-Usage-Aggregation-Assistant.git
npm install
```

## 실행하기
### 예제
#### 실행 코드
```
node index.js TestInstance NetworkOut Megabits/sec 2019-09-01_00:00:00 2019-10-01_00:00:00
```
#### 결과
```
==============================================================


# TestInstance의 Traffic 통계입니다.

 * 집계 유형: NetworkOut
 * 집계 기간: 2019-09-01 00:00:00 ~ 2019-10-01 00:00:00(2592000초)
 * 데이터: 0.062471149947908186 Megabits/sec


# 코드 제작자 정보

 * Dong-Hoon Yoo
 * yoodonghoon01@gmail.com
 * https://github.com/donghoony1/AWS-Lightsail-Traffic-Usage-Aggregation-Assistant


==============================================================
```
### 설명
#### 실행 코드
```
node index.js <Instance Name> <Metric Name> <Result Data Type> <Start Time> <End Time>
```
#### 인자 설명
##### Instance Name
AWS Lightsail 인스턴스 이름입니다.
##### Metric Name
집계할 데이터의 이름입니다.
 * NetworkIn
 * NetworkOut
##### Result Data Type
출력할 데이터의 유형입니다.
 * Bits
 * Kilobits
 * Megabits
 * Gigabits
 * Terabits
 * Bytes
 * Kilobytes
 * Megabytes
 * Gigabytes
 * Terabytes
 * Bits/sec
 * Kilobits/sec
 * Megabits/sec
 * Gigabits/sec
 * Terabits/sec
 * Bytes/sec
 * Kilobytes/sec
 * Megabytes/sec
 * Gigabytes/sec
 * Terabytes/sec
##### Start Time, End Time
집계 범위의 시작, 종료 일자입니다. Datetime 형태에서 ``` ```을 ```_```으로 전환하여 입력하십시오.
###### 예제
```2019-09-01 00:00:00``` → ```2019-09-01_00:00:00```
