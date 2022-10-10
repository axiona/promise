export default function Timeout(seconds: number) : Promise<number> {

    const millisecond = seconds * 1000;

    return new Promise(resolve => {

        setTimeout(()=>resolve(millisecond), millisecond);

    });
}