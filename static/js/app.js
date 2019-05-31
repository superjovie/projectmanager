var allname = [];
var allyear = [];
tabid = 0;

function Add(type, name, msg) {
    var inner = document.createElement("tr");
    var s;
    s = '<td class="type">' + type + '</td><td class="msg">' + msg + '</td><td class="name" onclick="show(this.innerHTML)">' + name + '</td>';
    inner.innerHTML = s;
    document.getElementById("tbody").appendChild(inner);
}


function show(n) {
    var com = $("#quiz option:selected").text();
    var index = allname.indexOf(n);
    var year = allyear[index];
    $.ajax({
        type: 'POST',
        url: '/showproject/' + com + '/' + year + '/' + n,
        data: '',
        dataType: 'json',
        success: function (data) {
            var ids = 'tabid' + tabid.toString()
            layui.use(['element', 'form'], function () {
                var ele = layui.element;
                var form = layui.form;
                ele.tabAdd('demofile', {
                    title: n.substring(0, 4)
                    , content: data.data //支持传入html
                    , id: ids
                });
                form.render('radio');
                ele.tabChange('demofile', ids)
            });
            tabid++;
        }
    });
}

function getalert(dir) {
    document.getElementById('tbody').innerHTML = '';
    $.ajax({
        type: 'POST',
        url: '/getalert/' + dir,
        data: '',
        dataType: 'json',
        success: function (data) {
            for (i = 0; i < data.name.length; i++) {
                Add(data.type[i], data.name[i], data.msg[i]);
            }

            $("#alertid").text(data.name.length.toString());

            for (i = 0; i < $(".msg").length; i++) {
                var j = parseInt($(".msg")[i].innerHTML);
                if(j < 0) {
                    $(".msg")[i].setAttribute("style", "color:red");
                }
            }

        }
    });

}

function getallmoney(dir) {
    var g1 = 0;
    var g2 = 0;
    var g3 = 0;
    var g4 = 0;
    $.ajax({
        type: 'POST',
        url: '/getallmoney/' + dir,
        data: '',
        dateType: 'json',
        success: function (data) {
            var dat = JSON.parse(data);
            g2 = dat.money;
            g1 = dat.count;
            g4 = dat.endcount;
            $("td#g2").html(g2);
            $("td#g1").html(g1);
            $("td#g4").html(g4);
            $("td#g5").html(parseInt(g1) - parseInt(g4))
        }
    });
}

function getmoney(s) {
    g1 = '';
    g2 = '';
    g3 = '';
    g4 = '';
    $.ajax({
        type: 'POST',
        url: '/allmoney/' + s,
        data: '',
        dataType: 'json',
        success: function (data) {
            g2 = data.value;
            $("td#g2").html(g2);
        }
    });
    $.ajax({
        type: 'POST',
        url: '/getcount/' + s,
        data: '',
        dataType: 'json',
        success: function (data) {
            g1 = data.value;
            $("td#g1").html(g1);
        }
    });
    $.ajax({
        type: 'POST',
        url: '/getendcount/' + s,
        data: '',
        dataType: 'json',
        success: function (data) {
            g4 = data.value;
            $("td#g4").html(g4);
            $("td#g5").html(parseInt(g1) - parseInt(g4))
        }
    });


}


function isDate(strDate) {
    var regexs = /^([0-9]{3}[1-9]|[0-9]{2}[1-9][0-9]{1}|[0-9]{1}[1-9][0-9]{2}|[1-9][0-9]{3})\/(((0[13578]|1[02])\/(0[1-9]|[12][0-9]|3[01]))|((0[469]|11)\/(0[1-9]|[12][0-9]|30))|(02\/(0[1-9]|[1][0-9]|2[0-8])))$/;
    if(strDate != null && strDate.search(regexs) != -1) {
        console.log(strDate);
    } else {
        alert("日期格式错误");
    }
};

function laydate() {

    layui.use('laydate', function () {
        var laydate = layui.laydate;
        lay('.time').each(function () {
            laydate.render({
                elem: this
                , format: 'yyyy/MM/dd'
            });

        })

    });
};

function manager() {
    window.location.href = "manager"
}

//文件管理系统初始化


//

