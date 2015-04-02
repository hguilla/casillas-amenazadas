angular.module('AmenazasApp')
.controller('TableroCtrl', [function () {
	var self = this,
		CABALLO = '♞',
		REINA   = '♛',
		EMPTY   = '';

	self.checkAmenazas = function() {
		var columnas,
			fila,
			filas;
		self.clearAmenazas();
		filas = self.tablero.length;
		columnas = self.tablero[0].length;
		for (fila in self.tablero) {
			if (! self.tablero.hasOwnProperty(fila)) { continue };
			fila = parseInt(fila);
			for (columna in self.tablero[fila]) {
				if (! self.tablero[fila].hasOwnProperty(columna)) { continue };
				columna = parseInt(columna);
				if (self.tablero[fila][columna] === EMPTY) {
					continue;
				} else {
					self.checkAmenaza(fila, columna);
				}
			}
		}
	};
	self.checkAmenaza = function(fila, columna) {
		if (self.tablero[fila][columna] === CABALLO) {
			self.checkAmenazaDelCaballo(fila, columna);
		} else {
			self.checkAmenazaDeLaReina(fila, columna);
		}
	};
	self.checkAmenazaDelCaballo = function(fila, columna) {
		var size_tablero = self.size_tablero;
		if (fila - 2 >= 0) {
			if (columna - 1 >= 0) {
				self.setAmenazada(fila-2, columna-1);
			}
			if (columna + 1 < size_tablero) {
				self.setAmenazada(fila-2, columna+1);
			}
		}
		if (fila + 2 < size_tablero) {
			if (columna - 1 >= 0) {
				self.setAmenazada(fila+2, columna-1);
			}
			if (columna + 1 < size_tablero) {
				self.setAmenazada(fila+2, columna+1);
			}
		}
		if (columna - 2 >= 0) {
			if (fila - 1 >= 0) {
				self.setAmenazada(fila-1, columna-2);
			}
			if (fila + 1 < size_tablero) {
				self.setAmenazada(fila+1, columna-2);
			}
		}
		if (columna + 2 < size_tablero) {
			if (fila - 1 >= 0) {
				self.setAmenazada(fila-1, columna+2);
			}
			if (fila + 1 < size_tablero) {
				self.setAmenazada(fila+1, columna+2);
			}
		}
	};
	self.checkAmenazaDeLaReina = function(fila, columna) {
		var i,
			j,
			size_tablero = self.size_tablero;
		for (i = 1; i < size_tablero; i++) {
			self.setAmenazada(
				(fila + i) % size_tablero,
				columna
			);
			self.setAmenazada(
				fila,
				(columna + i) % size_tablero
			);
			if ((fila + i < size_tablero) && (columna + i < size_tablero)) {
				self.setAmenazada(fila+i, columna+i);
			}
			if ((fila + i < size_tablero) && (columna - i >= 0)) {
				self.setAmenazada(fila+i, columna-i);
			}
			if ((fila - i >= 0) && (columna + i < size_tablero)) {
				self.setAmenazada(fila-i, columna+i);
			}
			if ((fila - i >= 0) && (columna - i >= 0)) {
				self.setAmenazada(fila-i, columna-i);
			}
		};
	};
	self.clearAmenazas = function() {
		for (f in self.tablero) {
			if (! self.tablero.hasOwnProperty(f)) {
				continue;
			}
			f = parseInt(f);
			fila = self.tablero[f];
			for (c in fila) {
				if (! fila.hasOwnProperty(c)) {
					continue;
				}
				c = parseInt(c);
				self.unsetAmenzada(f, c);
			}
		}
	};
	self.createTablero = function() {
		var c,
			f,
			s = self.size_tablero,
			tablero = [];
		self.clearAmenazas();
		for (f = 0; f < s; f++) {
			tablero[f] = [];
			for (c = 0; c < s; c++) {
				tablero[f][c] = EMPTY;
			};
		}
		self.tablero = tablero;
		$('.tablero').height(s * 50);
		$('.tablero').width(s * 50);
		$('.controles').width(s * 50);
	};
	self.getCasilla = function(f, c) {
		var fila, casilla;
		fila = $('.fila')[f];
		return $(fila).find('.casilla')[c];
	};
	self.init = function() {
		self.available_sizes = [3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
		self.size_tablero = self.available_sizes[5];
		self.createTablero();
		self.pieza_actual = CABALLO;
	};
	self.setAmenazada = function(f, c) {
		$(self.getCasilla(f, c)).addClass('amenazada');
	};
	self.toggleCasilla =function(fila, casilla, index) {
		console.log(casilla);
		if (casilla !== self.pieza_actual) {
			fila[index] = self.pieza_actual;
		} else {
			fila[index] = EMPTY;
		}
		self.checkAmenazas();
	};
	self.togglePieza = function() {
		if (self.pieza_actual === CABALLO) {
			self.pieza_actual = REINA;
		} else {
			self.pieza_actual = CABALLO;
		}
	};
	self.unsetAmenzada = function(fila, columna) {
		$(self.getCasilla(f, c)).removeClass('amenazada')
	};

	self.init();
	window.onload = self.checkAmenazas;
}])