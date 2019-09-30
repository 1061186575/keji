/**
 *  公共业务
 */

layui.define(function (exports) {
    var $ = layui.$
        , layer = layui.layer
        , laytpl = layui.laytpl
        , setter = layui.setter
        , view = layui.view
        , admin = layui.admin;

    //公共业务的逻辑处理可以写在此处，切换任何页面都会执行
    //转换tio Page
    function layui_page_parseData(res) { //res 即为原始返回的数据
        return {
            "code": 0, //解析接口状态
            "msg": "", //解析提示文本
            "count": res.data.totalRow, //解析数据长度
            "data": res.data.list, //解析数据列表
            "pageSize": res.data.pageSize,
            "pageNumber": res.data.pageNumber
        };
    }

    //项目申报
    function apply(title, id, content) {
        admin.popup({
            title: title,
            area: ['1100px', '600px'],
            id: id,
            shadeClose: false,
            success: function (layero, index) {
                view(this.id).render(content);
            }
        });
    }

    //项目查看
    function openCheck(title, id, content) {
        admin.popup({
            title: title,
            area: ["1100px", "600px"],
            id: id,
            shadeClose: false,
            success: function (layero, index) {
                view(this.id).render(content);
            }
        });
    }

    function check(obj) {
        layui.data(setter.tableName, {
            key: "projectId",
            value: obj.data.id
        });
        admin.req({
            url: './json/pm/projectCheckTpl.json?v='+layui.admin.v,
            type: 'GET',
            dataType: 'json',
            success: function (res) {
                layui.each(res.data, function (index, item) {
                    if (obj.data.mainid === index + 1) {
                        openCheck(item.title, item.id, item.content);
                    }
                });
            }
        });
    }

    //项目修改
    function openModify(title, id, content) {
        admin.popup({
            title: title,
            area: ["1100px", "600px"],
            id: id,
            shadeClose: false,
            success: function (layero, index) {
                view(this.id).render(content);
            }
        });
    }

    function modify(obj) {
        layui.data(setter.tableName, {
            key: "projectId",
            value: obj.data.id
        });
        admin.req({
            url: './json/pm/projectModifyTpl.json',
            type: 'GET',
            dataType: 'json',
            success: function (res) {
                console.log('projectModify: ', res.data);
                layui.each(res.data, function (index, item) {
                    if (obj.data.mainid === index + 1) {
                        openModify(item.title, item.id, item.content);
                    }
                });
            }
        });
    }

    //项目审核
    function openReview(id, content) {
        admin.popup({
            title: "审核项目",
            area: ["850px", "400px"],
            id: id,
            shadeClose: false,
            success: function (layero, index) {
                view(this.id).render(content);
            }
        });
    }

    function review(obj, role) {
        layui.data(setter.tableName, {
            key: "projectId",
            value: obj.data.id
        });
        admin.req({
            url: './json/pm/reviewTpl.json',
            type: 'GET',
            dataType: 'json',
            success: function (res) {
                console.log('reviewTpl: ', res.data);
                layui.each(res.data, function (index, item) {
                    if (item.role === role) {
                        openReview(item.id, item.content);
                    }
                });
            }
        });
    }

    //提交当前状态为未提交的项目
    function submitUnsubmitProject(obj) {
        layer.confirm(
            "请确认是否提交该项目",
            {icon: 3, title: "提交项目"},
            function (index) {
                admin.req({
                    url: "/mytio/user/proStatus/afterSubmit?projectId=" + obj.data.id + "&current=1 ",
                    dataType: "json",
                    type: "POST",
                    success: function (res) {
                        console.log("commitPro resData: ", res);
                        if (0 === res.code) {
                            obj.del();
                            layer.msg("项目提交成功");
                        } else if (1 === res.code) {
                            layer.msg("项目提交失败");
                        }
                    }
                });
            }
        );
    }

    function submitReturnProject(obj) {
        let current = null;
        let url = "/mytio/user/proStatus/afterSubmit";
        switch (obj.data.current) {
            case "推荐退回":
                current = 10;
                break;
            case "受理退回":
                admin.req({
                    url: `/mytio/user/proStatus/RecommendStatus?projectId=${obj.data.id}`,
                    type: "POST",
                    dataType: "json",
                    async: false,
                    success: function(res) {
                        console.log("提交已退回项目: ",res);
                        if (0 === res.code) {
                            if (res.data === "已推荐") {
                                current = 2;
                            } else if (res.data === "再次推荐") {
                                current = 4;
                            }
                        } else {
                            layer.alert("推荐状态请求失败");
                        }
                    }
                });
                break;
        }
        url = `${url}?projectId=${obj.data.id}&current=${current}`;
        console.log("提交已退回项目url: ",url);

        layer.confirm(
            "请确认是否提交该项目",
            {icon: 3, title: "提交项目"},
            function (index) {
                admin.req({
                    url: url,
                    dataType: "json",
                    type: "POST",
                    success: function (res) {
                        console.log("commitPro resData: ", res);
                        if (0 === res.code) {
                            obj.del();
                            layer.msg("项目提交成功");
                        } else if (1 === res.code) {
                            layer.msg("项目提交失败");
                        }
                    }
                });
            }
        );
    }

    //删除项目
    function deleteProject(obj) {
        layer.confirm(
            "请确认是否删除该项目",
            {icon: 3, title: "删除项目"},
            function (index) {
                admin.req({
                    url: "/mytio/user/del/project?projectId=" + obj.data.id + "&mainid=" + obj.data.mainid,
                    dataType: "json",
                    type: "POST",
                    success: function (res) {
                        console.log("deletePro resData: ", res);
                        if (0 === res.code) {
                            obj.del();
                            layer.msg("项目删除成功！");
                        } else {
                            layer.msg("项目删除失败！");
                        }
                    }
                });
            }
        );
    }

    //退出
    admin.events.logout = function () {
        //执行退出接口
        admin.req({
            url: '/mytio/logout',
            type: 'get',
            data: {},
            done: function (res) { //这里要说明一下：done 是只有 response 的 code 正常才会执行。而 succese 则是只要 http 为 200 就会执行
                //清空本地记录的 token，并跳转到登入页
                admin.exit();
                window.location.href = '#/user/login';
            }
        });
    };

    //重新登录
    admin.events.reLogin = function () {
        window.location.href = '#/user/login';
    };

    //对外暴露的接口
    exports('common', {
        layui_page_parseData,
        apply,
        check,
        modify,
        review,
        submitUnsubmitProject,
        submitReturnProject,
        deleteProject
    });
});
