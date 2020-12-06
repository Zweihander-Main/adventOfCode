import fs from 'fs';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const inputArray = fs
	.readFileSync(path.resolve(__dirname, 'input.txt'))
	.toString()
	.split('\n');

const len = inputArray.length - 1; //newline at end

const REQUIRED_FIELDS = [
	'byr',
	'iyr',
	'eyr',
	'hgt',
	'hcl',
	'ecl',
	'pid',
	'cid',
] as const;
type Passport = Partial<Record<typeof REQUIRED_FIELDS[number], string>>;

const hasRequiredFields = (pass: Passport): boolean => {
	for (let i = 0, len = REQUIRED_FIELDS.length; i < len; i++) {
		if (
			REQUIRED_FIELDS[i] !== 'cid' &&
			!pass.hasOwnProperty(REQUIRED_FIELDS[i])
		) {
			return false;
		}
	}
	return true;
};

const fieldsValid = (pass: Passport): boolean => {
	for (let i = 0, len = REQUIRED_FIELDS.length; i < len; i++) {
		const fieldToValidate = REQUIRED_FIELDS[i];
		const value = pass[fieldToValidate] as string;
		switch (fieldToValidate) {
			case 'byr': {
				const year = parseInt(value, 10);
				if (!(year >= 1920 && year <= 2002)) {
					return false;
				}
				break;
			}
			case 'iyr': {
				const year = parseInt(value, 10);
				if (!(year >= 2010 && year <= 2020)) {
					return false;
				}
				break;
			}
			case 'eyr': {
				const year = parseInt(value, 10);
				if (!(year >= 2020 && year <= 2030)) {
					return false;
				}
				break;
			}
			case 'hgt': {
				if (value.endsWith('cm')) {
					const cm = parseInt(value.substring(0, value.length - 2));
					if (!(cm >= 150 && cm <= 193)) {
						return false;
					}
				} else if (value.endsWith('in')) {
					const inches = parseInt(
						value.substring(0, value.length - 2)
					);
					if (!(inches >= 59 && inches <= 76)) {
						return false;
					}
				} else {
					return false;
				}

				break;
			}
			case 'hcl': {
				const regex = /^#[0-9a-f]{6}$/;
				if (!regex.test(value)) {
					return false;
				}

				break;
			}
			case 'ecl': {
				const regex = /^amb|blu|brn|gry|grn|hzl|oth$/;
				if (!regex.test(value)) {
					return false;
				}
				break;
			}
			case 'pid': {
				const regex = /^[0-9]{9}$/;
				if (!regex.test(value)) {
					return false;
				}
				break;
			}
			case 'cid':
				break;
		}
	}
	return true;
};

const stringToPassport = (s: string): Passport => {
	const passport = {};
	const attrArr = s.trim().split(' ');
	for (let j = 0, attrLen = attrArr.length; j < attrLen; j++) {
		const attrTuple = attrArr[j].split(':');
		passport[attrTuple[0]] = attrTuple[1];
	}
	return passport;
};

const passports: Array<Passport> = [];
let currentPassport = '';
for (let i = 0; i < len; i++) {
	const passLine = inputArray[i];
	if (passLine !== '') {
		currentPassport += `${passLine} `;
	} else {
		passports.push(stringToPassport(currentPassport));
		currentPassport = '';
	}
}
passports.push(stringToPassport(currentPassport));

let checkedPassports = 0;
let validatedPassports = 0;
for (let i = 0, lenPass = passports.length; i < lenPass; i++) {
	if (hasRequiredFields(passports[i])) {
		checkedPassports++;
		if (fieldsValid(passports[i])) {
			validatedPassports++;
		}
	}
}

console.log('Part 1: ');
console.log(checkedPassports);
console.log('Part 2: ');
console.log(validatedPassports);
