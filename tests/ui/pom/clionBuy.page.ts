// tests/ui/buy/pages/clion.buy.page.ts
import { expect, Locator } from '@playwright/test';
import { BaseBuyPage } from './baseBuy.page';
import { products } from '../data/products';

export class ClionBuyPage extends BaseBuyPage {

  protected cardRoots(): Locator {
    return this.page.locator('div[data-test*="non-commercial-product-buy-card"]:visible');
  }

  async goto() {
    await super.goto(products.clion);
    await expect(this.title).toBeVisible();
  }
}
