import { v4 as uuidv4 } from 'uuid';
import * as fs from 'node:fs'

//=================================

const brand = ['스타벅스','이디야','커피빈','블루보틀','파스쿠치','빽다방'];
const location = [
    "서울특별시", "부산광역시", "대구광역시", "인천광역시", "광주광역시",
    "대전광역시", "울산광역시", "세종특별자치시", "수원시", "용인시",
    "안성시", "전주시", "여수시", "목포시", "포항시",
    "경주시", "제주특별시"
];

function generateBrandStore(arr, arr2) {
    const brandRandomNumber = (Math.floor(Math.random() * arr.length));
    const storeRandomNumber = (Math.floor(Math.random() * arr2.length));

    return arr[brandRandomNumber] + " " + arr2[storeRandomNumber];
}

//=================================

const stateName = [
    "서울특별시", "부산광역시", "대구광역시", "인천광역시", "광주광역시",
    "대전광역시", "울산광역시", "세종특별자치시", "수원시", "용인시",
    "안성시", "전주시", "여수시", "목포시", "포항시",
    "경주시", "제주특별시"
];
const cityName = ['강남구', '강서구', '강동구', '강북구', '남구', '서구', '북구', '동구', '진구'];

function generateAddress() {
    const stateIndex = Math.floor(Math.random()*stateName.length);
    const selectedState = stateName[stateIndex];
    const cityIndex = Math.floor(Math.random()*cityName.length);
    const selectedCity = cityName[cityIndex];
    const streetNumber = Math.floor(Math.random() * 100) + "번길" + Math.floor(Math.random() * 100);

    return `${selectedState} ${selectedCity} ${streetNumber}`;
}

//=================================

const data = [];
const usedStoreNames = new Set();
//Set은 중복된 값을 허용하지 않기 때문에 중복을 피하고 고유한 값을 저장

for (let i = 0; i < 100; i++) {
    let storeName = generateBrandStore(brand,location);

    while (usedStoreNames.has(storeName)) {
        storeName = generateBrandStore(brand, location);
    }
    // while구문, storeName에 중복값이 있다면 다시 함수를 실행시킨 값을 storeName에 할당
    usedStoreNames.add(storeName);
    // set에 이미 할당된 storeName을 추가하여, 유일값으로 설정

    const storeId = uuidv4();
    const brandName = storeName.split(' ')[0];
    const storeAddress = generateAddress();

    data.push(`${storeId},${storeName},${brandName},${storeAddress}`);
}

//===============================

const csvData = data.join('\n');

fs.writeFile('Store.csv', csvData, (err) => {
    if (err) throw err;
    console.log('CSV 파일이 성공적으로 생성되었습니다.');
});