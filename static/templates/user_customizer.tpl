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

	<label for="brand-color2-input">Color secundario (degradado)</label>
	<input type="color" value="{brand_color2}" class="form-control" id="brand-color2-input" placeholder="Ej. #CF246A">

	<label for="brand-color-input">Color del texto</label>
	<input type="color" value="{text_color}" class="form-control" id="text-color-input" placeholder="Ej. #CF246A">

	<label for="brand-color-input">Color de fondo</label>
	<input type="color" value="{background_color}" class="form-control" id="background-color-input" placeholder="Ej. #CF246A">

	<label for="brand-color-input">Tipo de letra (<a href="http://www.w3schools.com/cssref/css_websafe_fonts.asp" target="_blank">+ Información</a>)</label>
	<input type="text" value="{font_family}" class="form-control" id="font-family-input" placeholder="Ej. arial">

</div>
