const graphql = require("graphql");
const Book = require("../models/book");
const Author = require("../models/author");
const _ = require("lodash");

const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLSchema,
  GraphQLID,
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull,
  GraphQLBoolean
  //   GraphQLInputObjectType
} = graphql;
// const SubscribedType=  new GraphQLInputObjectType({
//     name:'Subscribed',
//     fields: () =>({
//         value: GraphQLBoolean, defaultValue: false
//     })
// })
const BookType = new GraphQLObjectType({
  name: "Book",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    genre: { type: GraphQLString },
    subscribed: { type: GraphQLBoolean },
    author: {
      type: AuthorType,
      resolve(parent, args) {
        return Author.findById(parent.authorId);
      }
    }
  })
});

const AuthorType = new GraphQLObjectType({
  name: "Author",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    age: { type: GraphQLInt },
    books: {
      type: new GraphQLList(BookType),
      resolve(parent, args) {
        return Book.find({ authorId: parent.id });
      }
    }
  })
});

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    book: {
      type: BookType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return Book.findById(args.id);
      }
    },
    author: {
      type: AuthorType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return Author.findById(args.id);
      }
    },
    books: {
      type: new GraphQLList(BookType),
      resolve(parent, args) {
        return Book.find({});
      }
    },
    authors: {
      type: new GraphQLList(AuthorType),
      resolve(parent, args) {
        return Author.find({});
      }
    }
  }
});

const Mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    addAuthor: {
      type: AuthorType,
      args: {
        name: { type: GraphQLString },
        age: { type: GraphQLInt }
      },
      resolve(parent, args) {
        let author = new Author({
          name: args.name,
          age: args.age
        });
        return author.save();
      }
    },
    addBook: {
      type: BookType,
      args: {
        name: { type: new GraphQLNonNull(GraphQLString) },
        genre: { type: new GraphQLNonNull(GraphQLString) },
        authorId: { type: new GraphQLNonNull(GraphQLID) },
        // HERE I CREATED A KEY WHICH IS BOOLEAN WHICH WILL DEFINE THE
        // STATE OF THE BOOK EITHER READ OR NOT.
        // THIS IS GIVEN DEFAULT VALUE OF FALSE WHEN THE USER DID NOT
        // SPECIFY THAT HE HAS READ THE BOOK OR NOT
        // AND POINT TO TAKE CARE OF IS THAT IT SHOULD ALSO BE DEFINED
        // IN THE BOOK MODEL THAT WE WANT A KEY SUBSCRIBED ALSO.
        subscribed: { type: GraphQLBoolean, defaultValue: false }
      },
      resolve(parent, args) {
        let book = new Book({
          name: args.name,
          genre: args.genre,
          authorId: args.authorId,
          subscribed: args.subscribed
        });
        // console.log('subscribed value is ', book.subscribed)
        return book.save();
      }
    },
    markAsRead: {
      type: BookType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLID) }
      },
      resolve(parent, args) {
        // let book = Book.findById(args.id)
        let bookSubscribed = Book.findByIdAndUpdate(args.id, {
          subscribed: true
        });
        // console.log(bookSubscribed)

        return bookSubscribed;
      }
    },
    markAsUnRead: {
      type: BookType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLID) }
      },
      resolve(parent, args) {
        // let book = Book.findById(args.id)
        let bookUnSubscribed = Book.findByIdAndUpdate(args.id, {
          subscribed: false
        });
        // console.log(bookUnSubscribed)

        return bookUnSubscribed;
      }
    },
    delBook: {
      type: BookType,
      args: {
        name: { type: new GraphQLNonNull(GraphQLString) }
        // genre: { type: new GraphQLNonNull(GraphQLString) },
        // authorId: { type: new GraphQLNonNull(GraphQLID) }
      },
      resolve(parent, args) {
        let book = Book.deleteOne({ name: args.name });
        return book;
      }
    }
  }
});

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation
});
