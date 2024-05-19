import mongoose from "mongoose";
import Users from "../src/daos/mongo/user.mongo.js"
import { expect } from "chai";
import { configObject } from "../src/config/config.js";

const Mongo_URL = configObject.mongo_url

mongoose.connect(Mongo_URL)
// const expect = chai.expect

describe('Testing User DAO', () => {
    before(function(){
        this.userDao = new Users()
    })

    beforeEach(function(){
        mongoose.connection.collections.users.drop()
        this.timeout(5000)
    })

    it('El Dao debe poder obtener los usuarios en forma de arreglo', async function(){
        console.log(this.userDao);
        const result = await this.userDao.gets()

        // Con assert
        // assert.strictEqual(Array.isArray(result), true)

        //expect(result).to.be.deep.equal([])
        //expect(result).deep.equal([])
        //expect(Array.isArray(result)).to.be.ok
        expect(Array.isArray(result)).to.be.equal(true)
    })

    it('El Dao debe agregar un usuario correctamente a la base de datos', async function(){
        let mockUser = {
            first_name: 'Federico',
            last_name: 'Rosas',
            email: 'f@gmail.com',
            password: '12345'
        }
        const result = await this.userDao.create(mockUser)
        expect(result).to.have.property('_id')
        expect(result).to.have.property('first_name', 'Federico')
        expect(result).to.be.an('object')
    })
})