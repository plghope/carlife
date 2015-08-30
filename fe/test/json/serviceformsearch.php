<?php

$json = array(
    'errno'=> 0,
    'data'=>array(
        array(
            "service_id"=> '1221',
            'user_Id'=> '1221',
            'plate_number'=> 'bn2323',
            'all_charge'=> '1212',
            'remark'=> '1212',
            'date'=> '2015-08-23',
            'cashier'=> 'ddf',
            "project"=>array(
                array(
                    'base'=> '1221',
                    'category'=>'1212',
                    'name'=>'1212',
                    'price'=>'1212',
                    'operator'=>'1212',
                    'remark'=>'1212j'
                ),
                array(
                    'base'=> '1221',
                    'category'=>'1212',
                    'name'=>'1212',
                    'price'=>'1212',
                    'operator'=>'1212',
                    'remark'=>'1212j'
                ),
            )
        ),
        array(
            "service_id"=> '1221',
            'user_Id'=> '1221',
            'plate_number'=> 'bn2323',
            'all_charge'=> '1212',
            'remark'=> '1212',
            'date'=> '2015-08-23',
            'cashier'=> 'ddf',
            "project"=>array(
                array(
                    'base'=> '1221',
                    'category'=>'1212',
                    'name'=>'1212',
                    'price'=>'1212',
                    'operator'=>'1212',
                    'remark'=>'1212j'
                ),
                array(
                    'base'=> '1221',
                    'category'=>'1212',
                    'name'=>'1212',
                    'price'=>'1212',
                    'operator'=>'1212',
                    'remark'=>'1212j'
                ),
            )
        ),

    )
);

echo json_encode($json);

