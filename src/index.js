const { ethers } = require('ethers'); 
//ethers 라이브러리를 index.js에서 사용하기 위하여 require사용한다. 
const wallet = ethers.Wallet.createRandom();
//wallet을 선언하고 Wallet 클래스를 사용한다. create Random 메소드 사용하여 지갑 생성. 
console.log('random wallet:',wallet);
//console.log는 어떤 변수가 적혀있는지를 출력해준다. 여기서는 wallet에 어떤 변수가 적혀있는지를 출력한다.
const privateKey = wallet.privateKey;
const address = wallet.address;
console.log('My ethereum address:',address);
//같은 방식으로 생성된 wallet의 private key와 address를 확인하는 과정이다.


