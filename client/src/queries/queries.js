import { gql } from 'apollo-boost';

const getAuthorsQuery = gql`
    {
        authors {
            name
            id
        }
    }
`;

const getBooksQuery = gql`
    {
        books {
            name
            id
            subscribed
        }
    }
`;

const addBookMutation = gql`
    mutation AddBook($name: String!, $genre: String!, $authorId: ID!){
        addBook(name: $name, genre: $genre, authorId: $authorId){
            name
            id
        }
    }
`;

const getBookQuery = gql`
    query GetBook($id: ID){
        book(id: $id) {
            id
            name
            genre
            subscribed
            author {
                id
                name
                age
                books {
                    name
                    id
                }
            }
        }
    }
`;
const markTheBookAsRead = gql`
    mutation MarkAsRead($bookId: ID!){
        markAsRead(id: $bookId){
            name
        }
    }
`;
const markTheBookAsUnRead = gql`
    mutation MarkAsUnRead($bookId: ID!){
        markAsUnRead(id: $bookId){
            name
        }
    }
`;
export { getAuthorsQuery, getBooksQuery, addBookMutation, getBookQuery ,markTheBookAsRead,markTheBookAsUnRead };
