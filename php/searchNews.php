<?php
	require_once('db.php');
	if(!$con)
	{
		die("could not connect:".mysql_error());
	}else{
		$seachId=$_REQUEST['newsid'];
		$sql = "SELECT * FROM `news` WHERE id = {$seachId}";
		mysql_query("set names utf8");
		$result = mysql_query($sql,$con);
	$arr = array();
	while($row = mysql_fetch_array($result))
  {
  	array_push($arr,array("id"=>$row['id'],"newstype"=>$row['newstype'],"newstitle"=>$row['newstitle'],"newsimg"=>$row['newsimg'],"content"=>$row['content'],"addtime"=>$row['addtime']));
  }
  echo json_encode($arr,JSON_UNESCAPED_UNICODE);
}
	mysql_close();
?>