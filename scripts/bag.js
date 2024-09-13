let bagItemsObjects;

loadBagItems();
displayBagItems();
displayBagSummary();

function displayBagSummary(){
    let bagSummaryElement = document.querySelector('.bag-summary');
    let totalItems = bagItemsObjects.length;
    let totalMrp = 0;
    let totalDiscount = 0;
    let finalPrice = 0;
    let fee = 99;
    bagItemsObjects.forEach(bagItem => {
        totalMrp += bagItem.original_price;
        totalDiscount += bagItem.original_price - bagItem.current_price;
    })

    finalPrice = totalMrp - totalDiscount + fee;

    bagSummaryElement.innerHTML = `
    <div class="bag-details-container">
          <div class="price-header">PRICE DETAILS (${totalItems} Items) </div>
          <div class="price-item">
            <span class="price-item-tag">Total MRP</span>
            <span class="price-item-value">₹${totalMrp}</span>
          </div>
          <div class="price-item">
            <span class="price-item-tag">Discount on MRP</span>
            <span class="price-item-value priceDetail-base-discount">-₹${totalDiscount}</span>
          </div>
          <div class="price-item">
            <span class="price-item-tag">Convenience Fee</span>
            <span class="price-item-value">₹${fee}</span>
          </div>
          <hr>
          <div class="price-footer">
            <span class="price-item-tag">Total Amount</span>
            <span class="price-item-value">₹${finalPrice}</span>
          </div>
        </div>
        <button class="btn-place-order" onclick="alert('Order placed successfully')">
          <div class="css-xjhrni">PLACE ORDER</div>
        </button>
    `
}

function removeFromBag(itemId){
 bagItems = bagItems.filter(bagItemId => bagItemId != itemId);
 localStorage.setItem('bagItems', JSON.stringify(bagItems));
 loadBagItems();
 displayBagItems();
 displayBagCount();
 displayBagSummary();
}

function loadBagItems(){
console.log(bagItems);
bagItemsObjects = bagItems.map(itemId => {
    for (let i = 0; i < items.length; i++) {
        if(itemId == items[i].id)
        return items[i];
    }   
})
}

function displayBagItems(){
    let bagItemsContainerElement = document.querySelector(".bag-items-container");
    let innerHtml = '';
    bagItemsObjects.forEach(bagItem => {
        innerHtml += generateOneItemHtml(bagItem);
    });
    bagItemsContainerElement.innerHTML = innerHtml;
}

function generateOneItemHtml(item){
    return `
    <div class="bag-item-container">
          <div class="item-left-part">
            <img class="bag-item-img" src="${item.image}">
          </div>
          <div class="item-right-part">
            <div class="company">${item.company}</div>
            <div class="item-name">${item.item_name}</div>
            <div class="price-container">
              <span class="current-price">₹${item.current_price}</span>
              <span class="original-price">₹${item.original_price}</span>
              <span class="discount-percentage">(${item.discount_percentage}% OFF)</span>
            </div>
            <div class="return-period">
              <span class="return-period-days">${item.return_period} days</span> return available
            </div>
            
          </div>
          <div class="remove-from-cart" onclick = "removeFromBag(${item.id})">✕</div>
        </div>
    `
}