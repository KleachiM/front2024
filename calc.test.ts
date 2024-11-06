import { getTwo } from "./functions";

describe('Evaluate', () => {
    it('should work', () => {
        const res = getTwo();
        expect(res).toEqual(2);
    });
});