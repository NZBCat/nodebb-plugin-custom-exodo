/**
 * TODO:
 *	- Intentar que se cargue antes, ya sea por hook o desde servidor
 * 	- A parte de añadir más personalizaciones, intentar, con más tiempo, enfocarlo de otra manera, que cada una sea independiente y cada una sea la que decida como debe aplicarse y cuales son sus opciones en el formulario de edición.
 */
 var BACKGROUND_PROPERTY = 'linear-gradient(transparent, #F6F6F6), url("{url}") center center / cover transparent';
 var user_options = {

		brandColor: '',
		headerImage: '',
		hideTitle: false,
    usecode: false,
    custom: false,
 };

(function () {



	/* Este el único hook que he encontrado que se ejecuta lo suficientemente pronto sin pasarse, pero es genérico, por lo que comprobamos que estamos dentro de un Topic */
	$(window).on('action:ajaxify.contentLoaded', function () {


	/*	socket.emit('modules.test', {data: "Some data"}, function(err, result) {
    alert(result);
		});
*/


		// Siempre cargamos la personalizacion del usuario, si el topic tiene una porpia la sobreescribira luego
		loadUserStorage();

		//init for topic personaliation
		if ($('.topic').length){
			init();
		}
		if(!$("#nav_personalize").length)
		{

			var $button = $('<li id="nav_personalize"><a href="#"><i class="fa fa-paint-brush"></i><span> Personalizar</span></a></li>');
			//var $homebutton = $('<a href="#" id="home_personalize" class="btn btn-primary"><i class="fa fa-paint-brush"></i><span> Personalizar</span></a>');
			$button.insertBefore($("[component='user/logout']"));
			//$homebutton.insertBefore($("#new_topic"));

			$button.click(function () {
				openUserCustomizeWindow();
			});
			/*$homebutton.click(function () {
				openUserCustomizeWindow(options);
			});*/
			getUserCustomization();
		}
	});


	//load user options from localStorage
	function loadUserStorage()
	{
		if(!localStorage.userCustomization)
		{
		    getUserCustomization();
		}
		else
		{
			if ( JSON.parse(localStorage.userCustomization) !== undefined) {
				user_options = JSON.parse(localStorage.userCustomization);
			}
			//aplicamos en el tema
			setUserCustomization();
		}
	}



	function setUserCustomization() {

		$('.topic').addClass('custom-topic');
		/* Inyectamos estilos */
		$('#custom-topic-style').remove();
		var style = document.createElement('style');
		style.type = 'text/css';
		style.id = 'custom-topic-style';

		/* Reemplazamos todos los elementos que tengan el color del tema por defecto */
		if (user_options.brandColor && user_options.brandColor.match(/^(#\w{3,6}|[a-z]+)$/i)) {
			// Elementos de un topic
			style.textContent += '.custom-topic .post-row .post-header {background: {color}; border-color: {color};}';
			style.textContent += '.custom-topic a {color: {color}}';
			style.textContent += '.custom-topic .username-field {color: {textcolor} !important}';
			style.textContent += '.custom-topic .btn-exodo .exright {background: {color}}';
			style.textContent += '.custom-topic .pagination > .active > a {background: {color}; border-color: {color}; color: white; }';
			style.textContent += '.custom-topic .pagination a, .custom-topic .pagination a:hover {color: {color};}';
			style.textContent += '.ribbon-green a {color: white}';

			// Elementos del resto del foro
			if(localStorage.userCustomization)
			{
				// Gradiente linear-gradient(to right, {color} 0px, {color2} 100%)
				style.textContent += '.tag-topic-count {background: {color}; border-color: {color};}';
				style.textContent += '.tag-item {background: {color}; border-color: {color};}';
				style.textContent += '.pagination > .active > a {background: {color}; border-color: {color}; color: white; }';
				style.textContent += '.pagination a, .pagination a:hover {color: {color};}';
				style.textContent += 'body a {color: {color}}';
				style.textContent += '.btn-exodo .exright {background: {color}}';
				style.textContent += '.loading-bar {background: linear-gradient(to right, {color} 0px, {color2} 100%)}';

				// headers con degradados
				style.textContent += '.category .category-topics .category-item .topic-row .threadinfo>small a {color: {color}}';
				style.textContent += '.category .category-topics .category-item .topic-row .threadlastpost a.lastpost {color: {color}}';
				style.textContent += '.panel-default > .panel-heading {background:linear-gradient(to right, {color} 0px, {color2} 100%); border-color: {color};}';
				style.textContent += '.category .category-topics .threadlisthead {background:linear-gradient(to right, {color} 0px, {color2} 100%); border-color: {color};}';
				style.textContent += '.custom-topic .post-row .post-header {background:linear-gradient(to right, {color} 0px, {color2} 100%); border-color: {color};}';

				style.textContent += 'body {color: {textcolor}}';
				style.textContent += '.category .category-head .category-head-top h1 {color: {color}}';

				//style.textContent += '.topic .posts .post-wrapper .post-details .userinfo {background: {bgcolor}}';
				//style.textContent += '.posts .post-wrapper .post-details .userinfo-extra {background: {bgcolor}}';
				//style.textContent += '.posts .post-details {background: {bgcolor}}';
				//style.textContent += '.posts .post-wrapper {background: {bgcolor}}';
				//style.textContent += '.posts .post-wrapper .post-details .post-block {background: {bgcolor}}';
				//style.textContent += '.posts .post-wrapper .post-info {background: {bgcolor}}';
				//style.textContent += '.topic .posts .post-wrapper .post-details .post-block {background: {bgcolor}}';
				//style.textContent += '.posts .post-signature {background: {bgcolor}}';
				style.textContent += '.panel-body {background: {bgcolor}}';
				style.textContent += '.panel {background: {bgcolor}}';
				style.textContent += '.category-item.pinned .topic-row {background: {bgcolor}}';
				style.textContent += '.category .category-topics .threadlisthead .category-item .topic-row {background: {bgcolor};}';
				style.textContent += '.topic .posts .post-wrapper .post-details {background: {bgcolor}}';

				style.textContent += 'body {font-family: {fontfamily}}';
				style.textContent += 'body {font-size: {fontsize}px}';

				//style.textContent += '.ribbon-green a {color: white}';

        //a partir de aqui he tocado
        style.textContent += '.posts .post-details {background: {bgcolor3}}';
        style.textContent += '.topic .posts .box {background: {bgcolor3};}';
        style.textContent += '.topic .posts .links-bar small {background: {bgcolor3};}';
        




        style.textContent += 'body {background: {bgcolor2}}'; //ok


	      style.textContent += '.category > ul > li {background-color: {bgcolor};}';
        style.textContent += '.btn-default, .btn-primary, .btn-danger, .btn-info, .btn-warning {border-left: 5px solid {borderbutton} !important;}';
        style.textContent += '.btn-default, .btn-primary, .btn-danger, .btn-info, .btn-warning {background-color: {backgroundbutton} !important;}';
        style.textContent += '.btn-default, .btn-primary, .btn-danger, .btn-info, .btn-warning {color: {textbutton}}';

        style.textContent += '.category a:hover, .category a:focus, .posts a:focus, .posts a:hover, .categories a:hover, .categories a:focus {color: {hoverlink} !important;}'; //falta añadir muchos mas

        style.textContent += '.modal-content, .composer{ background-color: {backgroundmodal};}'; //lo dejo junto al composer de momento


				/*style.textContent += 'p {font-family: {fontfamily}}';
				style.textContent += 'a {font-family: {fontfamily}}';
				style.textContent += 'i {font-family: {fontfamily}}';*/
			}

			style.textContent = style.textContent.replace(/\{color\}/g, user_options.brandColor);
			style.textContent = style.textContent.replace(/\{color2\}/g, user_options.brandColor2);
			style.textContent = style.textContent.replace(/\{textcolor\}/g, user_options.textColor);
			style.textContent = style.textContent.replace(/\{bgcolor\}/g, user_options.backgroundColor);
			style.textContent = style.textContent.replace(/\{bgcolor2\}/g, user_options.backgroundColor2);
      style.textContent = style.textContent.replace(/\{bgcolor3\}/g, user_options.backgroundPostbox);
			style.textContent = style.textContent.replace(/\{fontfamily\}/g, user_options.font);
			style.textContent = style.textContent.replace(/\{fontsize\}/g, user_options.fontSize);
      style.textContent = style.textContent.replace(/\{borderbutton\}/g, user_options.borderButton);
      style.textContent = style.textContent.replace(/\{backgroundbutton\}/g, user_options.backgroundButton);
      style.textContent = style.textContent.replace(/\{textbutton\}/g, user_options.textButton);
      style.textContent = style.textContent.replace(/\{hoverlink\}/g, user_options.hoverLink);
      style.textContent = style.textContent.replace(/\{backgroundmodal\}/g, user_options.backgroundModal);
		}


		document.getElementsByTagName('head')[0].appendChild(style);
	}



  /* Carga las opciones de personalizacion del usuario para el foro en general */
  function getUserCustomization() {
    //console.log("entramos en el getuser");
    //console.log(user_options);
    // Obtenemos la personalizacion
    //user_options_default();
    //saveUserCustomization(user_options);

    socket.emit('topics.getUserCustomization', {}, function (err, topicOptions) {
    if (topicOptions) {
        topicOptions= JSON.parse(topicOptions);
        //console.log(topicOptions);
        user_options = topicOptions;
        //user_options.headerImage = null;
        //user_options.usecode = false;
        //user_options.brandColor = sanitize(user_options.brandColor);
        setUserCustomization();
        localStorage.setItem("userCustomization", JSON.stringify(user_options));
      }
      else
      {
        //console.log("borrado");
        localStorage.removeItem("userCustomization");
      }
    });
  }

	/* Guardar personalizacion de usuario */
	function saveUserCustomization(savedata) {
		//console.log("datos a guardar");
		//console.log(savedata);

		if(savedata)
		{
			localStorage.setItem("userCustomization", JSON.stringify(savedata));
		}
		else
		{
			localStorage.removeItem("userCustomization");
		}


		socket.emit('topics.saveUserCustomization', {
			options: savedata
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

/* saves the code on a variable */
	function make_code(codigo){
		var codigo_unico = {};
		var temp = codigo.split('#');
		codigo_unico.brandColor = '#' + temp[1];
		codigo_unico.brandColor2 = '#' + temp[2];
		codigo_unico.hideTitle = temp[3];
		codigo_unico.backgroundColor = '#' + temp[4];
		codigo_unico.backgroundColor2 = '#' + temp[5];
		codigo_unico.textColor = '#' + temp[6];
		codigo_unico.font = temp[7];
		codigo_unico.fontSize = temp[8];
    codigo_unico.borderButton = '#' + temp[9];
    codigo_unico.backgroundButton = '#' + temp[10];
    codigo_unico.textButton = '#' + temp[11];
    codigo_unico.hoverLink = '#' + temp[12];
    codigo_unico.backgroundModal = '#' + temp[13];
    codigo_unico.backgroundPostbox = '#' + temp[14];

		return(codigo_unico);
	}

	/* print our customization on a string code */
	function print_code(codigo_unico){
		var exocode = '';
    if(codigo_unico.custom || user_options.usecode){
		//console.log(codigo_unico);
		exocode += codigo_unico.brandColor;
		exocode += codigo_unico.brandColor2;
		//to use on split
		exocode += '#';
	  exocode += codigo_unico.hideTitle;
		exocode += codigo_unico.backgroundColor;
		exocode += codigo_unico.backgroundColor2;
		exocode += codigo_unico.textColor;
		exocode += '#';
		exocode += codigo_unico.font;
		exocode += '#';
		exocode += codigo_unico.fontSize;
    exocode += codigo_unico.borderButton;
    exocode += codigo_unico.backgroundButton;
    exocode += codigo_unico.textButton;
    exocode += codigo_unico.hoverLink;
    exocode += codigo_unico.backgroundModal;
    exocode += codigo_unico.backgroundPostbox;
    }
    else {
      exocode = "#333333#333333#false#f6f6f6#f6f6f6#2e3539#Open Sans,sans-serif#13#333333#333333#333333#333333#333333#333333"
    }
		return(exocode);
	}

	/* Mostrar dialogo para guardar y elegir personalizacion del foro */
	function openUserCustomizeWindow(codigo) {

		if (user_options.usecode){

      //creating new object with code values
			var custom_code = {};
      //console.log(codigo.value);
			custom_code = make_code(codigo.value);

			window.templates.parse('user_customizer', {
				topic_title: "Titulo",
				brand_color: custom_code.brandColor || '#333333',
				brand_color2: custom_code.brandColor2 || '#333333',
				hide_title: custom_code.hideTitle || false,
				background_color: custom_code.backgroundColor || '#f6f6f6',
				background_color2: custom_code.backgroundColor2 || '#f6f6f6',
				text_color: custom_code.textColor || '#2e3539',
				font_family: custom_code.font || '"Open Sans",sans-serif',
				font_size: custom_code.fontSize || '13',
        border_button: custom_code.borderButton || '#333333',
        background_button: custom_code.backgroundButton || '#333333',
        text_button: custom_code.textButton || '#333333',
        hover_link: custom_code.hoverLink || '#333333',
        background_modal: custom_code.backgroundModal || '#333333',
        background_postbox: custom_code.backgroundPostbox || '#333333',
				code: print_code(custom_code) || ''
			}, function (template) {

				var dialog = buildUserCustomizationDialog(template);

			});
			user_options = {};
		}
		else {
			user_options = {};

		if(localStorage.userCustomization)
		{
			//esto es un poco redundante
			user_options = JSON.parse(localStorage.userCustomization);
		}
		window.templates.parse('user_customizer', {
			topic_title: "Titulo",
			brand_color: user_options.brandColor || '#333333',
			brand_color2: user_options.brandColor2 || '#333333',
			hide_title: user_options.hideTitle || false,
			background_color: user_options.backgroundColor || '#f6f6f6',
			background_color2: user_options.backgroundColor2 || '#f6f6f6',
			text_color: user_options.textColor || '#2e3539',
			font_family: user_options.font || 'Open Sans,sans-serif',
			font_size: user_options.fontSize || '13',
      border_button: user_options.borderButton || '#333333',
      background_button: user_options.backgroundButton || '#333333',
      text_button: user_options.textButton || '#333333',
      hover_link: user_options.hoverLink || '#333333',
      background_modal: user_options.backgroundModal || '#333333',
      background_postbox: user_options.backgroundPostbox || '#333333',
			code: print_code(user_options) || ''
		}, function (template) {

				var dialog = buildUserCustomizationDialog(template);

		});

		}
	}



	function buildUserCustomizationDialog(template) {
		return bootbox.dialog({
			title: 'Personalizar',
			message: template,
			buttons: {
				"code": {
					label: 'Cargar Codigo',
					className: 'btn-default',
					callback: function(e) {
						user_options.usecode = true;
						openUserCustomizeWindow(code);
					}
				},
				"default": {
					label: 'Usar colores por defecto',
					className: 'btn-default',
					callback: function (e) {
            user_options_default();
						saveUserCustomization(user_options);
						getUserCustomization();
						return $("#custom-topic-style").remove();
					}
				},
				cancel: {
					label: 'Cancelar',
					className: 'btn-danger',
					callback: function (e) {
						getUserCustomization();
						return true;
					}
				},
				save: {
					label: 'Aceptar',
					className: 'btn-primary',
					callback: function (e) {
						user_options.headerImage = sanitize($('#header-image-input').val());
						user_options.brandColor = sanitize($('#brand-color-input').val());
						user_options.brandColor2 = sanitize($('#brand-color2-input').val());
						user_options.textColor = sanitize($('#text-color-input').val());
						user_options.backgroundColor = sanitize($('#background-color-input').val());
						user_options.backgroundColor2 = sanitize($('#background-color-input2').val());
						user_options.font = sanitize($('#font-family-input').val());
						user_options.fontSize = sanitize($('#font-size-input').val());
						user_options.hideTitle = $('#hide-title-check').get(0).checked;
            user_options.borderButton = sanitize($('#border-button-input').val());
            user_options.backgroundButton = sanitize($('#background-button-input').val());
            user_options.textButton = sanitize($('#text-button-input').val());
            user_options.hoverLink = sanitize($('#hover-link-input').val());
            user_options.backgroundModal = sanitize($('#background-modal-input').val());
            user_options.backgroundPostbox = sanitize($('#background-postbox-input').val());
						//user_options.usecode = $('#use-code-check').get(0).checked;
						user_options.usecode = false;
						// check font size
						user_options.fontSize = user_options.fontSize > 28 ? 28 : user_options.fontSize;
						user_options.fontSize = user_options.fontSize < 8 ? 8 : user_options.fontSize;
            user_options.custom = true; //flag to know code is saved
						saveUserCustomization(user_options);
						return getUserCustomization(user_options);
					}
				}
			}
		});
	}

  function user_options_default(){

			user_options = {};
      user_options.brandColor = '';
  		user_options.headerImage = '',
  		user_options.hideTitle = false;
      user_options.usecode = false;
      user_options.custom = false;

  }


		function init() {

			var topicID = ajaxify.data.tid;
			var options = {
				brandColor: '',
				headerImage: '',
				hideTitle: false
			};
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
						openCustomizeWindow(options);
					});
				}
			});

			/* Comprobamos si el hilo actual tiene alguna personalización */
			socket.emit('topics.getCustomization', {
				tid: topicID
			}, function (err, topicOptions) {
				if (topicOptions) {
					options = topicOptions;
					console.log("opciones cargadas");
					console.log(topicOptions);
					options.headerImage = sanitize(options.headerImage);
					options.brandColor = sanitize(options.brandColor);
					//options.hideTitle =
					loadCustomizations(options);
				}
			});
		}

		/** Cargar las personalizaciones elegidas. */

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
				style.textContent += '.custom-topic .username-field {color: {textcolor} !important}';
				style.textContent += '.custom-topic .btn-exodo .exright {background: {color}}';
				style.textContent += '.custom-topic .pagination > .active > a {background: {color}; border-color: {color}; color: white; }';
				style.textContent += '.custom-topic .pagination a, .custom-topic .pagination a:hover {color: {color};}';
				style.textContent += '.ribbon-green a {color: white}';

				// Elementos del resto del foro
				if(localStorage.userCustomization)
				{
					// Gradiente linear-gradient(to right, {color} 0px, {color2} 100%)
					style.textContent += '.tag-topic-count {background: {color}; border-color: {color};}';
					style.textContent += '.tag-item {background: {color}; border-color: {color};}';
					style.textContent += '.pagination > .active > a {background: {color}; border-color: {color}; color: white; }';
					style.textContent += '.pagination a, .pagination a:hover {color: {color};}';
					style.textContent += 'body a {color: {color}}';
					style.textContent += '.btn-exodo .exright {background: {color}}';
					style.textContent += '.loading-bar {background: linear-gradient(to right, {color} 0px, {color2} 100%)}';

					// headers con degradados
					style.textContent += '.category .category-topics .category-item .topic-row .threadinfo>small a {color: {color}}';
					style.textContent += '.category .category-topics .category-item .topic-row .threadlastpost a.lastpost {color: {color}}';
					style.textContent += '.panel-default > .panel-heading {background:linear-gradient(to right, {color} 0px, {color2} 100%); border-color: {color};}';
					style.textContent += '.category .category-topics .threadlisthead {background:linear-gradient(to right, {color} 0px, {color2} 100%); border-color: {color};}';
					style.textContent += '.custom-topic .post-row .post-header {background:linear-gradient(to right, {color} 0px, {color2} 100%); border-color: {color};}';

					style.textContent += 'body {color: {textcolor}}';
					style.textContent += '.category .category-head .category-head-top h1 {color: {color}}';

					style.textContent += '.topic .posts .post-wrapper .post-details .userinfo {background: {bgcolor}}';
					style.textContent += '.posts .post-wrapper .post-details .userinfo-extra {background: {bgcolor}}';
					style.textContent += '.posts .post-details {background: {bgcolor}}';
					style.textContent += '.posts .post-wrapper {background: {bgcolor}}';
					style.textContent += '.posts .post-wrapper .post-details .post-block {background: {bgcolor}}';
					style.textContent += '.posts .post-wrapper .post-info {background: {bgcolor}}';
					style.textContent += '.topic .posts .post-wrapper .post-details .post-block {background: {bgcolor}}';
					style.textContent += '.posts .post-signature {background: {bgcolor}}';
					style.textContent += '.panel-body {background: {bgcolor}}';
					style.textContent += '.panel {background: {bgcolor}}';
					style.textContent += '.category-item.pinned .topic-row {background: {bgcolor}}';
					style.textContent += '.category .category-topics .threadlisthead .category-item .topic-row {background: {bgcolor};}';
					style.textContent += '.topic .posts .post-wrapper .post-details {background: {bgcolor}}';

					style.textContent += 'body {font-family: {fontfamily}}';
					style.textContent += 'body {font-size: {fontsize}px}';

					style.textContent += '.ribbon-green a {color: white}';

					if(options.backgroundColor2 != "")
					{
						style.textContent += 'html {background: {bgcolor2}}';
					}

					/*style.textContent += 'p {font-family: {fontfamily}}';
					style.textContent += 'a {font-family: {fontfamily}}';
					style.textContent += 'i {font-family: {fontfamily}}';*/
				}

				style.textContent = style.textContent.replace(/\{color\}/g, options.brandColor);
				style.textContent = style.textContent.replace(/\{color2\}/g, options.brandColor2);
				style.textContent = style.textContent.replace(/\{textcolor\}/g, options.textColor);
				style.textContent = style.textContent.replace(/\{bgcolor\}/g, options.backgroundColor);
				style.textContent = style.textContent.replace(/\{bgcolor2\}/g, options.backgroundColor2);
				style.textContent = style.textContent.replace(/\{fontfamily\}/g, options.font);
				style.textContent = style.textContent.replace(/\{fontsize\}/g, options.fontSize);
			}

			/* Ocultar titulo */
			if (options.hideTitle) {
				style.textContent += '.custom-topic .topic-head-top h1 a {display: none;}';
			}

			document.getElementsByTagName('head')[0].appendChild(style);
		}

		function openCustomizeWindow(options) {

				console.log("ventana de customizado");
				console.log(options);
			window.templates.parse('topic_customizer', {
				topic_title: ajaxify.data.title,
				header_image: options.headerImage || '',
				brand_color: options.brandColor || '',
				hide_title: options.hideTitle || false
			}, function (template) {

				var dialog = buildDialog(template,options);

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

		function buildDialog(template,options) {

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
							options.hideTitle =$('#hide-title-check').get(0).checked;
							console.log("construyendo dialogo");
							console.log(options.brandColor);
							console.log(options.headerImage);
							console.log(options.hideTitle);
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
					tid: ajaxify.data.tid,
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




}());
