/**
 * @author 周鹏
 * @创建日期 2019-05-26
 * @最后修改日期 2019-05-27
 */

// 获取数据
// 调用修改页面的方法渲染数据
// 调用查看页面的方法渲染数据



let getProjectData = {};

layui.define(
  [
    "render_modify",
    "render_multiple",
    "check",
  ],
  function(exports) {
    let $ = layui.$;
    let layer = layui.layer;
    let setter = layui.setter;
    let render_modify = layui.render_modify;
    let render_multiple = layui.render_multiple;
    let check = layui.check;



    function getData() {
      let projectId = layui.data(setter.tableName).projectId;

      layer.load();

      console.log(`projectId=${projectId}`);

      $.ajax({
        url: `/mytio/user/project/look?projectId=${projectId}`,
        type: "GET",
        dataType: "json",
        success(data) {
          console.log("修改页面获取的数据", data);
          if (!data.ok) {
            layer.alert("获取初始数据失败");
            return;
          }
          getProjectData = data.data;
          // 修改页面渲染
          if (!!$("#identifier-modify").eq(0).text()) {
            render_modify.render_page(getProjectData);
            render_multiple.render_multiple(getProjectData);
          } else {
            check.render_page(getProjectData);
          }
        },
        error() {
          layer.alert("获取修改查看页面初始数据失败");
        },
        complete() {
          layer.closeAll("loading");
        }
      });
    }

    // getData(); 外界调用即可

    exports("getProjectData", { getData });
  }
);
