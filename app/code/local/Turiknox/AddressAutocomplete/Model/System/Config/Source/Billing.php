<?php
/*
 * Turiknox_AddressAutocomplete

 * @category   Turiknox
 * @package    Turiknox_AddressAutocomplete
 * @copyright  Copyright (c) 2017 Turiknox
 * @license    https://github.com/Turiknox/magento-address-autocomplete/blob/master/LICENSE.md
 * @version    1.0.0
 */
class Turiknox_AddressAutocomplete_Model_System_Config_Source_Billing
{
    /**
     * Return list of potential billing
     * address fields to use for autocomplete
     * @return array
     */
    public function toOptionArray()
    {
        return array(
            array('value' => 'billing:street1', 'label' => Mage::helper('core')->__('Billing Street Line 1')),
            array('value' => 'billing:street2', 'label' => Mage::helper('core')->__('Billing Street Line 2')),
            array('value' => 'billing:city', 'label' => Mage::helper('core')->__('Billing City')),
            array('value' => 'billing:postcode', 'label' => Mage::helper('core')->__('Billing Postcode')),
        );
    }
}