import Callable from '@alirya/function/callable.js';

export function * MapParameters<
    Argument extends unknown[],
    Next extends Callable,
    Callback extends Callable<Argument, Next> = Callable<Argument, Next>,
>(
    argument: Iterable<Argument>,
    callable: Callback
) : Iterable<Next> {

    for(const args of argument) {

        yield callable(...args);
    }

}
