import InferResolve from '../infer-resolve.js';
import Union from '../union.js';

type Resolved<Object extends Record<PropertyKey, Union<any>>> = {
    [K in keyof Object] : InferResolve<Object[K], Object[K]>
};

export default Resolved;
