export function getLocalStorage(key: string) {
    const data = localStorage.getItem(key);
    if (!data) {
        return null;
    }
    return JSON.parse(data);
}

export function setLocalStorage(key: string, value: any): void {
    localStorage.setItem(key, JSON.stringify(value));
}

export function removeFieldsLocalStorage(key: string): void {
    localStorage.removeItem(key);
}
