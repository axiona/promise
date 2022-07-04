
export default function MapPromises(result: number[], ...delays : number[]) : Map<number, ()=>Promise<void>> {

    const map = new Map();

    for (const delay of delays) {

        map.set(delay, ()=>new Promise<void>((resolve, reject) => {

            setTimeout(()=> {
                resolve();
                result.push(delay);
            }, delay);

        }));
    }

    return map;

}