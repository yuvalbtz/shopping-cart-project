
if(document.readyState == 'loading'){
    document.addEventListener('DOMContentLoaded', ready)
}else{
    ready()
}


function ready(){
var removeCartItemButton = document.getElementsByClassName('btn-danger');

for  (var i =0; i<removeCartItemButton.length; i++){
    var button = removeCartItemButton[i]
    button.addEventListener('click', removeCartItem)
   
  

     }
      

      var quantityInputs = document.getElementsByClassName('cart-quantity-input')

     for (var i = 0; i < quantityInputs.length; i++){
         var input = quantityInputs[i]
         input.addEventListener('change', quantityChanged)
     }
   



       var addToCartButtons = document.getElementsByClassName('store-item-icon')
       for (var i = 0; i<addToCartButtons.length; i++){
           var button = addToCartButtons[i]
           button.addEventListener('click', addToCartClicked)
       }

    
    document.getElementsByClassName('btn-buy')[0].addEventListener('click', purchaseClicked)
    
    }
     
    
   function purchaseClicked(){
 
    alert('תודה שקנית אצלינו !')
    var cartItems = document.getElementsByClassName('cart-items')[0]
    while ( cartItems.hasChildNodes()){
        cartItems.removeChild(cartItems.firstChild)
    }
      updateCartTotal()
}

    
    function removeCartItem(event){

        var buttonClicked = event.target
        buttonClicked.parentElement.parentElement.remove()
       
        updateCartTotal();
        ///////////
        add =  document.getElementsByClassName('item-count')[0].innerText 
        add--
        document.getElementsByClassName('item-count')[0].innerText = add
        //console.log(add)
        ////////////
    }



     function quantityChanged(event){

         var input = event.target
         if(isNaN(input.value) || input.value <= 0){
             input.value = 1
         }       
          updateCartTotal()
          
        }
   

function addToCartClicked(event){
    var button = event.target
    var shopItem = button.parentElement.parentElement.parentElement;
    var title = shopItem.getElementsByClassName('store-item-name')[0].innerText
    var price = shopItem.getElementsByClassName('store-item-value')[0].innerText
    var imagSrc = shopItem.getElementsByClassName('card-img-top store-img')[0].src

    
   addItemToCart(title, price, imagSrc)
   updateCartTotal()
   

  

}

var add =0

function addItemToCart(title, price, imagSrc){

    var cartRow = document.createElement('div')
    cartRow.classList.add('cart-row')
    var cartItems = document.getElementsByClassName('cart-items')[0]
    var cartItemsNames = cartItems.getElementsByClassName('cart-item-title')
   
    for(var i=0; i<cartItemsNames.length; i++){
        
        if(cartItemsNames[i].innerText == title){
           
            alert('המוצר כבר נוסף לסל!')
            return
        }
    }
   ////////////
    add++
    document.getElementsByClassName('item-count')[0].innerText = add 
   //console.log(add)
    //////////

    var cartRowContents = `
    <div class="cart-item cart-column">
    <img class="cart-item-image" src="${imagSrc}" alt="" width="100" height="100">
          <span class="cart-item-title">${title}</span>
    </div>
    <span class="cart-price cart-column" >${price}</span>
  <div class="cart-quantity cart-column" >
  <input class="cart-quantity-input" type="number" value="1">
  <button class="btn btn-danger cart-quantity-button"
  type="button">מחק</button>
  </div>
  </div>`
   
 
  cartRow.innerHTML = cartRowContents
  cartItems.append(cartRow)
cartRow.getElementsByClassName('btn-danger')[0].addEventListener('click', removeCartItem)
cartRow.getElementsByClassName('cart-quantity-input')[0].addEventListener('change', quantityChanged)



}



   
     function updateCartTotal(){
        
        var cartItemContainer = document.getElementsByClassName('cart-items')[0]
        var cartRows = cartItemContainer.getElementsByClassName('cart-row')
        var total = 0; 
        for (var i = 0; i < cartRows.length; i++)
        {  
            
            
           
            var cartRow = cartRows[i]
            var priceElement = cartRow.getElementsByClassName('cart-price')[0]
            var quantityElement = cartRow.getElementsByClassName('cart-quantity-input')[0]
            var price = parseFloat(priceElement.innerHTML.replace('₪',''))
            var quantity = quantityElement.value
            total = total + (price * quantity)
        }
        total = Math.round(total * 100) / 100  
        document.getElementsByClassName('cart-total-price')[0].innerText = '₪' + total
        document.getElementsByClassName('item-total')[0].innerText = total
        
       
    }
var clickoncartnav = document.getElementById('cart-info')

clickoncartnav.addEventListener('click', whenclickoncartnav)


function whenclickoncartnav(){
     
$('html, body').animate({scrollTop:$(document).height()},1000);
return false
}











