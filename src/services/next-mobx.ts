import stores from '@stores/global';
import { FetchPayload } from 'globals';

export async function initStores(payload?: FetchPayload): Promise<Record<string, any>> {
    const initialState: any = { stores: {} };

    const results = await Promise.all(Object.values(stores)
        .map((store: any): Promise<any> | null => store.fetch && typeof store.fetch === 'function' && store.fetch(payload)));

    Object.keys(stores).forEach((storeName: string, i) => {
        initialState.stores[storeName] = results[i];
    });

    return initialState;
}

export function applyStoresInitialState(initialState): void {
    Object.keys(stores).forEach((storeName: string) => {
         stores[storeName]?.applyInitialState(initialState?.stores[storeName]);
    });
}
