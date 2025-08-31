import { expect, Locator, Page } from '@playwright/test';
import { BuyCard } from './objects/buyCard';

export abstract class BaseBuyPage {
  readonly title: Locator;
  readonly subscriptionTitle: Locator;
  readonly monthlyToggle: Locator;
  readonly yearlyToggle: Locator;
  readonly acceptAllCookie: Locator;
  readonly switcher: Locator;

  constructor(protected readonly page: Page) {
    this.title = page.locator('span[data-test="menu-second-title-box-title"]');
    this.subscriptionTitle = page.locator('h1');
    this.switcher = page.locator('span[data-test="adaptive-switcher"]');
    this.monthlyToggle = this.switcher.getByRole('button', { name: /monthly billing/i });
    this.yearlyToggle  = this.switcher.getByRole('button', { name: /yearly billing/i });
    this.acceptAllCookie = page.getByRole('button', { name: /accept all/i }); //temporary located here
  }

  protected abstract cardRoots(): Locator;

  async goto(product: { url: string }) {
    await this.page.goto(product.url, { waitUntil: 'domcontentloaded' });
    await expect(this.title).toBeVisible();
  }

  async getAllCards(): Promise<BuyCard[]> {
    const roots = this.cardRoots();
    const count = await roots.count();
    return Array.from({ length: count }, (_, i) => new BuyCard(roots.nth(i)));
  }

  async getCardByName(name: string): Promise<BuyCard | null> {
    const cards = await this.getAllCards();
    const names = await Promise.all(cards.map(c => c.productNameText()));
    const idx = names.findIndex(n => this.matches(n, name));
    return idx >= 0 ? cards[idx] : null;
  }

  private matches(value: string, query: string): boolean {
    const norm = (s: string) => s.trim().toLowerCase().replace(/\s+/g, ' ');
    return norm(value).includes(norm(query));
  }

  async clickPeriodToggle(period: string): Promise<void> {
    const target = (period === 'Monthly Billing' ? this.monthlyToggle : this.yearlyToggle);

    // skip if already selected
    const before = (await target.getAttribute('class')) ?? '';
    if (before.includes('_selected_')) return;

    await target.click();

    // wait until selected class appears
    await expect.poll(async () => {
      const cls = (await target.getAttribute('class')) ?? '';
      return cls.includes('_selected_');
    }).toBeTruthy();
  }
}
