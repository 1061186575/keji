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
        console.log('word_research');

        let projectId = layui.data(setter.tableName).projectId;

        let result = {};
        let xmlContent = null;

        $.ajax({
            url: "/mytio/user/project/expertSearch/getFrontCover?projectId=" + projectId,
            type: "GET",
            dataType: "json",
            async: false,
            success: function(res) {
                result.cover = res.data;
            }
        });
        $.ajax({
            url: "/mytio/user/project/expertSearch/getApplyFirm?projectId=" + projectId,
            type: "GET",
            dataType: "json",
            async: false,
            success: function(res) {
                result.applyFirm = res.data;
            }
        });
        $.ajax({
            url: "/mytio/user/project/expertSearch/getPrjLeader?projectId=" + projectId,
            type: "GET",
            dataType: "json",
            async: false,
            success: function(res) {
                result.prjLeader = res.data;
            }
        });
        $.ajax({
            url: "/mytio/user/project/expertSearch/getFirmCapitalFlow?projectId=" + projectId,
            type: "GET",
            dataType: "json",
            async: false,
            success: function(res) {
                result.firmCapitalFlow = res.data;
            }
        });
        $.ajax({
            url: "/mytio/user/project/expertSearch/getFirmBenefitSituation?projectId=" + projectId,
            type: "GET",
            dataType: "json",
            async: false,
            success: function(res) {
                result.firmBenefitSituation = res.data;
            }
        });
        $.ajax({
            url: "/mytio/user/project/expertSearch/getProjects?projectId=" + projectId,
            type: "GET",
            dataType: "json",
            async: false,
            success: function(res) {
                result.projects = res.data;
            }
        });
        $.ajax({
            url: "/mytio/user/project/expertSearch/getFirmPeopleSituation?projectId=" + projectId,
            type: "GET",
            dataType: "json",
            async: false,
            success: function(res) {
                result.firmPeopleSituation = res.data;
            }
        });
        $.ajax({
            url: "/mytio/user/project/expertSearch/getSkillLeader?projectId=" + projectId,
            type: "GET",
            dataType: "json",
            async: false,
            success: function(res) {
                result.skillLeader = res.data;
            }
        });
        $.ajax({
            url: "/mytio/user/project/expertSearch/getPlanInvestEstimate?projectId=" + projectId,
            type: "GET",
            dataType: "json",
            async: false,
            success: function(res) {
                result.planInvestEstimate = res.data;
            }
        });
        $.ajax({
            url: "/mytio/user/project/expertSearch/getPlanInvestSource?projectId=" + projectId,
            type: "GET",
            dataType: "json",
            async: false,
            success: function(res) {
                result.planInvestSource = res.data;
            }
        });
        $.ajax({
            url: "/mytio/user/project/expertSearch/getPlanFund?projectId=" + projectId,
            type: "GET",
            dataType: "json",
            async: false,
            success: function(res) {
                result.planFund = res.data;
            }
        });
        $.ajax({
            url: "/mytio/user/project/expertSearch/getMeno?projectId=" + projectId,
            type: "GET",
            dataType: "json",
            async: false,
            success: function(res) {
                result.meno = res.data;
            }
        });

        console.log("result: ", result);

        $.ajax({
            url: "./word/research.xml",
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
        anchor.download = "(数据自动生成, 按需求修改)重点实验室.docx";
        anchor.click();
        window.URL.revokeObjectURL(dataM);
    }


    //对外暴露的接口
    exports("word_research", {wordDownload});
});



