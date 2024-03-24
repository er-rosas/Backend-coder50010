// const EErrors = require("../../utils/errors/enums")
import EErrors from "../../utils/errors/enums.js";

const errorHandler = () => (error, req, res, next) => {
    
    switch (error.code) {
        case EErrors.INVALID_TYPE_ERROR:
            return res.send({status: 'error', error: error.name})            
            break;
        case EErrors.ROUTING_ERROR:
            return res.send({status: 'error', error: error.name})            
            break;
    
        default:
            return res.send({status: 'error', error: 'Unhandled error'})
            break;
    };
    next()
}

export { errorHandler } 