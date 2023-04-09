import {describe, test, expect} from '@jest/globals';

describe(`Basic test`, () => {
    test(`Truth test`, () => {
        console.log(process.env.TEST_APPLE_ID_USER)
        expect(true).toBeTruthy();
    });
});