const HomePage = require('../pageobjects/home.page');
const CommonFunctions = require('../pageobjects/common-functions.page');
const assert = require('assert');

describe('HomePage - Search Tests', () => {

    beforeEach(async () => {
        await HomePage.open();
    })

    it('should not redirect when the input search does not have a value', async () => {
        await HomePage.performSearch();
        await expect(browser).toHaveUrl(HomePage.homeUrl);
    });

    it('should not redirect when the input search has null value', async () => {
        await HomePage.performSearch(null);
        await expect(browser).toHaveUrl(HomePage.homeUrl);
    });

    it('should not redirect when the input search has undefined value', async () => {
        await HomePage.performSearch(undefined);
        await expect(browser).toHaveUrl(HomePage.homeUrl);
    });

    it('should not redirect when the input search has blank value', async () => {
        await HomePage.performSearch("");
        await expect(browser).toHaveUrl(HomePage.homeUrl);
    });

    it('should redirect to results page and first result should be Maria', async () => {
        await HomePage.performSearch(HomePage.searchText);
        await (await HomePage.firstTherapistName).waitForDisplayed({ timeout: 5000 });
        const firstSpecialistNameNoAccents = CommonFunctions.removeAccents(await (await HomePage.firstTherapistName).getText());
        await expect(browser).toHaveUrlContaining(HomePage.searchUrlQueryForSearchText);
        await assert.ok(firstSpecialistNameNoAccents.includes(HomePage.searchText));
    });
});


describe('HomePage - Medical Area Interaction Tests', () => {
    beforeEach(async () => {
        await HomePage.open();
    })

    it('input search bar should get the focus when a medical are is selected', async () => {
        const overlayClass = 'overlay-show';
        const focusClass = 'focus-div';
        const placeholderAttrName = 'placeholder';

        await browser.execute("arguments[0].click();", await HomePage.btnPhysicalMedicalArea);
        await expect(await HomePage.divOverlay).toHaveElementClass(overlayClass)
        await expect(await HomePage.inputSearchBarDivParent).toHaveElementClass(focusClass);
        await expect(await HomePage.inputSearchBar).toHaveAttributeContaining(placeholderAttrName, HomePage.planceHolderForSelectedMedicalArea)
    });
})

