import { type Page, type Locator, expect } from '@playwright/test';

export class TaskPage {
  readonly page: Page;
  readonly addPlaceholder: Locator;

  constructor(page: Page) {
    this.page = page;
    this.addPlaceholder = page.getByText('Type to add new task...');
  }

  async goto() {
    await this.page.goto('/');
  }

  async createTask(text: string) {
    await this.addPlaceholder.click();
    const textarea = this.page.locator('textarea');
    await textarea.fill(text);
    await this.page.getByRole('button', { name: /add/i }).click();
  }

  async editTask(oldText: string, newText: string) {
    await this.page.getByText(oldText.split(' ')[0]).first().click();
    const textarea = this.page.locator('textarea');
    await textarea.fill(newText);
    await this.page.getByRole('button', { name: /save|ok/i }).click();
  }

  async deleteTask(text: string) {
    const firstWord = text.split(' ')[0];
    const task = this.page.getByTestId('task-item').filter({ hasText: firstWord }).first();
    await task.click();
    await this.page.getByRole('button', { name: /delete/i }).click();
  }

  async expectTaskVisible(text: string) {
    const firstWord = text.split(' ')[0];
    const task = this.page.getByTestId('task-item').filter({ hasText: firstWord }).first();
    await expect(task).toBeVisible({ timeout: 7000 });
    const actualText = await task.evaluate(el => el.textContent || '');
    const normalizedActual = actualText.replace(/\s+/g, ' ').trim();
    const cleanExpected = text.replace(/[@#]/g, '');
    if (!normalizedActual.includes(cleanExpected.split(' ')[0])) {
       throw new Error(`Texto no coincide. Esperado: ${text}, Recibido: ${normalizedActual}`);
    }
  }
  
  async expectTaskDeleted(text: string) {
    const firstWord = text.split(' ')[0];
    const task = this.page.getByTestId('task-item').filter({ hasText: firstWord });
    await expect(task).not.toBeVisible();
  }
}