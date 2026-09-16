import Page from './page.js';

class InventoryPage extends Page {
    // Locators
    get txtProductsTitle() { return $('//android.widget.TextView[@text="PRODUCTS"]'); }

    // Actions
    async isLoaded(): Promise<boolean> {
        await this.waitForDisplayed(this.txtProductsTitle);
        return await this.txtProductsTitle.isDisplayed();
    }
}

export default new InventoryPage();