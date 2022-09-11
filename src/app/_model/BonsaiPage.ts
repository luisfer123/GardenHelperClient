import { Bonsai } from "./Bonsai";
import { Page } from "./Page";

export class BonsaiPage {
    _embedded: {bonsaiModelList: Array<Bonsai>} = {bonsaiModelList: new Array<Bonsai>()}
    page: Page = new Page();
    _links: any;

    static fromData(bonsaiPageData: BonsaiPage): BonsaiPage {
        const bonsaiPage: BonsaiPage = new BonsaiPage();

        bonsaiPageData._embedded.bonsaiModelList.forEach(bonsai => 
            bonsaiPage._embedded.bonsaiModelList.push(Bonsai.fromData(bonsai)));
        bonsaiPage._links = bonsaiPageData._links;
        bonsaiPage.page = Page.fromData(bonsaiPageData.page);

        return bonsaiPage;
    }
}