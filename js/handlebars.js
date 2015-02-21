(function() {
	function HandlebarsFormViewModel() {
		var self = this;
		self.template = ko.observable();
		self.context = ko.observable();
		self.output = ko.observable();
		self.generate = function() {
			var templateHtml = self.template();
			var template = Handlebars.compile(templateHtml);
			var contextJson = self.context();
			var context = JSON.parse(contextJson);
			var output = template(context);
			self.output(output);
		};
	}

	var formVM = new HandlebarsFormViewModel();
	ko.applyBindings(formVM, document.getElementById('form-handlebars'));
})();