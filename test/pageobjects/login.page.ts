import Page from './page.js';

class LoginPage extends Page {
    // Locators
    get inputUsername() { return $('~test-Username'); }
    get inputPassword() { return $('~test-Password'); }
    get btnLogin() { return $('~test-LOGIN'); }
    get txtErrorMessage() { return $('~test-Error message'); }

    // Actions
    async login(username: string, password: string): Promise<void> {
        await this.waitForDisplayed(this.inputUsername);
        await this.inputUsername.setValue(username);
        await this.inputPassword.setValue(password);
        await this.btnLogin.click();
    }

    async getErrorMessage(): Promise<string> {
        await this.waitForDisplayed(this.txtErrorMessage);
        return await this.txtErrorMessage.getText();
    }
}

export default new LoginPage();