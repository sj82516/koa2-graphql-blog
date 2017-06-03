import Koa from 'koa';
const app = new Koa();

import KoaRouter from 'koa-router'; // koa-router@next
import KoaBody from 'koa-bodyparser'; // koa-bodyparser@next
import {graphqlKoa, graphiqlKoa} from 'graphql-server-koa';

import connection from './connection';
import logger from './logger';

const router = new KoaRouter();

// koaBody is needed just for POST.
app.use(KoaBody());


import myGraphQLSchema from './schema';

router.post('/graphql', graphqlKoa((ctx) => {
        return {schema: myGraphQLSchema, context: ctx.request}
    })
);
router.get('/graphql', graphqlKoa({schema: myGraphQLSchema}));
router.get('/graphiql', graphiqlKoa({endpointURL: '/graphql'}));

app.use(router.routes());
app.use(router.allowedMethods());

app.listen(3000);
