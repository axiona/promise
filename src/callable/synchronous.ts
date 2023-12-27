import Callable from '@axiona/function/callable.js';
import Argument from '@axiona/function/argument/argument.js';

export async function SynchronousParameters<
    Callback extends Callable,
>(
    event : Iterable<Callback>,
    argument : Parameters<Callback>
) : Promise<ReturnType<Callback>[]>;
export async function SynchronousParameters<
    Callback extends Callable,
>(
    event : Iterable<Callback>,
) : Promise<ReturnType<Callback>[]>;
export async function SynchronousParameters<
    Callback extends Callable,
>(
    event : Iterable<Callback>,
    argument : Parameters<Callback>|[] = []
) : Promise<ReturnType<Callback>[]> {

    const returns : ReturnType<Callback>[] = [];

    for (const callback of event) {

        returns.push(
            await callback(...argument) as ReturnType<Callback>
        );
    }

    return returns;

}

export type SynchronousArgument<Callback extends Callable> = Argument<Parameters<Callback>> & {
    event : Iterable<Callback>
};


export async function SynchronousParameter<
    Callback extends Callable,
>(  {
        event,
        argument
    } : SynchronousArgument<Callback>
) : Promise<ReturnType<Callback>[]> {

    return SynchronousParameters(event, argument);

}


namespace Synchronous {
    export const Parameters = SynchronousParameters;
    export const Parameter = SynchronousParameter;
    export type Argument<Callback extends Callable> = SynchronousArgument<Callback>;
}
export default Synchronous;
