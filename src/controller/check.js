/**
 * @author 周鹏
 * @最后修改日期 2019-04-20
 * 查看页面数据渲染
 */

layui.define(["apply_global",
  'word_common',
  'word_innovation',
  'word_major',
  'word_point',
  // 'word_research',
  // 'word_engineer',
  // 'word_workstation',
], function(exports) {
  let $ = layui.$,
    setter = layui.setter,
    layer = layui.layer,
    admin = layui.admin,
    laytpl = layui.laytpl;

  let word_common = layui.word_common;
  let word_innovation = layui.word_innovation;
  let word_major = layui.word_major;
  let word_point = layui.word_point;

  // let word_research = layui.word_research;
  // let word_engineer = layui.word_engineer;
  // let word_workstation = layui.word_workstation;


  let proStatus = "";

  async function file_operation() {
    let projectId = layui.data(setter.tableName).projectId;


    $("#exportWord").on('click', function () {
      if (!!$('.zp-common').length) {
        word_common.wordDownload();

      } else if (!!$('.zp-innovation').length) {
        word_innovation.wordDownload();

      } else if (!!$('.zp-major').length) {
        word_major.wordDownload();

      } else if (!!$('.zp-point').length) {
        word_point.wordDownload();
      }
      // else if (!!$('.zp-research').length) {
      //   word_research.wordDownload();
      //
      // } else if (!!$('.zp-engineer').length) {
      //   word_engineer.wordDownload();
      //
      // } else if (!!$('.zp-workstation').length) {
      //   word_workstation.wordDownload();
      // }

    });


    await $.ajax({
      url: "/mytio/user/proStatus/CurrentStatus?projectId=" + projectId,
      type: "get",
      dataType: "json",
      contentType: "application/json",
      success: function(h) {
        console.log("状态码res", h);
        proStatus = h.data;
        if (h.data === "已立项") {
          $("#exportContract").attr("href", "../static/contract.docx");
        } else {
          $("#exportContract").remove();
        }
      }
    });

    $("#downloadFile").on("click", function() {
      admin.popup({
        title: "下载附件",
        area: ["860px", "500px"],
        id: new Date().getTime(),
        shadeClose: false,
        success: function(layero, index) {
          layui.view(this.id).render("download/download");
        }
      });
    });
  }


  async function render_page(m) {

    console.log("check", m);
    await file_operation();

      let project;
      if (!!m.projects) {
          project = m.projects[0];
      }

      // 项目负责人信息
      let leader = {};
      if (!!m.prjLeader && !!m.prjLeader.length) {
          leader = m.prjLeader[0];
      }
      // 首席技术负责人
      if (!!m.skillLeader && !!m.skillLeader.length) {
          leader = m.skillLeader[0];
      }

      // 牵头承担单位信息
      let head = {};
      if (!!m.leaderFirm && !!m.leaderFirm.length) {
          head = m.leaderFirm[0];
      }
      // 【common申请单位信息】
      if (!!m.prjApplFirm && !!m.prjApplFirm.length) {
          head = m.prjApplFirm[0];
      }



      function remove_columns(d) {
          // if (!d.length) return [];
          // let arr = [];
          // for (let i = 0; i < d.length; i++) {
          //     arr.push(d[i].columns)
          // }
          // return arr;
          return d;
      }


      // 初始化
      if (!m.prjStaff) {
        m.prjStaff = [];
      }
      if (!m.prjAuxFirm) {
        m.prjAuxFirm = []
      }
      if (!m.prjAuxStaff) {
        m.prjAuxStaff = []
      }
      if (!m.projectInvest) {
        m.projectInvest = []
      }
      if (!m.leaderProjects) {
        m.leaderProjects = []
      }
      if (!m.firmProperty) {
        m.firmProperty = []
      }
      if (!m.projectPurchase) {
        m.projectPurchase = []
      }
      if (!m.firmFinance) {
        m.firmFinance = []
      }



      var member = remove_columns(m.prjStaff);
      var cooperation = remove_columns(m.prjAuxFirm);
      var participate = remove_columns(m.prjAuxStaff);
      var costBudget = remove_columns(m.projectInvest);
      var bear = remove_columns(m.leaderProjects);
      var knowledge = remove_columns(m.firmProperty);
      var equipmentList = remove_columns(m.projectPurchase);
      var enterprise = remove_columns(m.firmFinance);

      project.current = proStatus;
    var data = {
      p: project,
      leader,
      leaderfirm: head,

      member,
      cooperation,
      participate,
      costBudget,
      enterprise,
      bear,
      knowledge,
      equipmentList
    };
    console.log("要渲染的数据", data);


    var getTpl = render_check_tpl.innerHTML,
      view = document.getElementById("view");
    laytpl(getTpl).render(data, function(html) {
      view.innerHTML = html;
    });


    let high = $(".high").text();
    if (1 == high) {
      $(".high").text("是");
    }
    if (0 == high) {
      $(".high").text("否");
    }

  }


  //对外暴露的接口
  exports("check", { render_page });
});
