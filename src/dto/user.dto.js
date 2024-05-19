class UserDTO {
    constructor(newUser){
        this.first_name = newUser.first_name
        this.last_name = newUser.last_name
        this.email = newUser.email
        this.password = newUser.password
        this.cartId = newUser.cartId
    }
}
// class UserDTO {
//     static getUserTokenFrom = (newUser) =>{
//         return {
//             name: `${newUser.first_name} ${newUser.last_name}`,
//             role: newUser.role,
//             email:newUser.email
//         }
//     }
// }

export default UserDTO