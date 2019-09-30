/**
 * @author sxb
 * @最后修改日期 2019-08-2
 */
layui.define(["apply_global", "laytpl", "form", "table", "upload", "laydate", "element"], function(
    exports
) {
    let $ = layui.$,
        layer = layui.layer,
        laytpl = layui.laytpl,
        setter = layui.setter,
        view = layui.view,
        admin = layui.admin;



    function wordDownload() {
        console.log('word_workstation');


        let projectId = layui.data(setter.tableName).projectId;

        let result = {};
        let xmlContent = null;

        $.ajax({
            url: "/mytio/user/project/expertWorkstation/getFrontCover?projectId=" + projectId,
            type: "GET",
            dataType: "json",
            async: false,
            success: function(res) {
                result.cover = res.data;
            }
        });
        $.ajax({
            url: "/mytio/user/project/expertWorkstation/getApplyFirm?projectId=" + projectId,
            type: "GET",
            dataType: "json",
            async: false,
            success: function(res) {
                result.apply_firm = res.data;
            }
        });
        $.ajax({
            url: "/mytio/user/project/expertWorkstation/getAcademician?projectId=" + projectId,
            type: "GET",
            dataType: "json",
            async: false,
            success: function(res) {
                result.academician = res.data;
            }
        });
        $.ajax({
            url: "/mytio/user/project/expertWorkstation/getAcademicianTeamSituation?projectId=" + projectId,
            type: "GET",
            dataType: "json",
            async: false,
            success: function(res) {
                result.academician_team_situation = res.data;
            }
        });
        $.ajax({
            url: "/mytio/user/project/expertWorkstation/getProjects?projectId=" + projectId,
            type: "GET",
            dataType: "json",
            async: false,
            success: function(res) {
                result.projects = res.data;
            }
        });
        $.ajax({
            url: "/mytio/user/project/expertWorkstation/getMeno?projectId=" + projectId,
            type: "GET",
            dataType: "json",
            async: false,
            success: function(res) {
                result.suggestion = res.data;
            }
        });

        console.log("result: ", result);

        $.ajax({
            url: "./word/workstation.xml",
            type: "GET",
            dataType: "text",
            async: false,
            success: function (res) {
                xmlContent = res;
            }
        });

        xmlContent = laytpl(xmlContent).render(result);

        let dataM = new Blob([xmlContent], {type: "text/xml;charset=UTF-8"});
        let downloadUrl = window.URL.createObjectURL(dataM);
        let anchor = document.createElement("a");
        anchor.href = downloadUrl;
        anchor.download = "(数据自动生成, 按需求修改)院士工作站.docx";
        anchor.click();
        window.URL.revokeObjectURL(dataM);

    }


    //对外暴露的接口
    exports("word_workstation", {wordDownload});
});



