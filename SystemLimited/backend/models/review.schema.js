import {Schema} from 'mongoose'

const productReviewSchema = new Schema({
    name : {
        type : String,
        require : true
    },
    comment : {
        type : String,
        require: true,

    },
    rating : {
        type : String,
        require : true
    }
})

export default productReviewSchema
