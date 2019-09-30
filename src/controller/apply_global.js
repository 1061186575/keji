/**
 * @author 周鹏
 * @最后修改日期 2019-05-14
 */


function $$(s) {
    if (document.querySelectorAll(s).length === 1) {
        return document.querySelector(s);
    }
    return document.querySelectorAll(s);
}

/**
 *  提示工具, 只要给元素添加data-tooltip属性,
 *  那么当鼠标移动到这个元素上的时候就会显示data-tooltip里的内容
 *  例如: <div data-tooltip="show content"  >hover</div>
 *  当鼠标移动到这个div标签上的时候就会显示show content
 */
function toolTip() {
    let tooltipElem;
    document.onmouseover = function (e) {
        var target = e.target;
        var toolHtml = target.dataset.tooltip;
        if (!toolHtml) {
            return;
        }
        tooltipElem = document.createElement('div');
        tooltipElem.className = "tooltip"; // tooltip的样式在css里面定义好
        tooltipElem.innerHTML = toolHtml;
        document.body.append(tooltipElem);

        document.onmousemove = function (e) {
            tooltipElem.style.left = e.clientX + 'px';
            tooltipElem.style.top = e.clientY + 'px';
        }

    };

    document.onmouseout = function () {
        if (tooltipElem) {
            tooltipElem.remove();
            tooltipElem = null;
        }
        document.onmousemove = null;
    }
}

toolTip();

/**
 *  textarea根据输入内容自动变长变短
 */
document.addEventListener('input', function (e) {
    if ((e.target.tagName !== 'TEXTAREA')) return;
    if ((e.target.scrollHeight < 400)) {
        e.target.style.height = 110 + 'px';
        if (parseInt(e.target.style.height) < (e.target.scrollHeight)) {
            e.target.style.height = e.target.scrollHeight + 10 + 'px';
        }
    } else {
        e.target.style.height = 350 + 'px';
    }
});


/**
 *  封装layer 常用弹窗
 */
function layer_msg(val = "正在处理中...", icon = 1) {
    layui.layer.msg(val, {
        icon: icon,
        time: 5000
    });
}

function layer_suc(val = "操作成功 !") {
    layui.layer.alert(val, {
        skin: "layui-layer-molv",
        icon: 1
    }, function(index) {
        layui.layer.close(index);
    });
}

function layer_err(val = "操作失败") {
    layui.layer.alert(val, {
        skin: "layui-layer-molv"
    });
}


layui.define([], function(exports) {
    let $ = layui.$;
    let admin = layui.admin;


    setTimeout(()=>{
        for (let i = 0; i < $$('input.zp-input').length; i++) {
            $$('input.zp-input')[i].setAttribute("autocomplete", "off");
        }
    },5000);


    exports('apply_global',{});
});


