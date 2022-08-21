import InferResolve from "../infer-resolve";
import Union from "../union";

type Resolved<Object extends Record<PropertyKey, Union<any>>> = {
    [K in keyof Object] : InferResolve<Object[K], Object[K]>
};

export default Resolved;
