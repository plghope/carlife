<?php
require('common.php');

$fis_data = array_merge_recursive($fis_data, array(
    'data'=> array(
        'test'=>'xxx',
        'authorityList'=> array(
            array(
                array(
                    'permissionId'=>'1001',
                    'name'=> '添加客户',
                    'detail'=> '可以向系统添加客户资料'
                ),

                array(
                    'permissionId'=>'1002',
                    'name'=> '查询客户',
                    'detail'=> '可以向系统添加客户资料'
                ),

                array(
                    'permissionId'=>'1003',
                    'name'=> '修改客户',
                    'detail'=> '可以向系统添加客户资料'
                ),

                array(
                    'permissionId'=>'1004',
                    'name'=> '客户跟踪',
                    'detail'=> '可以向系统添加客户资料'
                ),
                array(
                    'permissionId'=>'1005',
                    'name'=> '客户反馈',
                    'detail'=> '可以向系统添加客户资料'
                ),
                array(
                    'permissionId'=>'1006',
                    'name'=> '历史消息',
                    'detail'=> '可以向系统添加客户资料'
                ),
            ),
            array(
                array(
                    'permissionId'=>'2001',
                    'name'=> '添加服务单',
                    'detail'=> '可以向系统添加客户资料'
                ),

                array(
                    'permissionId'=>'2002',
                    'name'=> '查询服务单',
                    'detail'=> '可以向系统添加客户资料'
                ),

                array(
                    'permissionId'=>'2003',
                    'name'=> '修改服务单',
                    'detail'=> '可以向系统添加客户资料'
                ),
            ),
            array(
                array(
                    'permissionId'=>'3001',
                    'name'=> '权限管理',
                    'detail'=> '可以向系统添加客户资料'
                ),

                array(
                    'permissionId'=>'3002',
                    'name'=> '项目管理',
                    'detail'=> '可以向系统添加客户资料'
                ),

                array(
                    'permissionId'=>'3003',
                    'name'=> '消息推送',
                    'detail'=> '可以向系统添加客户资料'
                ),
                
            )
        ),
    )
));
