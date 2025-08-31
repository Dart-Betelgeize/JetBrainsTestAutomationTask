import { expect, Locator, Page } from '@playwright/test';
import { BaseBuyPage } from './baseBuy.page';
import { products } from '../data/products';

export class IdeaBuyPage extends BaseBuyPage {

  readonly forOrganizationsToggle: Locator;
  readonly forIndividualUseToogle: Locator;
  readonly specialCategoriesToogle: Locator;

  constructor(page: Page) { 
    super(page);
    this.forOrganizationsToggle = page.getByRole('button', { name: /for organizations/i });
    this.forIndividualUseToogle  = page.getByRole('button', { name: /for individual use/i });
    this.specialCategoriesToogle  = page.getByRole('button', { name: /special categories/i });
  }
  
  protected cardRoots(): Locator {
    return this.page.locator('[data-test^="product-card-"]:has([data-test="product-name"]):visible');
  }

  async goto() {
    await super.goto(products.idea);
    await expect(this.title).toBeVisible();
  }

  async clickUsageToggle(name: string): Promise<void> {
    switch (name) {
      case 'For Organizations':
        await this.forOrganizationsToggle.click();
        return;
      case 'For Individual Use':
        await this.forIndividualUseToogle.click();
        return;
      case 'Special Categories':
        await this.specialCategoriesToogle.click();
        return;
      default:
        throw new Error(`Unsupported toggle: ${name}`);
    } 
  }
}
