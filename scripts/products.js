let bagItems;
let bagItemsStr = localStorage.getItem('bagItems');
bagItems = bagItemsStr ? JSON.parse(bagItemsStr) : [];
displayItems();
displayBagCount();

function displayItems(){
    let itemsContainerElement = document.querySelector('.items_container');
    if (!itemsContainerElement) {
        return;
    }
    innerHtml = '';
    items.forEach(item => {
        innerHtml += `<div class="item_container">             
        <img class = "image_container" src="${item.image}" alt="item image">               
        <div class="rating_container">                   
            <span >${item.rating.stars} <span class="star_container">★</span></span>                   
            <span class="review_count">| ${item.rating.count}</span>               
        </div>               
        <h3 class="company_name">${item.company}</h3>               
        <h4 class="item_name">${item.item_name}</h4>               
        <div class="price_container">                   
            <span class="current_price">Rs. ${item.current_price}</span>                  
            <span class="original_price">Rs. ${item.original_price}</span>                  
            <span class="discount_percentage">(${item.discount_percentage}% OFF)</span>              
        </div>               
        <button class="bagbutton" onclick = "addToBag(${item.id})">Add to Bag</button>           
    </div>`
    });
    
    itemsContainerElement.innerHTML = innerHtml;
}

function addToBag(itemId){
    bagItems.push(itemId);
    localStorage.setItem('bagItems', JSON.stringify(bagItems));
    displayBagCount();
}

function displayBagCount(){
    let bagItemCount = document.querySelector(".bag_item_count");
    if(bagItems.length>0)
        {bagItemCount.style.visibility = 'visible';
        bagItemCount.innerText = bagItems.length;}
    else
    {bagItemCount.style.visibility = 'hidden';}
}   