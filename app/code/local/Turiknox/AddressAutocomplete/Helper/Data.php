<?php
/*
 * Turiknox_AddressAutocomplete

 * @category   Turiknox
 * @package    Turiknox_AddressAutocomplete
 * @copyright  Copyright (c) 2017 Turiknox
 * @license    https://github.com/Turiknox/magento-address-autocomplete/blob/master/LICENSE.md
 * @version    1.0.0
 */
class Turiknox_AddressAutocomplete_Helper_Data extends Mage_Core_Helper_Abstract
{
    /**
     * Check module has been enabled in the admin
     * @return bool
     */
    public function isModuleEnabledInAdmin()
    {
        return Mage::getStoreConfigFlag('autocomplete/general/enable');
    }
}