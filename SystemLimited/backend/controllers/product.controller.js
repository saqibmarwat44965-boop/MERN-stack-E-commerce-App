import { CatchErr } from "../helpers/error.js";
import productModel from "../models/product.model.js";

const getAllProducts = async (req, res) => {
  try {
    const products = await productModel.find();
    const total = products.length;

    if (total > 0) {
      return res.json({
        total: `${total} Products`,
        products,
      });
    } else {
      return res.json({
        error: "No products found",
      });
    }
  } catch (err) {
    res.status(400).json({
      error: err.message,
    });
  }
};



const AddNewProduct = async (req, res) => {
  try {
    const { title, subTitle, brand, price, category, description } = req.body;

    if (!title || !subTitle || !brand || !price || !category || !description) {
      return res.json({
        error: "ALL fields are required",
      });
    }

    // Image handling
    let imagePath = "";
    if (req.file) {
      imagePath = `/uploads/${req.file.filename}`;
    }


    const newProduct = new productModel({
      title,
      subTitle,
      brand,
      price,
      category,
      description,
      image: imagePath, 
    });

    await newProduct.save();

    return res.json({
      message: "New Product added successfully",
      newProduct,
    });
  } catch (err) {
    return res.status(400).json({
      error: err.message,
    });
  }
};



const getSingleProduct = async (req, res) => {
  try {
    const id = req.params.id;
    const product = await productModel.findById(id);
    if (!product) {
      return res.json({
        messag: `Product with this id ${id} not found`,
      });
    }

    return res.json({
      message: `Product with that id ${id} is founded`,
      product,
    });
  } catch (err) {
    CatchErr(res,err);
  }
};

const UpdateProduct = async (req, res) => {
  try {
    const id = req.params.id;
    const body = req.body; 

    if (req.file) {
      body.image = `/uploads/${req.file.filename}`;
    }

    const updatedProduct = await productModel.findByIdAndUpdate(
      id,
      body,
      { new: true }
    );

    if (!updatedProduct) {
      return res.status(404).json({
        message: "Product not found",
      });
    }

    return res.status(200).json({
      message: "Product Updated successfully",
      updatedProduct,
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Update failed" });
  }
};


const DeleteProduct = async (req, res) => {
  try {
    const id = req.params.id;
    const deleteProduct = await productModel.findByIdAndDelete(id);
    if (!deleteProduct) {
      return res.status(404).json({
        message: "Product not found",
      });
    }
    return res.status(200).json({
      message: "Product deleted successfully",
      deleteProduct,
    });
  } catch (err) {
    CatchErr(res,err);
  }
};

export {
  getAllProducts,
  getSingleProduct,
  AddNewProduct,
  UpdateProduct,
  DeleteProduct,
};
