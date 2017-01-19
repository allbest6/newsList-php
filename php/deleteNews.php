<?php
	require_once('db.php');
	if(!$con)
	{
		die("could not connect:".mysql_error());
	}else{
		// 获取传过来的参数
		$id = $_REQUEST['id'];
		//sql语句 
		$sql = "DELETE FROM `news` where id ='{$id}'";
		// mysql_query("set names 'utf8'");
		// mysql_query("set names 'utf8'");
		$result = mysql_query($sql,$con);
		echo json_encode( array('success' => 'true' ));
	}
?>