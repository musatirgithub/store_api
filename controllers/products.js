const Product = require('../models/product');

const getAllProductsStatic = async (req,res)=>{
    // throw new Error('testing async errors')
    const products = await Product.find({name:'vase table'})
    res.status(200).json({products, nbHits:products.length})
}

const getAllProducts = async (req,res)=>{
    res.status(200).json({msg:'Products route'})
}

module.exports = {getAllProductsStatic, getAllProducts}