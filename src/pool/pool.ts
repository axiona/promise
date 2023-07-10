import Callable from '@alirya/function/callable.js';


export default class Pool {

    private pools : Callable<[], Promise<any>>[] = [];

    private active: Promise<any>|null = null;

    constructor(public concurrent: number = 1) {}

    append(...promiseFactory: Callable<[], Promise<any>>[]) : void {

        this.pools.push(...promiseFactory);
        this.execute();
    }

    prepend(...promiseFactory: Callable<[], Promise<any>>[]) : void {

        this.pools.unshift(...promiseFactory);
        this.execute();
    }

    last() : Promise<any>|null {

        return this.active;
    }

    protected next() : Promise<any>|null {

        const promises = this.pools
            .splice(0, this.concurrent)
            .map(data => data());

        if(promises.length) {

            return Promise.all(promises);
        }

        return null;
    }

    protected execute() {

        if(this.active) {

            return;
        }

        this.active = this.next();

        if(this.active) {

            this.active.then(() => {

                this.active = null;
                this.execute();
            });
        }

    }

}