import Page from './page.js';

const SELECTORS = {
    USERNAME_INPUT: '~test-Username',
    PASSWORD_INPUT: '~test-Password',
    LOGIN_BUTTON: '~test-LOGIN',
    ERROR_MESSAGE: '//android.view.ViewGroup[@content-desc="test-Error message"]//android.widget.TextView'
};

class LoginPage extends Page {
  
    get inputUsername() { return $(SELECTORS.USERNAME_INPUT); }
    get inputPassword() { return $(SELECTORS.PASSWORD_INPUT); }
    get btnLogin() { return $(SELECTORS.LOGIN_BUTTON); }

   
    get txtErrorMessage() { 
        return $(SELECTORS.ERROR_MESSAGE); 
    }
   
    async login(username: string, password: string): Promise<void> {
        await this.waitForDisplayed(this.inputUsername);
        await this.inputUsername.setValue(username);
        await this.inputPassword.setValue(password);
        await this.btnLogin.click();
    }

    async getErrorMessage(): Promise<string> {
        await this.waitForDisplayed(this.txtErrorMessage);
        await driver.waitUntil(
            async () => (await this.txtErrorMessage.getText()).trim() !== '',
            { timeout: 5000 }
        );
        return await this.txtErrorMessage.getText();
    }
}

export default new LoginPage();