/**
 * @author 周鹏
 */

/**
 *  岳阳市院士工作站申报修改, 单独的文件
 */


console.log("岳阳市院士工作站 ");


layui.define(['apply_global', 'fileUpload', 'form'], function (exports) {
    let $ = layui.$;
    let admin = layui.admin;
    let form = layui.form;
    let layer = layui.layer;
    let setter = layui.setter;
    form.render();

    let allData = {
        projects: {},
        applyFirm: {},
        academicianList: {},
        academicianCooperationProjectList: {},
        academicianTeamSituationList: {},
    };
    let userId;
    let projectId;
    let isApply;
    let isModify;

    function Render() {
        $$('#show-project-brief').dataset.tooltip = $$('#project-brief').innerHTML;
        userId = layui.data(setter.tableName).userId;
        projectId = layui.data(setter.tableName).projectId;

        isApply = !!document.getElementsByClassName('zp-workstation-apply').length;
        isModify = !!document.getElementsByClassName('zp-workstation-modify').length;
    }


    /**
     *  render 把render_modify_page导出, HTML获取数据然后传递过来渲染
     */
    function render_modify_page(data) {
        console.log("修改页面获取的数据:", data);
        if (!data) return;

        let render = {};
        let pro = data.projects[0];
        let le = data.applyFirm[0];

        for (let p in pro) {
            render['p-' + p] = pro[p];
        }
        for (let l in le) {
            render['apply-' + l] = le[l];
        }

        render['apply-firm_assets'] = render['apply-firm_assets'] / 1e6;

        console.log("render", render);
        form.val("project-from", render);


        if (render['p-tech_area'] === '信息与通信技术' ||
            render['p-tech_area'] === '生物医药' ||
            render['p-tech_area'] === '能源与环境' ||
            render['p-tech_area'] === '冶金' ||
            render['p-tech_area'] === '制造业'
        ) {
            console.log("非其他业务领域");
        } else {
            console.log("其他业务领域");
            $('#other-tech_area').val(render['p-tech_area']);
            document.getElementById('other-tech_area').style.display = "";
            $$('#other-tech_area_radio').checked = true;
            form.val("project-from", {
                "p-tech_area": true
            })
        }

    }


    /**
     *  render  end
     */


    /**
     *  针对[主要业务领域]的操作
     * */
    form.on('radio', function (data) {

        if (data.value === '其他' && data.elem.checked) {
            document.getElementById('other-tech_area').style.display = "";
        }
        if (data.value !== '其他') {
            document.getElementById('other-tech_area').style.display = 'none';
            document.getElementById('other-tech_area').value = '';
        }
    });


    /**
     *  数据保存
     */
    form.on('submit(save)', function (data) {
        let fd = data.field;
        console.log("fd: ", fd);

        /**
         *  获取多条院士基本情况
         */
        let academicianArr1 = [];
        let academicianArr2 = [];
        let academician_elem = $('.add_academician_elem');
        for (let i = 0; i < academician_elem.length; i++) {
            let inputElem = academician_elem.eq(i).find('input');
            let textareaElem = academician_elem.eq(i).find('textarea');
            let selectElem = academician_elem.eq(i).find('select');

            let tempObj1 = {};
            let tempObj2 = {};

            function getElemData(elem) {
                for (let i = 0; i < elem.length; i++) {
                    if (!elem.eq(i).attr('name').indexOf('ac-')) {
                        tempObj1[elem.eq(i).attr('name').slice(3)] = elem.eq(i).val();
                    } else {
                        if (elem.eq(i).attr('name').slice(7) === 'sale_revenue' ||
                            elem.eq(i).attr('name').slice(7) === 'loan') {
                            tempObj2[elem.eq(i).attr('name').slice(7)] = elem.eq(i).val() * 1e6;
                        } else {
                            tempObj2[elem.eq(i).attr('name').slice(7)] = elem.eq(i).val();
                        }

                    }
                }
            }

            getElemData(inputElem);
            getElemData(textareaElem);
            getElemData(selectElem);


            academicianArr1.push(tempObj1);
            academicianArr2.push(tempObj2);
        }

        allData.academicianList = academicianArr1;
        allData.academicianCooperationProjectList = academicianArr2;

        for (let k in fd) {
            // console.log("k",k);
            if (!k.indexOf('p-')) {
                allData.projects[k.slice(2)] = fd[k];
            } else if (!k.indexOf('apply-')) {
                if (!k.indexOf('apply-firm_assets')) {
                    allData.applyFirm[k.slice(6)] = fd[k] * 1e6;
                } else {
                    allData.applyFirm[k.slice(6)] = fd[k];
                }
            }
        }
        // 主要业务领域
        if (allData.projects['tech_area'] === '其他') {
            let val = document.getElementById('other-tech_area').value;
            if (val) {
                allData.projects['tech_area'] = val;
            }
        }


        /**
         *  获取多条的数据
         */
        let team = [];
        for (let i = 0; i < $('#append_team_position tr').length; i++) {
            team.push({
                id: $('#append_team_position tr').eq(i).find('span').text(),
                name: $('#append_team_position tr').eq(i).find('input').eq(0).val(),
                firm_name: $('#append_team_position tr').eq(i).find('input').eq(1).val(),
                title: $('#append_team_position tr').eq(i).find('input').eq(2).val(),
                phone: $('#append_team_position tr').eq(i).find('input').eq(3).val(),
                effort: $('#append_team_position tr').eq(i).find('input').eq(4).val(),
                start_time: $('#append_team_position tr').eq(i).find('input').eq(5).val(),
            })
        }

        allData.academicianTeamSituationList = team;

        allData.projects.supervisor = 1;

        console.log("allData: ", allData);

        // 发给后端
        send();

        return false;
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
        if (isApply) {
            apply_send();
        } else if (isModify) {
            modify_send();
        }
    }


    function apply_send() {
        // 名称唯一性检查
        $.ajax({
            url: `/mytio/user/pro/checkPrjName?proName=${$('#workstation-name').val()}`
            , success(res) {
                if (res.ok === true && res.data === false) {
                    // 名称可用
                    sendData();
                } else {
                    layer.msg('院士工作站名称已经存在');
                }
            },
            error() {
                console.error('名称唯一性检查错误')
            }
        });

        function sendData() {
            $.ajax({
                url: `/mytio/user/workstation/declare?userId=${userId}`,
                type: 'post',
                data: JSON.stringify(allData),
                dataType: 'json',
                contentType: 'application/json;charset=utf-8',
                success(res) {
                    if (res.ok) {
                        layer.alert('操作成功');
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
                                // layer_suc();
                            },
                            error: function () {
                                layer_err('proStatus init error');
                            }
                        });

                    } else {
                        layer.alert('操作失败')
                    }
                }
            })
        }
    }


    function modify_send() {
        $.ajax({
            url: `/mytio/user/workstation/update?projectId=${projectId}`,
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


    /**
     *  temp 辅助功能
     */

    // Array.from(document.getElementsByTagName("input")).map((d)=>{
    //
    //         d.removeAttribute('lay-verify')
    //
    // });
    // Array.from(document.getElementsByTagName("textarea")).map((d)=>{
    //
    //         d.removeAttribute('lay-verify')
    //
    // });
    // Array.from(document.getElementsByTagName("select")).map((d)=>{
    //
    //         d.removeAttribute('lay-verify')
    //
    // });

    /**
     *  temp 辅助功能 ---end
     */


    /**
     *  下面除了删除都是辅助功能
     */
    // 序号
    $(document).on('click', function () {
        for (let i = 0; i < $(".number_academician").length; i++) {
            $(".number_academician").eq(i).text(i + 1);
        }
    });

    /**
     *  add_academician  add多位院士
     */

    $(document).on('click', '#add_academician_btn', function () {
        let str = `<div style="text-align: left" class="add_academician_elem">
                <div class="zp-bfinput" style="width: 100%;font-size: 22px;text-align: center;">
                    当前是第<span class="number_academician">1</span>份院士基本情况
                    <button class="delete_academician layui-btn layui-btn-danger layui-btn-sm" style="position: relative;left: 160px;" type="button">
                        删除当前院士基本情况
                    </button>
                </div>
                <div>
                    <span class="c1">院士姓名</span><input name="ac-name" type="text" class="clong2 zp-input" lay-verify="required">
                    <span class="c1">出生日期</span><input name="ac-birthday" type="number" class="c4 zp-input lay-Date" lay-verify="required">
                </div>
                <div>
                    <span class="c1">学科领域</span><input name="ac-tech_area" type="text" class="clong2 zp-input" lay-verify="required">
                    <span class="c1">邮箱地址</span><input name="ac-email" type="text" class="c4 zp-input" lay-verify="required">
                </div>
                <div>
                    <span class="c1">院士联系电话</span><input name="ac-phone" type="number" class="clong2 zp-input" lay-verify="required">
                    <span class="c1">传真</span><input name="ac-fax" type="text" class="c4 zp-input" lay-verify="required">
                </div>
                <div>
                    <span class="c1">工作单位</span><input name="ac-firm_name" type="text" class="clong2 zp-input" lay-verify="required">
                    <span class="c1">是否是驻湘院士</span>
                    <select  name="ac-enter" class="c4" lay-ignore lay-verify="required">
                        <option value=""></option>
                        <option value="是">是</option>
                        <option value="否">否</option>
                    </select>
                </div>
                <div>
                    <span class="c1" style="">是中国工程院还是中国科学院院士</span>
                    <select  name="ac-come_from" class="clong2" lay-ignore lay-verify="required">
                        <option value=""></option>
                        <option value="中国工程院">中国工程院</option>
                        <option value="中国科学院院士">中国科学院院士</option>
                    </select>
                </div>

                <div>
                    <h3 class="zp-bfinput" style="width: 100%;font-size: 16px;text-align: left;padding-left: 30px;margin-top: 10px;">
                        院士与企业合作项目情况
                    </h3>
                    <div>
                        <span class="c1">项目名称</span>
                        <input name="ac_aoo-project_name" type="text" class="clong2 zp-input" lay-verify="required">
                    </div>
                    <div>
                        <span class="c1">项目合作起止时间</span>
                        <input name="ac_aoo-start" type="number" class=" zp-input lay-Date" style="width: 95px;" placeholder="开始时间" lay-verify="required">
                        <input name="ac_aoo-end" type="number" class=" zp-input lay-Date" style="width: 95px;" placeholder="结束时间" lay-verify="required">
                        <span class="c1">销售收入（万元）</span>
                        <input name="ac_aoo-sale_revenue" type="number" class="c4 zp-input" lay-verify="required">
                    </div>
                    <div>
                        <span class="c1">利税（万元）</span>
                        <input name="ac_aoo-loan" type="number" class="clong2 zp-input" lay-verify="required">
                        <span class="c1">新增就业</span>
                        <input name="ac_aoo-new_employment" type="text" class="c4 zp-input" lay-verify="required">
                    </div>
                </div>
                <div>
                    <h3 class="zp-bfinput" style="width: 100%;font-size: 16px;text-align: left;padding-left: 30px;margin-top: 10px;">
                        申报专利或品种审定
                    </h3>
                    <textarea name="ac_aoo-patent_or_variety" cols="30" rows="10" placeholder="" lay-verify="required"></textarea>
                </div>
                <div>
                    <h3 class="zp-bfinput" style="width: 100%;font-size: 16px;text-align: left;padding-left: 30px;margin-top: 10px;">
                        经费投入情况
                    </h3>
                    <textarea name="ac_aoo-invest_fund"   cols="30" rows="10" placeholder="" lay-verify="required"></textarea>
                </div>
                <div style="margin-bottom: 30px;">
                    <h3 class="zp-bfinput" style="width: 100%;font-size: 16px;text-align: left;padding-left: 30px;margin-top: 10px;">
                        研究重点和经济、社会效益分析
                    </h3>
                    <textarea name="ac_aoo-benefit_analysis"  cols="30" rows="10" placeholder="" lay-verify="required"></textarea>
                </div>

            </div>`;
        $('#part2').append(str);
    });
    $(document).on('click', '.delete_academician', function () {
        let that = this;
        let id1;
        let id2;
        if (confirm('确定删除?')) {
            if (!this.parentElement.previousElementSibling) {
                this.parentElement.parentElement.remove();
            } else {
                id1 = this.parentElement.previousElementSibling.previousElementSibling.value;
                id2 = this.parentElement.previousElementSibling.value;
                console.log('id1, id2: ', id1, id2);
                $.ajax({
                    url: `/mytio/user/del/academician?id1=${id1}&id2=${id2}`,
                    type: "put",
                    contentType: "application/json",
                    success(res) {
                        if (res.ok) {
                            that.parentElement.parentElement.remove();
                        } else {
                            layer.alert('删除失败!')
                        }
                    }
                })
            }

        }


    });


    /**
     * add_academician_team  add and delete 院士团队tr
     */
    $(document).on('click', '#add_team_btn', function () {

        let str = `<tr class="add_team_tr">
                            <td><input type="text" style="width: 50px;" name="" lay-verify="required"></td>
                            <td><input type="text" style="width: 80px;" name="" lay-verify="required"></td>
                            <td><input type="text" style="width: 80px;" name="" lay-verify="required"></td>
                            <td><input type="number" style="width: 100px;" name="" lay-verify="phone|required"></td>
                            <td><input type="text" style="width: 200px;" name="" lay-verify="required"></td>
                            <td><input type="text" style="width: 120px;" name=""  class="lay-DateY" lay-verify="number4|required"></td>
                            <td>
                                <button type="button" class="btn btn-delete delete_team_tr" >删除</button>
                            </td>
                        </tr>`;

        $('#append_team_position').append(str)

    });

    $(document).on('click', '.delete_team_tr', function () {
        let that = this;
        let id = this.parentElement.parentElement.children[0].textContent;
        if (confirm('确定删除?')) {
            if (!id) {
                this.parentElement.parentElement.remove();
            } else {
                $.ajax({
                    url: `/mytio/user/del/academicianTeamSituation?id=${id}`,
                    type: "put",
                    contentType: "application/json",
                    success(res) {
                        if (res.ok) {
                            that.parentElement.parentElement.remove();
                        } else {
                            layer.alert('删除失败!')
                        }
                    }
                })
            }
        }
    });


    exports('workstation', {
        allData,
        Render,
        render_modify_page
    });
});
