import { Locator } from '@playwright/test';

export class SpecialCategory {
  readonly title: Locator;
  readonly description: Locator;
  readonly learnMoreButton: Locator;

  constructor(private readonly card: Locator) {
    this.title  = this.card.locator('h3'); //need more reliable locator
    this.description = this.card.locator('p[1]'); //need more reliable locator
    this.learnMoreButton = this.card.getByRole('link', { name: 'Learn more' });
  }
}
