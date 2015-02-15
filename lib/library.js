(function (module) {
	"use strict";

	var plugin = {};

	var Topics = module.parent.require('./topics'),
		User = module.parent.require('./user'),
		Socket = module.parent.require('./socket.io/topics'),
		db = module.parent.require('./database');

	/**
	 * Asigna las opciones de personalización a un hilo, siempre y cuando tenga permisos para hacerlo
	 */
	Topics.saveCustomization = function (tid, uid, options, callback) {
		Topics.canCustomize(tid, uid, function (err, isOwner) {
			if (isOwner) {
				db.setObject('tid:' + tid + ':customization', options, callback);
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
			if (isAdministrator) {
				callback(null, true);
			} else {
				Topics.isOwner(tid, uid, callback);
			}
		});
	};

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

	module.exports = plugin;

}(module));