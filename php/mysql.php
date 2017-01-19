<?php
// header('Content-type: application/json;charset=utf-8');
// $con = mysql_connect("localhost","root","");
require_once('db.php');
if(!$con)
{
	die("could not connect:".mysql_error());
}else{
  // mysql_select_db("unit8baidu",$con);
	$newstag = $_REQUEST['tarname'];
  // 读取列表sql语句(添加搜索条件)
	$sql = "select * from news where 1=1";
  // echo $newstag;
  if($newstag != ''){
    $sql.=" and newstype=".$newstag;
    // echo($sql);
  }
  // echo $sql;
	mysql_query("set names 'utf8'");
	$result = mysql_query($sql,$con) or die('sql语句执行失败，错误信息是：' . mysql_error());
	$arr = array();
	while($row = mysql_fetch_array($result))
  {
  	array_push($arr,array("id"=>$row['id'],"newstype"=>$row['newstype'],"newstitle"=>$row['newstitle'],"newsimg"=>$row['newsimg'],"addtime"=>$row['addtime']));
  }
  echo json_encode($arr,JSON_UNESCAPED_UNICODE);
}
mysql_close();
 