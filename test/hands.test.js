import { expect } from "chai";
import UserDTO from "../src/dto/user.dto.js";
import { createHash, isValidPassword } from "../src/utils/hashBcrypt.js";

//const expect = chai.expect

describe('Testing de Bcryp utility', () => {
    it('El servicio debe devolver un hash valido de password', async function(){
        const password = '12345'
        const passwordHash = await createHash(password)


        expect(passwordHash).to.not.equal(password)
    })

    it('Testing de isValidPassword', async function(){
        const password = '12345'
        const passwordHash = await createHash(password)


        const isValid = await isValidPassword(password, passwordHash)
        expect(isValid).to.be.true
    })
})

// describe('Testing del UserDTO', () => {
//     before(function() {
//         this.UserDTO = UserDTO
//     })

//     it('Debe el DTO de user debe devolver devolver el primer nombre y el apellido en el campo name, sin el password', function() {
//         let mockUser = {
//             first_name: 'Federico',
//             last_name: 'Rosas',
//             email: 'f@gmail.com',
//             password: '12345'
//         }

//         const restultUserDto = this.UserDTO.getUserTokenFrom(mockUser)

//         expect(restultUserDto).to.have.property('name', 'Federico Rosas')
//     })
// })