file = 0;
pay = 0;
mark = 0;
patrol = 0;

function AddFile(id) {
    if(file < 16) {
        var inner = document.createElement("div");
        inner.setAttribute('class', 'layui-inline');
        var s;
        s = '<div class="layui-input-block" style="margin-left: 10px"><input type="text" name="P" value="" placeholder="资料名称" autocomplete="off" class="layui-input"></div><div class="layui-input-block" style="margin-left: 10px"><input type="text" name="F" value="" placeholder="请输入" autocomplete="off" class="layui-input"></div>';
        inner.innerHTML = s;
        document.getElementById(id).appendChild(inner);
        file++;
        laydate();
    }
};

function AddPatrol(id) {
    if(patrol < 9) {
        var inner = document.createElement("div");
        inner.setAttribute("class", "layui-form-item layui-form-pane");
        var s;
        s = '<div class="layui-inline">' +
            '<label class="layui-form-label">巡查时间</label>' +
            '<div class="layui-input-block">' +
            '<input type="text" name="Pt" placeholder="请输入" autocomplete="off" class="layui-input time">' +
            '</div>' +
            '</div>' +
            '<div class="layui-inline">' +
            '<label class="layui-form-label">巡查人</label>' +
            '<div class="layui-input-block">' +
            '<input type="text" name="Pn" placeholder="请输入" autocomplete="off" class="layui-input" onblur="value=value.replace(/[^\u4E00-\u9FA5]/g,\'\')" onbeforepaste="clipboardData.setData(\'text\',clipboardData.getData(\'text\').replace(/[^\u4E00-\u9FA5]/g,\'\'))">' +
            '</div>' +
            '</div>' +
            '<div class="layui-inline">' +
            '<label class="layui-form-label">巡查原因</label>' +
            '<div class="layui-input-block">' +
            '<input type="text" name="Pr" placeholder="请输入" autocomplete="off" class="layui-input">' +
            '</div>' +
            '</div>' +
            '<div class="layui-inline">' +
            '<label class="layui-form-label">巡查结果</label>' +
            '<div class="layui-input-block">' +
            '<input type="text" name="Prs" placeholder="请输入" autocomplete="off" class="layui-input">';
        inner.innerHTML = s;
        document.getElementById(id).appendChild(inner);
        patrol++;
        laydate();
    }
};

function AddPay(id) {
    if(pay < 9) {
        var inner = document.createElement("div");
        inner.setAttribute("class", "layui-form-item layui-form-pane");
        var s;
        s = '<div class="layui-inline">' +
            '<label class="layui-form-label">付款日期</label>' +
            '<div class="layui-input-block">' +
            '<input type="text" name="PayTime" placeholder="请输入" autocomplete="off" class="layui-input time">' +
            '</div>' +
            '</div>' +
            '<div class="layui-inline">' +
            '<label class="layui-form-label">付款金额</label>' +
            '<div class="layui-input-block">' +
            '<input type="number" name="Payment" placeholder="请输入" autocomplete="off" class="layui-input">' +
            '</div>' +
            '</div>';
        inner.innerHTML = s;
        document.getElementById(id).appendChild(inner);
        pay++;
        laydate();
    }
};

function AddRemark(id) {
    if(mark < 10) {
        var inner = document.createElement("div");
        inner.setAttribute("class", "layui-form-item layui-form-pane");
        var s;
        s = '<div class="layui-inline">' +
            '<label class="layui-form-label">备注时间</label>' +
            '<div class="layui-input-block">' +
            '<input type="text" name="RemarkTime" placeholder="请输入" autocomplete="off" class="layui-input time">' +
            '</div>' +
            '</div>' +
            '<div class="layui-inline">' +
            '<label class="layui-form-label">备注原因</label>' +
            '<div class="layui-input-block">' +
            '<input type="text" name="RemarkReason" placeholder="请输入" autocomplete="off" class="layui-input">' +
            '</div>' +
            '</div>' +
            '<div class="layui-inline">' +
            '<label class="layui-form-label">备注结果</label>' +
            '<div class="layui-input-block">' +
            '<input type="text" name="RemarkResuilt" placeholder="请输入" autocomplete="off" class="layui-input">' +
            '</div>' +
            '</div>';
        inner.innerHTML = s;
        document.getElementById(id).appendChild(inner);
        mark++;
        laydate();
    }
};

