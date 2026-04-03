import {Schema,model} from 'mongoose'
import productReviewSchema from './review.schema.js'

const productSchema = Schema({
    title: {
        type: String,
        require : true
    },
     subTitle: {
        type: String,
        require : true
    },
     brand: {
        type: String,
        require : true
    },
     price: {
        type: String,
        require : true
    },
     description: {
        type: String,
        require : true
    },
     category: {
        type: String,
        require : true
    },
    onSale:{
        type:Boolean,
        default:false
    },
    discount:{
        type:Number,
        default:0
    },
    stock:{
        type:Number,
        default:0
    },
    review:[productReviewSchema],
    rating:{
        type:Number,
        default:0
    },
    sku:{
        type:String,
        default:'SYS-LTD-'
    },
    weight:{
        type:String,
        default:0
    },
    warranty_information:{
        type:String,
        default:'1 year warranty'
    },
     image: { type: String, default: '' } 
   
})    
    

const productModel = model('products',productSchema)

export default productModel
