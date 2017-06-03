import {graphql} from 'graphql';
import myGraphQLSchema from './schema';
import chai from 'chai';
const expect = chai.expect;

describe("Test GraphQL", ()=> {
    "use strict";

    describe("Author", ()=> {
        it("should create author", async()=> {
            const query = `
                mutation{
                  createAuthor(name:"hello", gender:1, age:10, email:"yoyoyo") {
                    id
                  }
                }
              `;
            const rootValue = {};
            const context = {};
            const result = await graphql(myGraphQLSchema, query, rootValue, context);
            const {data} = result;
            expect(data.createAuthor.id).to.be.above(0);
        });
        it("should update author", async(done)=> {

        });
        it("should delete author", async(done)=> {

        });

        it("should retrievePostList belongs to the author", (done)=> {

        });
    });

    after(()=> {

    });
});