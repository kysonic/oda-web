import { UserStore, UserStoreFactoryType } from '@stores/user';

export type AppStoreInitialStateType = {
    stores: {
        userStore: UserStoreFactoryType | null;
    };
}

export type AppStoreFactoryType = {
    stores: {
        userStore: UserStoreFactoryType;
    };

    fetch: (token?: string) => Promise<AppStoreInitialStateType>;
}

export function AppStoreFactory(): AppStoreFactoryType {
    return {
        stores: {
            userStore: UserStore(),
        },

        async fetch(token?: string): Promise<AppStoreInitialStateType> {
            const initialState = { stores: { userStore: null } };

            const results = await Promise.all(Object.values(this.stores)
                .map((store: any): Promise<any> | null => store.fetch && typeof store.fetch === 'function' && store.fetch(token)));

            Object.keys(this.stores).forEach((storeName: string, i) => {
                initialState.stores[storeName] = results[i];
            });

            return initialState;
        },
    };
}

export function AppStore() {
    return AppStoreFactory();
}

export default AppStore();
