class HomePage {
    get btnSearch () { return $('.btn_search') }
    get inputSearchBar () { return $('#search-input') }
    get btnPhysicalMedicalArea() { return $('#ocupational') }
    get divOverlay() { return $('.overlay') }
    get inputSearchBarDivParent() { return $('.input-group') }
    get firstTherapistName() { return $('[class=strip_list] h3') }
    
    get homeUrl() {return 'https://terapeutica.digital/#/'}
    get searchText() {return 'Maria'}
    get searchUrlQueryForSearchText() {return `q=${this.searchText}`}
    get planceHolderForSelectedMedicalArea() {return '¿Buscas a alguien o algo en específico?'}

    async performSearch(textToSearch){
        await (await this.inputSearchBar).setValue(textToSearch);
        await (await this.btnSearch).click();
    }

     async open() {
        return await browser.url('/');
    }
}

module.exports = new HomePage();
