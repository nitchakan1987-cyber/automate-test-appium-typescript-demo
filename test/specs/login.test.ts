import LoginPage from '../pageobjects/login.page.js';
import InventoryPage from '../pageobjects/inventory.page.js';

describe('Swag Labs Mobile - Authentication Tests', () => {

    it('Should fail to login with invalid credentials', async () => {
        await LoginPage.login('invalid_user', 'invalid_pass');
        
        const errorText = await LoginPage.getErrorMessage();
        await expect(errorText).toContain('Username and password do not match');
    });

    it('Should login successfully with valid credentials', async () => {
        await LoginPage.login('standard_user', 'secret_sauce');
        
        const isInventoryDisplayed = await InventoryPage.isLoaded();
        await expect(isInventoryDisplayed).toBe(true);
    });

});