import type {UnwrapNestedRefs} from "@vue/reactivity";
import type {ComputedRef, Ref} from "vue";

type UtilsStructAnyObject = { [name: string]: any; };
type UtilsStructLogClassReturn<T, EX extends (keyof T)[]> = Omit<T, EX[number]>;
type UtilsStructGroupByReturn<T> = {
    key: keyof T;
    values: T[][];
};

interface UtilsStruct {
    unwrapSet<T extends UtilsStructAnyObject, K extends keyof T, V extends T[K]['value']>(context: T, key: K, value: V): void;
    unwrap<T>(v: Ref<T> | T): T;
    logClass<T, EX extends (keyof T)[]>(classObject: T, exclude: EX): UtilsStructLogClassReturn<T, EX>;
    groupBy<T>(array: T[], key: keyof T): UtilsStructGroupByReturn<T>;
    arraysEqual(arr1: any[], arr2: any[]): boolean;
    sortWithArrayOrdering<A, K extends keyof A>(arr: A[], objValueKey: K, values?:any[]): A[];
    spliceFind<T>(arr: T[], handler: (el: T) => boolean): T[];
    trimStr(str: string, trim: string): string;
    clearRefArray(array: UnwrapNestedRefs<any[]>): void;
    clearRefObject(obj: UnwrapNestedRefs<any>): void;
    stringOrComputedValue(str: string | ComputedRef<string>): string;
    dateToString(date: string): string;
    benchmark(name?: string): () => number;
}

class Utils implements UtilsStruct {
    unwrapSet<T extends UtilsStructAnyObject, K extends keyof T, V extends T[K]['value']>(context: T, key: K, value: V): void {
        if (isRef(context[key])) {
            context[key].value = value;
        } else {
            context[key] = value as T[K];
        }
    }

    unwrap<T>(v: Ref<T> | T): T {
        return isRef(v) ? v.value : v;
    }

    logClass<T, EX extends (keyof T)[]>(classObject: T, excludes: EX): UtilsStructLogClassReturn<T, EX> {
        const classJSON = { ...classObject };

        for (const exclude of excludes) {
            delete classJSON[exclude];
        }

        return classJSON;
    }

    groupBy<T>(array: T[], key: keyof T): UtilsStructGroupByReturn<T> {
        const values = new Map<T[keyof T], T[]>();

        for (let i = 0; i < array.length; ++i) {
            const value = array[i];

            const valuesT = values.get(value[key]);
            if (valuesT) {
                valuesT.push(value);
            } else {
                values.set(value[key], [value]);
            }
        }

        return {
            key,
            values: [...values.values()]
        };
    }

    arraysEqual(arr1: any[], arr2: any[]): boolean {
        return arr1.length === arr2.length && arr1.every((el, i) => el === arr2[i]);
    }

    sortWithArrayOrdering<A, K extends keyof A>(arr: A[], objValueKey: K, values: any[] = []): A[] {
        const arrCopy = [...arr];
        const sortedArr: A[] = [];

        for (let valIndex = 0; valIndex < values.length; ++valIndex) {
            const findEl = arrCopy.findIndex(el => el[objValueKey] === values[valIndex]);
            if (findEl !== -1) sortedArr.push(...arrCopy.splice(findEl, 1));
        }

        sortedArr.push(...arrCopy);

        return sortedArr;
    }

    spliceFind<T>(arr: T[], handler: (el: T) => boolean): T[] {
        const removed: T[] = [];

        for (let elIndex = 0; elIndex < arr.length; ++elIndex) {
            if (handler(arr[elIndex])) {
                removed.push(...arr.splice(elIndex, 1));
                --elIndex;
            }
        }

        return removed;
    }

    trimStr(str: string, trim: string): string {
        if (trim === '') return str;
        return str.replace(new RegExp(`^${trim}+|(${trim}+)$`, 'g'), "");
    }

    clearRefArray(array: UnwrapNestedRefs<any[]>): void {
        array.splice(0, array.length);
    }

    clearRefObject(obj: UnwrapNestedRefs<any>): void {
        for (const key in Object.keys(obj)) {
            delete obj[key];
        }
    }

    stringOrComputedValue(str: string | ComputedRef<string>): string {
        return typeof str === 'string' ? str : str.value;
    }

    dateToString(date: string): string {
        function padNum(num: number, len: number = 2, char: string = '0'): string {
            return num.toString().padStart(len, char);
        }

        const objDate = new Date(date);

        const day = objDate.getDate();
        const month = objDate.getMonth() + 1;
        const year = objDate.getFullYear();

        return `${padNum(day)}.${padNum(month)}.${year}`;
    }

    benchmark(name?: string): () => number {
        const startTimer = Date.now();

        return () => {
            const entTimer = Date.now();
            const deltaTimer = entTimer - startTimer;
            console.log(`Benchmark${name ? ` [${name}]` : ''} выполнил свою работу за ${deltaTimer}. [${startTimer}; ${entTimer}].`);
            return deltaTimer;
        };
    }
}

const utilsObj = new Utils();

export default function (): UtilsStruct {
    return utilsObj;
}
