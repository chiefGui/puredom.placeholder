puredom.addNodeSelectionPlugin('placeholder', 
	'placeholder' in document.createElement('input')
	? function() {
		this.attr('placeholder', this.attr('data-placeholder'));
	}
	: function() {
		if (this.attr('data-placeholder-active')!=='1') {
			this.attr('data-placeholder-active', '1');
			this.on('focus', function() {
				var me = puredom(this);
				if (me.value()===me.attr('data-placeholder')) {
					me.declassify('placeHolderContent').value('', {fireChange:false});
				}
			});
			this.on('blur,change', function() {
				var me = puredom(this);
				setTimeout(function() {
					var val = me.value();
					if (!val || val.length<1) {
						me.classify('placeHolderContent').value(me.attr('data-placeholder'), {fireChange:false});
					}
					else {
						me.declassify('placeHolderContent');
					}
					me = null;
				}, 10);
			});
			this.fireEvent('change');
		}
		return this;
	}
);