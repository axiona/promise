import InferResolve from '../infer-resolve';
import Resolved from "./resolved";
import Union from "../union";
import {List} from "ts-toolbelt";

export function ResolveParameters<
    RecordType extends Record<PropertyKey, Union<any>>,
    Keys extends ReadonlyArray<keyof RecordType>
>(
    object : RecordType,
    keys : [...Keys]
) : ResolveReturn<RecordType, Keys> {

    const promises = keys.map(key => {

        return Promise.resolve(object[key])
            .then(resolve => ({[key]: resolve}));
    });

    return Promise.all(promises).then(resolves=>{
        return Object.assign({}, ...resolves);
    });
}

export type ResolveArgument<
    RecordType extends Record<PropertyKey, Union<any>>,
    Keys extends ReadonlyArray<keyof RecordType>
> = {
    object : RecordType,
    keys : [...Keys]
};

export function ResolveParameter<
    RecordType extends Record<PropertyKey, Union<any>>,
    Keys extends ReadonlyArray<keyof RecordType>
>(  {
        object,
        keys,
    } : ResolveArgument<RecordType, Keys>
) : ResolveReturn<RecordType, Keys> {

    return ResolveParameters(object, keys);
}

export type ResolveReturn<
    RecordType extends Record<PropertyKey, Union<any>>,
    Keys extends ReadonlyArray<keyof RecordType>
    > = Promise<Resolved<Pick<RecordType, List.UnionOf<Keys>>>>;

namespace Resolve {

    export const Parameters = ResolveParameters;
    export type Argument<
        RecordType extends Record<PropertyKey, Union<any>>,
        Keys extends ReadonlyArray<keyof RecordType>
    > = ResolveArgument<RecordType, Keys>;
    export const Parameter = ResolveParameter;
    export type Return<
        RecordType extends Record<PropertyKey, Union<any>>,
        Keys extends ReadonlyArray<keyof RecordType>
    > = ResolveReturn<RecordType, Keys>;
}

export default Resolve;
