import { Page, Locator, expect } from '@playwright/test';

export class EmployeeFormPage {
  readonly page: Page;
  readonly heading: Locator;
  readonly firstNameInput: Locator;
  readonly lastNameInput: Locator;
  readonly phoneInput: Locator;
  readonly emailInput: Locator;
  readonly positionSelect: Locator;
  readonly submitButton: Locator;
  readonly errorMessage: Locator;

  constructor(page: Page) {
    this.page = page;
    this.heading = page.locator('h2');
    this.firstNameInput = page.locator('input[name="firstName"]');
    this.lastNameInput = page.locator('input[name="lastName"]');
    this.phoneInput = page.locator('input[name="phone"]');
    this.emailInput = page.locator('input[name="email"]');
    this.positionSelect = page.locator('select[name="position"]');
    this.submitButton = page.locator('form').getByRole('button');
    this.errorMessage = page.locator('.alert-danger');
  }

  async goto() {
    await this.page.goto('/create'); // adjust to your actual create route
  }

  async fillForm(data: {
    firstName: string;
    lastName: string;
    phone: string;
    email: string;
    position: string;
  }) {
    await this.firstNameInput.fill(data.firstName);
    await this.lastNameInput.fill(data.lastName);
    await this.phoneInput.fill(data.phone);
    await this.emailInput.fill(data.email);
    await this.positionSelect.selectOption(data.position);
  }

  async submit() {
    await this.submitButton.click();
  }
}
