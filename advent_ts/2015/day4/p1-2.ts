import md5 from './md5.js';

const input = 'bgvyzdsv';

const findSecret = (numZeroes: number) => {
	let secret;
	let i = 0;
	const leadingZeroes = Array(numZeroes).fill('0').join('');
	while (!secret && i < Number.MAX_SAFE_INTEGER) {
		const hash = md5(`${input}${i}`);
		if (hash.startsWith(leadingZeroes)) {
			secret = i;
		}
		i++;
	}
	return secret;
};

const secret5Zeroes = findSecret(5);
const secret6Zeroes = findSecret(6);

console.log('5 zeroes: ');
console.log(secret5Zeroes);
console.log('6 zeroes: ');
console.log(secret6Zeroes);
