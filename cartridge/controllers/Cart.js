'use strict';


var server = require('server');

server.extend(module.superModule);

server.append("Show", function (req, res, next) {
    var PromotionMgr = require('dw/campaign/PromotionMgr');
    var cartProductDiscountsHelper = require('*/cartridge/scripts/helpers/cartProductDiscounts');
    var ProductMgr = require('dw/catalog/ProductMgr');
    var viewData = res.getViewData();
    var lineItems = viewData.items;
    var ProductFactory = require('*/cartridge/scripts/factories/product');

    cartProductDiscountsHelper.getPriceBookDiscount(viewData);
    cartProductDiscountsHelper.getPromotionClassDiscount(viewData);
    cartProductDiscountsHelper.getTotalSavingsDiscount(res, viewData);

    next();
});

server.append("UpdateQuantity", function (req, res, next) {

    var cartProductDiscountsHelper = require('*/cartridge/scripts/helpers/cartProductDiscounts');

    var viewData = res.getViewData();

    cartProductDiscountsHelper.getPriceBookDiscount(viewData);
    cartProductDiscountsHelper.getPromotionClassDiscount(viewData);
    cartProductDiscountsHelper.getTotalSavingsDiscount(res, viewData);

    next();
});


module.exports = server.exports();