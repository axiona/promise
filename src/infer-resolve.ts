


export type InferResolve<Promise, Fail = never> = Promise extends PromiseLike<infer Type> ? Type : Fail;

export default InferResolve;