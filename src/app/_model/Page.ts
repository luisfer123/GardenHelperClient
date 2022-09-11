export class Page {
    size: number = 0;
    totalElements: number = 0;
    totalPages: number = 0;
    number: number = 0;

    static fromData(page: Page): Page {
        const newPage: Page = new Page();

        newPage.size = page.size;
        newPage.totalElements = page.totalElements;
        newPage.totalPages = page.totalPages;
        newPage.number = page.number;

        return newPage;
    }
}