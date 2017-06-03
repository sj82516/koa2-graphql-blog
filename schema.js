import {
    GraphQLObjectType,
    GraphQLString,
    GraphQLInt,
    GraphQLSchema,
    GraphQLList,
    GraphQLBoolean,
    GraphQLNonNull
} from 'graphql';

import logger from './logger'

import {
    ModelAuthor,
    ModelPost
} from './model';

const Post = new GraphQLObjectType({
    name: 'Post',
    description: 'Blog post',
    fields : () => {
        return {
            id: {
                type: GraphQLInt,
                resolve (post) {
                    return post.id;
                }
            },
            title: {
                type: GraphQLString,
                resolve (post) {
                    return post.title;
                }
            },
            content: {
                type: GraphQLString,
                resolve (post) {
                    return post.content;
                }
            },
            author_id: {
                type: GraphQLInt,
                resolve (post) {
                    return post.author_id;
                }
            },
            author: {
                type: new GraphQLList(Author),
                resolve (post) {
                    return ModelPost.findAuthor(post.author_id);
                }
            }
        };
    }
});

const Author = new GraphQLObjectType({
    name: 'Author',
    description: 'This represents a Author',
    fields: () => {
        return {
            id: {
                type: GraphQLInt,
                resolve (author, root, context) {
                    return author.id;
                }
            },
            name: {
                type: GraphQLString,
                resolve (author) {
                    return author.name;
                }
            },
            gender: {
                type: GraphQLInt,
                resolve (author) {
                    return author.gender;
                }
            },
            intro: {
                type: GraphQLString,
                resolve (author) {
                    return author.intro;
                }
            },
            email: {
                type: GraphQLString,
                resolve (author) {
                    return author.email;
                }
            },
            posts: {
                type: new GraphQLList(Post),
                resolve (author) {
                    return ModelAuthor.findAllPost(author.id);
                }
            }
        };
    }
});

const Query = new GraphQLObjectType({
    name: 'Query',
    description: 'Root query object',
    fields:()=>{
        return {
            authors: {
                type: new GraphQLList(Author),
                args: {
                    id: {
                        type: GraphQLInt
                    },
                    email: {
                        type: GraphQLString
                    }
                },
                resolve (root, args, context) {
                    // root是rootValue
                    // context是context
                    return ModelAuthor.retrieveAuthor(args)
                }
            },
            posts: {
                type: new GraphQLList(Post),
                resolve (root, args) {
                    return ModelPost.retrievePost(args);
                }
            }
        };
    }
});

const Mutation = new GraphQLObjectType({
    name: 'Mutations',
    description: 'Functions to set stuff',
    fields: () => {
        return {
            createAuthor: {
                type: Author,
                args: {
                    name: {
                        type: new GraphQLNonNull(GraphQLString)
                    },
                    gender: {
                        type: new GraphQLNonNull(GraphQLInt)
                    },
                    age: {
                        type: new GraphQLNonNull(GraphQLInt)
                    },
                    email: {
                        type: new GraphQLNonNull(GraphQLString)
                    },
                    intro: {
                        type: GraphQLString
                    },
                },
                resolve (source, args) {
                    return ModelAuthor.createAuthor(args.name, args.gender, args.age, args.email, args.intro);
                }
            },
            createPost: {
                type: Post,
                args: {
                    authorId: {
                        type: new GraphQLNonNull(GraphQLInt)
                    },
                    title: {
                        type: new GraphQLNonNull(GraphQLString)
                    },
                    content: {
                        type: new GraphQLNonNull(GraphQLString)
                    },
                },
                async resolve (source, args) {
                    let author = await ModelAuthor.retrieveAuthor({id:args.authorId});
                    logger.info(source, args);
                    if(author.length > 0){
                        return ModelPost.createPost(args.authorId, args.title, args.content);
                    }
                    return Promise.reject("Author not found");
                }
            },
            updateAuthor: {
                type: Author,
                args: {
                    id:{
                        type: new GraphQLNonNull(GraphQLInt)
                    },
                    gender: {
                        type: GraphQLInt
                    },
                    intro: {
                        type: GraphQLString
                    },
                    email: {
                        type: GraphQLString
                    },
                },
                resolve(source, args){
                    "use strict";
                    return ModelAuthor.updateAuthor(args.id, args);
                }
            },
            deleteAuthor: {
                type: Author,
                args:{
                    id:{
                        type: new GraphQLNonNull(GraphQLInt)
                    }
                },
                resolve(source, args){
                    "use strict";
                    return ModelAuthor.deleteAuthor(args);
                }
            },
            retrievePostList: {
                type: new GraphQLList(Post),
                args:{
                    id:{
                        type: new GraphQLNonNull(GraphQLInt)
                    }
                },
                resolve(source, args){
                    "use strict";
                    return ModelAuthor.retrievePostList(args.id);
                }
            },
        };
    }
});


const myGraphQLSchema = new GraphQLSchema({
    query: Query,
    mutation: Mutation
});

export default myGraphQLSchema;