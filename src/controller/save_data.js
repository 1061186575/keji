/**
 * @author 周鹏
 * @创建日期 2019-04-23
 * @最后修改日期 2019-04-23
 */

/**
 * 主要功能: 获取数据, 申报修改页面通用
 * 这是改进过的方式, 不需要通过id获取了
 * 2019/07/23二次改进
 */


let allData = {
    project: {},
    prjLeader: {},
    skillLeader: {},
    leaderFirm: {},
    prj_appl_firm: {},
};



layui.define(["table", "upload", "laydate", "element"], function(exports) {
  let $ = layui.$;


    /**
     *  数据保存
     */
    function save() {
        layer_msg();

        /**
         *  获取所有的【项目基本信息】 【项目负责人信息】 【牵头承担单位信息】【申请单位信息】数据
         *  如果有就获取, 没有就不会获取
         */
        let fd = new FormData(document.getElementById('formData'));
        for (let [name, value] of fd) {
            // console.log("name, value",name, value);
            if ( !name.indexOf('p-') ) {
                allData.project[name.slice(2)] = value;
            } else if ( !name.indexOf('leader-') ){
                if (!!$('#skillLeader').length) {
                    allData.skillLeader[name.slice(7)] = value;
                } else {
                    allData.prjLeader[name.slice(7)] = value;
                }
            } else if ( !name.indexOf('head-') ){
                allData.leaderFirm[name.slice(5)] = value;
                allData.prj_appl_firm[name.slice(5)] = value;
            }
        }


        /**
         *  数据处理
         */

        // 乘1e6
        allData.project.loan = $("#loan").val() * 1e6;
        allData.project.self_fund = $("#self-fund").val() * 1e6;
        allData.project.other_fund = $("#other-fund").val() * 1e6;
        allData.project.appropriation = $("#appropriation").val() * 1e6;
        allData.project.total = allData.project.loan + allData.project.self_fund +
        allData.project.other_fund + allData.project.appropriation;

        // 字符串变数字
        if (allData.leaderFirm.capital) {
            allData.leaderFirm.capital = (+allData.leaderFirm.capital) * 1e6;
        }
        if (allData.prj_appl_firm.capital) {
            allData.prj_appl_firm.capital = (+allData.prj_appl_firm.capital) * 1e6;
        }
        allData.project.supervisor = +allData.project.supervisor;
        allData.project.recommend = +allData.project.recommend;
        allData.project.prj_type_id = +allData.project.prj_type_id;


        allData.projectInvestList = project_invests_data();
        allData.prjAuxFirmList = cooperation_data();
        allData.prjAuxStaffList = participate_data();
        allData.firmFinanceList = enterprise_data();
        allData.prjStaffList = member_data();
        allData.leaderProjectsList = bear_data();
        allData.firmPropertyList = knowledge_data();
        allData.project.firm_id = +JSON.parse(localStorage.getItem("firmInfo")).id;



        // delete_obj_key();

        console.log("allData: ", allData);

    }


    /**
     *  清空多余的数据项
     */
    function delete_obj_key() {

        for(let d in allData) {
            if (JSON.stringify(allData[d]) === '{}' ||
                JSON.stringify(allData[d]) === '[]') {
                delete allData[d];
            }
        }
        if (!allData.firmFinanceList[0].year) {
            delete allData.firmFinanceList;
        }

    }


    /**
     *   获取经费预算 数据
     */
     function project_invests_data() {
        let project_invests_info = [];
        for (let i = 0; i < $("#costBudget-getData ~ tr").length; i++) {
            project_invests_info.push({
                id: $("#costBudget-getData ~ tr").eq(i).find("th").eq(1).find("span").text(),
                subject: $("#costBudget-getData ~ tr").eq(i).find("th").eq(1).find("input").val(),
                fund: $("#costBudget-getData ~ tr").eq(i).find("th").eq(2).find("input").val() * 1e6,
                financial_fund: $("#costBudget-getData ~ tr").eq(i).find("th").eq(3).find("input").val() * 1e6
            });
        }
        return project_invests_info;
    }


  /**
   *   获取企业研发与经营状况 数据  enterprise
   */
  function enterprise_data() {
    let enterprise_data = [];
    enterprise_data.push({
      id: $("#assets0").siblings().text(),
      year: parseInt($(".current-year").eq(0).text()),
      assets: $("#assets0").val() * 1e6,
      cost: $("#cost0").val() * 1e6,
      sales: $("#sales0").val() * 1e6,
      tax: $("#tax0").val() * 1e6
    }, {
      id: $("#assets1").siblings().text(),
      year: parseInt($(".current-year").eq(1).text()),
      assets: $("#assets1").val() * 1e6,
      cost: $("#cost1").val() * 1e6,
      sales: $("#sales1").val() * 1e6,
      tax: $("#tax1").val() * 1e6
    }, {
      id: $("#assets2").siblings().text(),
      year: parseInt($(".current-year").eq(2).text()),
      assets: $("#assets2").val() * 1e6,
      cost: $("#cost2").val() * 1e6,
      sales: $("#sales2").val() * 1e6,
      tax: $("#tax2").val() * 1e6
    });
    return enterprise_data;
  }

  /**
   *   获取合作单位信息 数据  cooperation
   */
  function cooperation_data() {
    let cooperation_data = [];
    for (let i = 0; i < $("#cooperation tr").length - 1; i++) {
      cooperation_data.push({
        id: $("#cooperation tr").eq(i + 1).find("th").eq(1).find("span").text(),
        name: $("#cooperation tr").eq(i + 1).find("th").eq(1).find("input").val(),
        type: $("#cooperation tr").eq(i + 1).find("th").eq(2).find("input").val(),
        org_code: $("#cooperation tr").eq(i + 1).find("th").eq(3).find("input").val()
      });
    }
    return cooperation_data;
  }

  /**
   *   获取 项目主要参与人员信息 数据  participate
   */

  function participate_data() {
    let participate_data = [];
    for (let i = 0; i < $("#participate tr").length - 1; i++) {
      participate_data.push({
        id: $("#participate tr").eq(i + 1).find("th").eq(1).find("span").text(),
        name: $("#participate tr").eq(i + 1).find("th").eq(1).find("input").val(),
        gender: $("#participate tr").eq(i + 1).find("th").eq(2).find("select").val(),
        age: $("#participate tr").eq(i + 1).find("th").eq(3).find("input").val(),
        title: $("#participate tr").eq(i + 1).find("th").eq(4).find("select").val(),
        idcode: $("#participate tr").eq(i + 1).find("th").eq(5).find("input").val(),
        firmName: $("#participate tr").eq(i + 1).find("th").eq(6).find("input").val()
      });
    }
    return participate_data;
  }



  /**
   *  [major, point] 负责人承担项目情况 bear
   */

  function bear_data() {
    let bear_data = [];
    for (let i = 0; i < $("#bear tr").length - 1; i++) {
      bear_data.push({
        id: $("#bear tr").eq(i + 1).find("th").eq(1).find("span").text(),
        name: $("#bear tr").eq(i + 1).find("th").eq(1).find("input").val(),
        code: $("#bear tr").eq(i + 1).find("th").eq(2).find("input").val(),
        fund: $("#bear tr").eq(i + 1).find("th").eq(3).find("input").val() * 1e6,
        start: $("#bear tr").eq(i + 1).find("th").eq(4).find("input").val(),
        end: $("#bear tr").eq(i + 1).find("th").eq(5).find("input").val(),
        origin: $("#bear tr").eq(i + 1).find("th").eq(6).find("input").val()
      });
    }
    return bear_data;
  }



    /**
     *  项目成员信息 member
     */
    function member_data() {
        let member_data = [];
        for (let i = 0; i < $("#member tr").length - 1; i++) {
            member_data.push({
                id: $("#member tr").eq(i + 1).find("th").eq(1).find("span").text(),
                name: $("#member tr").eq(i + 1).find("th").eq(1).find("input").val(),
                idcode: $("#member tr").eq(i + 1).find("th").eq(2).find("input").val(),
                contribution: $("#member tr").eq(i + 1).find("th").eq(3).find("input").val()
            });
        }
        return member_data;
    }



    /**
     *  [point] 自主知识产权情况 knowledge
     *
     */
    function knowledge_data() {
        let knowledge_data = [];
        for (let i = 0; i < $("#knowledge tr").length - 1; i++) {
            knowledge_data.push({
                id: $("#knowledge tr").eq(i + 1).find("th").eq(1).find("span").text(),
                type: $("#knowledge tr").eq(i + 1).find("th").eq(1).find("input").val(),
                name: $("#knowledge tr").eq(i + 1).find("th").eq(2).find("input").val(),
                auth_number: $("#knowledge tr").eq(i + 1).find("th").eq(3).find("input").val(),
                time: $("#knowledge tr").eq(i + 1).find("th").eq(4).find("input").val(),
                order: $("#knowledge tr").eq(i + 1).find("th").eq(5).find("input").val()
            });
        }
        return knowledge_data;
    }


  exports("save_data", {save});
});
