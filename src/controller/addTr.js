/**
 * @author 周鹏
 * @最后修改日期 2019-07-25
 */

/**
 * 只需引入即可, 所有的申报修改页面都通用
 * 主要功能: 公共部分多条数据的新增
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

  /**
   * 合作单位信息
   */

  $(document).on("click", "#cooperation-add", function() {
    let cooperation = $("#cooperation");
    let addtr = $(
      `<tr>
                    <th style="text-align: center">

                    </th>
                    <th>
                        <input type="text" id="cooperation-name  " lay-verify="required" placeholder="请输入" autocomplete="off"
                               class="zp-input" >
                    </th>

                    <th>
                        <input type="text" id="cooperation-type  " lay-verify="required" placeholder="请输入" autocomplete="off"
                               class="zp-input" >
                    </th>

                    <th>
                        <input type="text" id="cooperation-org_code  " lay-verify="org_code1" placeholder="请输入18位统一社会信用代码（可不填）" autocomplete="off"
                               class="zp-input" >
                    </th>
                    <th style="text-align: center;">
                        <button class='btn btn-delete cooperation-del' type='button'>
                            删除
                        </button>
                    </th>
                </tr>`
    );

    addtr.appendTo(cooperation);
  });

  /**
   * 主要参与人员
   */

  $(document).on("click", "#participate-add", function() {
    let participate = $("#participate");
    let addtr = $(
      `<tr>
                    <th>
                        <span></span>
                    </th>
                    <th>
                        <input type="text" id="participate-name " placeholder="请输入" autocomplete="off" lay-verify="required"
                               class="zp-input" >
                    </th>

                    <th>
                        <select id="participate-gender " lay-verify="required" lay-ignore>
                            <option value=""></option>
                            <option value="男">男</option>
                            <option value="女">女</option>
                        </select>
                    </th>

                    <th>
                        <input type="number" id="participate-age " placeholder="请输入" autocomplete="off" lay-verify="required"
                               class="zp-input" >
                    </th>

                    <th>
                        <select id="participate-title " lay-verify="required" lay-ignore>
                            <option value=""></option>
                            <option value="初级">初级</option>
                            <option value="中级">中级</option>
                            <option value="副高">副高</option>
                            <option value="高级">高级</option>
                        </select>
                    </th>
                    <th>
                        <input type="text" id="participate-idcode " placeholder="请输入" autocomplete="off" lay-verify="identity"
                               class="zp-input" >
                    </th>
                    <th>
                        <input type="text" id="participate-firmName " placeholder="请输入" autocomplete="off" lay-verify="required"
                               class="zp-input" >
                    </th>
                    <th>
                        <button class="btn btn-delete participate-del" type="button">
                        删除
                        </button>
                    </th>
                </tr>`
    );
    addtr.appendTo(participate);
  });

  /**
   *     经费预算
   */

  $(document).on("click", "#costBudget-add", function() {
    let costBudget = $("#costBudget");
    let addtr = $(
      `<tr>
                    <th style="text-align: center">
                        <span></span>
                    </th>
                    <th>
                        <input type="text" id=${"subject"} placeholder="请输入" autocomplete="off" lay-verify="required"
                               class="zp-input">
                    </th>

                    <th>
                        <input type="number" id=${"fund"} placeholder="请输入" autocomplete="off" lay-verify="required"
                               class="zp-input">
                    </th>
                    <th>
                        <input type="number" id=${"financial_fund"} placeholder="请输入" autocomplete="off" lay-verify="required"
                               class="zp-input">
                    </th>

                    <th>
                        <button class="btn btn-delete costBudget-del" type="button">
                            删除
                        </button>
                    </th>
                </tr>`
    );

    addtr.appendTo(costBudget);
  });

  /**
   *     经费预算 [point]  把type="number" 变成 type="text", 把financial_fund 变成 note
   */

  $(document).on("click", "#costBudget-add2", function() {
    let costBudget = $("#costBudget2");
    let addtr = $(
      `<tr>
                    <th style="text-align: center">
                        <span></span>
                    </th>
                    <th>
                        <input type="text" id=${"subject"} placeholder="请输入" autocomplete="off" lay-verify="required"
                               class="zp-input">
                    </th>

                    <th>
                        <input type="number" id=${"fund"} placeholder="请输入" autocomplete="off" lay-verify="required"
                               class="zp-input">
                    </th>
                    <th>
                        <input type="text" id=${"note"} placeholder="请输入" autocomplete="off" lay-verify="required"
                               class="zp-input">
                    </th>

                    <th>
                        <button class="btn btn-delete costBudget-del" type="button">
                            删除
                        </button>
                    </th>
                </tr>`
    );

    addtr.appendTo(costBudget);
  });



  /**
   *  [major, point] 负责人承担项目情况 bear
   */

  $(document).on("click", "#bear-add", function() {
    let bear = $("#bear");
    let addtr = $(
      `<tr>
                    <th></th>
                    <th>
                        <input type="text" id="bear-name " placeholder="请输入" autocomplete="off" lay-verify="required"
                               class="zp-input" >
                    </th>

                    <th>
                        <input type="number" id="bear-code " placeholder="请输入" autocomplete="off" lay-verify="required"
                               class="zp-input" >
                    </th>
                    <th>
                        <input type="number" id="bear-fund " placeholder="请输入" autocomplete="off" lay-verify="required"
                               class="zp-input" >
                    </th>
                    <th>
                        <input type="number" id="bear-start " placeholder="请输入起始年月" autocomplete="off" lay-verify="required|number6"
                               class="zp-input lay-DateM" >
                    </th>
                    <th>
                        <input type="number" id="bear-end " placeholder="请输入终止年月" autocomplete="off" lay-verify="required|number6"
                               class="zp-input lay-DateM" >
                    </th>
                    <th>
                        <input type="text" id="bear-origin " placeholder="请输入" autocomplete="off" lay-verify="required"
                               class="zp-input" >
                    </th>

                    <th>
                        <button class="btn btn-delete bear-del" type="button">
                            删除
                        </button>
                    </th>
                </tr>`
    );

    addtr.appendTo(bear);
  });





    /**
     *  [major] 项目拟购置、试制科研设备清单 equipmentList
     *
     */

    $(document).on("click", "#equipmentList-add", function() {
        let equipmentList = $("#equipmentList");
        let addtr = $(
            `<tr>
                    <th>

                    </th>
                    <th>
                        <input type="text" id="equipmentList-name " placeholder="请输入" autocomplete="off" lay-verify="required"
                               class="zp-input" >
                    </th>
                    <th>
                        <input type="text" id="equipmentList-type " placeholder="请输入" autocomplete="off" lay-verify="required"
                               class="zp-input" >
                    </th>
                    <th>
                        <input type="text" id="equipmentList-area " placeholder="请输入" autocomplete="off" lay-verify="required"
                               class="zp-input" >
                    </th>
                    <th>
                        <input type="number" id="equipmentList-amount " placeholder="请输入" autocomplete="off" lay-verify="required"
                               class="zp-input" >
                    </th>
                    <th>
                        <input type="number" id="equipmentList-price " placeholder="请输入" autocomplete="off" lay-verify="required"
                               class="zp-input" >
                    </th>
                    <th>
                        <input type="number" id="equipmentList-total " placeholder="请输入" autocomplete="off" lay-verify="required"
                               class="zp-input" >
                    </th>
                    <th>
                        <input type="text" id="equipmentList-function " placeholder="请输入" autocomplete="off" lay-verify="required"
                               class="zp-input" >
                    </th>
                    <th>
                        <input type="text" id="equipmentList-origin " placeholder="请输入" autocomplete="off" lay-verify="required"
                               class="zp-input" >
                    </th>

                    <th>
                        <button class="btn btn-delete equipmentList-del" type="button">
                            删除
                        </button>
                    </th>
                </tr>`
        );

        addtr.appendTo(equipmentList);
    });



    /**
     *  [point] 自主知识产权情况 knowledge
     *
     */

    $(document).on("click", "#knowledge-add", function() {
        let knowledge = $("#knowledge");
        let addtr = $(
            `<tr>
                    <th></th>
                    <th>
                        <input type="text" id="knowledge-type " placeholder="请输入" autocomplete="off" lay-verify="required"
                               class="zp-input" >
                    </th>
                    <th>
                        <input type="text" id="knowledge-name " placeholder="请输入" autocomplete="off" lay-verify="required"
                               class="zp-input" >
                    </th>
                    <th>
                        <input type="number" id="knowledge-auth_number " placeholder="请输入" autocomplete="off" lay-verify="required"
                               class="zp-input" >
                    </th>
                    <th>
                        <input type="number" id="knowledge-time " placeholder="请输入" autocomplete="off" lay-verify="required"
                               class="zp-input lay-Date" >
                    </th>
                    <th>
                        <input type="text" id="knowledge-order " placeholder="请输入" autocomplete="off" lay-verify="required"
                               class="zp-input" >
                    </th>

                    <th>
                        <button class="btn btn-delete knowledge-del" type="button">
                            删除
                        </button>
                    </th>
                </tr>`
        );

        addtr.appendTo(knowledge);
    });



    /**
     * 老模板  项目成员信息 member
     */

    $(document).on("click", "#member-add", function() {
        let member = $("#member");
        let addtr = $(
            `<tr>
                    <th style="text-align: center">

                    </th>
                    <th>
                        <input type="text" id="member-name  " lay-verify="required" placeholder="请输入" autocomplete="off"
                               class="zp-input" >
                    </th>

                    <th>
                        <input type="text" id="member-idcode  " lay-verify="required|identity" placeholder="请输入" autocomplete="off"
                               class="zp-input" >
                    </th>

                    <th>
                        <input type="text" id="member-contribution  " lay-verify="required" placeholder="请输入" autocomplete="off"
                               class="zp-input" >
                    </th>
                    <th style="text-align: center;">
                        <button class='btn btn-delete member-del' type='button'>
                            删除
                        </button>
                    </th>
                </tr>`
        );

        addtr.appendTo(member);
    });



  //对外暴露的接口
  exports("addTr", {});
});

