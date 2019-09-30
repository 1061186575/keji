/**
 * @author 周鹏
 * @最后修改日期 2019-04-17
 */

/**
 * 全局js
 * 只需引入即可, 所有的申报修改页面都通用
 * 主要功能: 表单验证
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

    //自定义验证
    form.verify({
        num: [
            /^[+]{0,1}(\d+)$|^[+]{0,1}(\d+\.\d{1,6})$/,
            "请输入非负数且不超过小数点后六位"
        ],
        names: function(value) {
            if (value.length > 35) {
                return "项目名称不超过35个字";
            }
        },
        text500: function(value) {
            if (value.length > 500) {
                return "不超过500个字";
            }
        },
        text300: function(value) {
            if (value.length > 300) {
                return "不超过300个字";
            }
        },
        text200: function(value) {
            if (value.length > 200) {
                return "不超过200个字";
            }
        },
        budget: function(value) {
            if (value.length > 1000) {
                return "不超过1000个字";
            }
        },
        org_code1: function(value) {
            if (value.length !== 0 && value.length !== 18) {
                return "请确认您18位数的统一社会信用码无误!";
            }
        },
        org_code2: function(value) {
            if (value.length !== 18) {
                return "请确认您18位数的组织机构代码无误!";
            }
        },
        zip_code: function(value) {
            if (value.length !== 6) {
                return "邮编必须是6位数的!";
            }
        },
        number4: function(value) {
            if (value.length !== 4) {
                return "必须是4位数的格式!";
            }
        },
        number6: function(value) {
            if (value.length !== 6) {
                return "必须是6位数的格式!";
            }
        },
        number8: function(value) {
            if (value.length !== 8) {
                return "必须是8位数的格式!";
            }
        }
    });

    //对外暴露的接口
    exports("verify", {});
});
