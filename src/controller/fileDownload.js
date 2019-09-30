/**
 * @author 周鹏
 * @最后修改日期 2019-04-17
 */

/**
 * 侧边栏的文件下载, 注意区分
 * 直接写在HTML里了
 */

layui.define(["form", "table", "upload", "laydate", "element"], function(
  exports
) {
  var $ = layui.jquery;
  var layer = layui.layer;
  let setter = layui.setter;
  var demoListView = $("#demoList");

  // 通过localStorage 获取id

  let projectId = layui.data(setter.tableName).projectId;

  layer.load();

  $.ajax({
    type: "GET",
    dataType: "json",
    url: "/common/file/getMessa?prjId=" + projectId,
    success(data) {
      console.log("data", data);
      layer.closeAll("loading");

      if (data === false) {
        layer.alert("暂无任何文件");
      }

      if (data.length !== 0) {
        for (var i = 0; i < data.length; i++) {
          var tr = $(
            "<tr><td>" +
              data[i].name +
              "</td><td>" +
              "<button class='button' href=" +
              data[i].url +
              ">下载</button>" +
              "<button id='delete' class='button' style=\"background:#eb7350;\" name=" +
              data[i].url +
              ">删除</button>" +
              "</td></tr>"
          );
          demoListView.append(tr);
        }

        $(document).on("click", "#delete", function() {
          var str = $(this).attr("name");
          // console.log('bbbbb',str)
          str = str.split("_")[1].split(".")[0];

          // console.log('bbbbb',str)
          parent.location.reload(); //刷新父亲对象（用于框架）

          $.ajax({
            method: "PUT",
            dataType: "json",
            url: "/common/file/upload/delete?id=" + str
          }).done(function(data) {
            console.log(data);
          });
        });
      }

      // console.log(data[1].url);
      console.log(data);
    },
    error() {
      // layer.alert('获取文件信息失败!')
      layer.msg("获取文件信息失败!");
    }
  });

  //对外暴露的接口
  exports("fileDownload", {});
});
