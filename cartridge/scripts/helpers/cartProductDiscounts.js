'use strict';

var Money = require('dw/value/Money');
var currencyCode = session.currency.currencyCode;
var currencySymbol = session.currency.symbol;

function getPriceBookDiscount(viewData) {

  var lineItems = viewData.items;
  lineItems.forEach(function (lineItem) {

    if (lineItem.price.list != null && lineItem.price.sales != null && (!lineItem.appliedPromotions)) {
      var priceBookDiscountValue = (lineItem.price.list.value - lineItem.price.sales.value) * (lineItem.quantity);
      var money = new Money(priceBookDiscountValue, currencyCode);
      var priceBookDiscount = dw.util.StringUtils.formatMoney(money);
      lineItem.priceTotal.priceBookDiscount = priceBookDiscount;

    }
    else if (lineItem.price.list != null && lineItem.price.sales != null && lineItem.appliedPromotions) {
      var x = lineItem.priceTotal.nonAdjustedPrice.replace(',', '');
      var nonAdjustedPrice = x.split(currencySymbol)[1];
      var priceBookDiscountValue = ((lineItem.price.list.value) * (lineItem.quantity) - nonAdjustedPrice);
      var money = new Money(priceBookDiscountValue, currencyCode);
      var priceBookDiscount = dw.util.StringUtils.formatMoney(money);
      lineItem.priceTotal.priceBookDiscount = priceBookDiscount;
    }
  })
}

function getPromotionClassDiscount(viewData) {

  var lineItems = viewData.items;
  lineItems.forEach(function (lineItem) {
    if (lineItem.appliedPromotions) {

      var value = lineItem.priceTotal.nonAdjustedPrice.replace(',', '');
      var nonAdjustedPrice = value.split(currencySymbol)[1];
      var price = (lineItem.priceTotal.price.replace(',', '').split(currencySymbol)[1]);
      var promotionClassDiscountValue = (nonAdjustedPrice - price);//* (lineItem.quantity);
      var money = new Money(promotionClassDiscountValue, currencyCode);
      var promotionClassDiscount = dw.util.StringUtils.formatMoney(money);
      lineItem.price.promotionClassDiscountValue = promotionClassDiscountValue;
      lineItem.priceTotal.promotionClassDiscount = promotionClassDiscount;

    }
  })

}

function getTotalSavingsDiscount(res, viewData) {
  var PROMOTION_CLASS_PRODUCT = require('dw/campaign/Promotion').PROMOTION_CLASS_PRODUCT;

  var discounts = {};
  var lineItems = viewData.items;


  var totalSavingsValueAmount = 0;
  var productLevelDiscountValue = 0;

  lineItems.forEach(function (lineItem) {

    var orderLevelDiscountValue = 0;
    var shippingLevelDiscountValue = 0;

    if (lineItem.appliedPromotions != undefined) {
      var promotion = lineItem.appliedPromotions[0];
        var a = lineItem.priceTotal.nonAdjustedPrice;
        var b = lineItem.priceTotal.price;
        productLevelDiscountValue = productLevelDiscountValue + lineItem.price.promotionClassDiscountValue;
        var moneyProductLevelDiscount = new Money(productLevelDiscountValue, currencyCode);
        var ProductLevelDiscount = dw.util.StringUtils.formatMoney(moneyProductLevelDiscount);
        discounts.ProductLevelDiscount = ProductLevelDiscount;
      
    }

    if (viewData.totals.shippingLevelDiscountTotal != undefined) {
      shippingLevelDiscountValue = shippingLevelDiscountValue + viewData.totals.shippingLevelDiscountTotal.value;
      var moneyShippingLevelDiscount = new Money(shippingLevelDiscountValue, currencyCode);
      var shippingLevelDiscount = dw.util.StringUtils.formatMoney(moneyShippingLevelDiscount);
      discounts.shippingLevelDiscount = shippingLevelDiscount;

    }
    if (viewData.totals.orderLevelDiscountTotal != undefined) {
      orderLevelDiscountValue = viewData.totals.orderLevelDiscountTotal.value;
      var moneyOrderLevelDiscount = new Money(orderLevelDiscountValue, currencyCode);
      var orderLevelDiscount = dw.util.StringUtils.formatMoney(moneyOrderLevelDiscount);
      discounts.orderLevelDiscount = orderLevelDiscount;
    }

    totalSavingsValueAmount = productLevelDiscountValue + orderLevelDiscountValue + shippingLevelDiscountValue;
    var moneySavings = new Money(totalSavingsValueAmount, currencyCode);
    var totalSavings = dw.util.StringUtils.formatMoney(moneySavings);
    discounts.totalSavings = totalSavings;
  })

  res.setViewData({ discounts: discounts })
}

module.exports = ({
  getPriceBookDiscount: getPriceBookDiscount,
  getPromotionClassDiscount: getPromotionClassDiscount,
  getTotalSavingsDiscount: getTotalSavingsDiscount
})