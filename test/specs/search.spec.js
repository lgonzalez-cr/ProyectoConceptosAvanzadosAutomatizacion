const SearchPage = require('../pageobjects/search.page');
const assert = require('assert');

describe('SearchPage - ElementsInteractionTests', () => {

    beforeEach(async () => {
        await SearchPage.open();
    })

    it('should change the url when the different medical areas are selected', async () => {
        await (await SearchPage.btnPhysicalMedicalArea).click();
        await expect(browser).toHaveUrlContaining(SearchPage.physicalMedicalAreaUrl);
        await (await SearchPage.btnLanguageMedicalArea).click();
        await expect(browser).toHaveUrlContaining(SearchPage.languageMedicalAreaUrl);
        await (await SearchPage.btnOcupationalMedicalArea).click();
        await expect(browser).toHaveUrlContaining(SearchPage.ocupationalMedicalAreaUrl);
    });

    it('should reload the page when results are not found by search', async () => {
        await SearchPage.performSearch(SearchPage.searchNoResults);
        await expect(await SearchPage.noResultsElement).toBeDisplayed();
        await assert.ok(await (await SearchPage.noResultsElement).getText() === SearchPage.noResultsText);
    });

    it('should make the map disappear when the list/map button is clicked', async () => {
        await (await SearchPage.btnList).click();
        await expect(await SearchPage.sidebar).not.toBeDisplayed();
        await (await SearchPage.btnMap).click();
        await expect(await SearchPage.sidebar).toBeDisplayed();
    });
});


describe('SearchPage - WebServiceTests', () => {
    beforeEach(async () => {
        await SearchPage.open();
    })

    it('should call the web service when view profile is clicked', async () => {
        const oneSecondWaitTime = 1000;
        const expectedResponseCode = 200;
        const requestedMethodType = 'GET';
        const expectedUrlCalled = 'https://javito-prod.herokuapp.com/v1/specialist/bfea3295-af20-4824-8bed-170a227bc1e6';

        browser.setupInterceptor();
        await (await SearchPage.viewFullProfileLink).click();
        await browser.pause(oneSecondWaitTime);

        await expect(await SearchPage.sidebar).toBeDisplayed();
        await expect(await SearchPage.profileDetails).toBeDisplayed();
        await expect(await SearchPage.navBarForProfileName).toBeDisplayed();
        
        await browser.expectRequest(requestedMethodType, expectedUrlCalled, expectedResponseCode);
        await browser.assertExpectedRequestsOnly(true);
    });
});

