<?php
/*
 * Turiknox_AddressAutocomplete

 * @category   Turiknox
 * @package    Turiknox_AddressAutocomplete
 * @copyright  Copyright (c) 2017 Turiknox
 * @license    https://github.com/Turiknox/magento-address-autocomplete/blob/master/LICENSE.md
 * @version    1.0.0
 */
class Turiknox_AddressAutocomplete_Block_Js extends Mage_Core_Block_Template
{
    /**
     * Get the Google Places API Key
     * @return mixed
     */
    public function getApiKey()
    {
        return Mage::getStoreConfig('autocomplete/general/key');
    }

    /**
     * Check if the Autocomplete feature has been enabled in admin
     * @return bool
     */
    public function isEnabled()
    {
        if ($this->helper('turiknox_addressautocomplete')->isModuleEnabledInAdmin()) {
            return true;
        }
        return false;
    }

    /**
     * Check if autocomplete is enabled for shipping address
     * @return mixed
     */
    public function isShippingAddressEnabled()
    {
        return Mage::getStoreConfigFlag('autocomplete/usage/shipping');
    }


    /**
     * Get billing address autocomplete field
     * @return mixed
     */
    public function getBillingAddressField()
    {
        return Mage::getStoreConfig('autocomplete/usage/billing_field');
    }


    /**
     * @return mixed
     */
    public function getShippingAddressField()
    {
        return Mage::getStoreConfig('autocomplete/usage/shipping_field');
    }

    /**
     * @return mixed
     */
    public function getAutocompletePlaceholderText()
    {
        return Mage::getStoreConfig('autocomplete/usage/placeholder');
    }

    public function getCountriesAsAdmin2()
    {
        return explode(',', Mage::getStoreConfig('autocomplete/usage/countries_as_admin2'));
    }
}