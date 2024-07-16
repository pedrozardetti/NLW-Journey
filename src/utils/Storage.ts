export const saveToStorage = (key: string, value: any) => {
    sessionStorage.setItem(key, JSON.stringify(value));
}

