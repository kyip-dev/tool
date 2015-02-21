(function() {
	function Base64FormViewModel() {
		var self = this;
		self.input = ko.observable();
		self.output = ko.observable();
		self.encode = function() {
			var input = self.input();
			var output = btoa(input);
			self.output(output);
		};
		self.decode = function() {
			var input = self.input();
			var output = atob(input);
			self.output(output);
		};
	}

	var formVM = new Base64FormViewModel();
	ko.applyBindings(formVM, document.getElementById('form-base64'));
})();