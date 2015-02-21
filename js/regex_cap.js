(function() {
	function RegExpCaptureFormViewModel() {
		var self = this;
		self.pattern = ko.observable();
		self.isGlobalMatch = ko.observable(false);
		self.isIgnoreCase = ko.observable(false);
		self.isMultiline = ko.observable(false);
		self.str = ko.observable();
		self.output = ko.observable();
		self.capture = function() {
			var pattern = self.pattern();
			var flags = '';
			if (self.isGlobalMatch()) {
				flags += 'g';
			}
			if (self.isIgnoreCase()) {
				flags += 'i';
			}
			if (self.isMultiline()) {
				flags += 'm';
			}
			var regExp = new RegExp(pattern, flags);
			var str = self.str();

			var matches, output = '', outputs = [];
			if (self.isGlobalMatch()) {
				while ((matches = regExp.exec(str)) !== null) {
					if (matches.length > 1) {
						outputs.push(matches[1]);
					}
				}
				if (outputs.length > 0) {
					output = outputs.join('\n');
				}
			} else {
				matches = regExp.exec(str);
				if (matches.length > 1) {
					output = matches[1];
				}
			}
			self.output(output);
		};
	}

	var formVM = new RegExpCaptureFormViewModel();
	ko.applyBindings(formVM, document.getElementById('form-regexpcap'));
})();