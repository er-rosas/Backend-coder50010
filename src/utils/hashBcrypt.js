import bcrypt from 'bcrypt';

export const createHash = password => bcrypt.hashSync(password, bcrypt.genSaltSync(10))

export const isValidPassword = (password, hashedPassword) => {
    // console.log(user, password)
    //console.log(password, hashedPassword)
    return bcrypt.compareSync(password, hashedPassword)
}