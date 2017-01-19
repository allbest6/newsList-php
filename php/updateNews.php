<?php
	require_once('db.php');
	if(!$con)
	{
		die("could not connect:".mysql_error());
	}else{
		// 获取传过来的参数
		$id = $_REQUEST['id'];
		$newsTitle = $_REQUEST['newsTitle'];
		$newsType = $_REQUEST['newsType'];
		$imgurl = $_REQUEST['imgurl'];
		$newsContent = $_REQUEST['newsContent'];
		// 
		$sql = "UPDATE `news` SET `newsType`='{$newsType}',`newstitle`='{$newsTitle}',`content`='{$newsContent}',`newsimg`='{$imgurl}' WHERE `id`={$id}";
		mysql_query("set names 'utf8'");
		$result = mysql_query($sql,$con);
		echo json_encode( array('success' => 'true' ));
	}
?>