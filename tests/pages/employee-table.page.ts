import { Page, Locator, expect } from '@playwright/test';

export class EmployeeTablePage {
  readonly page: Page;
  readonly heading: Locator;
  readonly successMessage: Locator;
  readonly employeeFormNavLink: Locator;

  constructor(page: Page) {
    this.page = page;
    this.heading = page.getByRole('heading', { name: 'Employees' });
    this.successMessage = page.locator('.alert-success');
    this.employeeFormNavLink = page.getByRole('link', {
      name: 'Employee Form',
    });
  }

  async goto() {
    await this.page.goto('/');
  }

  async navigateToEmployeeForm() {
    await this.employeeFormNavLink.click();
  }

  row(matchText: string): Locator {
    return this.page.locator('tr', { hasText: matchText });
  }

  async editEmployee(matchText: string) {
    await this.row(matchText).getByRole('button', { name: 'Edit' }).click();
  }

  async deleteEmployee(matchText: string) {
    await this.row(matchText).getByRole('button', { name: 'Delete' }).click();
  }

  async expectSuccessMessage(text: string) {
    await expect(this.successMessage).toBeVisible();
    await expect(this.successMessage).toHaveText(text);
  }

  async expectRowVisible(matchText: string) {
    await expect(this.row(matchText)).toBeVisible();
  }

  async expectRowNotVisible(matchText: string) {
    await expect(this.row(matchText)).not.toBeVisible();
  }
}
