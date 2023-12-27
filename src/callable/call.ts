import Callable from '@axiona/function/callable.js';
import Argument from '@axiona/function/argument/argument.js';

export function CallParameters<
    Callback extends Callable,
>(
    event : Iterable<Callback>,
    argument : Parameters<Callback>
) : ReturnType<Callback>[];
export function CallParameters<
    Callback extends Callable<[]>,
>(
    event : Iterable<Callback>,
) : ReturnType<Callback>[];
export function CallParameters<
    Callback extends Callable,
>(
    event : Iterable<Callback>,
    argument : Parameters<Callback>|[] = []
) : ReturnType<Callback>[]{

    const promises : ReturnType<Callback>[] = [];

    for (const callback of event) {

        promises.push(
            callback(...argument) as ReturnType<Callback>
        );
    }

    return promises;
}

export type CallArgument<Callback extends Callable> = Argument<Parameters<Callback>> & {
    event : Iterable<Callback>
};


export function CallParameter<
    Callback extends Callable,
>(  {
        event,
        argument
    } : CallArgument<Callback>
) : ReturnType<Callback>[] {

    return CallParameters(event, argument);
}


namespace Call {
    export const Parameters = CallParameters;
    export const Parameter = CallParameter;
    export type Argument<Callback extends Callable> = CallArgument<Callback>;
}
export default Call;
