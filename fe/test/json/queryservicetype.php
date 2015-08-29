<?php

$json = array(
    'status'=> 0,
    'data'=>array(
        'total'=>2,
        'serviceTypeList'=>array(
            array(
                'serviceTypeName'=> '小保养',
                'serviceTypeId'=> 1,
                'superName'=> '保养'
            ),
            array(
                'serviceTypeName'=> '汽车精洗',
                'serviceTypeId'=> 2,
                'superName'=> '汽车美容'
            ),
        )
    )
);
echo json_encode($json);
