require([
    'jquery',
    'dialog',
    '/addService/addService',
    'datepicker'
], function($, dialog, addService){
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
                        +   '<% var str=JSON.stringify(ele)%>'
                        +   '<tr data-json="<%=str.replace(/\"/g, \"\'\")%>">'
                        +      '<td><%-ele.base%></td>'
                        +      "<td><%-ele.category%></td>"
                        +      "<td><%-ele.name%></td>"
                        +      "<td><%-ele.price%></td>"
                        +      "<td><%-ele.operator%></td>"
                        +      "<td><%-ele.remark%></td>"
                        +      '<td><a class="opr-delete" href="javascript:void(0);">删除</a></td>'
                        +    '</tr>'
                        +    '<% });%>';

    $('#service-start').add('#service-finish').datepicker({
            autoclose: true,
            format: 'yyyy-mm-dd'
        });


    $(_selector.serviceFormSearch).on('submit', function() {
        $.ajax({
            url: _api.serviceFormSearch,
            data: $(this).serialize(),
            method: 'POST',
            dataType: 'json'
        }).done(function (r) {
            var $info = $('input[type="submit"]', $(this)).next().html('');
            
            if (r.errno === 0) {
                var data = r.data;
                var len  = data.length;
                var tml = _.template($(_selector.template).html());
                // 模板渲染
                $(_selector.searchDisplay).html(tml({
                    services: data 
                }));

                $info.html('查询到'+ len + '条数据.');
            }else{
                $info.html('查询失败，请重试.');
            }
        });

        return false;
    });

    function collectInfoFromBlock($block){
        var project = [];
        $('.data-service-item', $block).each(function() {
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
            'service_id': $('.data-service-id', $block).html(),
            'plate_number': $('.data-plate-number', $block).html(),
            'date': $('.data-date', $block).html(),
            'all_charge': $('.data-all-charge', $block).html(),
            'cashier': $('.data-cashier', $block).html(),
            'remark': $('.data-remark', $block).html(),
            'project': project
        };
    };

    $(document).on('click', _selector.modify, function (e) {
        var $block = $(e.target).closest('.service-info');

        var tmlServiceInfo = _.template(TMPL_SERVICE_INFO);
        var tmlPopup = _.template($(_selector.popup).html());
        
        var data = collectInfoFromBlock($block);
        data.serviceInfo = tmlServiceInfo({
            project: data.project
        });
        console.log(data);

        var d = dialog({
            title: '修改服务单',
            content: tmlPopup(data),
            skin: 'yyc-dialog',
            onshow: function () {
                addService.init();
                var self = this;
                var $this = $(self.node);
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
                    });
                
                });

                $('#sca-tc-cate-close', $this).on('click', function () {
                    self.close().remove();
                });

            }
        }).showModal();
    

        
        
    });
});
