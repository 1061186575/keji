/**

 @Name：layuiAdmin 设置
 @Author：科技组宋雄斌

 */

layui.define(["form", "upload"], function(exports) {
  let $ = layui.$;
  let layer = layui.layer;
  let setter = layui.setter;
  let admin = layui.admin;
  let form = layui.form;

  form.render();

  //自定义验证
  form.verify({
    pass: [/^[\S]{6,12}$/, "密码必须6到12位，且不能出现空格"],

    //确认密码
    repass: function(value) {
      if (value !== $("#LAY_password").val()) {
        return "两次密码输入不一致";
      }
    }
  });

  //设置个人资料
  form.on("submit(setmyinfo)", function(obj) {
    //提交修改
    admin.req({
      url: "/",
      type: "POST",
      contentType: "application/json",
      data: JSON.stringify(obj.field),
      success: function(res) {
        if (0 === res.code) {
          layer.msg("修改个人信息成功", { time: 1500 });
        } else {
          layer.msg("修改个人信息失败", { time: 1500 });
        }
      }
    });
    return false;
  });

  //设置member个人信息
  form.on("submit(setmemberinfo)", function(obj) {
    //提交修改
    $.ajax({
      url: "/",
      data: obj.field,
      success: function(res) {
        if (0 === res.code && res.data === true) {
          layer.msg("修改个人信息成功", { time: 1500 });
        } else {
          layer.msg("修改个人信息失败", { time: 1500 });
        }
      }
    });
    return false;
  });

  //设置公司信息
  form.on("submit(setcompanyinfo)", function(obj) {
    //提交修改
    admin.req({
      url: "/",
      type: "POST",
      data: JSON.stringify(obj.field),
      contentType: "application/json",
      success: function(res) {
        console.log("修改公司信息--->",obj.field);
        if (0 === res.code) {
          layer.msg("修改公司信息成功", { time: 1500 });
        } else {
          layer.msg("修改公司信息失败", { time: 1500 });
        }
      }
    });
    return false;
  });

  //设置密码
  form.on("submit(setmypass)", function(obj) {
    // id 存在数据库
    // 提交修改
    let data = obj.field;
    let plainstr = "$" + "{" + layui.data(setter.tableName).username + "}" + data.oldPassword;
    let pd5 = CryptoJS.MD5(CryptoJS.enc.Latin1.parse(plainstr)).toString();
    data.oldPassword = pd5;
    console.log('原密码--->', pd5);
    data.userId = layui.data(setter.tableName).userId;
    admin.req({
      url: "/",
      data: data,
      success: function(res) {
        console.log('返回结果',res);
        if (res.code === 0) {
          layer.msg("修改成功", { time: 2000 });
        } else {
          layer.msg("修改失败", { time: 2000 });
        }
      }
    });
    return false;
  });

  //对外暴露的接口
  exports("set", {});
});
