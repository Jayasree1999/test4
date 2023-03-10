'use strict';
var server=require('server');
server.extend(module.superModule);
server.append('Show', function (req, res, next) {
    var viewData = res.getViewData();
    var productHelper = require("*/cartridge/scripts/helpers/productHelpers");
    var recentProductHelper = require("*/cartridge/scripts/helpers/recentProductHelper");
    var currentCustomer = req.currentCustomer.raw;
    var pid = req.querystring.pid;
    var config = {
        qty: 1,
        type: 100
    }
    var productList = recentProductHelper.getRecentlyViewedProductList(currentCustomer, pid, config.type);
    var listProducts = productList.items.iterator();
    res.setViewData({
        listProducts:listProducts,
    });
    next();
});
module.exports = server.exports();














