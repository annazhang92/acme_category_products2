const Sequelize = require('sequelize')
const conn = new Sequelize(process.env.DATABASE_URL|| 'postgres://localhost/acme_users_redux_db');


const Users=conn.define('user',{
    name:{type:Sequelize.STRING},
})



const sync =()=>{
    return conn.sync({force:true});
}

const seed =()=>{
    return Promise.all([
    Users.create({name:'foo'}),
    Users.create({name:'bar'}),
    Users.create({name:'bazz'}),
    ])

}

module.exports ={
    sync,
    seed,
    Users

};