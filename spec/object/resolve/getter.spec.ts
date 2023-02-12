import Resolve, {ResolveParameters} from '../../../dist/object/resolve.js';
import Readable from '@alirya/object/property/boolean/readable.js';

it('force console log', () => { spyOn(console, 'log').and.callThrough();});




describe('class', function() {

    class Test {

        get number() {
            return Promise.resolve(2)
        }

        get string() {
            return Promise.resolve('string')
        }

        get boolean() {
            return Promise.resolve(true)
        }
        set boolean(a) {

        }
    }

    const results : number[] = [];

    it('value', function(done) {

        const source = ResolveParameters(new Test, ['number', 'string', 'boolean']);

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

describe('object', function() {

    const obj = {
        get number() {
            return Promise.resolve(2);
        },

        get string() {
            return Promise.resolve('string');
        },

        get boolean() {
            return Promise.resolve(true);
        }
    };

    const results : number[] = [];

    it('value', function(done) {

        const source = ResolveParameters(obj, ['number', 'string', 'boolean']);

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
