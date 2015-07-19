<p class="text-center">
	Mejora el aspecto del foro personalizando la cabecera y los colores del mismo.
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
	<div class="checkbox" style="padding: 0;">
		<input type="checkbox" style="margin: 2px 4px 0px 0px;" id="hide-title-check" <!-- IF hide_title -->checked<!-- ENDIF hide_title -->/> <p style="margin: 2px 4px 0px 20px;">Ocultar t&iacute;tulo del hilo</p>
	</div>
</div>

<div class="form-group">
	<label for="brand-color-input">Color principal</label>
	<input type="color" value="{brand_color}" class="form-control" id="brand-color-input" placeholder="Ej. #CF246A">
	<span class="help-block">Color que se aplicar&aacute; a botones y posts</span>
</div>
