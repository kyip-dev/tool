(function() {
	function QRFormViewModel() {
		var self = this;
		self.qrData = ko.observable();
		self.correctLevel = ko.observable('1');
		self.generateQr = function() {
			$('#panel-qr').empty().qrcode({text: self.qrData(), correctLevel: parseInt(self.correctLevel())});
		};
	}

	var qrFormVM = new QRFormViewModel();
	ko.applyBindings(qrFormVM, document.getElementById('form-qr'));
})();