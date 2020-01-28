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

export const SIGNUP_MUTATION = gql`
    mutation Signup($email: String!, $password: String!) {
        signup(email: $email, password: $password, data: {name: ""}) {
            token
            user {
                ${USER_FIELDS}
            }
        }
    }
`;

export const FORGOT_PASSWORD_MUTATION = gql`
    mutation forgetUserEmail($email: String!) {
        forgetUserEmail(email: $email) {
            success,
            message,
            details,
        }
    }
`;

export const CHANGE_PASSWORD_MUTATION = gql`
    mutation changeUserPassword($token: String!, $password: String!) {
        changeUserPassword(token: $token, password: $password) {
            success,
            message
        }
    }
`;
