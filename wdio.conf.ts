import path from 'path';

export const config: WebdriverIO.Config = {
    runner: 'local',
    port: 4723,
    specs: ['./test/specs/**/*.ts'],
    maxInstances: 1,
    capabilities: [{
        platformName: 'Android',
        'appium:deviceName': 'Android Emulator',
        'appium:automationName': 'UiAutomator2',
        'appium:app': path.join(process.cwd(), './apps/Android.SauceLabs.Mobile.Sample.app.2.7.1.apk'),
        'appium:appWaitActivity': 'com.swaglabsmobileapp.MainActivity',
        'appium:autoGrantPermissions': true
    }],
    logLevel: 'info',
    framework: 'mocha',
    reporters: ['spec'],
    mochaOpts: {
        ui: 'bdd',
        timeout: 60000
    }
};