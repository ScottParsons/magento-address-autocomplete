# Turiknox Address Autocomplete

## Overview

A Magento module that uses the Google Places API to populate the address fields on the checkout.

## Requirements

Magento 1.8.x, 1.9.x

## Features

- Ability to choose which billing address field (Street Line 1, Street Line 2, City, Postcode) should use the autocomplete functionality
- Ability to enable/disable the autocomplete functionality for the shipping address step
- Ability to choose which shipping address field (Street Line 1, Street Line 2, City, Postcode) should use the autocomplete functionality, if the above feature is enabled
- Ability to change the default 'Enter a location' placeholder text
- Ability to choose the countries from a multiselect, whose 'region' should be configured using Google's 'administrative_area_level_2' component
- Support for third party checkout extensions

## Installation

Prior to installing the module, ensure that compilation is disabled.

System -> Tools -> Compilation

Copy the contents into your Magento project directory and refresh the cache.

## Usage

Enable the address autocomplete functionality, add in your Google API key and configure above features within System -> Configuration -> Turiknox -> Address Autocomplete
