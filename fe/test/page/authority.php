<?php
require('common.php');

$fis_data = array_merge_recursive($fis_data, array(
    'data'=> array(
        'test'=>'xxx',
        'authorityList'=> array(
            array(
                array(
                    'permissionId'=>'100001',
                    'name'=> '添加客户',
                    'detail'=> '可以向系统添加客户资料'
                ),

                array(
                    'permissionId'=>'100002',
                    'name'=> '查询客户',
                    'detail'=> '可以向系统添加客户资料'
                ),

                array(
                    'permissionId'=>'100001',
                    'name'=> '修改客户',
                    'detail'=> '可以向系统添加客户资料'
                ),

                array(
                    'permissionId'=>'100001',
                    'name'=> '客户跟踪',
                    'detail'=> '可以向系统添加客户资料'
                ),
            ),
            array(
                array(
                    'permissionId'=>'200001',
                    'name'=> '添加服务单',
                    'detail'=> '可以向系统添加客户资料'
                ),

                array(
                    'permissionId'=>'200002',
                    'name'=> '查询服务单',
                    'detail'=> '可以向系统添加客户资料'
                ),

                array(
                    'permissionId'=>'200003',
                    'name'=> '修改服务单',
                    'detail'=> '可以向系统添加客户资料'
                ),
            ),
            array(
                array(
                    'permissionId'=>'300001',
                    'name'=> '权限管理',
                    'detail'=> '可以向系统添加客户资料'
                ),

                array(
                    'permissionId'=>'300002',
                    'name'=> '项目管理',
                    'detail'=> '可以向系统添加客户资料'
                ),

                array(
                    'permissionId'=>'300003',
                    'name'=> '消息推送',
                    'detail'=> '可以向系统添加客户资料'
                ),
                
            )
        ),
    )
));
