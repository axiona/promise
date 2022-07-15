import InferResolve from '../infer-resolve';


export default function Resolve<
    RecordType extends Record<any, unknown|Promise<unknown>>,
    >(
        object : RecordType,
) : Promise<ResolveReturn<RecordType>> {

    const promises = Object.entries(object)
        .map(([key, value])=>
            Promise.resolve(value).then(resolve => ({[key] : resolve}))
        );

    return Promise.all(promises).then(resolves=>{
        return Object.assign({}, ...resolves);
    });
}


export type ResolveReturn<Object extends Record<any, unknown|Promise<unknown>>> = {
    [K in keyof Object] : InferResolve<Object[K], Object[K]>
};

