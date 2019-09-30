
/**
 * @author 周鹏
 */

/**
 *  重点实验室申报和岳阳市工程技术研究中心
 */


console.log("重点实验室申报和岳阳市工程技术研究中心");


layui.define(['apply_global','form', 'fileUpload'], function(exports) {
    let $ = layui.$;
    let admin = layui.admin;
    let form = layui.form;
    let setter = layui.setter;
    form.render();


    let allData = {
        projects: {},    // projects  labBase
        firmCapitalFlow: {},   // firm_capital_flow   assets
        applyFirm: {}, //applyFirm  base
        planInvestEstimate: {},      // plan_invest_estimate  labInvest
        planInvestSource: {},// plan_invest_source   labInvestSource
        skillLeader: {},   //skill_leader  labSkill
        prjLeader: {},  // prj_leader   rep
        firmPeopleSituation: {},     // firmPeopleSituation  labStaff
        planFundList: [],        // plan_fund    labYear
    };
    let userId;
    let projectId;
    let is_research_Apply;
    let is_engineer_Apply;
    let is_research_Modify;
    let is_engineer_Modify;

    function Render() {
        userId = layui.data(setter.tableName).userId;
        projectId = layui.data(setter.tableName).projectId;

        is_research_Apply = !!document.getElementsByClassName('zp-research-apply').length ;
        is_engineer_Apply = !!document.getElementsByClassName('zp-engineer-apply').length;
        is_research_Modify =  !!document.getElementsByClassName('zp-research-modify').length ;
        is_engineer_Modify = !!document.getElementsByClassName('zp-engineer-modify').length;



    }


    /**
     *  render start 把render_modify_page导出, HTML获取数据然后传递过来渲染
     */
    function render_modify_page(data) {
        console.log("修改页面获取的数据:", data);
        if (!data) return;

        let render = {};
        let labBase = data.projects[0];
        let firmCapitalFlow = data.firmCapitalFlow[0];
        let applyFirm = data.applyFirm[0];
        let planInvestEstimate = data.planInvestEstimate[0];
        let planInvestSource = data.planInvestSource[0];
        let skillLeader = data.skillLeader[0];
        // let planFundList = data.planFundList[0];
        let prjLeader = data.prjLeader[0];
        let firmPeopleSituation = data.firmPeopleSituation[0];


        for (let d in labBase) {render['labBase-' + d] = labBase[d];}
        for (let d in firmCapitalFlow) {render['assets-' + d] = firmCapitalFlow[d] / 1e6;}
        for (let d in applyFirm) {render['base-' + d] = applyFirm[d];}
        for (let d in planInvestEstimate) {render['labInvest-' + d] = planInvestEstimate[d] / 1e6;}
        for (let d in planInvestSource) {render['labInvestSource-' + d] = planInvestSource[d];}
        for (let d in skillLeader) {render['labSkill-' + d] = skillLeader[d];}
        for (let d in prjLeader) {render['rep-' + d] = prjLeader[d];}
        for (let d in firmPeopleSituation) {render['labStaff-' + d] = firmPeopleSituation[d];}



        console.log("planFundList: ", data.planFundList);


        data.planFundList.forEach(function (d) {
            // console.log("d: ", d);
        if (d.year === '第一年度') {
            $('#yearId0').text(d.id);
            $('#invest0').val(d.invest / 1e6);
            $('#usage0').val(d.usage);
            $('#origin0').val(d.origin);
        } else if (d.year === '第二年度') {
            $('#yearId1').text(d.id);
            $('#invest1').val(d.invest / 1e6);
            $('#usage1').val(d.usage);
            $('#origin1').val(d.origin);
        } else if (d.year === '第三年度') {
            $('#yearId2').text(d.id);
            $('#invest2').val(d.invest / 1e6);
            $('#usage2').val(d.usage);
            $('#origin2').val(d.origin);
        }
    });


        // render['labInvest-usage1'] = render['labInvest-usage1']


        form.val("project-from", render);
        console.log("render",render);

        /**
         *  除以1e6
         */

        $('#area_occupied').val( render['labBase-area_occupied'] / 1e6);
        $('#labBase-total_equipment_value').val( render['labBase-total_equipment_value'] / 1e6);

        $('#self_fund').val( render['labInvestSource-self_fund'] / 1e6);
        $('#firm_invest').val( render['labInvestSource-firm_invest'] / 1e6);
        $('#supervisor_invest').val( render['labInvestSource-supervisor_invest'] / 1e6);
        $('#labInvestSource-government_fund').val( render['labInvestSource-government_fund'] / 1e6);
        $('#other_fund').val( render['labInvestSource-other_fund'] / 1e6);

        $('#tech_invest').val( render['labInvestSource-tech_invest'] / 1e6);
        $('#recommend_invest').val( render['labInvestSource-recommend_invest'] / 1e6);
        $('#kjj_fund').val( render['labInvestSource-kjj_fund'] / 1e6);

    }


    /**
     *  render  end
     */



    /**
     *  数据保存
     */
    form.on('submit(save)', function(data){
        let fd = data.field;
        console.log("fd: ", fd);


        for (let k in fd) {
            if ( !k.indexOf('assets-') ) {
                allData.firmCapitalFlow[k.slice('assets-'.length)] = fd[k] * 1e6; // id也*1e6 并且 /1e6

            } else if ( !k.indexOf('base-') ) {
                allData.applyFirm[k.slice('base-'.length)] = fd[k];

            } else if ( !k.indexOf('labBase-') ) {
                allData.projects[k.slice('labBase-'.length)] = fd[k];

            } else if ( !k.indexOf('labInvest-') ) {

                allData.planInvestEstimate[k.slice('labInvest-'.length)] = fd[k] * 1e6;

            } else if ( !k.indexOf('labInvestSource-') ) {
                allData.planInvestSource[k.slice('labInvestSource-'.length)] = fd[k];

            } else if ( !k.indexOf('labSkill-') ) {
                allData.skillLeader[k.slice('labSkill-'.length)] = fd[k];

            } else if ( !k.indexOf('labYear-') ) {
                allData.planFundList[k.slice('labYear-'.length)] = fd[k];

            } else if ( !k.indexOf('rep-') ) {
                allData.prjLeader[k.slice('rep-'.length)] = fd[k];

            } else if ( !k.indexOf('labStaff-') ) {
                allData.firmPeopleSituation[k.slice('labStaff-'.length)] = fd[k];
            }
        }


        // 【重点实验室年度经费投入计划】
        allData.planFundList = [
            {
                id: $('#yearId0').text(),
                year: "第一年度",
                invest : allData.planFundList.invest0 * 1e6,
                origin : allData.planFundList.origin0 ,
                usage  : allData.planFundList.usage0,
            },
            {
                id: $('#yearId1').text(),
                year: "第二年度",
                invest : allData.planFundList.invest1 * 1e6,
                origin : allData.planFundList.origin1,
                usage  : allData.planFundList.usage1,
            },
            {
                id: $('#yearId2').text(),
                year: "第三年度",
                invest : allData.planFundList.invest2 * 1e6,
                origin : allData.planFundList.origin2,
                usage  : allData.planFundList.usage2,
            }
        ];

        allData.firmBenefitSituationList = research_achieve();

        // 设备总值(万元)
        allData.projects.area_occupied = $('#area_occupied').val() * 1e6;
        allData.projects.total_equipment_value = $('#labBase-total_equipment_value').val() * 1e6;

        // 计划新增投入来源 * 1e6
        allData.planInvestSource.self_fund = $('#self_fund').val() * 1e6;
        allData.planInvestSource.firm_invest = $('#firm_invest').val() * 1e6;
        allData.planInvestSource.supervisor_invest = $('#supervisor_invest').val() * 1e6;
        allData.planInvestSource.government_fund = $('#labInvestSource-government_fund').val() * 1e6;
        allData.planInvestSource.other_fund = $('#other_fund').val() * 1e6;

        // research
        if (!!allData.planInvestSource.tech_invest) {
            allData.planInvestSource.tech_invest = $('#tech_invest').val() * 1e6;
        }
        // research
        if (!!allData.planInvestSource.recommend_invest) {
            allData.planInvestSource.recommend_invest = $('#recommend_invest').val() * 1e6;
        }
        if (allData.planInvestSource.kjj_fund) {
            allData.planInvestSource.kjj_fund = $('#kjj_fund').val() * 1e6;
        }




        console.log("allData: ", allData);
        // 发给后端
        send();

        return false; //阻止表单跳转。如果需要表单跳转，去掉这段即可。
    });


    // 项目提交
    form.on("submit(submit)", function (data) {
        layer.confirm("确认提交该项目？", function (index) {
            let projectId = layui.data(setter.tableName).projectId;

            console.log("提交项目的id为: ", projectId);
            $.ajax({
                type: "POST",
                url: "/mytio/user/proStatus/afterSubmit?projectId=" + projectId + "&current=1",
                dataType: "json",
                success: function () {
                    layer.alert("提交成功!", function () {
                        layer.closeAll();
                    });
                },
                error: function () {
                    layer_err();
                }
            });
        });
        return false;
    });



    function send() {
        if (is_research_Apply || is_engineer_Apply) {
            apply_send();
        } else if (is_research_Modify ) {
            modify_send("search");
        } else if (is_engineer_Modify) {
            modify_send("engineer");
        }
    }


    function apply_send() {
        // 名称唯一性检查
        $.ajax({
            url: `/mytio/user/pro/checkPrjName?proName=${$('#unique-name').val()}`
            ,success(res) {
                if (res.ok === true && res.data === false) {  // 名称可用
                    if (is_research_Apply) {
                        allData.projects.supervisor = 1;
                        sendData('search');
                    } else {
                        sendData('engineer');
                    }
                } else {
                    if (is_research_Apply) {
                        layer.msg('实验室名称已经存在');
                    } else {
                        layer.msg('机构名称已经存在');
                    }

                }
            },
            error(){
                console.error('名称唯一性检查错误')
            }
        });
    }


    function modify_send(part_url) {
        $.ajax({
            url: `/mytio/user/${part_url}/update?projectId=${projectId}`,
            type: 'post',
            data: JSON.stringify(allData),
            dataType: 'json',
            contentType: 'application/json;charset=utf-8',
            success(res) {
                if (res.ok) {
                    layer.alert('操作成功')
                } else {
                    layer.alert('操作失败')
                }
            }
        });
        layer.closeAll();
    }



    function sendData(part_url) {
        $.ajax({
            url: `/mytio/user/${part_url}/declare?userId=${userId}`,
            type: 'post',
            data: JSON.stringify(allData),
            dataType: 'json',
            contentType: 'application/json;charset=utf-8',
            success(res) {
                if (res.ok) {
                    $$('#main').hidden = true;
                    $$('#fileUpload').hidden = false;
                    projectId = res.data;
                    layui.data(setter.tableName, {
                        key: "projectId",
                        value: res.data // res.data是projectId
                    });

                    let fileUpload = layui.fileUpload;
                    fileUpload.Render();

                    $.ajax({
                        type: "POST",
                        url: "/mytio/user/proStatus/init?projectId=" + res.data + "&current=0",
                        dataType: "json",
                        success: function () {
                            layer.alert('操作成功');
                        },
                        error: function () {
                            layer_err('proStatus init error');
                        }
                    });

                } else {
                    layer.alert('操作失败')
                }
            }
        });

        allData = {
            projects: {},    // projects  labBase
            firmCapitalFlow: {},   // firm_capital_flow   assets
            applyFirm: {}, //applyFirm  base
            planInvestEstimate: {},      // plan_invest_estimate  labInvest
            planInvestSource: {},// plan_invest_source   labInvestSource
            skillLeader: {},   //skill_leader  labSkill
            prjLeader: {},  // prj_leader   rep
            firmPeopleSituation: {},     // firmPeopleSituation  labStaff
            planFundList: [],        // plan_fund    labYear
        };
    }


    /**
     *   完成 ↓
     */


    /**
     *  获取多条的数据
     */
    function research_achieve() {
        let research_achieve_arr = [];
        for (let i = 0; i < $('#research_achieve_position tr').length - 1; i++) {
            research_achieve_arr.push({
                id: $('#research_achieve_position tr').eq(i + 1).find('span').text(),
                product: $('#research_achieve_position tr').eq(i+1).find('input').eq(0).val(),
                situation: $('#research_achieve_position tr').eq(i+1).find('input').eq(1).val()
            })
        }
        return research_achieve_arr;
    }


    /**
     * research_achieve  add and delete 【代表性研究成果及产品和获奖、应用及效益情况】
     */
    $(document).on('click', '#research_achieve_btn', function () {

        let str = `<tr>
                        <th>
                            <span hidden></span>
                            <input autocomplete="off" class="zp-input" id="product0" placeholder="请输入代表性研究成果及产品" lay-verify="required"
                                   type="text">
                        </th>
                        <th>
                            <span hidden></span>
                            <input autocomplete="off" class="zp-input" id="situation0" placeholder="请输入获奖、应用及效益情况" lay-verify="required"
                                   type="text">
                        </th>
                        <th>
                            <button class="btn btn-delete delete_research_achieve_tr" type="button">
                                删除
                            </button>
                        </th>
                    </tr>`;

        $('#research_achieve_position').append(str)

    });
    $(document).on('click', '.delete_research_achieve_tr', function () {
        let that = this;
        let id = this.parentElement.parentElement.children[0].firstElementChild.textContent;
        if (confirm('确定删除?')) {
            if (!id) {
                this.parentElement.parentElement.remove();
            } else {
                $.ajax({
                    url: `/mytio/user/del/firmBenefitSituation?id=${id}`,
                    type: "put",
                    contentType: "application/json",
                    success(res) {
                        if (res.ok) {
                            that.parentElement.parentElement.remove();
                        }else {
                            layer.alert('删除失败!')
                        }
                    }
                });
            }
        }
    });


    // Array.from(document.getElementsByTagName("input")).map((d)=>{
    //     d.removeAttribute('lay-verify')
    // });

    // console.log($('form > table input'));
    // Array.from($('form > table input')).map((d)=>{
    //     if (!d.getAttribute('lay-verify')) {
    //         d.setAttribute('lay-verify', 'required')
    //     }
    //     console.log(d.hidden);
    //     if (d.hidden === true || d.style.display == 'none') {
    //         console.log("true", d);
    //     } else {
    //         // console.log("false", d);
    //
    //     }
    // });
    // Array.from(document.getElementsByTagName("textarea")).map((d)=>{
    //     if (!d.hasAttribute('lay-verify')) {
    //         d.setAttribute('lay-verify', 'required')
    //     }
    // });
    // Array.from(document.getElementsByTagName("select")).map((d)=>{
    //     if (!d.hasAttribute('lay-verify')) {
    //         d.setAttribute('lay-verify', 'required')
    //     }
    // });


    exports('research_and_engineer',{Render, render_modify_page});
});
