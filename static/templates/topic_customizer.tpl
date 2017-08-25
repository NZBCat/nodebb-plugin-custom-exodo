<p class="text-center">
	Improve the appearance of your threads by personalizing the header and the colors of it.
</p>
<hr>

<div class="topic-preview">
	<div class="topic-preview-header">
		<h4 class="topic-preview-title <!-- IF hide_title -->hide<!-- ENDIF hide_title -->">{topic_title}</h4>
		<div class="topic-preview-post">
			<div class="topic-preview-post-title"></div>
		</div>
	</div>
</div>

<h4>Options</h4>

<div class="form-group">
	<label for="header-image-input">Image of the header</label>
	<div class="input-group">
		<input type="url" value="{header_image}" class="form-control" id="header-image-input" placeholder="URL a la imagen" aria-describedby="header-image-loading">
		<span class="input-group-addon" id="header-image-loading"><i class="fa fa-globe"></i></span>
	</div>
	<div class="alert alert-warning">
		<p><b>Recommended resolution:</b> 1920x400px | <b>Maximum allowed size:</b> 300KB</p>
		<p>An image that is too large may affect the browsing of users entering your thread.</p>
	</div>
</div>

<div class="form-group">
	<div class="checkbox" style="padding: 0;">
		<input type="checkbox" style="margin: 2px 4px 0px 0px;" id="hide-title-check" <!-- IF hide_title -->checked<!-- ENDIF hide_title -->/> <p style="margin: 2px 4px 0px 20px;">Hide Thread Title</p>
	</div>
</div>

<div class="form-group">
	<label for="brand-color-input">Main color</label>
	<input type="color" value="{brand_color}" class="form-control" id="brand-color-input" placeholder="Ex. #CF246A">
	<span class="help-block">Color that will be applied to buttons and posts</span>
</div>
