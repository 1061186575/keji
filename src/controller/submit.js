/**
 * @author 周鹏
 * @最后修改日期 2019-04-17
 */

/**
 * 只需引入即可, 所有的申报修改页面都通用
 * 主要功能: 提交数据
 */

layui.define(
    [
        "form",
        "save_data",
        "fileUpload",
        "table",
        "upload",
        "laydate",
        "element"
    ],
    function (exports) {
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
            upload = layui.upload,
            save_data = layui.save_data;
        let fileUpload = layui.fileUpload;

        // declare_or_update判断是申报页面还是修改页面
        let declare_or_update = "";

        function Render() {
            if (!$("#identifier-modify").eq(0).text()) {
                declare_or_update = "declare";  // 申报页面
            } else {
                declare_or_update = "update"; // 修改页面
            }
            console.log('declare_or_update', declare_or_update)
        }

        Render();

        // 检查用户名是否唯一
        async function uniqueName() {
            let is_uniqueName = false;

            let proName = $("#project-name").val();


            if (declare_or_update == "declare") {
                await $.ajax({
                    url: `/mytio/user/pro/checkPrjName?proName=${proName}`,
                    type: "GET",
                    contentType: "application/json; charset=utf-8",
                    // async: false,
                    success: function (res) {
                        console.log("用户名是否唯一res", res);
                        if (res.data === true) {
                            is_uniqueName = true;
                        }
                    }
                });
            }

            if (declare_or_update == "update") {
                is_uniqueName = false;
            }

            return is_uniqueName;
        }

        // 发送数据到后端
        async function send(url) {


            let is_uniqueName = await uniqueName();


            if (is_uniqueName) {
                layer.alert("该项目名已存在");
                allData = {
                    project: {},
                    prjLeader: {},
                    skillLeader: {},
                    leaderFirm: {},
                    prj_appl_firm: {},
                };
            } else {
                let userId = layui.data(setter.tableName).userId;

                if (declare_or_update == "update") {
                    userId = "";
                }

                $.ajax({
                    type: "POST",
                    url: url + userId,
                    contentType: "application/json; charset=utf-8",
                    data: JSON.stringify(allData),
                    success: function (res) {
                        console.log("收到后端数据res", res);

                        if (!res.ok) {
                            layer_err();
                            allData = {
                                project: {},
                                prjLeader: {},
                                skillLeader: {},
                                leaderFirm: {},
                                prj_appl_firm: {},
                            };
                            return;
                        }

                        layui.data(setter.tableName, {
                            key: "projectId",
                            value: res.data // res.data是projectId
                        });




                        if (declare_or_update == "declare") {
                            $.ajax({
                                type: "POST",
                                url: "/mytio/user/proStatus/init?projectId=" + res.data + "&current=0",
                                dataType: "json",
                                success: function () {
                                    // layer_suc();
                                    fileUpload.Render();
                                },
                                error: function () {
                                    layer_err('proStatus init err');
                                }
                            });
                        } else {
                            layer.closeAll();
                        }

                        layer_suc();

                        let main = document.getElementById("main");
                        if (main) {
                            main.setAttribute("hidden", "true");
                        }
                        let fileUploadEle = document.getElementById("fileUpload");
                        if (fileUploadEle) {
                            fileUploadEle.removeAttribute("hidden");
                        }


                    },
                    error: function () {
                        layer_err();
                    }
                });
                allData = {
                    project: {},
                    prjLeader: {},
                    skillLeader: {},
                    leaderFirm: {},
                    prj_appl_firm: {},
                };
            }
        }

        // 提交
        function submit() {
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
        }

        /**
         *  数据保存 && 提交
         */

        // common
        form.on("submit(common_save)", function (data) {
            save_data.save();
            if (declare_or_update == "declare") {
                send(`/mytio/user/common/${declare_or_update}?userId=`);
            }
            if (declare_or_update == "update") {
                send(`/mytio/user/common/${declare_or_update}`);
            }

            return false;
        });

        form.on("submit(common_submit)", function (data) {
            layer.confirm("确认提交该项目？", function (index) {
                submit();
            });
            return false;
        });

        // innovation
        form.on("submit(innovation_save)", function (data) {
            save_data.save();
            allData.project.is_new = 1;
            if (declare_or_update == "declare") {
                send(`/mytio/user/innovation/${declare_or_update}?userId=`);
            }
            if (declare_or_update == "update") {
                send(`/mytio/user/innovation/${declare_or_update}`);
            }
            return false;
        });

        form.on("submit(innovation_submit)", function (data) {
            layer.confirm("确认提交该项目？", function (index) {
                submit();
            });
            return false;
        });

        // major
        form.on("submit(major_save)", function (data) {
            save_data.save();
            allData.project.is_new = 1;
            if (declare_or_update == "declare") {
                send(`/mytio/user/major/${declare_or_update}?userId=`);
            }
            if (declare_or_update == "update") {
                send(`/mytio/user/major/${declare_or_update}`);
            }

            return false;
        });

        form.on("submit(major_submit)", function (data) {
            layer.confirm("确认提交该项目？", function (index) {
                submit();
            });
            return false;
        });

        // point
        form.on("submit(point_save)", function (data) {
            save_data.save();
            allData.project.is_new = 1;
            if (declare_or_update == "declare") {
                send(`/mytio/user/point/${declare_or_update}?userId=`);
            }
            if (declare_or_update == "update") {
                send(`/mytio/user/point/${declare_or_update}`);
            }

            return false;
        });

        form.on("submit(point_submit)", function (data) {
            layer.confirm("确认提交该项目？", function (index) {
                submit();
            });
            return false;
        });

        exports("submit", {Render});
    }
);
