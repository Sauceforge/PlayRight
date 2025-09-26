import { chromium, Page, BrowserContext } from "@playwright/test";

export class PlaywrightUtil {
  public static async chromiumContext() {
    //Use for tests involving multiple pages.
    //Use context to create pages as required
    const browser = await chromium.launch();
    return await browser.newContext({ ignoreHTTPSErrors: true });
  }

  public static async chromiumPage() {
    //Use for tests involving a single page
    const chromiumContext = await this.chromiumContext();
    return await chromiumContext.newPage();
  }

  public static async createNewPageInSameContext(page: Page) {
    const context: BrowserContext = page.context();
    return await context.newPage();
  }
}
