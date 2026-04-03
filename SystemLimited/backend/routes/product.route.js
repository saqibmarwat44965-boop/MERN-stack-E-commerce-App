 import express from 'express'
import  * as prod from   '../controllers/product.controller.js'
import { upload } from '../middlewares/upload.js'

 const productRoute = express.Router()

 productRoute.route('/').get(prod.getAllProducts)
                        .post(upload.single('image'),prod.AddNewProduct)

productRoute.route('/:id').get(prod.getSingleProduct)
                          .put(upload.single('image'), prod.UpdateProduct) 
                          .delete(prod.DeleteProduct)
                          
 export default productRoute
 