function loadyear(dir) {
    document.getElementById('quiz3').innerHTML = '<option value="">请搜索项目</option>';
    document.getElementById('quiz5').innerHTML = '<option value="">请搜索项目</option>';
    $.ajax({
        type: 'POST',
        url: '/getallname/' + dir,
        data: '',
        dataType: 'json',
        success: function (data) {
            for (var i = 0; i < data.allname.length; i++) {
                var quiz3 = document.getElementById('quiz3');
                var quiz5 = document.getElementById('quiz5');
                var op = document.createElement("option");
                var opp = document.createElement("option");
                op.setAttribute('value', data.allname[i]);
                opp.setAttribute('value', data.allname[i]);
                op.appendChild(document.createTextNode(data.allname[i]));
                opp.appendChild(document.createTextNode(data.allname[i]));
                quiz3.appendChild(op);
                quiz5.appendChild(opp);
                var form = layui.form;
                form.render('select');
                allname = data.allname;
                allyear = data.allyear;
            }
        }
    });

};

function upload() {
    layui.use(['upload'], function () {
        var upload = layui.upload;
        var uploadpath = $("#dirname").val();
        var uploadname = $("#quiz5 option:selected").text();
        var uploadyear = $("#quiz4 option:selected").text();
        var uploadcom = $("#quiz option:selected").text();
        var demoListView = $('#demoList')
            , uploadListIns = upload.render({
            data: {
                "name": uploadname,
                "year": uploadyear,
                "path": uploadpath
            }
            , dataType: 'json'
            , elem: '#testList'
            , url: '/uploader/' + uploadcom
            , accept: 'file'
            , size: 51200
            , exts: "text|zip|jpg|png|gif|rmvb|mov|avi|rar|xlsx|docx|doc|xls|mp4|mp3|heic|jpeg"
            , multiple: true
            , auto: false
            , bindAction: '#testListAction'
            , choose: function (obj) {
                var files = this.files = obj.pushFile(); //将每次选择的文件追加到文件队列
                //读取本地文件
                obj.preview(function (index, file, result) {
                    var tr = $(['<tr id="upload-' + index + '">'
                        , '<td>' + file.name + '</td>'
                        , '<td>' + (file.size / 1014).toFixed(1) + 'kb</td>'
                        , '<td>等待上传</td>'
                        , '<td>'
                        , '<button class="layui-btn layui-btn-xs demo-reload layui-hide">重传</button>'
                        , '<button class="layui-btn layui-btn-xs layui-btn-danger demo-delete">删除</button>'
                        , '</td>'
                        , '</tr>'].join(''));

                    //单个重传
                    tr.find('.demo-reload').on('click', function () {
                        obj.upload(index, file);
                    });

                    //删除
                    tr.find('.demo-delete').on('click', function () {
                        delete files[index]; //删除对应的文件
                        tr.remove();
                        uploadListIns.config.elem.next()[0].value = ''; //清空 input file 值，以免删除后出现同名文件不可选
                    });

                    demoListView.append(tr);
                });
            }
            , done: function (res, index, upload) {
                if(res.code == 0) { //上传成功
                    var tr = demoListView.find('tr#upload-' + index)
                        , tds = tr.children();
                    tds.eq(2).html('<span style="color: #5FB878;">上传成功</span>');
                    tds.eq(3).html(''); //清空操作
                    return delete this.files[index]; //删除文件队列已经上传成功的文件
                }
                this.error(index, upload);
            }
            , error: function (index, upload) {
                var tr = demoListView.find('tr#upload-' + index)
                    , tds = tr.children();
                tds.eq(2).html('<span style="color: #FF5722;">上传失败</span>');
                tds.eq(3).find('.demo-reload').removeClass('layui-hide'); //显示重传
            }
        });
    })
}

