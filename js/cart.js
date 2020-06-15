var cart = {};



function loadCart(){
	//check whether localStorage is empty or not
	if(localStorage.getItem('cart'))
	{
		cart=JSON.parse(localStorage.getItem('cart'));
		if(!isEmpty(cart))
		{
			$('.cart_body').html('Корзина пуста!');
		}
		else
		{
				showCart();
		}
		
	}
	else
	{
		$('.cart_body').html('Корзина пуста!');
	}
	
}


function isEmpty(object){
	//check cart if empty
	for(var key in object){
		if(cart.hasOwnProperty(key))
			{ 
				return true;
			}
		else
		{
			return false;
		}}
}


function showCart(){
//showing cart on a page
	if(!isEmpty(cart))
		{
			$('.cart_body').html('Корзина пуста!');
		}
		else
		{
			$.getJSON('goods.json', function(data){
	var goods = data;
	var out='';
		for(var id in cart)
		{
			
			out += `<div class="good">`;
			out += `<img src=${goods[id].img}>`;
			out += `<span class="name">${goods[id].name}</span>`;
			out += `<span class="amount">${cart[id]}</span>`;
			out += `<button data-id="${id}" class="remove-goods">-</button>`;
			out += `<button data-id="${id}" class="add-goods">+</button>`;
			out += `<button data-id="${id}" class="del-goods">X</button>`;
			out += cart[id]*goods[id].cost;
			out += `</div>`;
			
		}
		$('.cart_body').html(out);
		$('.del-goods').on('click', deleteGoods);
		$('.add-goods').on('click', addGoods);
		$('.remove-goods').on('click', removeGoods);


	});	
		}
	
	
}

function deleteGoods(){
	//deleting goods out of cart
	var id = $(this).attr('data-id');
	delete cart[id];
	saveCart();
	showCart();

}


function addGoods(){
	//adds +1 to current amount of goods
	var id = $(this).attr('data-id');
	cart[id]++;
	saveCart();
	showCart();
}


function removeGoods(){
	//removes -1 to current amount of goods
	var id = $(this).attr('data-id');
	if(cart[id]>1)
	{
		cart[id]--;
	}
	else
	{
		delete cart[id];
	}
	saveCart();
	showCart();
}

function saveCart(){
	//saving cart for more than 1 session
	localStorage.setItem('cart',JSON.stringify(cart));

}


function sendEmail(){
	var ename=$('#ename').val();
	var ephone=$('#ephone').val();
	var email=$('#email').val();
	if(ename!=''&&email!=''&&ephone!='')
	{
		if(isEmpty(cart))
		{
			$.post(
				"core/mail.php",
				{
				"ename" : ename,
				"ephone" : ephone,
				"email" : email,
				"cart" : cart
				},
				function(data){
					if(data==1)
					{
						alert='Заказ отправлен!';
					}
					else
					{
						alert='Повторите заказ!';
					}
				}
				)
		}
		else
		{
			alert('Корзина пуста!');
		}
	}
	else
	{
		alert('Заполните поля!');
	}
}



$(document).ready(function(){
	loadCart();
	$('.send-email').on('click', sendEmail);
});