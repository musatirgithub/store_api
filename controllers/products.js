const Product = require('../models/product');

const getAllProductsStatic = async (req,res)=>{
    const search = 'woo'
    // throw new Error('testing async errors')
    const products = await Product.find({price:{$gt:30}}).sort('price').select('name price company')
    res.status(200).json({products, nbHits:products.length})
}

const getAllProducts = async (req,res)=>{
    const {featured, company, name, sort, fields} = req.query;
    const queryObject = {};

    if(featured){
        queryObject.featured = featured === 'true' ? true : false
    }

    if(company){
        queryObject.company = company
    }

    if(name){
        queryObject.name = {$regex:name, $options:'i'}
    }

    console.log(queryObject);

    // experimental code (worked well)

    // let sortList = "createdAt"
    // if (sort){
    //     sortList = sort.split(',').join(' ')
    // }

    // if (fields){
    //     fieldsList = fields.split(',').join(' ')
    // }

    // const products = await Product.find(queryObject).sort(sortList).select(fieldsList)

    // experimental code
  
    let result = Product.find(queryObject);
    if(sort){
        const sortList = sort.split(',').join(' ')
        result = result.sort(sortList)
        console.log(sortList)
    }
    else {
        result = result.sort('createdAt')
    }

    if(fields){
        const fieldsList = fields.split(',').join(' ')
        result = result.select(fieldsList)
    }

    const page = Number(req.query.page) || 1
    const limit = Number(req.query.limit) || 10
    const skip = (page-1) * limit

    result = result.skip(skip).limit(limit)

    const products = await result
    res.status(200).json({products, nbHits:products.length})
}

module.exports = {getAllProductsStatic, getAllProducts}