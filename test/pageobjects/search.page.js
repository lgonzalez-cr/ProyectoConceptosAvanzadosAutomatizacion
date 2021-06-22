 class SearchPage {
    get btnPhysicalMedicalArea() { return $('//a[contains(text(),"Física")]') }
    get btnLanguageMedicalArea() { return $('//a[contains(text(),"Lenguaje")]') }
    get btnOcupationalMedicalArea() { return $('//a[contains(text(),"Ocupacional")]') }
    get searchBar() { return $('[class=search_bar_list] input[type=search]') }
    get btnSearch() { return $('[class=search_bar_list] input[type=submit]') }
    get btnList() { return $('//h6[contains(text(), "Mapa")]/..//a[1]') }
    get btnMap() { return $('//h6[contains(text(), "Mapa")]/..//a[2]') }
    get sidebar() { return $('#sidebar') }
    get viewFullProfileLink() { return $('//a[contains(text(), "Ver Perfil Completo")]') }
    get profileDetails() { return $('#section_1') }
    get navBarForProfileName() { return $('#secondary_nav') }
    get noResultsElement() { return $('//main/div/p') }

    get physicalMedicalAreaUrl() {return '=phisical'}
    get languageMedicalAreaUrl() {return '=language'}
    get ocupationalMedicalAreaUrl() {return '=ocupational'}
    get searchText() {return 'Maria'}
    get noResultsText() { return 'No hay resultados para mostrar.' }
    get searchNoResults() {return ' '}

    
    async performSearch(textToSearch){
        await (await this.searchBar).setValue(textToSearch);
        await (await this.btnSearch).click();
    }

     async open() {
        return await browser.url('/#/search');
    }
}

module.exports = new SearchPage();
