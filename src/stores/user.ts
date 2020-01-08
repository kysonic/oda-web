import { observable, action, decorate, flow } from 'mobx';
import { BaseStoreFactory, BaseStoreDecorators, BaseStoreFactoryType } from '@stores/base';
import { assign } from '@utils/object';
import { commitQuery } from '@services/graphql';
import { IObservableDecorator } from 'mobx/lib/api/observabledecorator';
import { User } from '../types/schema';

const MY_USER_QUERY = `
query {
  myUser {
      id
      name
      email
      emailApproved
      createdAt
      updatedAt
      role {
        id
        name
        type
      }
    }
}`;

export type UserStoreFactoryType = {
    user: User;

    fetch: () => Promise<any>;
}

export function UserStoreFactory(): UserStoreFactoryType {
    return {
        user: {
            id: '',
            email: '',
            emailApproved: false,
            name: '',
            role: {
                id: '',
                privileges: [],
            },
            password: '',
            createdAt: '',
            updatedAt: '',
        },

        fetch: flow(function* fetch(this: UserStoreFactoryType & BaseStoreFactoryType, token?: string) {
            this.startRequest();
            try {
                const response = yield commitQuery(MY_USER_QUERY, token);
                this.user = response.data.myUser;
            } catch (err) {
                return this.handleError(err);
            }
            this.endRequest();
        }),
    };
}

export type UserStoreDecoratorsType = {
    user: IObservableDecorator;

    fetch: any;
}

export function UserStoreDecorators(): UserStoreDecoratorsType {
    return {
        user: observable,

        fetch: action,
    };
}

export function UserStore(): any {
    return decorate(
        assign(UserStoreFactory(), BaseStoreFactory()),
        assign(UserStoreDecorators(), BaseStoreDecorators())
    );
}

export default UserStore();
