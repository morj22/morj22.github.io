<?php
$action = $_POST['action'];

require_once 'function.php';

switch ($action) {
    case 'init':
        init();
        break;
   case 'selectOneGood':
        selectOneGood();
        break;
    case 'updateGoods':
        updateGoods();
                break;
    case 'newGood':
        newGood();
                break;
}