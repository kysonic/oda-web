import { gql } from 'apollo-boost';

export const CARDS_QUERY = gql`
    query allCards {
        cards {
            id
            title
            description
            image
        }
    }
`;
