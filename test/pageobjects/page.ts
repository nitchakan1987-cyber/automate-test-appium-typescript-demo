export default class Page {
    /**
     * รอให้ Element แสดงผลบนหน้าจอ
     */
    async waitForDisplayed(element: ChainablePromiseElement): Promise<void> {
        await element.waitForDisplayed({ timeout: 10000 });
    }
}