<!DOCTYPE html>
{%html framework="admin:static/js/esl.js" class="expanded"%}
    {%head%}
        <meta charset="utf-8"/>
        <title>{%block name="title"%}{%/block%}</title>
        <link rel="stylesheet" href="../static/font-awesome/css/font-awesome.min.css">
        {%require name="admin:static/css/lib/base.less"%}
        
    {%/head%}
    {%body%}
        <div class="wrap">
            <div class="header mala-header-fix mala-header">
                <a class="mala-logo mala-fl" href="/"></a>
                <div class="mala-fr">
                    <span class="mala-store-span"></span><span class="mala-user-span">{%$data["username"]%}</span>
                </div>
                <div class="clear"></div>
            </div>
        </div>
        <div class="middle=content">
            <div class="container" style="width: 980px; margin: 10px auto;">
                <div class="sca-nav-div">
                    <ul class="sca-nav-ul">
                        <li> <a class="sca-nav-div-li tabnav" href="#add">添加门店</a></li>
                        <li> <a class="sca-nav-div-li tabnav" href="#list">门店列表</a></li>
                    </ul>
                </div>
                <div class="sia-con-div tabnav-tab" id="add">
                    <form id="store-form-add">
                        <div class="content-line-div">
                            <div class="content-item-div-left">
                                <span class="content-span">门店名称</span> <input type="text" class="content-input form-control" name="store_name">
                            </div>
                            <div class="content-item-div-right">
                                <span class="content-span">联系人员</span> <input type="text" class="content-input form-control" name="name">
                            </div>
                        </div>
                        <div class="content-line-div">
                            <div class="content-item-div-left">
                                <span class="content-span">联系电话</span> <input type="text" class="content-input form-control" name="telphone">
                            </div>
                            <div class="content-item-div-right">
                                <span class="content-span">联系邮箱</span> <input type="text" class="content-input form-control" name="email">
                            </div>
                        </div>
                        <div class="content-line-div">
                            <span class="content-span">客户地址</span>
                            <select class="content-select provinceSelect" name="addr_province"></select>
                            <select class="content-select citySelect" name="addr_city"></select>
                            <select class="content-select districtSelect" name="add_district"></select>
                        </div>
                        <div class="content-line-div">
                            <div class="content-item-div-left">
                                <span class="content-span">管理账户</span> <input type="text" class="content-input form-control" name="admin_name">
                            </div>
                            <div class="content-item-div-right">
                                <span class="content-span">初始密码</span> <input type="text" class="content-input form-control" name="password">
                            </div>
                        </div>
                        <input type="submit" value="添加门店" class="btn sia-search-button" style="margin: 30px 43px;">
                      </form>
                      <script id="tpl-edit-store" type="text/template">
                        <form id="store-form-edit">
                            <div class="content-line-div">
                                <div class="content-item-div-left">
                                    <span class="content-span">门店名称</span> <input type="text" class="content-input form-control" name="store_name" value="<%-store_name%>">
                                </div>
                                <div class="content-item-div-right">
                                    <span class="content-span">联系人员</span> <input type="text" class="content-input form-control" name="name" value="<%-name%>">
                                </div>
                            </div>
                            <div class="content-line-div">
                                <div class="content-item-div-left">
                                    <span class="content-span">联系电话</span> <input type="text" class="content-input form-control" name="telphone" value="<%-telphone%>">
                                </div>
                                <div class="content-item-div-right">
                                    <span class="content-span">联系邮箱</span> <input type="text" class="content-input form-control" name="email" value="<%-email%>">
                                </div>
                            </div>

                            <div class="content-line-div">
                                <span class="content-span">客户地址</span>
                                <select class="content-select provinceSelect" name="addr_province"></select>
                                <select class="content-select citySelect" name="addr_city"></select>
                                <select class="content-select districtSelect" name="add_district"></select>
                            </div>
                            <input type="submit" value="保存" class="btn sia-search-button" style="margin: 30px 43px;">
                          </form>
                      
                      </script>
                </div>
                <div class="sca-con-div tabnav-tab" id="list">
                    <h3></h3>
                    <table class="sca-tab" id="a-store-list">
                        <thead>
                            <tr>
                                <th>门店名称</th>
                                <th>联系人</th>
                                <th>联系电话</th>
                                <th>联系邮箱</th>
                                <th>地址</th>
                                <th>状态</th>
                                <th>管理员账户</th>
                                <th>操作</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr><td colspan="100%">空</td></tr>
                        </tbody>
                    </table>
                    <ul id="pagination"></ul>
                </div>

            </div>
        </div>
        <div class="footer"></div>
        <script id="tpl-s-body" type="text/template">

        <% _.each(storeList, function (store,index) { %>
            <tr data-storeid="<%-store['store_id']%>" data-storename="<%-store['store_name']%>" data-status="<%-store['status']%>">
                <td><%-store['store_name']%></td>
                <td><%-store['name']%></td>
                <td><%-store['telphone']%></td>
                <td><%-store['email']%></td>
                <td><%-store['address']%></td>
                <td class="s-status"><%-store['status'] == 1 ? '正常使用' : '停止使用'%></td>
                <td><%-store['admin_name']%></td>
                <td><a href="javascript: void(0);" class="opr-stop"><%-store['status'] == 0 ? '启动使用' : '停止使用'%></a>|<a href="javascript:void(0);" class="opr-reset" style="color: #ccc;">重置密码</a>|<a href="javascript: void(0);" class="opr-modify" style="color:#ccc;">修改</a></td>
            </tr>
        <% }); %>
        
        </script>
        {%script%}
            window.storeId = '1';
            require(['jquery', 'underscore', '/tabNav/tabNav', '/notify/notify','dialog','/api/api','validate', 'select2', 'pagination'], function ($, _, TabNav, Notify, dialog, api) {
                var tab = new TabNav('.sca-nav-ul');
                var submitUrl = '/api/addstore';
                var _api = {
                    provinceList: '/api/getprovince',
                    cityList: '/api/getcity',
                    districtList: '/api/getdistrict'
                };

                api._(_api);

                var _selector = {
                    provinceSelect: '.provinceSelect',
                    citySelect: '.citySelect',
                    districtSelect: '.districtSelect'
                };

                var STATUS = {
                    0: '停止使用',
                    1: '正常使用'
                };

                var PAGE_SIZE = 10;

                function appendPageInfo(page) {
                    var start = (page - 1) * PAGE_SIZE;
                    var end = page * PAGE_SIZE;
                    return 'start_idx=' + start + '&end_idx=' + end;
                }

                function renderSelectByIdAndName(array, id, name){
                    var html = '';
                    for (var i = 0, len = array.length; i < len; i++) {
                        var arr = array[i];
                        html += '<option value="' + arr[id] + '">'
                            +       arr[name]
                            +   '</option>';
                    }

                    return html;
                }

                function initProvinceList($node) {
                    $('.content-select').select2();
                    $.ajax({
                        url: _api.provinceList,
                        dataType: 'json'
                    }).done(function (r){

                        $(_selector.provinceSelect, $node).on('change', function (e, city, district) {
                            $.ajax({
                                url: _api.cityList,
                                method: 'GET',
                                dataType: 'json',
                                data: {
                                    'province': $(this).val()
                                }
                            }).done(function (r) {

                                $(_selector.citySelect, $node).on('change', function () {
                                    $.ajax({
                                        url: _api.districtList,
                                        method: 'GET',
                                        dataType: 'json',
                                        data: {
                                            'province': $(_selector.provinceSelect, $node).val(),
                                            'city': $(this).val()
                                        }
                                    }).done(function (r) {
                                        $(_selector.districtSelect, $node)
                                            .html(renderSelectByIdAndName(r.data, 'district', 'district')).trigger('change');
                                    });
                                });

                                $(_selector.citySelect, $node)
                                    .html(renderSelectByIdAndName(r.data, 'city', 'city')).trigger('change');
                            });

                        });
                        $(_selector.provinceSelect, $node)
                            .html(renderSelectByIdAndName(r.data, 'province', 'province')).trigger('change');

                    }).fail(function (r) {
                        new Notify('服务器出错', 2).showModal();
                    });
                };

                tab.one('add', function () {

                    initProvinceList($('#add'));

                    $('#store-form-add').validate({
                        rules: {
                            store_name: {
                                required: true
                            },
                            name: {
                                required: true
                            },
                            telphone: {
                                required: true
                            },
                            address: {
                                required: true
                            },
                            admin_name: {
                                required: true
                            },
                            password: {
                                required: true
                            }
                        },
                        submitHandler: function (form) {
                           $.ajax({
                                method: 'POST',
                                dataType: 'json',
                                url: submitUrl,
                                data: $(form).serialize()
                            }).done(function (r) {
                                if (r.status === 0) {
                                    new Notify('添加门店成功', 2).showModal();
                                    setTimeout(function () {
                                        location.reload(true);
                                    }, 1500);
                                }
                                
                            });
                            return false;
                       }
                        
                    });


                
                });


                tab.one('list', function () {
                    $(document).on('click', '.opr-stop', function (e) {
                        var $target = $(e.target).closest('.opr-stop');
                        var $tr = $target.closest('tr');
                        var storeName = $tr.data('storename');
                        var storeStatus = $tr.data('status');

                        var d = dialog({
                            title: '提示',
                            content: '是否停止使用门店<span style="font-weight:bold">' + storeName + '</span>',
                            skin: 'yyc-dialog',
                            okValue: '确定',
                            cancelValue: '取消',
                            cancel: $.noop,
                            ok: function () {
                                var $tr = $(e.target).closest('tr');
                                var storeId = $tr.data('storeid');
                                $.ajax({
                                    url: '/api/changestatus',
                                    method: 'POST',
                                    data: {
                                        store_id: storeId
                                    },
                                    dataType: 'json'
                                }).done(function (r) {
                                    if (r.status === 0) {

                                        $('.opr-stop', $tr).text(STATUS[storeStatus]);

                                        // 停止使用
                                        if (storeStatus == 0) {
                                            storeStatus = 1;
                                            new Notify('已开启使用', 2).showModal();
                                        }else{
                                            storeStatus = 0;
                                            new Notify('已停止使用', 2).showModal();
                                        }

                                        $tr.data('status', storeStatus);
                                        $('.s-status', $tr).text(STATUS[storeStatus]);
                                    }else{
                                        new Notify(r.info, 2).showModal();
                                    }

                                }).fail(function () {
                                    new Notify('服务器超时', 2).showModal();
                                });
                            }
                        }).show($target[0]);

                    });

                
                });
                tab.on('list', function () {
                    $.ajax({
                        url: '/api/selstore',
                        method: 'POST',
                        dataType: 'json',
                        data: appendPageInfo(1)
                    }).done(function (r) {
                        var tmpl = _.template($('#tpl-s-body').html());
                        if (r.status === 0) {
                            if (r.data && r.data.storeList) {
                                $('#a-store-list tbody').html(tmpl({
                                        storeList: r.data.storeList
                                }));
                                    
                                if ($('#pagination').data('twbs-pagination')) {
                                    $('#pagination').data('twbs-pagination').destroy();
                                }

                                $('#pagination').twbsPagination({
                                    totalPages: Math.ceil(r.data.storeCount / PAGE_SIZE),
                                    onPageClick: function (event, page) {
                                        $.ajax({
                                            url: '/api/selstore',
                                            data: appendPageInfo(page),
                                            method: 'POST',
                                            dataType: 'json'
                                        }).done(function (r) {
                                            $('#a-store-list tbody').html(tmpl({
                                                    storeList: r.data.storeList
                                            }));
                                        });
                                        
                                    }
                                });
                            }else{
                                new Notify('门店列表请求出错', 2).showModal();
                            }
                        }else{
                            new Notify(r.info, 2).showModal();

                        }
                    }).fail(function () {
                        new Notify('请求服务器出错', 2).showModal();

                    });
                
                });
                tab.init();
            });
        {%/script%}
        {%require name="admin:page/addstore.tpl"%}
        
    {%/body%}
{%/html%}

