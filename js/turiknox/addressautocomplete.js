/*
 * Turiknox_AddressAutocomplete

 * @category   Turiknox
 * @package    Turiknox_AddressAutocomplete
 * @copyright  Copyright (c) 2017 Turiknox
 * @license    https://github.com/Turiknox/magento-address-autocomplete/blob/master/LICENSE.md
 * @version    1.0.0
 */
var AddressAutocomplete = Class.create({
    initialize: function (element, placeholder, type, countriesAsAdmin2) {
        this.element = $(element);
        if (!(this.element)) {
            console.log('Autocomplete error: No autocomplete element found');
            return;
        }
        this.type = type;
        this.regionUpdater = billingRegionUpdater;
        this.countriesRegionAsAdminArea2 = countriesAsAdmin2;
        this.componentForm = {
            street_number: {
                type: 'short_name',
                target: this.type + ':street1'
            },
            route: {
                type: 'long_name',
                target: this.type + ':street2'
            },
            locality: {
                type: 'long_name',
                target: this.type + ':city'
            },
            region: {
                type: 'long_name',
                target: this.type + ':region'
            },
            administrative_area_level_1: {
                type: 'long_name',
                target: this.type + ':region'
            },
            administrative_area_level_2: {
                type: 'long_name',
                target: this.type + ':region'
            },
            country: {
                type: 'short_name',
                target: this.type + ':country_id'
            },
            postal_code: {
                type: 'short_name',
                target: this.type + ':postcode'
            }
        };


        if (this.type === 'shipping') {
            this.regionUpdater = shippingRegionUpdater;
        }

        if (placeholder !== '') {
            document.getElementById(this.element.id).placeholder = placeholder;
        }

        this.autocomplete = new google.maps.places.Autocomplete((this.element), { types: ['geocode'] });

        google.maps.event.addListener(
            this.autocomplete, 'place_changed', this.fillAddressForm.bind(this)
        );

        this.element.observe('keypress', function (event) {
            if (event.which === 13 || event.keyCode === 13) {
                event.preventDefault();
                this.element.blur();
            }
        });
    },

    /**
     * Fill address form
     */
    fillAddressForm: function() {

        this.resetAddressFields();
        var address = this.getSelectedAddress();

        for (var addressComponent in address) {
            if (this.componentForm[addressComponent]) {
                var element = this.componentForm[addressComponent].target;
                var field = address[addressComponent];

                if (!$(element)) {
                    continue;
                }

                $(element).value = field;

                if (addressComponent === 'country') {
                    this.updateRegion(address, field);
                }
            }
        }

    },

    /**
     * Reset address fields
     */
    resetAddressFields: function() {
        for (var component in this.componentForm) {
            if (this.componentForm[component]) {
                var element = this.componentForm[component].target;
                if ($(element)) {
                    $(element).value = '';
                }
            }
        }
    },

    /**
     * Get selected address
     * @returns {{}}
     */
    getSelectedAddress: function() {
        var address = {},
            place = this.autocomplete.getPlace(),
            components = place.address_components;

        // If user is forcing wrong address, there will be no
        // component data, therefore just return empty object
        if (!components) {
            return address;
        }

        for (var i = 0; i < components.length; i++) {
            var addressType = components[i].types[0];
            if (this.componentForm[addressType]) {
                var displayType = this.componentForm[addressType].type;
                address[addressType] = components[i][displayType];
            }
        }

        if (address['administrative_area_level_1'] || address['administrative_area_level_2']) {
            address['region'] = this.getFormattedRegion(address);
        }

        address = this.formatStreet(address);
        return address;
    },

    /**
     * Format street. Move route component to
     * address line 1 if no street_number component found
     * @param address
     * @returns {*}
     */
    formatStreet: function(address) {
        if (!address['street_number'] && address['route']) {
            address['street_number'] = address['route'];
            delete address['route'];
        }
        return address;
    },

    /**
     * Format region based on region in admin 1
     * or admin 2 component
     * @param address
     * @returns {*}
     */
    getFormattedRegion: function(address) {
        var country = address['country'].toUpperCase(),

        // If region in administrative_area_level_2
        useAdminArea2 = this.countriesRegionAsAdminArea2
                .indexOf(country) >= 0;

        return useAdminArea2
            ? address['administrative_area_level_2']
            : address['administrative_area_level_1'];
    },

    /**
     * Update region either in text or select input
     * @param address
     * @param country
     */
    updateRegion: function(address, country) {
        this.regionUpdater.update();
        var regionTarget = $(this.type + ':region'),
            regionIdTarget = $(this.type + ':region_id');

        // If a region dropdown exists for country
        if (this.regionUpdater.regions[country]) {
            for (var region in this.regionUpdater.regions[country]) {
                if (this.regionUpdater.regions[country][region]['name'] === address['region']
                    || this.regionUpdater.regions[country][region]['code'] === address['region']) {
                    if (regionIdTarget) {
                        regionIdTarget.value = region;
                    }
                }
            }
        } else {
            if (regionTarget && address['region']) {
                regionTarget.value = address['region'];
            }
        }
    }
});