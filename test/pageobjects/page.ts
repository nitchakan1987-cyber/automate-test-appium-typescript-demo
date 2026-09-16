export default class Page {
    /**
     * รอให้ Element แสดงผลบนหน้าจอ
     */
    async waitForDisplayed(element: ChainablePromiseElement): Promise<void> {
        await element.waitForDisplayed({ timeout: 10000 });
    }
    
    async waitForText(
        element: ChainablePromiseElement, 
        expectedText?: string, 
        timeout = 5000
    ): Promise<string> {
        // 1. รอให้ Element ปรากฏบน DOM ก่อน
        await element.waitForDisplayed({ timeout });

        // 2. ใช้ waitUntil รอจนกว่า Text จะเป็นไปตามเงื่อนไข
        await driver.waitUntil(
            async () => {
                const text = await element.getText();
                if (expectedText !== undefined) {
                    return text.trim() === expectedText.trim();
                }
                return text.trim() !== ''; // กรณีไม่ระบุ expectedText แค่รอให้ข้อความไม่ว่าง
            },
            {
                timeout,
                timeoutMsg: expectedText 
                    ? `Element text was not "${expectedText}" after ${timeout}ms`
                    : `Element text was empty after ${timeout}ms`
            }
        );

        return await element.getText();
    }
    async waitUntilCondition(
        condition: () => Promise<boolean>, 
        errorMessage = 'Condition not met within time', 
        timeout = 5000
    ): Promise<void> {
        await driver.waitUntil(condition, {
            timeout,
            timeoutMsg: errorMessage
        });
    }
}
