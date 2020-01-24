import { gql } from 'apollo-boost';

const USER_FIELDS = `
    id
    name
    email
    emailApproved
    role {
        id
        name
    }
`;

export const MY_USER_QUERY = gql`
    query {
        myUser {
            ${USER_FIELDS}
        }
    }
`;


export const LOGIN_MUTATION = gql`
    mutation Login($email: String!, $password: String!) {
        login(email: $email, password: $password) {
            token
            user {
                ${USER_FIELDS}
            }
        }
    }
`;
