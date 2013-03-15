<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<title>图片上传</title>
<meta name="description" content="">
<meta name="author" content="">

<!-- HTML5 shim, for IE6-8 support of HTML elements -->
<!--[if lt IE 9]>
      <script src="http://html5shim.googlecode.com/svn/trunk/html5.js"></script>
    <![endif]-->

<!-- Styles -->
<link href="css/bootstrap.min.css" rel="stylesheet" type="text/css" />
<style type="text/css">
      /* Override some defaults */
      html, body {
        background-color: #eee;
      }
      body {
        padding-top: 40px; /* 40px to make the container go all the way to the bottom of the topbar */
      }
      .container > footer p {
        text-align: center; /* center align it with the container */
      }

      /* The white background content wrapper */
      .container > .content {
        background-color: #fff;
        padding: 20px;
        margin: 0 -20px; /* negative indent the amount of the padding to maintain the grid system */
        -webkit-border-radius: 0 0 6px 6px;
           -moz-border-radius: 0 0 6px 6px;
                border-radius: 0 0 6px 6px;
        -webkit-box-shadow: 0 1px 2px rgba(0,0,0,.15);
           -moz-box-shadow: 0 1px 2px rgba(0,0,0,.15);
                box-shadow: 0 1px 2px rgba(0,0,0,.15);
      }

      /* Page header tweaks */
      .page-header {
        background-color: #f5f5f5;
        padding: 20px 20px 10px;
        margin: -20px -20px 20px;
      }

      /* Styles you shouldn't keep as they are for displaying this base example only */
      .content .span8,
      .content .span4 {
        min-height: 500px;
      }
      /* Give a quick and non-cross-browser friendly divider */
      .content .span4 {
        margin-left: 0;
        padding-left: 19px;
        border-left: 1px solid #eee;
      }

      .topbar .btn {
        border: 0;
      }
</style>
<link rel="shortcut icon" href="favicon.ico">
</head>

<body>
	<div class="navbar navbar-fixed-top">
		  <div class="navbar-inner">
			<a class="brand" href="#">小明相册</a>
			<ul class="nav">
			  <li ><a href="/index.php">主页</a></li>
			  <li class="active"><a href="/upload.php">上传图片</a></li>
			  
			</ul>
		  </div>

	</div>

	<div class="container">
		<div class="content">

			<div class="row">
				<div class="span12">
				<?
				if($_GET['ret']==1){
					echo '<div class="alert alert-success">上传成功,可以继续上传。</div>';
				} else if($_GET['ret']==-1){
					echo '<div class="alert alert-error">上传失败,请重新上传!</div>';
				} 
				?>
				

			  <form class="form-horizontal" id="apply_form" method="post" action="inc/upimg.php" >
				<fieldset>
				<div class="control-group">
					  <label class="control-label">图片</label>

					  <!-- File Upload -->
			  
					  <div class="controls">
						<div id="uploader_image" style="width:220px;height:30px;">
						</div>
						<input type="hidden"  id="image_url" name="image_url">
						<div id="uploader_image_display" style="width:220px;">
						</div>
					  </div>
					</div>
					
				<div class="control-group">

					  <!-- Text input-->
					  <label class="control-label" for="title">备注</label>
					  <div class="controls">
						<input type="text" placeholder="" class="input-xlarge"  id="title" name="title">
						<p class="help-block"></p>
					  </div>
					</div>

				<div class="control-group">
					  <label class="control-label"></label>

					  <!-- Button -->
					  <div class="controls">
						<input type="submit" id="submitform" class="btn btn-success" value="提交"></input>
					  </div>
					</div>

				</fieldset>
			  </form>

				</div>
			</div>
		</div>
		<hr />
		<footer>
			<p>
				&copy;
				小明相册
			</p>
		</footer>

	</div>
<script type="text/javascript" src="js/jquery-1.7.1.min.js"></script>
<script src="./iupload/iupload/i_upload.js" type="text/javascript" ></script>
<script type="text/javascript" >
$(function(){
	var uploader_image = new dpm.IUpload( {
		container:'#uploader_image',
		action:"./upload.php",
		iframe_src:"./iupload/iupload/iframe.html",
		label:"上传图片"
	} );  

	uploader_image.uploadComplete = function(response){
	  if( response.status == "success" ){
		$("#image_url").val(response.file);
		$('#uploader_image_display').html('<img src="'+response.file+'" width="220px" />');
	  }else{
		alert(response.message);
	  }
	};
});
</script>	
</body>
</html>