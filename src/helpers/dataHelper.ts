const arrayDiff = (a1: Array<number | string>, a2: Array<number | string>) => {
    const a: any[] = [];
    const diff: string[] = [];

    for (let i = 0; i < a1.length; i++) {
        // @ts-ignore
        a[a1[i]] = true;
    }

    for (let i = 0; i < a2.length; i++) {
        // @ts-ignore
        if (a[a2[i]]) {
            // @ts-ignore
            delete a[a2[i]];
        } else {
            // @ts-ignore
            a[a2[i]] = true;
        }
    }

    for (const k in a) {
        diff.push(k);
    }

    return diff;
};
const shuffleArray = (array: any[]) => {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        const temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    return array;
};

const arrayRand = (array: any[], limit = 1) => {
    const shuffledArray = shuffleArray(array);
    return shuffledArray.splice(0, limit).sort();
};
const randomNumberBetweenRange = (min: number, max: number) => Math.round(Math.random() * (max - min) + min);

const randomId = (length: number) => {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    for (let i = 0; i < length; i += 1) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
};

export { arrayDiff, shuffleArray, arrayRand, randomNumberBetweenRange, randomId };
