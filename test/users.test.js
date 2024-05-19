import mongoose from "mongoose";
import Users from "../src/daos/mongo/user.mongo.js"
import Assert from 'assert';
//import { assert } from 'console';
import { configObject } from "../src/config/config.js";

const Mongo_URL = configObject.mongo_url

mongoose.connect(Mongo_URL)
const assert = Assert.strict

describe('Testing User DAO', () => {
    before(function(){
        this.userDao = new Users()
    })

    beforeEach(function(){
        // mongoose.connection.collections.users.drop()
        this.timeout(5000)
    })

    it('El Dao debe poder obtener los usuarios en forma de arreglo', async function(){
        console.log(this.userDao);
        const result = await this.userDao.gets()
        assert.strictEqual(Array.isArray(result), true)
    })

    it('El Dao debe agregar un usuario correctamente a la base de datos', async function(){
        let mockUser = {
            first_name: 'Federico',
            last_name: 'Rosas',
            email: 'f@gmail.com',
            password: '12345'
        }
        const result = await this.userDao.create(mockUser)
        assert.ok(result._id)
    })
})