"use strict";

var allProducts = [];
module.exports = {
    getSiteProducts: function getSiteProducts(param) {
        var FileWriter = require("dw/io/FileWriter");
        var File = require("dw/io/File");
        var sharedLib = "RefArchSharedLibrary";
        var rootDestPath = File.LIBRARIES + "/" + sharedLib + "/default/";
        var destPath = new File(rootDestPath + "categoryProductsJayasree.csv");
        var fileWriter = new FileWriter(destPath, "UTF-8");
        var Logger = require("dw/system/Logger");

        var ProductMgr = require("dw/catalog/ProductMgr");
        var CatlogMgr = require("dw/catalog/CatalogMgr");
        var catalog = CatlogMgr.getSiteCatalog();
        var CatalogMgr = require('dw/catalog/CatalogMgr');
        var trial = param.CategoryID
        var category = CatalogMgr.getCategory(param.CategoryID);


        if (!(category.products.empty)) {
            addProducts(category.products);
        };
        if (!(category.onlineSubCategories.empty)) {
            var onlineSubCategories = category.onlineSubCategories
            subCategories(onlineSubCategories);

        };

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

    },
};

function addProducts(products) {
    var productsArr = products.toArray();
    allProducts = allProducts.concat(productsArr);
}

function subCategories(onlineSubCategories) {
    var onlineSubCategories = onlineSubCategories.iterator();
    while (onlineSubCategories.hasNext()) {    // for each subcategory
        var eachSubCat = onlineSubCategories.next();

        if (!(eachSubCat.products.empty)) {
            addProducts(eachSubCat.products);
        };
        if (!(eachSubCat.onlineSubCategories.empty)) {
            subCategories(eachSubCat.onlineSubCategories);
        }
    }
}