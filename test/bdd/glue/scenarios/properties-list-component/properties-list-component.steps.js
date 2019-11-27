const assert = require('../../helpers/assert');
const send = require('../../helpers/send');

When('I open the modal properties list component', /** @this CustomWorld */ async function () {
    await browser.get(`${ baseUrl }/#/properties/${ this.platformBuilder.applicationName }?platform=${ this.platformBuilder.platformName }`);
    await send.clickById('e2e-show-dialog-properties-list-button');
});

Then('the modal properties list component is successfull displayed', async function () {
    await assert.checkElementDisplayed('md-dialog');
});
