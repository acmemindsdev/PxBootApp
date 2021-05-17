const sleep = duration =>
  new Promise(resolve => setTimeout(() => resolve(), duration));

describe('Example', () => {
  beforeAll(async () => {
    await device.launchApp();
  });

  beforeEach(async () => {
    await device.reloadReactNative();
  });

  // Test Login Button Enable/Disable state
  it('TestID_01: Verify Login Button state', async () => {
    // const data = TestData.login.test_01
    await waitFor(element(by.id('UserNameInputID')))
      .toBeVisible()
      .withTimeout(20000);

    await expect(element(by.id('UserNameInputID'))).toBeVisible();
    await expect(element(by.id('PasswordInputID'))).toBeVisible();
    // await expect(element(by.id(ID.Login_ForgotButtonID))).toBeVisible();

    // Check login button is enable or disable
    // Login button should be false
    // await expect(element(by.id(ID.Login_LoginButtonDisabelID))).toBeVisible();
    // await expect(element(by.id(ID.Login_LoginButtonEnableID))).toBeNotVisible();

    // Enter invalid user id
    await element(by.id('UserNameInputID')).typeText('8410534306');

    // Enter Password
    await element(by.id('PasswordInputID')).typeText('Test@12345');

    // await sleep(3000);

    // Button Should be disable
    // await expect(element(by.id(ID.Login_LoginButtonDisabelID))).toBeVisible();
    // await expect(element(by.id(ID.Login_LoginButtonEnableID))).toBeNotVisible();

    // Clear Entry
    // await element(by.id(ID.Login_UserNameInputID)).clearText();
    // await element(by.id(ID.Login_PasswordInputID)).clearText();

    // Button Should be disable
    // await expect(element(by.id(ID.Login_LoginButtonDisabelID))).toBeVisible();
    // await expect(element(by.id(ID.Login_LoginButtonEnableID))).toBeNotVisible();

    // // Enter valid user id
    // await element(by.id(ID.Login_UserNameInputID)).typeText(data.validEmail);

    // // Enter Password
    // await element(by.id(ID.Login_PasswordInputID)).typeText(data.password);

    // await sleep(3000);

    // // Button Should be enable
    // await expect(element(by.id(ID.Login_LoginButtonEnableID))).toBeVisible();
    // await expect(element(by.id(ID.Login_LoginButtonDisabelID))).toBeNotVisible();

    // // Clear Entry
    // await element(by.id(ID.Login_UserNameInputID)).clearText();

    // // Button Should be disable
    // await expect(element(by.id(ID.Login_LoginButtonDisabelID))).toBeVisible();
    // await expect(element(by.id(ID.Login_LoginButtonEnableID))).toBeNotVisible();

    // await sleep(3000);

    // // Enter valid user id
    // await element(by.id(ID.Login_UserNameInputID)).typeText(data.validEmail);

    // // Button Should be enable
    // await expect(element(by.id(ID.Login_LoginButtonEnableID))).toBeVisible();
    // await expect(element(by.id(ID.Login_LoginButtonDisabelID))).toBeNotVisible();

    await sleep(3000);
  });

  // it('should show hello screen after tap', async () => {
  //   await element(by.id('hello_button')).tap();
  //   await expect(element(by.text('Hello!!!'))).toBeVisible();
  // });

  // it('should show world screen after tap', async () => {
  //   await element(by.id('world_button')).tap();
  //   await expect(element(by.text('World!!!'))).toBeVisible();
  // });
});
