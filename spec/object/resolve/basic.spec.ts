import Resolve from "../../../dist/object/resolve";

it('force console log', () => { spyOn(console, 'log').and.callThrough();});


let type = {
    number : Promise.resolve(2),
    string : Promise.resolve('string'),
    boolean : Promise.resolve(true),
};

describe('test', function() {

    const results : number[] = [];

    it('value', function(done) {

        const source = Resolve(type);

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
