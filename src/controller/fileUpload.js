/**
 * @author 周鹏
 * @最后修改日期 2019-04-17
 */

/**
 * 主要功能:  申报修改页面文件上传
 */

layui.define(["form", "table", "upload", "laydate", "element"], function(
  exports
) {
  let $ = layui.$,
    layer = layui.layer,
    laytpl = layui.laytpl,
    setter = layui.setter,
    view = layui.view,
    admin = layui.admin,
    form = layui.form,
    table = layui.table,
    laydate = layui.laydate,
    element = layui.element,
    upload = layui.upload;


  function Render() {
    console.log("页面内的文件上传");
    var m = new Map();

    let projectId = layui.data(setter.tableName).projectId;
    console.log('projectId', projectId);

    $(document).on("click", "#delete", function() {
      let i = +this.dataset.zpData.slice(1, 2);

      $("#delTr" + i).remove();
      m.delete(i);
      $("#qnfile").val(""); //清空 input file 值，以免删除后出现同名文件不可选
    });

    var token = "";

    $.ajax({
      type: "get",
      url: "/mytio/common/file/upload/getToken",
      success(res) {
        token = res.data;
        console.log("token", token);
      },
      error() {
        console.log("err");
      },
      complete() {
        console.log("请求token完成");
      }
    });
    var c = 1;

    // console.log('m:', m)

    $("#qnfile").change(function() {
      // console.log($("#qnfile")[0].files[0]);

      m.set(c++, $("#qnfile")[0].files[0]);
      $("#list").html(
        $("#list").html() +
          "<tr id='delTr" +
          (c - 1) +
          "'>" +
          "<td id='ld" +
          (c - 1) +
          "'>" +
          $("#qnfile")[0].files[0].name +
          "</td>" +
          "<td>" +
          ($("#qnfile")[0].files[0].size / 1024).toFixed(1) +
          "kb" +
          "</td>" +
          "<td><button type='button' id='delete' data-zp-data='(" +
          (c - 1) +
          ")' onclick=''>删除</button></td>" +
          "</tr>"
      );
    });

    $("#qnsubmit").on("click", function() {
      var i = $("#upload tr");
      console.log(i.length);
      if (i.length <= 1) {
        layer.alert("请添加上传文件");
      } else {
        layer.load();

        var cc = 0;
        // console.log("m",m)
        for (var f of m) {
          // console.log('f',f);
          // console.log('file:' +f[1].name);

          var ss = f[1].name.split(".");

          $.ajax({
            type: "get",
            url:
              "/mytio/common/file/upload?prj_id=" +
              projectId +
              "&step=0" +
              "&fileName=" +
              f[1].name,
            success(res) {
              var key = res.data;
              // console.log("key", key);
              // console.log("token2",token);
              var d = new FormData();
              d.append("token", token);
              d.append("key", key);
              d.append("file", f[1]);
              $.ajax({
                url: "https://up-z0.qiniup.com",
                type: "POST",
                data: d,
                processData: false, // tell jQuery not to process the data
                contentType: false, // tell jQuery not to set contentType
                success: function(data) {
                  // console.log(data);
                  layer.closeAll("loading");
                  layer.msg("已全部上传成功");
                }
              });
            },
            error() {
              alert("error");
            },
            complete() {
              layer.closeAll("loading");
              console.log("complete");
            }
          });
        }


        $("#qnsubmit").attr('disabled', 'disabled');
        $("#qnsubmit").css({'cursor': 'not-allowed'})
      }
    });
  }

  //对外暴露的接口
  exports("fileUpload", { Render });
});
