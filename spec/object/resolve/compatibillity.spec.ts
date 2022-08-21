import Resolve, {ResolveParameters} from "../../../dist/object/resolve";

it('force console log', () => { spyOn(console, 'log').and.callThrough();});


let type = {
    number : Promise.resolve(2),
    string : Promise.resolve('string'),
    boolean : Promise.resolve(true),
};

describe('test', function() {

    const results : number[] = [];

    it('value', function(done) {

        const source = ResolveParameters(type, ['number', 'string', 'boolean']);

        source.then((result)=>{

            const number: number = result.number;
            const string: string = result.string;
            const boolean: boolean = result.boolean;
            done();
        });

    });

});
