/**
 * @author 周鹏
 * @最后修改日期 2019-04-17
 */

/**
 * 主要功能:   日期 年份 序号 下拉框 申请单位等渲染, 一些辅助功能
 */

layui.define(["laydate", "element", 'apply_global'], function (exports) {
    let $ = layui.$,
        layer = layui.layer,
        laydate = layui.laydate,
        setter = layui.setter,
        element = layui.element;


    function Render() {
        const career = layui.data(setter.tableName).career;
        const userId = layui.data(layui.setter.tableName).userId;

        $("#layer_close").on("click", function () {
            layer.closeAll();
            layer.alert("申报项目成功!");
        });


        if (career === "WBYH") {
            $.ajax({
                type: "GET",
                url: "/mytio/public/user/getUserBaseInfo?userId=" + userId,
                success(d) {
                    console.log(d);
                    if (d.code === 0) {
                        localStorage.setItem("firmInfo", JSON.stringify(d.data));
                        $("#companyName").val(d.data.name);
                    }
                },
                error() {
                    alert("获取公司信息出错");
                }
            });
        }

        let high = $(".high").text();
        if (1 == high) {
            $(".high").text("是");
        }
        if (0 == high) {
            $(".high").text("否");
        }

        /**
         *  layui Date 封装, 封装后使用日历添加一个class即可
         */
        function lay_Date() {
            let lay_Date = document.getElementsByClassName("lay-Date");
            let lay_DateM = document.getElementsByClassName("lay-DateM");
            let lay_DateY = document.getElementsByClassName("lay-DateY");
            function temp(elem, format) {
                for (let i = 0; i < elem.length; i++) {
                    laydate.render({
                        elem: elem[i],
                        format,
                        theme: "#0096EC",
                        calendar: true
                    });
                }
            }
            temp(lay_Date, "yyyyMMdd");
            temp(lay_DateM, "yyyyMM");
            temp(lay_DateY, "yyyy");

            element.render();
        }
        lay_Date();

        // 企业研发与经营状中最近3年
        function render_year() {
            let currentYear = new Date().getFullYear();
            let year = $(".current-year");
            year.eq(0).text(currentYear + "年");
            year.eq(1).text(currentYear - 1 + "年");
            year.eq(2).text(currentYear - 2 + "年");
        }

        // 对多条<tr></tr>添加序号
        function order() {
            function temp(selector) {
                for (let i = 0; i < $(selector).length - 1; i++) {
                    $(selector).eq(i + 1).find("th").eq(0).text(i + 1);
                }
            }
            temp("#member tr");
            temp("#participate tr");
            temp("#cooperation tr");
            temp("#bear tr");
            temp("#equipmentList tr");
            temp("#knowledge tr");

            for (let i = 0; i < $("#costBudget-getData ~ tr").length; i++) {
                $("#costBudget-getData ~ tr").eq(i).find("th").eq(0).text(i + 1);
            }
        }

        //  按钮禁用
        function updateDisabled($del) {
            for (let i = 0; i < $del.length; i++) {
                $del
                    .eq(i)
                    .css({cursor: "pointer", color: "#eee", background: "#cc614b"});
                $del.eq(i).removeAttr("disabled");
            }
            for (let i = 0; i < $del.length - 1; i++) {
                $del
                    .eq(i)
                    .css({cursor: "not-allowed", color: "#666", background: "#C9C9C9"});
                $del.eq(i).attr("disabled", "disabled");
            }
        }

        /**
         *  计算 项目总投资
         */
        $("body").delegate(".num", "propertychange input", function () {
            let s1 = Number($("#loan").val());
            let s2 = Number($("#self-fund").val());
            let s3 = Number($("#other-fund").val());
            let s4 = Number($("#appropriation").val());
            let total = s1 * 1e10 + s2 * 1e10 + s3 * 1e10 + s4 * 1e10; // *1e10是为了解决小数点精度问题
            $("#total").val(total / 1e10);
        });

        // 申报页面专用渲染
        if (!$("#identifier-modify").eq(0).text()) {
            function updateDisabled_temp() {
                updateDisabled($("#costBudget button:contains('删除')"));
                updateDisabled($("#costBudget2 button:contains('删除')"));
                updateDisabled($("#cooperation button:contains('删除')"));
                updateDisabled($("#participate button:contains('删除')"));
                updateDisabled($("#bear button:contains('删除')"));
                updateDisabled($("#equipmentList button:contains('删除')"));
                updateDisabled($("#knowledge button:contains('删除')"));
                updateDisabled($("#member button:contains('删除')"));
            }

            updateDisabled_temp();
            render_year();

            $(document).on("click", function () {
                updateDisabled_temp();
                render_year();
            });
        }

        // 通用渲染
        $(document).on("click", function () {
            lay_Date();
            order();
        });

        setTimeout(() => {
            lay_Date();
            order();
        }, 1500);



        /**
         *  随机更换页面背景颜色
         */
        let number = 0, number2 = 0;
        let color;
        let changeBGElem = document.getElementById('change-bg');
        if (changeBGElem) {
            changeBGElem.onclick = function () {
                number = Math.trunc(Math.random() * 100) % 7;
                // 防止第二次的随机数与第一次的相同
                while (number === number2) {
                    number = Math.trunc(Math.random() * 100) % 7;
                }
                number2 = number;
                if (number === 0) {
                    color = 'rgb(222,216,190)';
                } else if (number === 1) {
                    color = 'rgb(205,222,194)'
                } else if (number === 2) {
                    color = 'rgb(240,240,240)'
                } else if (number === 3) {
                    color = 'White'
                } else if (number === 4) {
                    color = 'Lavender'
                } else if (number === 5) {
                    color = 'rgba(120,240,120,0.5)'
                } else {
                    color = 'LightSalmon'
                }
                document.getElementById('LAY_app_body').style.backgroundColor = color;
                localStorage.setItem('BGColor', color);
            }
        }

        // 把颜色值存到localStorage
        let BGColorElem = document.getElementById('bg-color');
        if (BGColorElem) {
            BGColorElem.onchange = function (e) {
                document.getElementById('LAY_app_body').style.backgroundColor = e.target.value;
                localStorage.setItem('BGColor', e.target.value);
            };
        }

        let BGColor = localStorage.getItem('BGColor');
        if (BGColor) {
            document.getElementById('LAY_app_body').style.backgroundColor = BGColor;
        }

    }


    exports("render", {Render});
});

