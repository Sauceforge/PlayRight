import { test, expect } from '@playwright/test';
import GuineaPigPage from '../pages/GuineaPigPage';

test.describe('Sauce Labs Guinea Pig page', () => {
        test('loads, asserts content, fills form, and navigates via link', async ({ page }) => {
                const gp = new GuineaPigPage(page);

                // Navigate and basic smoke check
                await gp.goto();
                await expect(gp.somePageContent).toBeVisible();
                await expect(gp.someDiv).toBeVisible();

                // Repeated text should appear 3 times
                await expect(gp.repeatedTextAll).toHaveCount(3);
                expect(await gp.repeatedTextCount()).toBe(3);

                // Invisible text exists but should not be visible
                await expect(gp.invisibleText).toBeHidden();
                expect(await gp.isInvisibleTextVisible()).toBeFalsy();

                // Client-time / UA block present and UA is non-empty
                expect(await gp.clientTimePresent()).toBeTruthy();
                const ua = await gp.readUserAgent();
                expect(ua).not.toEqual('');

                // Fill form
                await gp.fillEmail('andrew@example.com');
                await gp.fillComments('This page object works great!');
                await expect(gp.emailInput).toHaveValue('andrew@example.com');
                await expect(gp.commentsTextarea).toHaveValue('This page object works great!');

                // Click link and verify navigation
                await gp.clickExampleLink();
                await expect(page).toHaveURL(/guinea-pig2?/); // robust to guinea-pig2 or guinea-pig2.html
        });
});
