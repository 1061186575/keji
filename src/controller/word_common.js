/**
 * @author sxb
 * @最后修改日期 2019-08-22
 */
layui.define(["apply_global", "laytpl"], function(exports) {
    let laytpl = layui.laytpl;
    let $ = layui.$;
    let admin = layui.admin;
    let setter = layui.setter;


    function wordDownload() {
        let result = [];
        let xmlContent = null;

        let projectId = layui.data(setter.tableName).projectId;

        admin.req({
            url: "/mytio/user/project/expertCommon/getFrontCover?projectId=" + projectId,
            type: "GET",
            dataType: "json",
            async: false,
            success: function (res) {
                result.push(res.data);
            }
        });

        admin.req({
            url: "/mytio/user/project/expertCommon/getFrontProjects?projectId=" + projectId,
            type: "GET",
            dataType: "json",
            async: false,
            success: function (res) {
                result.push(res.data);
            }
        });

        admin.req({
            url: "/mytio/user/project/expertCommon/getPrjApplFirm?projectId=" + projectId,
            type: "GET",
            dataType: "json",
            async: false,
            success: function (res) {
                result.push(res.data);
            }
        });

        admin.req({
            url: "/mytio/user/project/expertCommon/getPrjLeader?projectId=" + projectId,
            type: "GET",
            dataType: "json",
            async: false,
            success: function (res) {
                result.push(res.data);
            }
        });

        admin.req({
            url: "/mytio/user/project/expertCommon/getPrjStaff?projectId=" + projectId,
            type: "GET",
            dataType: "json",
            async: false,
            success: function (res) {
                result.push(res.data);
            }
        });

        admin.req({
            url: "/mytio/user/project/expertCommon/getPrjAuxFirm?projectId=" + projectId,
            type: "GET",
            dataType: "json",
            async: false,
            success: function (res) {
                result.push(res.data);
            }
        });

        admin.req({
            url: "/mytio/user/project/expertCommon/getPrjAuxStaff?projectId=" + projectId,
            type: "GET",
            dataType: "json",
            async: false,
            success: function (res) {
                result.push(res.data);
            }
        });

        admin.req({
            url: "/mytio/user/project/expertCommon/getBackProject?projectId=" + projectId,
            type: "GET",
            dataType: "json",
            async: false,
            success: function (res) {
                let data = res.data[0];
                result.push([
                    {
                        "total": data.total,
                        "loan": data.loan,
                        "self_fund": data.self_fund,
                        "other_fund": data.other_fund,
                        "appropriation": data.appropriation
                    }
                ]);

                result.push([
                    {
                        "innovation": data.innovation
                    }
                ]);

                result.push([
                    {
                        "innovation_index": data.innovation_index
                    }
                ]);

                result.push([{
                    "benefit": data.benefit
                }]);

                result.push([{
                    "strength": data.strength
                }]);

                result.push([
                    {
                        "other_index": data.other_index
                    }
                ]);
            }
        });

        console.log("result: ", result);

         function removeUndefined() {
            let newObj = {};
            for (let i in this) {
                if (typeof(this[i]) == 'object') {
                    newObj[i] = removeUndefined(this[i]);
                } else {
                    newObj[i] = this[i];
                }
            }
            return newObj;
        };



        $.ajax({
            url: "./word/common.xml",
            type: "GET",
            dataType: "text",
            async: false,
            success: function (res) {
                xmlContent = res;
            }
        });

        function renderXML(xmlContent, result) {
            xmlContent = laytpl(xmlContent).render(result);

            let dataM = new Blob([xmlContent], {type: "text/xml;charset=UTF-8"});
            let downloadUrl = window.URL.createObjectURL(dataM);
            let anchor = document.createElement("a");
            anchor.href = downloadUrl;
            anchor.download = "(数据自动生成，按需调整)科技计划项目.docx";
            anchor.click();
            window.URL.revokeObjectURL(dataM);
        }

        renderXML(xmlContent, result);
    }


    exports("word_common", { wordDownload });
});

