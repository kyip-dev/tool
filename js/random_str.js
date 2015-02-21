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