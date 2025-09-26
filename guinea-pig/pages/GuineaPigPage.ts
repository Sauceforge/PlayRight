import { Page, Locator, expect } from '@playwright/test';
import { Constants } from "../../util";

export default class GuineaPigPage {
        readonly page: Page;

        // Headings / static text
        readonly title: Locator;
        readonly somePageContent: Locator;
        readonly someDiv: Locator;

        // Link that navigates to the second page
        readonly exampleLink: Locator;

        // Repeated text appears 3 times
        readonly repeatedTextAll: Locator;

        // Invisible text (present in DOM but not visible)
        readonly invisibleText: Locator;

        // “Your comments” area
        readonly yourCommentsLabel: Locator;
        readonly emailInput: Locator;
        readonly commentsTextarea: Locator;

        // Client info
        readonly clientTimeLabel: Locator;
        readonly userAgentText: Locator;

        constructor(page: Page) {
                this.page = page;

                // Top text blocks
                this.title = page.getByRole(Constants.Roles.Heading, { level: 1, name: /Selenium sandbox/i });

                // Use regex to allow trailing/leading whitespace or nested nodes
                this.somePageContent = page.getByText(Constants.Texts.IAmSomePageContent);
                this.someDiv = page.locator(Constants.LocatorIds.IAmAnId);

                this.repeatedTextAll = page.locator(Constants.LocatorIds.Appear3Times);

                this.invisibleText = page.getByText(Constants.Texts.IAmInvisible);

                // Labels can stay as-is, but also regex-ify if flaky in your env:
                this.emailInput = page.getByLabel(Constants.Labels.Email);
                this.commentsTextarea = page.getByLabel(Constants.Labels.Comments);

                // The example link on the page
                this.exampleLink = page.getByRole(Constants.Roles.Link, { name: 'i am a link' });
                // Comment area (labels are visible text on the page)
                this.yourCommentsLabel = page.getByText(Constants.Texts.YourComments, { exact: false });
                // Client diagnostics
                this.clientTimeLabel = page.getByText(Constants.Texts.ClientTime, { exact: false });
                // The UA string is printed right after the “Client time:” block; we can read the whole body text if needed.
                this.userAgentText = page.locator(Constants.LocatorIds.Body); // filter in helpers below
        }

        // --------- Actions ---------

        async goto() {
                await this.page.goto(Constants.GuineaPigPageUrl());
                await expect(this.title).toBeVisible();
        }

        async clickExampleLink() {
                await this.exampleLink.click();
        }

        async fillEmail(email: string) {
                await this.emailInput.fill(email);
        }

        async fillComments(text: string) {
                await this.commentsTextarea.fill(text);
        }

        // --------- Assertions / Queries ---------

        /** Returns how many times the “i appear 3 times” text is present (should be 3). */
        async repeatedTextCount(): Promise<number> {
                return this.repeatedTextAll.count();
        }

        /** True if the invisible text is currently visible (normally false). */
        async isInvisibleTextVisible(): Promise<boolean> {
                return this.invisibleText.isVisible();
        }

        /** Grabs the “Client time:” line’s text (useful for simple assertions). */
        async clientTimePresent(): Promise<boolean> {
                return this.clientTimeLabel.isVisible();
        }

        /** Extracts the visible user agent text from the page body. */
        async readUserAgent(): Promise<string> {
                const full = await this.userAgentText.innerText();
                // The UA string is the last line on the page.
                const lines = full.split('\n').map(l => l.trim()).filter(Boolean);
                return lines[lines.length - 1] ?? '';
        }
}
