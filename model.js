import connection from './connection';
import logger from './logger';

// Post宣告
class ModelPostClass {
    constructor() {
        logger.info("create post table");
        connection.execute(`CREATE TABLE IF NOT EXISTS Post(
            id INT(10) AUTO_INCREMENT PRIMARY KEY,
            author_id INT(10) NOT NULL,
            title VARCHAR(255) NOT NULL,
            content VARCHAR(255) NOT NULL,
            create_at TIMESTAMP,
            FOREIGN KEY (author_id) REFERENCES Author(id) 
        );`)
    }

    createPost(authorId, title, content) {
        return connection.execute(`INSERT INTO Post (author_id, title, content, create_at) 
            values (?,?,?,?)`, [authorId, title, content || '', new Date()]);
    }

    retrievePost(query) {
        return connection.execute(`SELECT * FROM Post ` + whereQuery(query));
    }

    updatePost(id, query) {
        return connection.execute(`UPDATE Post SET ` + updateQuery(query) + ' where id=?', [id]);
    }

    deletePost(query) {
        return connection.execute(`DELETE from Post ` + whereQuery(query));
    }
    // 取得該篇文章的作者，只要透過authorID，不需加其他的條件
    retrieveAuthor(authorId) {
        return connection.execute(`SELECT * FROM Author where id=?`, [authorId]);
    }
}

// Author宣告
class ModelAuthorClass {
    constructor() {
        logger.info("create author table");
        connection.execute(`CREATE TABLE IF NOT EXISTS Author(
            id INT(10) AUTO_INCREMENT PRIMARY KEY,
            name VARCHAR(255) NOT NULL,
            gender BOOLEAN NOT NULL,
            age VARCHAR(255) NOT NULL,
            email VARCHAR(50) NOT NULL,
            intro VARCHAR(255),
            create_at TIMESTAMP
        );`)
    }

    createAuthor(name, gender, age, email, intro) {
        // 預設回傳 {insertId} 但是GraphQL只認id，所以要轉換在回傳
        return connection.execute(`INSERT INTO Author (name, gender, age, email, intro, create_at) 
            values (?,?,?,?,?,?)`, [name, gender, age, email, intro || '', new Date()]).then(result=>{
            return {id: result.insertId}
        });
    }

    retrieveAuthor(query) {
        return connection.execute(`SELECT * FROM Author ` + whereQuery(query));
    }

    updateAuthor(id,query) {
        return connection.execute(`UPDATE Author SET ` + updateQuery(query) + ' where id=?', [id]);
    }

    deleteAuthor(query) {
        return connection.execute(`DELETE from Post ` + whereQuery(query));
    }

    retrievePostList(id) {
        return connection.execute(`SELECT * FROM Post where author_id=?`, [id])
    }
}

// 回傳更新的條件
// 傳入 {name:"hello", age:5} 轉成 `name="hello", age=5`
function updateQuery(query){
    "use strict";
    let updateString = '';
    for(let prop in query){
        updateString = updateString + "," + prop + "=" +  query[prop]
    }
    return updateString;
}

// where條件式
function whereQuery(query) {
    let whereString = '';

    if(Object.keys(query).length > 0){
        for(let prop in query){
            whereString = whereString.length > 0 ? whereString + " and ": "";
            whereString = whereString + prop + "=" +  query[prop];
        }
        whereString = " where " + whereString;
    }

    return whereString;
}

const ModelAuthor = new ModelAuthorClass();
const ModelPost = new ModelPostClass();
export {
    ModelAuthor,
    ModelPost
}