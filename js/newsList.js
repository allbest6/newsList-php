$(function() {
	var target = $(".select a").attr("value");
	console.log("进入newsList.js");
	//获取列表数据返回后展示数据
	
	function loadList() {
		$.ajax({
			type: "post",
			url: "php/mysql.php",
			data:{tarname:target},
			datatype: "json",
			success: function(data) {
				console.log("返回成功");
				// 清空内部元素。
				$("#newsContainer").empty();
				// 读取每一行的返回数据
				// console.log(data.lenght());
				$.each(data, function(index, value) {
					// 开始给列表内增加内容
					var newtr = $("<div class='news-box'></div>").appendTo('.newsContainer');
					var boxImg = $("<div>").addClass("box-img").appendTo(newtr);
					$("<img>").attr("src", value.newsimg).appendTo(boxImg);
					var boxText = $("<div>").addClass("box-text").appendTo(newtr);
					$("<div>").addClass("box-title").text(value.newstitle).appendTo(boxText);
					$("<div>").addClass("box-time").text(value.addtime).appendTo(boxText);
				})

			}
		})
	}
	loadList();
	// 选中样式并且链接数据库重新搜索
	$(".menu li").click(function() {
		$(".select").removeClass("select");
		$(this).addClass("select");
		target = $(".select a").attr("value");
		// console.log(target);
		$.post("php/mysql.php",{tarname:target},loadList());
	})
})