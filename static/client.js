/**
 * TODO:
 *	- Intentar que se cargue antes, ya sea por hook o desde servidor
 * 	- A parte de añadir más personalizaciones, intentar, con más tiempo, enfocarlo de otra manera, que cada una sea independiente y cada una sea la que decida como debe aplicarse y cuales son sus opciones en el formulario de edición.
 */

(function () {

	/* Este el único hook que he encontrado que se ejecuta lo suficientemente pronto sin pasarse, pero es genérico, por lo que comprobamos que estamos dentro de un Topic */
	$(window).on('action:ajaxify.contentLoaded', function () {
		// Siempre cargamos la personalizacion del usuario, si el topic tiene una porpia la sobreescribira luego
		loadUserCustomization();
		if ($('.topic').length){
			init();
		}
		else
		{
			options = {};
			var $button = $('<button class="btn btn-sm btn-default customize-topic hidden-xs" title="Personalizar"><i class="fa fa-paint-brush fa-lg"></i></button>');
			$('#content').append($button);
			$button.tooltip({
				placement: 'left'
			});
			$button.click(function () {
				openUserCustomizeWindow();
			});
		}
	});

	var BACKGROUND_PROPERTY = 'linear-gradient(transparent, #F6F6F6), url("{url}") center center / cover transparent';
	var options = {
		brandColor: '',
		headerImage: '',
		hideTitle: false
	};

	function init() {

		options = {};

		var topicID = ajaxify.variables.get('topic_id');

		/* Añadimos un botón al header para que el usuario pueda empezar a personalizar (Si es administrador o el creador del hilo) */
		socket.emit('topics.canCustomize', {
			tid: topicID
		}, function (err, canCustomize) {
			if (canCustomize) {
				var $button = $('<button class="btn btn-sm btn-default customize-topic hidden-xs" title="Personalizar"><i class="fa fa-paint-brush fa-lg"></i></button>');
				$('.topic').append($button);
				$button.tooltip({
					placement: 'left'
				});
				$button.click(function () {
					openCustomizeWindow();
				});
			}
		});

		/* Comprobamos si el hilo actual tiene alguna personalización */
		socket.emit('topics.getCustomization', {
			tid: topicID
		}, function (err, topicOptions) {
			if (topicOptions) {
				options = topicOptions;
				options.headerImage = sanitize(options.headerImage);
				options.brandColor = sanitize(options.brandColor);
				loadCustomizations(options);
			}
		});
	}

	/**
	 * Cargar las personalizaciones elegidas.
	 */
	function loadCustomizations(options) {

		$('.topic').addClass('custom-topic');

		/* Imagen de la cabecera */
		if (options.headerImage) {
			var $header = $('.custom-topic-header');

			if (!$header.length) {
				$header = $('<div class="custom-topic-header"></div>');
				$('.topic').prepend($header).addClass('with-custom-header');
			}

			$header.css('background', BACKGROUND_PROPERTY.replace('{url}', options.headerImage));
		}


		/* Inyectamos estilos */
		$('#custom-topic-style').remove();
		var style = document.createElement('style');
		style.type = 'text/css';
		style.id = 'custom-topic-style';

		/* Reemplazamos todos los elementos que tengan el color del tema por defecto */
		if (options.brandColor && options.brandColor.match(/^(#\w{3,6}|[a-z]+)$/i)) {
			// Elementos de un topic
			style.textContent += '.custom-topic .post-row .post-header {background: {color}; border-color: {color};}';
			style.textContent += '.custom-topic a {color: {color}}';
			style.textContent += '.custom-topic .username-field {color: {color} !important}';
			style.textContent += '.custom-topic .btn-exodo span {background: {color}}';
			style.textContent += '.custom-topic .pagination > .active > a {background: {color}; border-color: {color}; color: white; }';
			style.textContent += '.custom-topic .pagination a, .custom-topic .pagination a:hover {color: {color};}';
			
			// Elementos del resto del foro
			if(localStorage.userCustomization)
			{
				style.textContent += '.tag-topic-count {background: {color}; border-color: {color};}';
				style.textContent += '.tag-item {background: {color}; border-color: {color};}';
				style.textContent += '.category .category-topics .threadlisthead {background: {color}; border-color: {color};}';
				style.textContent += '.pagination > .active > a {background: {color}; border-color: {color}; color: white; }';
				style.textContent += '.pagination a, .pagination a:hover {color: {color};}';
				style.textContent += 'body a {color: {color}}';
				style.textContent += '.panel-default > .panel-heading {background: {color}; border-color: {color};}';
				style.textContent += '.btn-exodo span {background: {color}}';
			}

			style.textContent = style.textContent.replace(/\{color\}/g, options.brandColor);
		}

		/* Ocultar titulo */
		if (options.hideTitle) {
			style.textContent += '.custom-topic .topic-head-top h1 a {display: none;}';
		}

		document.getElementsByTagName('head')[0].appendChild(style);
	}

	function openCustomizeWindow() {
		window.templates.parse('topic_customizer', {
			topic_title: ajaxify.variables.get('topic_name'),
			header_image: options.headerImage || '',
			brand_color: options.brandColor || '',
			hide_title: options.hideTitle || false
		}, function (template) {

			var dialog = buildDialog(template);

			var preview = dialog.find('.topic-preview');

			if (options.headerImage) {
				preview.find('.topic-preview-header').css('background', BACKGROUND_PROPERTY.replace('{url}', options.headerImage));
			}
			preview.find('.topic-preview-post-title').css('background', options.brandColor);

			dialog.find('#header-image-input').keyup(function () {
				var $status = $('#header-image-loading > i');
				var url = $(this).val();
				preview.find('.topic-preview-header').css('background', BACKGROUND_PROPERTY.replace('{url}', ''));
				if (!url) {
					$status.attr('class', 'fa fa-globe');
				} else if (url.match(/^https?:\/\/.+?\/.+?\.(png|jpg|jpeg|gif)$/)) {
					$status.attr('class', 'fa fa-spin fa-refresh');
					var bgImg = new Image();
					bgImg.onload = function () {
						$status.attr('class', 'fa fa-check');
						preview.find('.topic-preview-header').css('background', BACKGROUND_PROPERTY.replace('{url}', url));
					};
					bgImg.src = url;
				} else {
					$status.attr('class', 'fa fa-close');
				}
			});

			dialog.find('#brand-color-input').keyup(function () {
				var color = $(this).val();

				if (color && color.match(/^(#\w{3,6}|[a-z]+)$/i)) {
					preview.find('.topic-preview-post-title').css('background', color);
				} else {
					preview.find('.topic-preview-post-title').css('background', '');
				}
			});

			dialog.find('#hide-title-check').change(function () {
				if ($(this).get(0).checked) {
					preview.find('.topic-preview-title').addClass('hide');
				} else {
					preview.find('.topic-preview-title').removeClass('hide');
				}
			});
		});
	}

	function buildDialog(template) {
		return bootbox.dialog({
			title: 'Personalizar',
			message: template,
			buttons: {
				cancel: {
					label: 'Cancelar',
					className: 'btn-default',
					callback: function (e) {
						return true;
					}
				},
				save: {
					label: 'Aceptar',
					className: 'btn-primary',
					callback: function (e) {
						options.headerImage = sanitize($('#header-image-input').val());
						options.brandColor = sanitize($('#brand-color-input').val());
						options.hideTitle = $('#hide-title-check').get(0).checked;
						saveCustomizations(options);
						return loadCustomizations(options);
					}
				}
			}
		});
	}

	function sanitize(val) {
		return val && val.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
	}

	function saveCustomizations(options) {
		socket.emit('topics.saveCustomization', {
			tid: ajaxify.variables.get('topic_id'),
			options: options
		}, function(err, r){
			if(!err)
			{
				app.alert({
					type: 'success',
					timeout: 3000,
					title: 'Guardado!',
					message: "Personalización guardada!",
					alert_id: 'customization_ok'
				});
			}
			else
			{
				app.alert({
					type: 'danger',
					timeout: 3000,
					title: 'Error',
					message: "Hubo un error al guardar! Asegurate de que sea una imagen y de que no exceda un tamaño de 300KB",
					alert_id: 'customization_error'
				});
			}
		});
	}

	/*
		Carga las opciones de personalizacion del usuario
		para el foro en general
	*/
	function getUserCustomization()
	{
		// Obtenemos la personalizacion
		socket.emit('topics.getUserCustomization', {}, function (err, topicOptions) {
			if (topicOptions) {
				options = topicOptions;
				options.headerImage = null;
				options.brandColor = sanitize(options.brandColor);
				loadCustomizations(options);
				localStorage.setItem("userCustomization", JSON.stringify(options));
			}
		});
	}
	function loadUserCustomization()
	{
		if(!localStorage.userCustomization)
		{
			getUserCustomization();
		}
		else
		{
			options = JSON.parse(localStorage.userCustomization);
			loadCustomizations(options);
		}
	}

	/*
		Guardar personalizacion de usuario
	*/
	function saveUserCustomizations(options) {
		socket.emit('topics.saveUserCustomization', {
			options: options
		}, function(err, r){
			if(!err)
			{
				app.alert({
					type: 'success',
					timeout: 3000,
					title: 'Guardado!',
					message: "Personalización guardada!",
					alert_id: 'customization_ok'
				});
			}
			else
			{
				app.alert({
					type: 'danger',
					timeout: 3000,
					title: 'Error',
					message: "Hubo un error al guardar!",
					alert_id: 'customization_error'
				});
			}
		});
	}



	/*
		Mostrar dialogo para guardar y elegir personalizacion del foro
	*/
	function openUserCustomizeWindow() {
		window.templates.parse('user_customizer', {
			topic_title: "Titulo",
			brand_color: options.brandColor || '',
			hide_title: options.hideTitle || false
		}, function (template) {

			var dialog = buildUserCustomizationDialog(template);

			var preview = dialog.find('.topic-preview');

			if (options.headerImage) {
				preview.find('.topic-preview-header').css('background', BACKGROUND_PROPERTY.replace('{url}', options.headerImage));
			}
			preview.find('.topic-preview-post-title').css('background', options.brandColor);

			/*
			dialog.find('#header-image-input').keyup(function () {
				var $status = $('#header-image-loading > i');
				var url = $(this).val();
				preview.find('.topic-preview-header').css('background', BACKGROUND_PROPERTY.replace('{url}', ''));
				if (!url) {
					$status.attr('class', 'fa fa-globe');
				} else if (url.match(/^https?:\/\/.+?\/.+?\.(png|jpg|jpeg|gif)$/)) {
					$status.attr('class', 'fa fa-spin fa-refresh');
					var bgImg = new Image();
					bgImg.onload = function () {
						$status.attr('class', 'fa fa-check');
						preview.find('.topic-preview-header').css('background', BACKGROUND_PROPERTY.replace('{url}', url));
					};
					bgImg.src = url;
				} else {
					$status.attr('class', 'fa fa-close');
				}
			});
			*/

			dialog.find('#brand-color-input').keyup(function () {
				var color = $(this).val();

				if (color && color.match(/^(#\w{3,6}|[a-z]+)$/i)) {
					preview.find('.topic-preview-post-title').css('background', color);
				} else {
					preview.find('.topic-preview-post-title').css('background', '');
				}
			});

			dialog.find('#hide-title-check').change(function () {
				if ($(this).get(0).checked) {
					preview.find('.topic-preview-title').addClass('hide');
				} else {
					preview.find('.topic-preview-title').removeClass('hide');
				}
			});
		});
	}

	function buildUserCustomizationDialog(template) {
		return bootbox.dialog({
			title: 'Personalizar',
			message: template,
			buttons: {
				cancel: {
					label: 'Cancelar',
					className: 'btn-default',
					callback: function (e) {
						getUserCustomization();
						return true;
					}
				},
				save: {
					label: 'Aceptar',
					className: 'btn-primary',
					callback: function (e) {
						options.headerImage = sanitize($('#header-image-input').val());
						options.brandColor = sanitize($('#brand-color-input').val());
						options.hideTitle = $('#hide-title-check').get(0).checked;
						saveUserCustomizations(options);
						return getUserCustomization();
					}
				}
			}
		});
	}

}());