<?php
	require_once('db.php');
	if(!$con)
	{
		die("could not connect:".mysql_error());
	}else{
		// 获取传过来的参数
		$newsTitle = $_REQUEST['newsTitle'];
		$newsType = $_REQUEST['newsType'];
		$imgurl = $_REQUEST['imgurl'];
		$newsContent = $_REQUEST['newsContent'];
		// 
		$sql = "INSERT INTO `news`( `newstitle`,`newstype`,`newsimg`,`content`) VALUES ('{$newsTitle}','{$newsType}','{$imgurl}','{$newsContent}')";
		// mysql_query("set names 'utf8'");
		mysql_query("set names 'utf8'");
		$result = mysql_query($sql,$con);
		echo json_encode( array('success' => 'true' ));
	}
?>