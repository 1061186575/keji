/**
 * @author 周鹏
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
        console.log('word_major');
        let projectId = layui.data(setter.tableName).projectId;
        console.log("projectId", projectId);

        let WordArr = [
            'getFrontCover',
            'getProjects',
            'getLeaderFirm',
            'getFirmFinance',
            'getSkillLeader',
            'getLeaderProjects',
            'getPrjAuxFirm',
            'getPrjAuxStaff',
            'getBackProjects',
            'getProjectInvest',
            'getProjectPurchase'
        ];


        let WordJsonData = {
            code: 0,
            ok: true,
            data: {}
        };


        for (let i = 0; i < WordArr.length; i++) {
            admin.req({
                type: 'get',
                url: `/mytio/user/project/expertMajor/${WordArr[i]}?projectId=${projectId}`,
                dataType: 'json',
                async: false,
                success(d) {
                    if (d.ok) {
                        WordJsonData.data[WordArr[i].slice(3)] = (d.data);
                    } else {
                        console.error(WordArr[i] + '请求错误');
                    }
                },
                error(e) {
                    console.error("err",e);
                }
            })
        }


        renderXML(WordJsonData);



        function renderXML(data) {
            console.log("渲染XML的data: ", data);

            $.ajax({
                url: './word/major.xml',
                type: 'GET',
                dataType: 'text',
                async: false,
                success: function (str) {
                    // console.log("str: ", str);
                    createBlob(laytpl(str).render(data));
                },
                error(e) {
                    console.error("e: ", e);
                    alert('出错');
                }
            });
        }



        function createBlob(content) {
            let BlobData = new Blob([content], {
                type: "text/xml;charset=UTF-8"
            });
            let downloadUrl = window.URL.createObjectURL(BlobData);
            let anchor = document.createElement("a");
            anchor.href = downloadUrl;
            anchor.download = "科技重大专项项目申报表.docx";
            anchor.click();
            window.URL.revokeObjectURL(BlobData);
        }
    }


    //对外暴露的接口
    exports("word_major", {wordDownload});
});



