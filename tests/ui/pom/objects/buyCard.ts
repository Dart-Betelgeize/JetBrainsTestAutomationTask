import { Locator } from '@playwright/test';

export class BuyCard {
  readonly productName: Locator;
  readonly actionButton: Locator;
  readonly price: Locator;
  readonly description: Locator;
  readonly getQuote: Locator;
  readonly learnMore: Locator;

  constructor(private readonly card: Locator) {
    this.productName  = this.card.locator('h3[data-test="product-name"]');
    this.actionButton = this.card.locator('a[type="button"]');
    this.price        = this.card.locator('[data-test="product-price"]').first();
    this.description  = this.card.locator('div[data-test="product-description"]');
    this.getQuote  = this.card.getByRole('link', { name: 'Get quote' });
    this.learnMore  = this.card.getByRole('link', { name: 'Learn more' });
  }

  async productNameText(): Promise<string> {
    return (await this.productName.innerText()).trim();
  }
}
