const assert = require('../../helpers/assert');
const send = require('../../helpers/send');
const get = require('../../helpers/get');


When('I open the modal properties list component', /** @this CustomWorld */ async function () {
    await browser.get(`${ baseUrl }/#/properties/${ this.platformBuilder.applicationName }?platform=${ this.platformBuilder.platformName }`);
    await send.clickById('e2e-show-dialog-properties-list-button');
});

When('I click on the switch that display only properties with an empty final value', /** @this CustomWorld */ async function () {
    await send.clickById('e2e-switch-only-properties-with-blank-final-values');
});

When('I click on the field filter properties by key to input key filter {string}', /** @this CustomWorld */ async function (keyFilter) {
    await send.inputByCss('#e2e-filter-properties-by-key', keyFilter);
    await browser.waitForAngular();
});

Then('the modal properties list component is successfull displayed', async function () {
    await assert.checkElementDisplayed('md-dialog');
});

Then('only the properties with empty finalValue are displayed', async function () {
    await assert.itemsHasNotBlankFinalValues(await get.elementsByCss('.property-line'));
});

Then('only the properties that match the key filter are displayed', async function () {
    await assert.itemsFiltered(await get.elementsByCss('.property-line'));
});
