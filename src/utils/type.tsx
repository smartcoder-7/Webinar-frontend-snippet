export function withProperties<A, B>(component: A, properties: B): A & B {
    Object.keys(properties).forEach(key => {
        ;(component as any)[key] = (properties as any)[key];
    });
    return component as A & B;
}

export const enumValuesToArray = (enumObject: Object, propValue: string = 'value', subProp: string = 'label') => Object.values(enumObject).map((val: string) => ({
    [propValue]: val,
    [subProp]: val
}));
