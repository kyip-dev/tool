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
(function() {
	function RandomStringFormViewModel() {
		var upperCaseLetters = 'ABCDEFGHIJKLMNOPQRSTUVWXTZ';
		var lowerCaseLetters = 'abcdefghiklmnopqrstuvwxyz';
		var numbers = '0123456789';
		var specialCharacters = '!"#$%&\'()*+,-./:;<=>?@[\\]^_`{|}~';

		var self = this;
		self.length = ko.observable();
		self.randomstr = ko.observable();
		self.hasUpperCaseLetters = ko.observable(true);
		self.hasLowerCaseLetters = ko.observable(true);
		self.hasNumbers = ko.observable(true);
		self.hasSpecialCharacters = ko.observable(true);

		self.generateRandomString = function() {
			self.randomstr('');

			var chars = '';
			if (self.hasUpperCaseLetters()) {
				chars += upperCaseLetters;
			}
			if (self.hasLowerCaseLetters()) {
				chars += lowerCaseLetters;
			}
			if (self.hasNumbers()) {
				chars += numbers;
			}
			if (self.hasSpecialCharacters()) {
				chars += specialCharacters;
			}

			if (!chars) {
				return;
			}

			var length = self.length();
			self.randomstr('');
			if (length) {
				length = parseInt(length, 10);
				if (isNaN(length)) {
					return;
				} else if (length < 0) {
					return;
				}
				var result = '';
				for (var i=0; i<length; ++i) {
					var index = Math.floor(Math.random() * chars.length);
					result += chars[index];
				}
				self.randomstr(result);
			}
		};
	}

	var formVM = new RandomStringFormViewModel();
	ko.applyBindings(formVM, document.getElementById('form-randomstr'));
})();
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