/**
 * @author 周鹏
 * @最后修改日期 2019-07-11
 */

/**
 * 修改页面的文件操作(下载, 删除)
 */

layui.define(["form", "table", "upload", "laydate", "element"], function(
  exports
) {

  let $ = layui.jquery;
  let layer = layui.layer;
  let setter = layui.setter;
  let admin = layui.admin;



  function Render() {

    let demoListView = $('#demoList');

    // 通过localStorage 获取id
    let projectId = layui.data(setter.tableName).projectId;

    layer.load();


    $.ajax({
      type: "GET",
      dataType: 'json',
      url: "/mytio/common/file/getMessa?prjId=" + projectId,
      success(data) {
        console.log("data", data);
        layer.closeAll('loading');


        if (data.length !== 0) {
          for (let i = 0; i < data.length; i++) {
            let tr = $("<tr><td>" + data[i].name + "</td><td>" +
                "<a class='' style='box-sizing: border-box'  href=" + data[i].url + ">下载</a>" +"<button id='delete-old' type='button'   style=\"margin-left: 20px\" name="+data[i].url+">删除</button>"+
                "</td></tr>");
            // let tr = $("<tr><td>" + data[i].name + "</td><td>" +
            //     "<a class='button' style='box-sizing: border-box'  href=" + data[i].url + ">下载</a>" +
            //     "</td></tr>");
            demoListView.append(tr);

          }


        }

      },
      error() {
        // layer.alert('获取文件信息失败!')
        layer.msg('获取文件信息失败!');
        layer.closeAll('loading');
      }
    });
  }




  $(document).on("click","#delete-old",function(){
    console.log(123);
    let this1 = this;
    layer.confirm('确定删除？', function (index) {
      let str=$(this1).attr("name");
      // console.log('bbbbb',str)
      let id = str.split("_")[1].split(".")[0];

      console.log("id",id);


      let _this = this1;



      $.ajax({
        method: "PUT",
        dataType: 'json',
        url: "/mytio/common/file/upload/delete?id=" +id,
      }).done(function (data) {
        layer.msg('删除成功');
        console.log("delete-done-data", data)
        if (data) {
          $(_this).parent().parent().remove();
        }

      })
      layer.close(index);
    })


  })


  //对外暴露的接口
  exports("modifyPageFile", {Render});
});
