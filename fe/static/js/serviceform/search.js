require([
    'jquery',
    'underscore',
    'dialog',
    '/addService/addService',
    '/api/api',
    '/notify/notify',
    'pagination',
    'datepicker',
    'validate',
], function ($, _, dialog, addService, api, Notify) {

    var _api = {
        serviceFormSearch: '/api/serviceformsearch',
        serviceModified: '/api/serviceformaddsubmit'

    };

    var _selector = {
        serviceFormSearch: '#service-search',
        // 服务单结果表格
        template: '#service-search-result',
        searchDisplay: '.d-s-r',
        // 服务单修改
        modify: '.opr-edit',
        popup: '#service-modified-popup'

    };

    // 明细条目模板
    var TMPL_SERVICE_INFO = '<%_.each(project, function(ele, index){ %>' 
                        +       '<% var str=JSON.stringify(ele)%>' 
                        +       '<tr data-price="<%-ele.price%>" data-json="<%=str.replace(/\"/g, \"\'\")%>">' 
                        +           '<td><%-ele.base%></td>' 
                        +           '<td><%-ele.category%></td>' 
                        +           '<td><%-ele.name%></td>' 
                        +           '<td><%-ele.price%></td>' 
                        +           '<td><%-ele.operator%></td>' 
                        +           '<td><%-ele.remark%></td>' 
                        +           '<td><a class="opr-delete" href="javascript:void(0);">删除</a></td>' 
                        +       '</tr>' 
                        + '<% });%>'
                        + '<tr id="t-service-total">'
                        +       '<td colspan="1"><strong>总计:</strong></td>'
                        +       '<td>项目数</td>'
                        +       '<td id="t-service-count"><%-project_count%></td>'
                        +       '<td>金额</td>'
                        +       '<td colspan="3"><span id="t-service-cost"><%-all_charge%></span>元</td>'
                        +  '</tr>'; 

    api._(_api);

    $('#service-start').add('#service-finish').datepicker({
        autoclose: true,
        format: 'yyyy-mm-dd'

    });

    $(_selector.serviceFormSearch).validate({
        rules: {
            car_no: {
                required: {
                    depends: function () {
                        return ($('#service-finish').val() === '' && $('#service-start').val() === '');
                    }

                }

            },
            time_start: {
                required: {
                    depends: function () {
                        return $('#service-finish').val() !== '';
                    }

                },
                dateISO: true

            },
            time_end: {
                required: {
                    depends: function () {
                        return $('#service-start').val() !== '';
                    }

                },
                dateISO: true

            }

        },
        submitHandler: function (form) {
            $.ajax({
                url: _api.serviceFormSearch,
                data: $(form).serialize(),
                method: 'POST',
                dataType: 'json'

            }).done(function (r) {
                var $info = $('input[type="submit"]', $(form)).next().html('');

                if (r.status=== 0) {
                    var data = r.data;
                    var len = data.length;
                    var tml = _.template($(_selector.template).html());
                    // 模板渲染
                    $(_selector.searchDisplay).html(tml({
                        services: data

                    }));

                }
                else {
                    new Notify('查询失败，请重试.', 2).showModal();
                }
            }).fail(function (r) {
                new Notify('服务器出错', 2).showModal();
            });

            return false;
        }

    });

    function collectInfoFromBlock($block) {
        var project = [];
        $('.data-service-item', $block).each(function () {
            project.push({
                base: $('.data-base', $(this)).html(),
                category: $('.data-category', $(this)).html(),
                name: $('.data-name', $(this)).html(),
                price: $('.data-price', $(this)).html(),
                operator: $('.data-operator', $(this)).html(),
                remark: $('.data-remark', $(this)).html()

            });
        });

        return {
            'maintenance_id': $('.data-service-id', $block).html(),
            'plate_number': $('.data-plate-number', $block).html(),
            'date': $('.data-date', $block).html(),
            'all_charge': $('.data-all-charge', $block).html(),
            'cashier': $('.data-cashier', $block).html(),
            'remark': $('.data-remark', $block).html(),
            'project': project

        };
    }

    $(document).on('click', _selector.modify, function (e) {
        var $block = $(e.target).closest('.service-info');

        var tmlServiceInfo = _.template(TMPL_SERVICE_INFO);
        var tmlPopup = _.template($(_selector.popup).html());

        var data = collectInfoFromBlock($block);
        data.serviceInfo = tmlServiceInfo({
            project: data.project,
            project_count: data.project.length,
            all_charge: data.all_charge

        });

        var d = dialog({
            title: '修改服务单',
            content: tmlPopup(data),
            skin: 'yyc-dialog',
            onshow: function () {
                addService.init();
                var self = this;
                var $this = $(self.node);
                // 显示总计
                $('#t-service-total').show();
                $('#sca-tc-cate-submit', $this).on('click', function () {
                    $.ajax({
                        url: _api.addSuper,
                        method: 'post',
                        data: {
                            superName: $('#p-super-name', $this).val()

                        },
                        dataType: 'json'

                    }).done(function (r) {
                        if (r.status === 0) {
                            $('#tc-cate-note').html('完成项目父类添加');
                        }

                        }).fail(function (r) {
                            new Notify('服务器出错', 2).showModal();
                        });
                });

                $('#sca-tc-cate-close', $this).on('click', function () {
                    self.close().remove();
                });

            }

        }).showModal();
    });

    function padTwo(num) {
        if (('' + num).length === 1) {
            num = '0' + num;
        }

        return num;
    }

    // init
    (function () {
        var rvar = /(\w+)=(\d+)/;
        var _m = location.hash.match(rvar);

        // 转至加载
        if (_m && _m[2]) {
            $('#service_car_no').val(_m[2]).blur();
        // 默认load
        }
        else {
            var now = new Date();

            var start = [
                now.getFullYear(),
                padTwo(now.getMonth() + 1),
                padTwo(now.getDate())
            ].join('-');
            var end = [
                now.getFullYear(),
                padTwo(now.getMonth() + 1),
                padTwo(now.getDate() + 1)
            ].join('-');
            $('#service-start').val(start);
            $('#service-finish').val(end);

        }

        $(_selector.serviceFormSearch).trigger('submit');

    })();
});
