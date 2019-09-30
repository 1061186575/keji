/**
 * @author 周鹏
 * @创建日期 2019-04-23
 * @最后修改日期 2019-04-23
 */

/**
 * 只需引入即可, 所有的申报修改页面都通用
 * 主要功能: 多条数据的删除
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

  function layer_del(url, del, val = "确认删除吗？") {
    layer.confirm(val, function(index) {
      $.ajax({
        url: url,
        type: "put",
        contentType: "application/json",
        success: function(res) {
          del.remove();
          layer_msg("删除成功!");
        },
        error: function() {
          layer_err("删除失败!");
        }
      });
      layer.close(index);
    });
  }

  $(document).on("click", ".costBudget-del", function() {
    let del = $(this)
      .parent()
      .parent();
    let id = del
      .find("th")
      .eq(1)
      .find("span")
      .text();
    if (!id === true) {
      del.remove();
    } else {
      let url = "/mytio/user/del/projectInvest?id=" + id;
      layer_del(url, del);
    }
  });

  /**
   * 合作单位信息
   */

  $(document).on("click", ".cooperation-del", function() {
    let del = $(this)
      .parent()
      .parent();
    let id = del
      .find("th")
      .eq(1)
      .find("span")
      .text();
    if (!id === true) {
      del.remove();
    } else {
      let url = "/mytio/user/del/prjAuxFirm?id=" + id;
      layer_del(url, del);
    }
  });

  /**
   * 主要参与人员
   */

  $(document).on("click", ".participate-del", function() {
    let del = $(this)
      .parent()
      .parent();
    let id = del
      .find("th")
      .eq(1)
      .find("span")
      .text();
    if (!id === true) {
      del.remove();
    } else {
      let url = "/mytio/user/del/prjAuxStaff?id=" + id;
      layer_del(url, del);
    }
  });

  $(document).on("click", ".costBudget-del2", function() {
    let del = $(this)
      .parent()
      .parent();
    let id = del
      .find("th")
      .eq(1)
      .find("span")
      .text();
    if (!id === true) {
      del.remove();
    } else {
      let url = "/mytio/user/del/projectInvest?id=" + id;
      layer_del(url, del);
    }
  });

  $(document).on("click", ".member-del", function() {
    let del = $(this)
      .parent()
      .parent();
    let id = del
      .find("th")
      .eq(1)
      .find("span")
      .text();
    if (!id === true) {
      del.remove();
    } else {
      let url = "/mytio/user/del/prjStaff?id=" + id;
      layer_del(url, del);
    }
  });

  $(document).on("click", ".bear-del", function() {
    let del = $(this)
      .parent()
      .parent();
    let id = del
      .find("th")
      .eq(1)
      .find("span")
      .text();
    if (!id === true) {
      del.remove();
    } else {
      let url = "/mytio/user/del/leaderProjects?id=" + id;
      layer_del(url, del);
    }
  });

  $(document).on("click", ".equipmentList-del", function() {
    let del = $(this)
      .parent()
      .parent();
    let id = del
      .find("th")
      .eq(1)
      .find("span")
      .text();
    if (!id === true) {
      del.remove();
    } else {
      let url = "/mytio/user/del/projectPurchase?id=" + id;
      layer_del(url, del);
    }
  });

  $(document).on("click", ".knowledge-del", function() {
    let del = $(this)
      .parent()
      .parent();
    let id = del
      .find("th")
      .eq(1)
      .find("span")
      .text();
    if (!id === true) {
      del.remove();
    } else {
      let url = "/mytio/user/del/firmProperty?id=" + id;
      layer_del(url, del);
    }
  });

  //对外暴露的接口
  exports("deleteTr", {});
});
