'use strict';
var Content = require('dw/content/ContentMgr');
var server = require('server');
server.extend(module.superModule);
server.append('Show', function (req, res, next) {
    var Customer = require('dw/customer/Customer');
    var productHelper = require('*/cartridge/scripts/helpers/productHelpers');
    var ProductFactory = require('*/cartridge/scripts/factories/product');
    var productListHelper = require('*/cartridge/scripts/helpers/recentProductHelper');
    var viewData = res.getViewData();
    var type = 100;
    var currentCustomer = req.currentCustomer.raw;
    var list = productListHelper.getRecentProductList(currentCustomer, type);
    var allproductDetails = []
    if (list != null) {
        var items = (list.items);
        items = items.iterator();
        var recentProductArr = {};
        var ProductDetail;
        while (items.hasNext()) {
            var pidObj = {
                pid: (items.next()).productID
            };
            recentProductArr = {
                ProductDetail: ProductFactory.get(pidObj)
            }
            allproductDetails.push(recentProductArr.ProductDetail);
        }
    }

    viewData = ({
       allproductDetails:allproductDetails.reverse()
        
    })
  
    res.setViewData(viewData);
    next();
});

module.exports = server.exports();