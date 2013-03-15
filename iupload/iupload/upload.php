<?php

require_once '../bcs.class.php';
require_once '../conf.inc.php';

$allowedTypes = array("image/gif","image/jpeg","image/pjpeg","image/png","image/x-png");
$allowedExts = array('jpg','jpeg','gif','bmp','png');

$fieldName = 'iuploadFile';
$uploadDir = '../upload_images/';
$json = array();

$file = $_FILES[$fieldName]["tmp_name"];
$org_filename = $_FILES[$fieldName]["name"];
$file_ext = substr(strrchr($org_filename,"."),1); 

//检查扩展名
if(in_array(strtolower($file_ext),$allowedExts)) {
	//检查文件类型(content_type)
	if( in_array(strtolower($_FILES[$fieldName]["type"]), $allowedTypes )){
		if( $_FILES[$fieldName]["error"] > 0 ){
			$json['status'] = 'error';
			$json['message']= $_FILES[$fieldName]["error"];    
		} else {

			$contenttype = $_FILES[$fieldName]["type"];
			$host = 'bcs.duapp.com'; 
			$baidu_bcs = new BaiduBCS ( BCS_AK, BCS_SK, $host );
			$object = "/" . md5(time(). "_" . $_FILES[$fieldName]["name"]) . "." . $file_ext;
		   
			try {
				$response = (array)$baidu_bcs->create_object(BUCKET, $object, $file,
					array('acl'=>'public-read',	'contenttype'=>$contenttype));
			} catch (Exception $e) {
				$json['status'] = 'error';
				$json['message']= '百度云存储创建对象失败';
			}
			
		
			if($response['status']==200){
				$fileurl = "http://bcs.duapp.com/".BUCKET.$object;
				
				$json['status'] = 'success';
				$json['file'] = $fileurl;
			}
			else
			{
				$json['status'] = 'error';
				$json['message']= '对不起，服务器错误['.$response['status'].'] '.$response['body'];
			}
	}	  
	}else{
	  $json['status'] = 'error';
	  $json['message'] = 'File type '. stripslashes($_FILES[$fieldName]["type"]).' is not allowed';
	}
} else {
    $json['status'] = 'error';
    $json['message']= 'invalid file extention';  
}
?>

<script type="text/javascript" charset="utf-8">
  window.response = <?php echo json_encode($json); ?>;
</script>

