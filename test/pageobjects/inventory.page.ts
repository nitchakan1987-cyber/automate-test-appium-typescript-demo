import Page from './page.js';

const SELECTORS = {
    PRODUCTS: '//android.widget.TextView[@text="PRODUCTS"]',
    CHECKOUT:'~test-CHECKOUT'
};
class InventoryPage extends Page {
    get txtProductsTitle() { return $(SELECTORS.PRODUCTS); }
    get btnCheckout() { return $(SELECTORS.CHECKOUT); }

    // Actions
    async isLoaded(): Promise<boolean> {
        await this.waitForDisplayed(this.txtProductsTitle);
        return await this.txtProductsTitle.isDisplayed();
    }
  
    async clickCheckoutButton(): Promise<void> {
        const btnCheckout = this.btnCheckout;
        await this.waitUntilCondition(
            async () => await btnCheckout.isEnabled(),
            'Checkout button was still disabled after 5s',
            5000
        );

        await btnCheckout.click();
    }
}

export default new InventoryPage();