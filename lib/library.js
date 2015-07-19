(function (module) {
	"use strict";

	var plugin = {};

	var Topics = module.parent.require('./topics'),
		User = module.parent.require('./user'),
		Socket = module.parent.require('./socket.io/topics'),
		db = module.parent.require('./database');

	var request = module.parent.require('request');

	var MAX_SIZE = 300000; // 300KB

	/**
	 * Asigna las opciones de personalización a un hilo, siempre y cuando tenga permisos para hacerlo
	 */
	Topics.saveCustomization = function (tid, uid, options, callback) {
		Topics.canCustomize(tid, uid, function (err, isOwner) {
			if (isOwner) {
				if(options.headerImage !== '')
				{
					var actSize = 0;
					request.get(options.headerImage, {}, function(err, res, body){
						//console.log(res.headers['content-type']);
						//console.log(body.length);
						var cType = res.headers['content-type'];
						if( cType.indexOf("image") > -1 && body.length <= MAX_SIZE && actSize <= MAX_SIZE )
						{	// Chequea el tamano y si es una imagen
							// si todo es correcto, elimina caracteres malos y guarda
							options.headerImage = sanitize(options.headerImage);
							options.brandColor = sanitize(options.brandColor);
							db.setObject('tid:' + tid + ':customization', options, callback);
						}
						else
						{
							callback("invalidImage");
						}
					}).on("data", function(data){
						actSize += data.length;
						if(actSize > MAX_SIZE)
						{	//console.log("MAX_SIZE ABORT!");
							this.abort();
							callback("maxSizeExceded");
						}
					});
				}
				else
				{
					db.setObject('tid:' + tid + ':customization', options, callback);
				}
			} else {
				callback(err);
			}
		});
	};

	/**
	 * Devuelve las opciones de personalización de un hilo concreto
	 */
	Topics.getCustomization = function (tid, callback) {
		db.getObject('tid:' + tid + ':customization', callback);
	};

	/**
	 * Comprueba si un usuario tiene permisos para personalizar el hilo: es el creador o es administrador
	 */
	Topics.canCustomize = function (tid, uid, callback) {
		User.isAdministrator(uid, function (err, isAdministrator) {
			db.getSetMembers('topic:' + tid + ':tags', function(err,tags){
				Topics.isOwner(tid, uid, function(err, isOwner){
					var allowedTagsToCustomize = ["plataforma"];
					if ((isAdministrator || isOwner) && isAllowedTag(tags, allowedTagsToCustomize)) {
						callback(null, true);
					} else {
						callback(null, false);
					}
				});
			});
		});
	};

	function isAllowedTag(tags, allowedTagsToCustomize)
	{
		for(var i=0;i<tags.length;i++)
		{
			if(allowedTagsToCustomize.indexOf(tags[i]) > -1)
				return true;
		}
		return false;
	}

	/* Mismos métodos pero llamados por socket.io */
	
	Socket.getCustomization = function (socket, data, callback) {
		Topics.getCustomization(data.tid, callback);
	};

	Socket.saveCustomization = function (socket, data, callback) {
		Topics.saveCustomization(data.tid, socket.uid, data.options, callback);
	};

	Socket.canCustomize = function (socket, data, callback) {
		Topics.canCustomize(data.tid, socket.uid, callback);
	};

	Socket.saveUserCustomization = function (socket, data, callback) {
		User.setUserField(socket.uid, "userCustomization", data.options, callback);
	};

	Socket.getUserCustomization = function (socket, data, callback) {
		User.getUserField(socket.uid, "userCustomization", callback);
	};


	// Funciones auxiliares
	function sanitize(val) {
		return val && val.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
	}

	module.exports = plugin;

}(module));