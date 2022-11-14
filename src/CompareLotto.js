const { Console } = require('@woowacourse/mission-utils');
const LOTTO_WIN = [5000, 50000, 1500000, 30000000, 2000000000];

class CompareLotto {
    // 길이리턴
    count(lottoList, winNumber) {
        return lottoList.filter((number) => winNumber.includes(number)).length;
    }

    // 불린 리턴
    countBonus(winNumber, bonus) {
        return winNumber.includes(bonus);
    }

    // lottoList Lotto.js에서 받아오기, #lottoList로 만들어서 배분
    result(lottoList, winNumber, bonus) {
        let count = []
        
        lottoList.forEach(lotto => {
            let correctNumber = this.count(lotto, winNumber);
            let correctBonus = this.countBonus(winNumber, bonus);

            count.push({ correctNumber, correctBonus });
        });
        const howManyWin = this.number(count);

        return howManyWin;
    }

    number(count) {
        let howManyWin = Array.from({length: 5}, () => 0);

        for (let i = 0; i < count.length; i++) {
            const { correctNumber, correctBonus } = count[i];

            if (correctNumber === 3) howManyWin[0] += 1;
            if (correctNumber === 4) howManyWin[1] += 1;
            if (correctNumber === 5) howManyWin[2] += 1;
            if (correctNumber === 5 && correctBonus) howManyWin[3] += 1;
            if (correctNumber === 6) howManyWin[4] += 1;
        }

        return howManyWin;
    }

    totalMoney(howManyWin) {
        let total = [];
        for(let i = 0; i < howManyWin.length; i++) {
            console.log(howManyWin[i]);
            console.log(LOTTO_WIN[i])
            total.push(howManyWin[i] * LOTTO_WIN[i]);
        }
        
        return total.reduce((a,b) => (a+b));
      }
    
    // 수익률 내려면 howManyWin, 로또 구입비

    printResult(howManyWin) {
        Console.print(`3개 일치 (5,000원) - ${howManyWin[0]}개`);
        Console.print(`4개 일치 (50,000원) - ${howManyWin[1]}개`);
        Console.print(`5개 일치 (1,500,000원) - ${howManyWin[2]}개`);
        Console.print(`5개 일치, 보너스 볼 일치 (30,000,000원) - ${howManyWin[3]}개`);
        Console.print(`6개 일치 (2,000,000,000원) - ${howManyWin[4]}개`);
    }
}

module.exports = CompareLotto;