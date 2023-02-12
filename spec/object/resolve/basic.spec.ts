import Resolve, {ResolveParameters} from '../../../dist/object/resolve.js';

it('force console log', () => { spyOn(console, 'log').and.callThrough();});


const type = {
    number : Promise.resolve(2),
    string : Promise.resolve('string'),
    boolean : Promise.resolve(true),
};

describe('test', function() {

    const results : number[] = [];

    it('value', function(done) {

        const source = ResolveParameters(type, ['number', 'string', 'boolean']);

        source.then((result)=>{

            expect(result).toEqual({
                number : 2,
                string : 'string',
                boolean : true,
            });
            done();
        });

    });

});
