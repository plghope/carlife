<?php
$json = array(
    'status'=>0,
    'data'=>array(
        'idList'=>array(
            array(
                'id'=>'1',
                'name'=>'维修',
                'subList'=>null
            ),
            array(
                'id'=>'2',
                'name'=>'美容',
                'subList'=>array(
                    array(
                        'id'=>'21',
                        'name'=>'打蜡'
                    ),
                    array(
                        'id'=>'22',
                        'name'=>'镀膜'
                    )
                )
            ),
        ),
        'departmentList'=>array(
            array(
                'id'=>'123',
                'name'=>'维修部'
            ),
            array(
                'id'=>'223',
                'name'=>'美容部'
            )
        )
    )
);

echo json_encode($json);

