type Unpacked<T> = T extends (infer U)[] ? U : T;

export class BaseErrorHelper<T> {
    constructor(public errors: any) { }

    getChildPrefix<K extends keyof T>(index: K): string {
        return String(index);
    }

    getError(index: any): string {
        return this.errors[index];
    }

    getAny(index: any, nameInto = index): string {
        let indexName = this.getChildPrefix(index);
        let string = this.getError(indexName);

        if (string != null) {
            string = string.replace(indexName, String(nameInto));
        }

        return string;
    }

    get(index: keyof T, nameInto: string = String(index)): string {
        return this.getAny(index, nameInto);
    }

    getChild<K extends keyof T, K2 extends keyof T[K]>(
        index: K,
        name: K2,
        nameInto: string = String(index),
    ) {
        return this.getAny(`${String(index)}.${String(name)}`, nameInto);
    }

    child<K extends keyof T>(index: K): ErrorChild<NonNullable<T[K]>> {
        return new ErrorChild<T[K]>(this.getChildPrefix(index), this.errors);
    }

    childArray<K extends keyof T>(
        name: K,
        index: number,
    ): ErrorArrayChild<NonNullable<Unpacked<T[K]>>> {
        return new ErrorArrayChild<Unpacked<T[K]>>(
            this.getChildPrefix(name),
            index,
            this.errors,
        );
    }
}

export class ErrorHelper<T> extends BaseErrorHelper<T> {
    constructor(public errors: Record<keyof T, string>) {
        super(errors);
    }

    getChildPrefix<K extends keyof T>(index: K): string {
        return String(index);
    }
}

export class ErrorChild<T> extends BaseErrorHelper<T> {
    constructor(public prefix: string, public errors: any) {
        super(errors);
    }

    getChildPrefix<K extends keyof T>(index: K): string {
        return `${this.prefix}.${String(index)}`;
    }
}

export class ErrorArrayChild<T> extends BaseErrorHelper<T> {
    constructor(public prefix: string, public index: number, public errors: any) {
        super(errors);
    }

    getChildPrefix<K extends keyof T>(index: K): string {
        return `${this.prefix}.${this.index}.${String(index)}`;
    }
}

// export class ErrorHelper {
//   constructor(public prefix: string, public errors: any) {}
//
//   getIndex(index: any, name: string): string {
//     return `${this.prefix}.${index}.${name}`;
//   }
//
//   getError(index: any): string | undefined {
//     return this.errors[index];
//   }
//
//   get(index: any, name: string, nameInto = name): string | undefined {
//     index = this.getIndex(index, name);
//     let string = this.getError(index);
//
//     if (string != null) {
//       string = string.replace(index, nameInto);
//     }
//
//     return string;
//   }
//
//   getArr(index: any, nameInto = index): string | undefined {
//     index = `${this.prefix}.${index}`;
//     let string = this.getError(index);
//
//     if (string != null) {
//       string = string.replace(
//         index.replace('_', ' '),
//         nameInto.replace('_', ' '),
//       );
//     }
//
//     return string;
//   }
// }
