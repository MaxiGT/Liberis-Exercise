import { checkEligibility } from './utils';
import * as f1 from "../files/1.json";
import * as f2 from "../files/2.json";
import * as f3 from "../files/3.json";
import * as f4 from "../files/4.json";
import * as f5 from "../files/5.json";
import * as f6 from "../files/6.json";
import * as f7 from "../files/7.json";
import * as f8 from "../files/8.json";
import * as f9 from "../files/9.json";

describe('Check Eligibility', () => {

	xit('Should process file 1 and return true (eligible)', () => {
    const obj = checkEligibility(f1);
    const expected = true;
    expect(obj).toEqual(expected);
	});

	xit('Should process file 2 and return true (eligible)', () => {
    const obj = checkEligibility(f2);
    const expected = true;
    expect(obj).toEqual(expected);
	});

	xit('Should process file 3 and return false (non eligible)', () => {
    const obj = checkEligibility(f3);
    const expected = false;
    expect(obj).toEqual(expected);
	});
    
	xit('Should process file 4 and return false (non eligible)', () => {
    const obj = checkEligibility(f4);
    const expected = false;
    expect(obj).toEqual(expected);
	});

	xit('Should process file 5 and return false (non eligible)', () => {
    const obj = checkEligibility(f5);
    const expected = false;
    expect(obj).toEqual(expected);
	});

	it('Should process file 6 and return true (eligible)', () => {
    const obj = checkEligibility(f6);
    const expected = true;
    expect(obj).toEqual(expected);
	});

	xit('Should process file 7 and return false (non eligible)', () => {
    const obj = checkEligibility(f7);
    const expected = false;
    expect(obj).toEqual(expected);
	});

	xit('Should process file 8 and return false (non eligible)', () => {
    const obj = checkEligibility(f8);
    const expected = false;
    expect(obj).toEqual(expected);
	});

	xit('Should process file 9 and return false (non eligible)', () => {
    const obj = checkEligibility(f9);
    const expected = false;
    expect(obj).toEqual(expected);
	});
})