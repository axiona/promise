import MapPromises from '../map-promises';
import {ConcurrencyParameters} from '../../../dist/callable/concurrency';

it('force console log', () => { spyOn(console, 'log').and.callThrough();});


describe('test', function() {

    const results : number[] = [];

    it('value', function(done) {

        const source = ConcurrencyParameters(MapPromises(results,
            751, 251, 501, 1,
            2, 752, 252, 502,
            253, 503, 3, 753,
        ).values(), 4);

        source.then(()=>{

            expect(results).toEqual([
                1, 251, 501, 751,
                2, 252, 502, 752,
                3, 253, 503, 753
            ]);
            done();
        });

    });

});
