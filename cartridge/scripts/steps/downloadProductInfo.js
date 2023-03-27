'use strict';
var allProducts = [];
module.exports = {
    downloadProductInfo: function downloadProductInfo(parameter) {
        var FileWriter = require('dw/io/FileWriter')
        var File = require('dw/io/File')
        var ProductMgr = require('dw/catalog/ProductMgr');
        var sharedLibrary = 'RefArchSharedLibrary';
        var destinationPath = File.LIBRARIES + '/' + sharedLibrary + '/default/';
        var destinationFile = new File(destinationPath + 'categoryProducts.csv');
        var fileWriter = new FileWriter(destinationFile, 'UTF-8');
        var CatalogMgr = require('dw/catalog/CatalogMgr');
        var categoryName = parameter.CategoryID; // Accessed via job parameter
        var category = CatalogMgr.getCategory(parameter.CategoryID);
        var Logger = require("dw/system/Logger")
        if (!(category.products.empty)) {
            addProducts(category.products)
        }
        if (!(category.onlineSubCategories.empty)) {
            var onlineSubCategories = category.onlineSubCategories
            subCategories(onlineSubCategories)
        }
        try {

            fileWriter.writeLine("Product ID" + ","  +" Product Name "+ ","+ "Category");

            allProducts.forEach(product => {
                var trial = product;
                fileWriter.writeLine(product.ID + "," + product.name + "," + product.categories[0].displayName);
            });
            fileWriter.close();
        } catch (error) {
            fileWriter.close();
            Logger.error(error);
        }
    }
};
function addProducts(products) {
    var productArr = products.toArray();
    allProducts = allProducts.concat(productArr);
}
function subCategories(onlineSubCategories) {
    var onlineSubCategories = onlineSubCategories.iterator();
    while (onlineSubCategories.hasNext()) {
        var eachsubcat = onlineSubCategories.next();
        if (!(eachsubcat.products.empty)) {
            addProducts(eachsubcat.products)
        }
        if (!(eachsubcat.onlineSubCategories.empty)) {
            subCategories(eachsubcat.onlineSubCategories)
        }
    }
}