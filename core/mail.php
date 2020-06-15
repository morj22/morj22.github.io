<?php
//читать жсон

$json = file_get_contents('../goods.json');
$json = json_decode($json, true);

//создание письма
$message = '';
$message .= '<h1>Заказ в магазине</h1>';
$message .= '<p>Телефон: '.$_POST['ephone']. '</p>';
$message .= '<p>Клиент: '.$_POST['ename']. '</p>';
$message .= '<p>E-mail: '.$_POST['email']. '</p>';

$cart = $_POST['cart'];
$total = 0;

foreach ($cart as $id=>$count) {
	$message .= $json[$id]['name'].'---';
	$message .= $count.'---';
	$message .=$count*$json[$id]['cost'];
	$total += $count*$json[$id]['cost'];
	$message .='<br>';
}
$message .= '<p>Сумма</p>'.$total;

//print_r($message);

$to = 'forgetmenotfloweryshop@gmail.com'.',';
$to .= $_POST['email'];
$spectext = '<!DOCTYPE html><html><head>
<title>Заказ</title></head><body>';
$headers = 'MIME-Version: 1.0' . "\r\n";
$headers .= 'Content-type: text/html; charset:utf-8'."\r\n";
$m = mail($to, 'Заказ в магазине Forget·Me·Not', $spectext.$message.'</body></html>',$headers);
if($m)
{
	echo 1;
} 
else
{
	echo 0;
}