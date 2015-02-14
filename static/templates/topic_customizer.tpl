<p class="text-center">
	Mejora el aspecto de tus hilos personalizando la cabecera y los colores del mismo.
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

<h4>Opciones</h4>

<div class="form-group">
	<label for="header-image-input">Imagen de la cabecera</label>
	<div class="input-group">
		<input type="url" value="{header_image}" class="form-control" id="header-image-input" placeholder="URL a la imagen" aria-describedby="header-image-loading">
		<span class="input-group-addon" id="header-image-loading"><i class="fa fa-globe"></i></span>
	</div>
	<div class="alert alert-warning">
		<p><b>Resoluci&oacute;n recomendada:</b> 1920x400px | <b>Tama&ntilde;o m&aacute;ximo recomendado:</b> 300KB</p>
		<p>Una imagen demasiado pesada podr&iacute;a afectar a la navegaci&oacute;n de los usuarios que entren en tu hilo</p>
	</div>
</div>

<div class="form-group">
	<div class="checkbox" style="padding: 0;">
		<input type="checkbox" style="margin: 2px 4px 0px 0px;" id="hide-title-check" <!-- IF hide_title -->checked<!-- ENDIF hide_title -->/> Ocultar t&iacute;tulo del hilo
	</div>
</div>

<div class="form-group">
	<label for="brand-color-input">Color principal</label>
	<input type="text" value="{brand_color}" class="form-control" id="brand-color-input" placeholder="Ej. #CF246A">
	<span class="help-block">Color que se aplicar&aacute; a botones y posts</span>
</div>
