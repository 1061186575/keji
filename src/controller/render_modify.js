/**
 * @author 周鹏
 * @最后修改日期 2019-04-29
 */

/**
 * 主要功能: 修改页面渲染初始数据
 * 7/24 优化
 */


layui.define(['form'], function(exports) {
  let $ = layui.$,
      laytpl = layui.laytpl,
      form = layui.form,
      admin = layui.admin;


  function render_page(data) {

      // console.log("renderModify得到的数据", data);

      let project;
      if (data.projects) {
          project = data.projects[0];
          render_project(project);
      }

      // 项目负责人信息
      let leader;
      if (data.prjLeader && data.prjLeader.length) {
          leader = data.prjLeader[0];
          render_leader(leader);
      }
      // 首席技术负责人
      if (data.skillLeader && data.skillLeader.length) {
          leader = data.skillLeader[0];
          render_leader(leader);
      }

      // 牵头承担单位信息
      let head;
      if (data.leaderFirm && data.leaderFirm.length) {
          head = data.leaderFirm[0];
      }
      // 【common申请单位信息】
      if (data.prjApplFirm && data.prjApplFirm.length) {
          head = data.prjApplFirm[0];
      }

      render_head(head);


  }


  function render_project(pro) {
    let render = {};
    for (let p in pro) {
      render['p-' + p] = pro[p];
    }

    // console.log("render_project: ", render);
    form.val("project-from", render);



    $("#total").val(pro.total / 1e6);
    $("#loan").val(pro.loan / 1e6);
    $("#self-fund").val(pro.self_fund / 1e6);
    $("#other-fund").val(pro.other_fund / 1e6);
    $("#appropriation").val(pro.appropriation / 1e6);





    //
    // // budget 是用layui模板渲染的, 这里是为了确保能渲染成功
    let time;
    time = setInterval(function() {
      if (!$("#budget").val()) {
        $("#budget").val(pro.budget);
      } else {
        clearInterval(time);
      }
    }, 500);


  }


  function render_leader(le) {
    let render = {};
    for (let p in le) {
      render['leader-' + p] = le[p];
    }
    // console.log("render_leader: ", render);
    form.val("project-from", render);
  }

  function render_head(h) {
      console.log(h)
    if (!h) {
      console.log("【牵头承担单位信息】为空");
      return;
    }
    let render = {};
    for (let p in h) {
      render['head-' + p] = h[p];
    }


    if (render["head-capital"]) {
      render["head-capital"] = render["head-capital"] / 1e6;
    }


    form.val("project-from", render);

  }

  //对外暴露的接口
  exports("render_modify", { render_page });
});
