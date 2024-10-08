const { ethers } = require('ethers'); 
//ethers 라이브러리를 index.js에서 사용하기 위하여 require사용한다. 
const wallet = ethers.Wallet.createRandom();
//wallet을 선언하고 Wallet 클래스를 사용한다. create Random 메소드 사용하여 지갑 생성. 
console.log('random wallet:',wallet);
//console.log는 어떤 변수가 적혀있는지를 출력해준다. 여기서는 wallet에 어떤 변수가 적혀있는지를 출력한다.
const address = wallet.address;
console.log('My ethereum address:',address);
//같은 방식으로 생성된 wallet의 private key와 address를 확인하는 과정이다.

const EC = require('elliptic').ec;
const ec = new EC('secp256k1');
//타원 곡선 알고리즘 가져오기
const privateKey = '55d2b11141a83e60716fc17d50c16e367700ced5ecabb9db2e8709a2da970aa9';
//0x를 제외한 부분 
console.log('Private key:', privateKey);

const keyPair = ec.keyFromPrivate(privateKey);
//ec 객체 이용하여 privatekey에서 publickey만드는것
const myPublicKey = keyPair.getPublic().encodeCompressed('hex');
console.log('myPublicKey:::',myPublicKey);

class TXO {
    constructor(owner, amount) {
        this.owner = owner;   // 수신자 주소
        this.amount = amount; // 금액
        this.spent = false;   // 사용 여부 (초기값은 false)
    }

    spend() {
        if (this.spent) {
            throw new Error('This TXO is already spent');
        }
        this.spent = true;
    }
}

// A가 B에게 10코인을 전송하여 B의 TXO 생성 Case
const txoB = new TXO('B', 10);
console.log(txoB);  
// TXO { owner: 'B', amount: 10, spent: false }

// B가 C에게 10코인을 전송하여 B의 TXO 사용 Case
txoB.spend();
console.log(txoB);  
// TXO { owner: 'B', amount: 10, spent: true }

// C에게 새로운 TXO 생성 Case
const txoC = new TXO('C', 10);
console.log(txoC);  
// TXO { owner: 'C', amount: 10, spent: false }

// B가 동일한 TXO를 다시 사용하려고 시도 Case
try { 
    txoB.spend();
} catch (error) {
    console.error(error.message);  
    // 'This TXO is already spent'
}