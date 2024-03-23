class UserCurrentDTO {
    constructor(user){
        this.first_name = user.first_name
        this.last_name = user.last_name
        this.email = user.email
        this.password = `${user.nombre}123`
        this.cartId = `${user.nombre}123`
    }
}

export default UserCurrentDTO