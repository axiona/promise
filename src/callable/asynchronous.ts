import Callable from '@axiona/function/callable.js';
import Argument from '@axiona/function/argument/argument.js';

export function AsynchronousParameters<
    Callback extends Callable
>(
    event : Iterable<Callback>,
    argument : Parameters<Callback>
) : Promise<ReturnType<Callback>[]>;
export function AsynchronousParameters<
    Callback extends Callable
>(
    event : Iterable<Callback>,
) : Promise<ReturnType<Callback>[]>;
export function AsynchronousParameters<
    Callback extends Callable
>(
    event : Iterable<Callback>,
    argument : Parameters<Callback>|[] = []
) : Promise<ReturnType<Callback>[]> {

    const promises : Promise<any>[] = [];

    for (const callback of event) {

        promises.push(
            Promise.resolve(callback(argument))
        );
    }

    return Promise.all(promises);

}



export type AsynchronousArgument<Callback extends Callable> = Argument<Parameters<Callback>> & {
    event : Iterable<Callback>
};

export function AsynchronousParameter<
    Callback extends Callable,
>(  {
        event,
        argument
    } : AsynchronousArgument<Callback>
) : Promise<ReturnType<Callback>[]> {

    return AsynchronousParameters(event, argument);

}


namespace Asynchronous {
    export const Parameters = AsynchronousParameters;
    export const Parameter = AsynchronousParameter;
}
export default Asynchronous;
