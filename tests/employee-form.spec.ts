// tests/employee-form.spec.ts
import { test, expect } from '@playwright/test';
import { EmployeeTablePage } from './pages/employee-table.page';
import { EmployeeFormPage } from './pages/employee-form.page';

test.describe('Employee Form', () => {
  test.beforeEach(async ({ page }) => {
    const tablePage = new EmployeeTablePage(page);
    tablePage.goto();
  });

  test('should display the navigation', async ({ page }) => {
    await expect(page.getByRole('navigation')).toBeVisible();
  });

  test('should submit a new employee', async ({ page }) => {
    const tablePage = new EmployeeTablePage(page);
    const formPage = new EmployeeFormPage(page);

    await tablePage.navigateToEmployeeForm();
    await formPage.fillForm({
      firstName: 'Jane',
      lastName: 'Doe',
      phone: '123-456-7890',
      email: 'jane.doe@example.com',
      position: 'Developer',
    });
    await formPage.submit();
    await expect(
      page.getByText('Employee created successfully!'),
    ).toBeVisible();
  });

  test('should edit an existing employee', async ({ page }) => {
    const tablePage = new EmployeeTablePage(page);
    const formPage = new EmployeeFormPage(page);

    await tablePage.expectRowVisible('jane.doe@example.com');

    await tablePage.editEmployee('jane.doe@example.com');
    await expect(page).toHaveURL(/\/edit\/\d+/);

    await formPage.fillForm({
      firstName: 'UpdatedFirstName',
      lastName: 'UpdatedLastName',
      phone: '555-000-1234',
      email: 'updated@email.com',
      position: 'Manager',
    });
    await formPage.submit();

    await expect(page).toHaveURL('/');
    await tablePage.expectSuccessMessage('Employee updated successfully!');
    await tablePage.expectRowVisible('updated@email.com');
  });

  test('should delete an existing employee', async ({ page }) => {
    const tablePage = new EmployeeTablePage(page);
    const formPage = new EmployeeFormPage(page);

    await tablePage.expectRowVisible('updated@email.com');
    await tablePage.deleteEmployee('updated@email.com');
    await tablePage.expectRowNotVisible('updated@email.com');
    await tablePage.expectSuccessMessage('Employee deleted successfully!');
  });
});
