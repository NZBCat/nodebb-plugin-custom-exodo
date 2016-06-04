<p class="text-center">
	Mejora el aspecto del foro personalizando los colores del mismo.
</p>
<hr>

<h4>Opciones</h4>

<div class="form-group">
	<div class="checkbox" style="padding: 0;">
		<input type="checkbox" style="margin: 2px 4px 0px 0px;" id="hide-title-check" <!-- IF hide_title -->checked<!-- ENDIF hide_title -->/> <p style="margin: 2px 4px 0px 20px;">Ocultar t&iacute;tulo del hilo</p>
	</div>
</div>

<div class="form-group">
	<div class='row'>
		<div class='col-lg-12'>
			<label for="brand-color-input">Color principal</label>
			<input type="color" value="{brand_color}" class="form-control" id="brand-color-input" placeholder="Ej. #FFFFFF">
		</div>
		<div class='col-lg-12'>
			<label for="brand-color2-input">Color secundario (degradado)</label>
			<input type="color" value="{brand_color2}" class="form-control" id="brand-color2-input" placeholder="Ej. #FFFFFF">
		</div>
		<div class='col-lg-12'>
			<label for="brand-color-input">Color del texto</label>
			<input type="color" value="{text_color}" class="form-control" id="text-color-input" placeholder="Ej. #FFFFFF">
		</div>
		<div class='col-lg-12'>
			<label for="brand-color-input">Resaltado de Enlaces</label>
			<input type="color" value="{hover_link}" class="form-control" id="hover-link-input" placeholder="Ej. #FFFFFF">
		</div>
		<div class='col-lg-6'>
			<label for="brand-color-input">Color de fondo (mensajes)</label>
			<input type="color" value="{background_color}" class="form-control" id="background-color-input" placeholder="Ej. #FFFFFFA">
		</div>
		<div class='col-lg-6'>
			<label for="brand-color-input">Color de fondo (foro)</label>
			<input type="color" value="{background_color2}" class="form-control" id="background-color-input2" placeholder="Ej. #FFFFFFA">
		</div>
		<div class='col-lg-6'>
			<label for="brand-color-input">Tipo de letra (<a href="http://www.w3schools.com/cssref/css_websafe_fonts.asp" target="_blank">+ Información</a>)</label>
			<input type="text" value="{font_family}" class="form-control" id="font-family-input" placeholder="Ej. arial">
		</div>
		<div class='col-lg-6'>
			<label for="brand-color-input">Tamaño de letra</label>
			<input type="number" min="8" max="28" value="{font_size}" class="form-control" id="font-size-input" placeholder="13">
		</div>
		<div class='col-lg-3'>
			<label for="brand-color-input">Color del borde de los botones</label>
			<input type="color" value="{border_button}" class="form-control" id="border-button-input" placeholder="Ej. #FFFFFF">
		</div>
		<div class='col-lg-3'>
			<label for="brand-color-input">Color de fondo de botones</label>
			<input type="color" value="{background_button}" class="form-control" id="background-button-input" placeholder="Ej. #FFFFFF">
		</div>
		<div class='col-lg-3'>
			<label for="brand-color-input">Color de texto de botones</label>
			<input type="color" value="{text_button}" class="form-control" id="text-button-input" placeholder="Ej. #FFFFFF">
		</div>

	</div>
</div>

<div class="form-group">

	<label for="brand-color-input">Exocode</label>
	<input type="text" min="8" max="300" value="{code}" class="form-control" id="code" placeholder="your share code">

</div>
