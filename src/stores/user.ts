import { observable, flow } from 'mobx';
import { BaseStore } from '@stores/base';
import { commitQuery } from '@services/graphql';
import { FetchPayload } from 'globals';

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


export class UserStore extends BaseStore {
    @observable user = null;

    fetch = flow(function* fetch(this: UserStore & BaseStore, payload?: FetchPayload) {
        try {
            this.startRequest();
            const response = yield commitQuery(MY_USER_QUERY, payload?.token);
            this.user = response.data.myUser;
            this.endRequest();
        } catch (err) {
            this.handleError(err);
        }

        return this;
    })
}

export default new UserStore();
