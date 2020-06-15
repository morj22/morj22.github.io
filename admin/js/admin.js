function init(){
	$.post("core.php",{"action" : "init"},showGoods);
}


function showGoods(data)
{	
	
	data = JSON.parse(data);
	console.log(data);
	var out='<select>';
	out += '<option data-id="0">Новый товар</option>';
	for(var id in data)
	{
		out += `<option data-id="${id}">${data[id].name}</option>`;
	}
	out += '</select>';
	$('.goodsout').html(out);

	$('.goodsout select').on('change', selectGoods);
}

function selectGoods(){
	var id = $('.goodsout select option:selected').attr('data-id');
	console.log(id);
	$.post(
		"core.php",
		{
		"action" : "selectOneGood",
		"gid" : id
		}, 
		function(data){
			data=JSON.parse(data);
			$('#gname').val(data.name);
			$('#gcost').val(data.cost);
			$('#gdescription').val(data.description);
			$('#gporyadok').val(data.poryadok);
			$('#gimg').val(data.img);
			$('#gid').val(data.id);
		}
	);


}

function saveToDb(){
	var id = $('#gid').val();
	if(id!==""){
		$.post(	
			"core.php",
			{
				"action":"updateGoods",
				"id":id,
				"gname": $('#gname').val(),
				"gcost": $('#gcost').val(),
				"gdescription": $('#gdescription').val(),
				"gporyadok": $('#gporyadok').val(),
				"gimg": $('#gimg').val()
			},
			function(data)
			{
				console.log(data);
				if(data==1)
				{
					alert('Данные успешно добавлены!');
					init();
				}
				else
				{
					console.log(data);
				}
			}

			);
	}
	else 
	{
		$.post(	
			"core.php",
			{
				"action":"newGood",
				"id":0,
				"gname": $('#gname').val(),
				"gcost": $('#gcost').val(),
				"gdescription": $('#gdescription').val(),
				"gporyadok": $('#gporyadok').val(),
				"gimg": $('#gimg').val()
			},
			function(data)
			{
				console.log(data);
				if(data==1)
				{
					alert('Данные успешно добавлены!');
					init();
				}
				else
				{
					console.log(data);
				}
			}

			);
	}
}


$(document).ready(function () {
	init();
	$('.add-to-db').on('click',saveToDb)
});
