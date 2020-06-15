<?php
$servername = "localhost";
$username = "root";
$password = "root";
$dbname = "FMNFS";

function connect(){
    $conn = mysqli_connect("localhost", "root", "root", "FMNFS");
    if (!$conn) {
        die("Connection failed: " . mysqli_connect_error());
    }
    mysqli_set_charset($conn,"utf-8");
    return $conn;
}

function init(){
    //вывожу список товаров
    $conn = connect();
    $sql = "SELECT id,name FROM goods";
    $result = mysqli_query($conn, $sql);

    if (mysqli_num_rows($result) > 0) {
        $out = array();
        while($row = mysqli_fetch_assoc($result)) {
            $out[$row["id"]] = $row;
        }
        echo json_encode($out);
    } else {
        echo "0";
    }
    mysqli_close($conn);
}


function selectOneGood(){
	$conn =connect();
	$id = $_POST['gid'];
	$sql = "SELECT * from goods where id = '$id' ";
	$result = mysqli_query($conn, $sql);

	if (mysqli_num_rows($result)>0)
	{
		$row = mysqli_fetch_assoc($result);
		echo json_encode($row);
	}
	else
	{
		echo "0";
	}
	mysqli_close($conn);
}


function updateGoods(){
	$conn =connect();
	$id = $_POST['id'];
	$name = $_POST['gname'];
	$cost = $_POST['gcost'];
	$description = $_POST['gdescription'];
	$poryadok = $_POST['gporyadok'];
	$img = $_POST['gimg'];	

	$sql = "UPDATE goods SET name='$name', cost='$cost', description='$description', poryadok='$poryadok', img='$img' WHERE id='$id'";

if (mysqli_query($conn, $sql)) {
  echo "Record updated successfully";
} else {
  echo "Error updating record: " . mysqli_error($conn);
}
	mysqli_close($conn);
}



function newGood(){
	$conn =connect();
	$name = $_POST['gname'];
	$cost = $_POST['gcost'];
	$description = $_POST['gdescription'];
	$poryadok = $_POST['gporyadok'];
	$img = $_POST['gimg'];	

	$sql = "INSERT into goods(name,cost,description,poryadok,img)
		values ('$name','$cost','$description','$poryadok','$img')";

if (mysqli_query($conn, $sql)) {
  echo "Record updated successfully";
} else {
  echo "Error updating record: " . mysqli_error($conn);
}
	mysqli_close($conn);
}



function writeJSON(){
	
}