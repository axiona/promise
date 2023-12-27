import Callable from '@axiona/function/callable.js';
import Argument from '@axiona/function/argument/argument.js';

export async function ConcurrencyParameters<
    Callback extends Callable,
>(
    event : Iterable<Callback>,
    concurrency : number,
    argument : Parameters<Callback>
) : Promise<ReturnType<Callback>[]>;
export async function ConcurrencyParameters<
    Callback extends Callable,
>(
    event : Iterable<Callback>,
    concurrency : number,
) : Promise<ReturnType<Callback>[]>;
export async function ConcurrencyParameters<
    Callback extends Callable,
>(
    event : Iterable<Callback>,
    concurrency : number,
    argument : Parameters<Callback>|[] = []
) : Promise<ReturnType<Callback>[]> {

    const returns : ReturnType<Callback>[] = [];
    const buffers : ReturnType<Callback>[] = [];

    for (const callback of event) {

        buffers.push(
            callback(...argument) as ReturnType<Callback>
        );

        if(buffers.length === concurrency) {

            returns.push(...await Promise.all(buffers));
            buffers.length = 0;
        }
    }

    // last and less than concurrency
    if(buffers.length) {

        returns.push(...await Promise.all(buffers));
    }

    return returns;

}

export type ConcurrencyArgument<Callback extends Callable> = Argument<Parameters<Callback>> & {
    event : Iterable<Callback>
};


export async function ConcurrencyParameter<
    Callback extends Callable,
>(  {
        event,
        concurrency,
        argument
    } : ConcurrencyArgument<Callback> & {concurrency:number}
) : Promise<ReturnType<Callback>[]> {

    return ConcurrencyParameters(event, concurrency, argument);

}


namespace Concurrency {
    export const Parameters = ConcurrencyParameters;
    export const Parameter = ConcurrencyParameter;
    export type Argument<Callback extends Callable> = ConcurrencyArgument<Callback>;
}
export default Concurrency;
