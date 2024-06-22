function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms))
}

const phrases = ['vidiš!', 'voliš.', 'radiš :)'];

const h2word = 'ZAISKRI.';

const TW = document.getElementById("typewriter");

const TW2 = document.getElementById("typewriter2");

let sleepTime = 100;

let curPhraseIndex = 0;

const writeLoop = async () => {
    while (true) {
        let curWord = phrases[curPhraseIndex];

        for (let i = 0; i < curWord.length; i++) {
            TW.innerText = curWord.substring(0, i + 1);
            await sleep(sleepTime);
        }

        await sleep(sleepTime * 10);

        for (let i = curWord.length; i > 0; i--) {
            TW.innerText = curWord.substring(0, i - 1);
            await sleep(sleepTime);
        }

        await sleep(sleepTime * 5);

        if (curPhraseIndex === phrases.length - 1) {
            curPhraseIndex = 0;
        }
        else {
            curPhraseIndex++;
        }
    }
};

const h2writeLoop = async () => {
    while (true) {
        let word = h2word;

        for (let i = 0; i < word.length; i++) {
            TW2.innerText = word.substring(0, i + 1);
            await sleep(sleepTime);
        }

        await sleep(sleepTime * 10);

        for (let i = word.length; i > 0; i--) {
            TW2.innerText = word.substring(0, i - 1);
            await sleep(sleepTime);
        }

        await sleep(sleepTime * 5);
    }
}

writeLoop();

h2writeLoop();