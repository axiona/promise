import Pool from "../../../dist/pool/pool.js";

jasmine.DEFAULT_TIMEOUT_INTERVAL = 10 * 1000;

it('force console log', () => { spyOn(console, 'log').and.callThrough();});


function Timeout(second: number) : Promise<void> {

    return new Promise(resolve => {

        setTimeout(resolve, second * 1000);
    });
}

function CurrentTimestamp() : number {

    return Math.floor((new Date()).getTime() / 1000);
}


describe('test', function() {

    const pool = new Pool();

    let time = CurrentTimestamp();
    let data = new Map<number, number>();

    for(let i = 1; i <=5; i++) {
        pool.add(() => Timeout(1).then(() => {
            data.set(i, CurrentTimestamp());
        }));
    }


    it('value', function(done) {

        Timeout(6).then(() => {

            for (const [key, value] of data) {

                expect(time + key).toBe(value);
            }

            done();
        });

    });

});

describe('test', function() {

    const pool = new Pool(2);

    let time = CurrentTimestamp();
    let data = new Map<number, number>();

    for(let i = 0; i <=10; i++) {
        pool.add(() => Timeout(1).then(() => {
            data.set(i, CurrentTimestamp());
        }));
    }


    it('value', function(done) {

        Timeout(6).then(() => {

            expect(time + 2).toBe(data.get(1) as number);
            expect(time + 2).toBe(data.get(2) as number);
            expect(time + 3).toBe(data.get(3) as number);
            expect(time + 3).toBe(data.get(4) as number);
            expect(time + 4).toBe(data.get(5) as number);
            expect(time + 4).toBe(data.get(6) as number);
            expect(time + 5).toBe(data.get(7) as number);
            expect(time + 5).toBe(data.get(8) as number);
            expect(time + 6).toBe(data.get(9) as number);
            expect(time + 6).toBe(data.get(10) as number);

            done();
        });

    });

});