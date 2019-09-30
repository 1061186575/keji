/**
 * @author 周鹏
 * @最后修改日期 2019-05-08
 */

/**
 * 主要功能:   多条渲染
 */
// ok

layui.define([], function(exports) {
  let $ = layui.$,
    admin = layui.admin,
    laytpl = layui.laytpl;

  function render_multiple(m) {
    if (!m) return;

    function remove_columns(d) {
        // if (!d) return;
        // let arr = [];
        // for (let i = 0; i < d.length; i++) {
        //     arr.push(d[i].columns)
        // }
        // return arr;
        return d;
    }


      var member = remove_columns(m.prjStaff);
      var cooperation = remove_columns(m.prjAuxFirm);
      var participate = remove_columns(m.prjAuxStaff);
      var costBudget = remove_columns(m.projectInvest);
      var bear = remove_columns(m.leaderProjects);
      var knowledge = remove_columns(m.firmProperty);
      var equipmentList = remove_columns(m.projectPurchase);
      var enterprise = remove_columns(m.firmFinance);



    var data = {
        member,
      cooperation,
      participate,
      costBudget,
      enterprise,
      bear,
      knowledge,
      equipmentList
    };
    // console.log("data", data);

    var getTpl = multipleID.innerHTML,
      view = document.getElementById("view");
    laytpl(getTpl).render(data, function(html) {
      view.innerHTML = html;
    });
  }

  //对外暴露的接口
  exports("render_multiple", { render_multiple });
});
