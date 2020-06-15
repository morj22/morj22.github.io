var cart={};



function goodsOut(data){
	// show goods on a page
	console.log(data);
	var out='';
	for(var key in data)
	{
		out+='<div class="cart">';
		out+=`<p class="name">${data[key].name}</p>`;
		out+=`<img src=${data[key].img} height="300px" width="210px">`;
		out+=`<button class="add-to-cart" data-id="${key}">${data[key].cost}</button>`;
		out+='</div>'

	}

	$('.goods-out').html(out);
	$('.add-to-cart').on('click', addToCart);
	
}

function init() {
	//read JSON file to show goods on a page
	$.getJSON("goods.json", goodsOut);
}

function addToCart(){
	//adding goods to cart
	var id = $(this).attr('data-id');
	if(cart[id]==undefined){
		cart[id]=1;
	}
	else{
		cart[id]+=1;
	}
	showMiniCart();
	saveCart();
}


function showMiniCart(){
	// show cart after adding goods into it
	var out="";
	for (var key in cart){
		out += key +'-----' + cart[key]+'</br>';
	}
	$('.mini-cart').html(out);
} 


function saveCart(){
	//saving cart for more than 1 session
	localStorage.setItem('cart',JSON.stringify(cart));

}

function loadCart(){
	//check whether localStorage is empty or not
	var out="";
	if(localStorage.getItem('cart'))
	{
		cart=JSON.parse(localStorage.getItem('cart'));
	}
	showMiniCart();
}

$(document).ready(function(){
	init();
	loadCart();
});