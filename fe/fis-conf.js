/**
 * @file fis编译配置文件
 * @author zengguanming
 */
var deployMachine = 'http://115.29.104.45:8080/yunyunche_odp/';
// modules.parser.less表示设置后缀名为less的文件的parser，第二个less表示使用fis-parser-less进行编译
fis.config.set('modules.parser.less', 'less');
// 将less文件编译为css
fis.config.set('roadmap.ext.less', 'css');
fis.config.set('modules.postprocessor.tpl', 'amd');
fis.config.set('modules.postprocessor.js', 'amd');


fis.config.set('settings.postprocessor.amd', {
    baseUrl: './widget',
    paths: {
        jquery: 'lib/jquery/jquery',
        underscore: 'lib/underscore/underscore',
        datatables: 'lib/dataTable/dataTable',
        throttle: 'lib/throttle/throttle',
        interact: 'lib/interact/interact',
        select2: 'lib/select2/select2',
        dialog: 'lib/dialog/dialog',
        observable: 'lib/observable/observable',
        observableArray: 'lib/observableArray/observableArray',
        datepicker: 'lib/datepicker/datepicker'

    }
});

fis.config.merge({
    namespace: 'admin'
});
