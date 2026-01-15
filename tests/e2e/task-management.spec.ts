import { test } from '@playwright/test';
import { TaskPage } from './pages/TaskPage';

test.describe('Task Management', () => {
  let taskPage: TaskPage;

  test.beforeEach(async ({ page }) => {
    taskPage = new TaskPage(page);
    await taskPage.goto();
  });

  test('user can create and then edit a task with tags', async () => {
    const initialText = 'Fix bug for @client #high-priority';
    const updatedText = 'Fixed bug for @client #done';
    await taskPage.createTask(initialText);
    await taskPage.expectTaskVisible(initialText);
    await taskPage.editTask(initialText, updatedText);
    await taskPage.expectTaskVisible(updatedText);
  });

  test('tasks should persist after page reload', async ({ page }) => {
    const taskText = 'Persistent Task';
    await taskPage.createTask(taskText);    
    await page.reload();    
    await taskPage.expectTaskVisible(taskText);
  });
});