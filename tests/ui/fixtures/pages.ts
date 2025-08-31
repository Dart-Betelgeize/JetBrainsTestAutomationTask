import { test as base } from '@playwright/test';
import { IdeaBuyPage } from '../pom/ideaBuy.page';

type Fixtures = {
  ideaBuyPage: IdeaBuyPage;
};

export const test = base.extend<Fixtures>({
  ideaBuyPage: async ({ page }, use) => {
    const idea = new IdeaBuyPage(page);
    await idea.goto();
    await idea.acceptAllCookie.click();
    await use(idea);
  },
});

export const expect = test.expect;