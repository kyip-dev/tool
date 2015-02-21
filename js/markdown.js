(function() {
	function MarkdownFormViewModel() {
		var self = this;
		self.markdown = ko.observable();
		self.html = ko.observable();
		self.generate = function() {
			var content = self.markdown();
			var html = markdown.toHTML(content);
			self.html(html);
		};
	}

	var formVM = new MarkdownFormViewModel();
	ko.applyBindings(formVM, document.getElementById('form-markdown'));
})();