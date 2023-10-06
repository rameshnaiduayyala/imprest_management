export function getValueByNestedProp(data: any, path: string, isNestedProperty: boolean | undefined): string {
    if (data === undefined || data === null) {
        return "";
    }

    if (!isNestedProperty) {
        return data[path];
    }

    const props = path.split('.');
    let value = data;
    for (const prop of props) {
        try {
            value = value[prop];
        }
        catch (ex) {
            console.log(ex);
        }
    }
    return value;
}