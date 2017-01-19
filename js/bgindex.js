/**
 * 页面结构接在完成后，搜索数据库中的列表
 * @param  {[type]} ){	$.ajax({		type:"post",		url:"../php/mysql.php";		datatype:"json",		success:function(data){		}	})} [description]
 * @return {[type]}                                                                                                            [description]
 */
$(function() {
	//获取列表数据返回后展示数据
	function loadList() {
		$.ajax({
			type: "post",
			url: "php/mysql.php",
			data: {
				tarname: ''
			},
			datatype: "json",
			success: function(data) {
				console.log("回调成功");
				// 清空tbody的内部元素。
				$("#newslist-tbody").empty();
				// 读取每一行的返回数据
				$.each(data, function(index, value) {
					// 开始给列表内增加内容
					var newtr = $("#newslist-tbody").append("<tr>");
					$("<td>").text(value.id).appendTo(newtr);
					$("<td>").text(value.newstitle).appendTo(newtr);
					$("<td>").text(value.newstype).appendTo(newtr);
					$("<td>").text(value.addtime).appendTo(newtr);
					var handle = $("<td>").appendTo(newtr);
					//修改按钮
					$("<a href='#myModal' role='button' class='btn btn-mini btn-primary' data-toggle='modal'>修改</a>").appendTo(handle).on("click", function() {
						$("#myModalLabel").text("修改新闻");
						$("#addNews").text("修改新闻");
						$.ajax({
							type: "post",
							url: "php/searchNews.php",
							data: {
								newsid: value.id
							},
							datatype: "json",
							success: function(data) {
								// console.log(data.newstitle);
								//将提取的数据抓进页面
								$("#update-newsid").val(data[0].id);
								$("#newsType").val(data[0].newstype);
								$("#newsTitle").val(data[0].newstitle);
								$("#imgurl").val(data[0].newsimg);
								$("#newscontent").val(data[0].content);
							}
						})
					});
					//删除按钮和绑定事件
					$("<a class='btn btn-mini btn-danger' data-toggle='modal' data-target='#danger-talk'>删除</a>").appendTo(handle).on("click", function() {
						// 确认删除
						$("#trueTalk").on('click', function() {
							console.log("进入确认删除按钮点击事件");
							$.post("php/deleteNews.php", {
								id: value.id
							}, function(data) {
								if (data.success == "true") {
									console.log("删除成功");
								} else {
									console.log("删除失败");
								}
								$("#danger-talk").modal('hide');
								$("#danger-talk").on('hidden', function() {
									loadList();
								});
							})
						})
					});
					// 为修改按钮绑定点击读取数据事件

					// 
				})

			}
		})
	}
	loadList();

	// 打开添加新闻页面
	$("#toAddNews").click(function(e) {
			$("#myModalLabel").text("添加新闻");
			$("#addNews").text("添加新闻");
			$("#newsTitle").val("");
			$("#imgurl").val("");
			$("#newscontent").val("");
			$("#newsType").val("2");
		})
		//添加、修改新闻
	$("#addNews").click(function(e) {
		// e.preventDefault();

		if ($("#newsTitle").val() == "" || $("#imgurl").val() == "" || $("#newscontent").val() == "") {
			if ($("#newsTitle").val() == "") {
				$("#newsTitle").parent().parent().addClass('error');
			} else {
				$("#newsTitle").parent().parent().removeClass('error');
			}
			if ($("#imgurl").val() == "") {
				$("#imgurl").parent().parent().addClass('error');
			} else {
				$("#imgurl").parent().parent().removeClass('error');
			}
			if ($("#newscontent").val() == "") {
				$("#newscontent").parent().parent().addClass('error');
			} else {
				$("#newscontent").parent().parent().removeClass('error');
			}
		} else {
			// console.log($("#newsType").val());
			var news = {
				newsTitle: $("#newsTitle").val(),
				newsType: $("#newsType").val(),
				imgurl: $("#imgurl").val(),
				newsContent: $("#newscontent").val()
			}
			var url = "php/";
			if ($("#addNews").text() == "添加新闻") {
				url += "addNews.php";
			} else if ($("#addNews").text() == "修改新闻") {
				news.id = $("#update-newsid").val();
				console.log(news);
				url += "updateNews.php";
			}
			// console.log(news);
			$.post(url, news, function(data) {
				console.log(data);
				alert($("#addNews").text() + "成功！");
				$("#myModal").modal('hide');
				$('#myModal').on('hidden', loadList())

			})
		}
	})
})