function loadcompany() {
    $.ajax({
        type: 'POST',
        url: '/loadcompany',
        data: '',
        dataType: 'json',

        success: function (data) {
            data.company.sort();

            for (var i = 0; i < data.company.length; i++) {
                //var quiz2 = document.getElementById('quiz2');

                var quiz = document.getElementById('quiz');
                //var op = document.createElement("option");

                var oppp = document.createElement("option");
                //op.setAttribute('value', data.year[i]);

                oppp.setAttribute('value', data.company[i]);
                //op.appendChild(document.createTextNode(data.year[i]));

                oppp.appendChild(document.createTextNode(data.company[i]));
                //quiz2.appendChild(op);

                quiz.appendChild(oppp)
                var form = layui.form;
                form.render('select');
            }
        }
    })

};

layui.use(['form', 'layedit', 'laydate', 'element', 'upload'], function () {
    var form = layui.form
        , layer = layui.layer
        , layedit = layui.layedit
        , laydate = layui.laydate
        , element = layui.element
        , upload = layui.upload
        , $ = layui.jquery;

    //日期
    lay('.time').each(function () {
        laydate.render({
            elem: this
            , format: 'yyyy/MM/dd'
        });
    });
    laydate.render({
        elem: '.rangetime'
        , range: true
        , done: function (value, date) {
            layer.alert('你选择的日期是：' + value + '<br>获得的对象是' + JSON.stringify(date));
        }
    });
    //创建一个编辑器
    var editIndex = layedit.build('LAY_demo_editor');

    //自定义验证规则
    form.verify({
        title: function (value) {
            if(value.length < 5) {
                return '标题至少得5个字符啊';
            }
        }
        ,
        pass: [
            /^[\S]{6,12}$/
            , '密码必须6到12位，且不能出现空格'
        ]
        ,
        date: [/^([0-9]{3}[1-9]|[0-9]{2}[1-9][0-9]{1}|[0-9]{1}[1-9][0-9]{2}|[1-9][0-9]{3})\/(((0[13578]|1[02])\/(0[1-9]|[12][0-9]|3[01]))|((0[469]|11)\/(0[1-9]|[12][0-9]|30))|(02\/(0[1-9]|[1][0-9]|2[0-8])))$/, '不符合要求的日期格式']
        ,
        chinese: [/[^\u4E00-\u9FA5]/, '请输入正确的名字']
        ,
        content: function (value) {
            layedit.sync(editIndex);
        }
    });

    //监听指定开关
    form.on('switch(switchTest)', function (data) {
        layer.msg('开关checked：' + (this.checked ? 'true' : 'false'), {
            offset: '6px'
        });
        layer.tips('温馨提示：请注意开关状态的文字可以随意定义，而不仅仅是ON|OFF', data.othis)
    });

    //监听提交
    form.on('submit(demo1)', function (datas) {

        var p = [];
        var f = [];
        var pn = [];
        var pt = [];
        var pr = [];
        var prs = [];
        var paytime = [];
        var payment = [];
        var remarkreason = [];
        var remarktime = [];
        var remarkresuilt = [];
        for (var i = 0; i < $("input[name='P']").length; i++) {
            p.push($("input[name='P']")[i].value)
        }
        for (var i = 0; i < $("input[name='F']").length; i++) {
            f.push($("input[name='F']")[i].value)
        }
        for (var i = 0; i < $("input[name='Pt']").length; i++) {
            pt.push($("input[name='Pt']")[i].value)
        }
        for (var i = 0; i < $("input[name='Pn']").length; i++) {
            pn.push($("input[name='Pn']")[i].value)
        }
        for (var i = 0; i < $("input[name='Pr']").length; i++) {
            pr.push($("input[name='Pr']")[i].value)
        }
        for (var i = 0; i < $("input[name='Prs']").length; i++) {
            prs.push($("input[name='Prs']")[i].value)
        }
        for (var i = 0; i < $("input[name='PayTime']").length; i++) {
            paytime.push($("input[name='PayTime']")[i].value)
        }
        for (var i = 0; i < $("input[name='Payment']").length; i++) {
            payment.push($("input[name='Payment']")[i].value)
        }
        for (var i = 0; i < $("input[name='RemarkTime']").length; i++) {
            remarktime.push($("input[name='RemarkTime']")[i].value)
        }
        for (var i = 0; i < $("input[name='RemarkReason']").length; i++) {
            remarkreason.push($("input[name='RemarkReason']")[i].value)
        }
        for (var i = 0; i < $("input[name='RemarkResuilt']").length; i++) {
            remarkresuilt.push($("input[name='RemarkResuilt']")[i].value)
        }
        datas.field.P = p;
        datas.field.F = f;
        datas.field.Pn = pn;
        datas.field.Pt = pt;
        datas.field.Pr = pr;
        datas.field.Prs = prs;
        datas.field.PayTime = paytime;
        datas.field.Payment = payment;
        datas.field.RemarkTime = remarktime;
        datas.field.RemarkReason = remarkreason;
        datas.field.RemarkResuilt = remarkresuilt;

        $.ajax({
            type: 'POST',
            url: '/set/' + $("#quiz option:selected").text(),
            data: datas.field,
            success: function (datass) {
                var list = JSON.parse(datass);
                layer.alert(JSON.stringify("提交成功"), {
                    title: '提示'
                });
            }
        });
        return false;

    });
    form.on('select(quiz2)', function (datas) {
        $.ajax({
            type: 'POST',
            url: '/getname/' + $("#quiz option:selected").text() + '/' + datas.value,
            data: '',
            dataType: 'json',
            success: function (data) {
                data.name.sort();
                document.getElementById('quiz3').innerHTML = '<option value="">请输入项目名称</option>';
                for (var i = 0; i < data.name.length; i++) {
                    var quiz3 = document.getElementById('quiz3');
                    var op = document.createElement("option");
                    op.setAttribute('value', data.name[i]);
                    op.appendChild(document.createTextNode(data.name[i]));
                    quiz3.appendChild(op);
                    form.render('select');
                }
            }
        })

    });
    form.on('select(quiz4)', function (datas) {
        var com = $("#quiz option:selected").text();
        $.ajax({
            type: 'POST',
            url: '/getname/' + com + '/' + datas.value,
            data: '',
            dataType: 'json',
            success: function (data) {
                data.name.sort();
                document.getElementById('quiz5').innerHTML = '<option value="">请输入项目名称</option>';
                for (var i = 0; i < data.name.length; i++) {
                    var quiz5 = document.getElementById('quiz5');
                    var op = document.createElement("option");
                    op.setAttribute('value', data.name[i]);
                    op.appendChild(document.createTextNode(data.name[i]));
                    quiz5.appendChild(op);
                    form.render('select');
                }
            }
        })

    });
    form.on('select(quiz)', function (data) {

        getallmoney(data.value);
        getalert(data.value);
        loadyear(data.value);
    });
    form.on('select(quiz5)', function (data) {
        var obj = document.getElementById('showyear2')
        var index = document.getElementById('quiz3').selectedIndex;
        var year = allyear[index];
        obj.value = year;
    });
    form.on('select(quiz3)', function (datas) {

        var n = document.getElementsByName('Name');
        n[0].setAttribute('value', datas.value);
        var name = datas.value;
        var com = $("#quiz option:selected").text();
        var obj = document.getElementById('showyear');
        //console.log(this.selected_index);
        var index = document.getElementById('quiz3').selectedIndex;
        var year = allyear[index];
        obj.value = year;
        $.ajax({
            type: 'POST',
            url: '/getproject/' + com + '/' + year + '/' + name,
            data: '',
            dataType: 'json',
            success: function (data) {
                var datalist = data.data;
                //$("input[name='Name']").attr('value',datalist[0]);
                $("input[name='Address']").attr('value', datalist[1]);
                $("input[name='ContractDays']").attr('value', datalist[2]);
                $("input[name='ContractContent']").attr('value', datalist[3]);
                if(datalist[4] == 'None') {
                    $("input[name='BiddingTime']").attr('value', '');
                } else {
                    $("input[name='BiddingTime']").attr('value', datalist[4]);
                }
                if(datalist[5] == 'None') {
                    $("input[name='OpenTime']").attr('value', '');
                } else {
                    $("input[name='OpenTime']").attr('value', datalist[5]);
                }
                $("input[name='LockPerson']").attr('value', datalist[6]);
                $("input[name='PayMethod']").attr('value', datalist[7]);
                $("input[name='Owner']").attr('value', datalist[8]);
                $("input[name='OwnerContact']").attr('value', datalist[9]);
                $("input[name='Worker']").attr('value', datalist[10]);
                $("input[name='WorkerContact']").attr('value', datalist[11]);
                $("input[name='Total']").attr('value', datalist[12]);
                $("input[name='Insurance']").attr('value', datalist[24]);
                if(datalist[25] == 'None') {
                    $("input[name='InsuranceEnd']").attr('value', '');
                } else {
                    $("input[name='InsuranceEnd']").attr('value', datalist[25]);
                }
                $("input[name='InsuranceFile']").attr('value', datalist[27]);
                $("input[name='NotEnddingRemark']").attr('value', datalist[30]);


                if(datalist[28] == '完工') {
                    $("input[name='Endding']").eq(0).attr("checked", "");
                    $("input[name='Endding']").eq(1).removeAttr("checked")
                } else {
                    $("input[name='Endding']").eq(1).attr("checked", "");
                    $("input[name='Endding']").eq(0).removeAttr("checked")
                }

                filec = 0;
                for (item of $("input[name='P']")) {
                    item.value = '';
                }
                for (item of $("input[name='F']")) {
                    item.value = '';
                }
                for (i = 0; i < datalist[13].length; i++) {
                    if(datalist[13].length > $("input[name='P']").length) {
                        AddFile('container');
                    }
                }
                for (i = 0; i < datalist[13].length; i++) {
                    $("input[name='P']")[i].value = datalist[13][i];
                    $("input[name='F']")[i].value = datalist[14][i];
                }


                for (item of $("input[name='Pt']")) {
                    item.value = '';
                }
                for (item of $("input[name='Pn']")) {
                    item.value = '';
                }
                for (item of $("input[name='Pr']")) {
                    item.value = '';
                }
                for (item of $("input[name='Prs']")) {
                    item.value = '';
                }


                for (i = 0; i < datalist[15].length; i++) {
                    if(datalist[15].length > $("input[name='Pt']").length) {
                        AddPatrol('Patrol');
                    }
                }
                for (i = 0; i < datalist[15].length; i++) {
                    $("input[name='Pt']")[i].value = datalist[15][i];
                    $("input[name='Pn']")[i].value = datalist[16][i];
                    $("input[name='Pr']")[i].value = datalist[17][i];
                    $("input[name='Prs']")[i].value = datalist[18][i];
                }

                for (item of $("input[name='PayTime']")) {
                    item.value = '';
                }
                for (item of $("input[name='Payment']")) {
                    item.value = '';
                }
                for (i = 0; i < datalist[19].length; i++) {
                    if(datalist[19].length > $("input[name='PayTime']").length) {
                        AddPay('Pay');
                    }
                }
                for (i = 0; i < datalist[19].length; i++) {
                    $("input[name='PayTime']")[i].value = datalist[19][i];
                    $("input[name='Payment']")[i].value = datalist[20][i];
                }

                for (item of $("input[name='RemarkTime']")) {
                    item.value = '';
                }
                for (item of $("input[name='RemarkReason']")) {
                    item.value = '';
                }
                for (item of $("input[name='RemarkResuilt']")) {
                    item.value = '';
                }
                for (i = 0; i < datalist[21].length; i++) {
                    if(datalist[21].length > $("input[name='RemarkTime']").length) {
                        AddRemark('Remark');
                    }
                }
                for (i = 0; i < datalist[21].length; i++) {
                    $("input[name='RemarkTime']")[i].value = datalist[21][i];
                    $("input[name='RemarkReason']")[i].value = datalist[22][i];
                    $("input[name='RemarkResuilt']")[i].value = datalist[23][i];
                }
                var form = layui.form;
                form.render();
            }
        });

    });

    //表单初始赋值
    form.val('example', {
        "username": "贤心" // "name": "value"
        , "password": "123456"
        , "interest": 1
        , "like[write]": true //复选框选中状态
        , "close": true //开关状态
        , "sex": "女"
        , "desc": "我爱 layui"
    })


});
layui.use('element', function () {
    var $ = layui.jquery
        , element = layui.element; //Tab的切换功能，切换事件监听等，需要依赖element模块
    element.on('tab(demofile)', function (data) {

    });


});