(function() {
	function HashFormViewModel() {
		var self = this;
		self.hashData = ko.observable();
		self.hashAlgorithm = ko.observable('SHA256');
		self.hash = ko.observable();

		self.generateHash = function() {
			var data = self.hashData();
			var algorithm = self.hashAlgorithm();
			var hash;
			if ('MD5' === algorithm) {
				hash = CryptoJS.MD5(data);
			} else if ('SHA1' === algorithm) {
				hash = CryptoJS.SHA1(data);
			} else if ('SHA256' === algorithm) {
				hash = CryptoJS.SHA256(data);
			} else if ('SHA512' === algorithm) {
				hash = CryptoJS.SHA512(data);
			} else if ('SHA3' === algorithm) {
				hash = CryptoJS.SHA3(data);
			}
			self.hash(hash);
		};
	}

	var formVM = new HashFormViewModel();
	ko.applyBindings(formVM, document.getElementById('form-hash'));
})();