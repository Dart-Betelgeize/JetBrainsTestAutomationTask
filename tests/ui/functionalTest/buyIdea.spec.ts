import { test, expect } from '../fixtures/pages';

test.describe('Buy Idea tests', () => {

    const toogleCases = [
        { usage: 'For Organizations' as const,     period: 'Yearly Billing'  as const },
        { usage: 'For Organizations' as const,     period: 'Monthly Billing' as const },
        { usage: 'For Individual Use' as const,   period: 'Yearly Billing'  as const },
        { usage: 'For Individual Use' as const,   period: 'Monthly Billing' as const },
    ];

    test('Verify Idea Buy page default content', async ({ ideaBuyPage }) => {

        await expect(ideaBuyPage.title).toContainText('IntelliJ IDEA');
        
        await expect(ideaBuyPage.subscriptionTitle).toContainText('Subscription Options and Pricing');

        //Check toogles are presented
        await expect(ideaBuyPage.monthlyToggle).toBeVisible();
        await expect(ideaBuyPage.yearlyToggle).toBeVisible();
        await expect(ideaBuyPage.yearlyToggle).toHaveClass(/_selected_/);

        await expect(ideaBuyPage.forOrganizationsToggle).toBeVisible();
        await expect(ideaBuyPage.forIndividualUseToogle).toBeVisible();
        await expect(ideaBuyPage.specialCategoriesToogle).toBeVisible();
        await expect(ideaBuyPage.forOrganizationsToggle).toHaveClass(/_selected_/);

        //Check product cards are presented
        const productNames = ['IntelliJ IDEA Ultimate', 'All Products Pack'];
        for (const name of productNames) {
            const card = await ideaBuyPage.getCardByName(name);
            expect(card, `Expected to find a card containing "${name}"`).not.toBeNull();
        }

        // I woudld check there also:
        // - information message text displayed bellow the cards 
        // - Further information section
        // - We are always ready to help section
        // Skipped for now because all these elements don't have reliable locators
    });

    for (const { usage, period } of toogleCases) {
        test(`Verify All Products Pack card content — usage=${usage}, period=${period}`, async ({ ideaBuyPage }) => {

            await ideaBuyPage.clickUsageToggle(usage);
            await ideaBuyPage.clickPeriodToggle(period);

            const card = await ideaBuyPage.getCardByName('All Products Pack');
            expect(card, 'Expected "All Products Pack" card to be present and visible').not.toBeNull();

            await expect(card!.actionButton).toBeVisible();
            await expect(card!.actionButton).toHaveAttribute('href', /shop\/buy\?item=/);

            // Description: assert key parts (exact text is brittle due to <a> and NBSPs)
            await expect(card!.description).toBeVisible();
            await expect(card!.description).toContainText('Unlock the full suite!'); // prefix
            await expect(card!.description).toContainText(/11\s*IDEs/i);
            await expect(card!.description).toContainText(/JetBrains AI Assistant/i);

            await expect(card!.getQuote).toBeVisible();
            await expect(card!.getQuote).toHaveAttribute('href', /shop\/quote\?item=/);

            await expect(card!.price).toBeVisible();
            //I would check there the price as well but it requires some data source to compare the price
        });

        //I decided to create a separate test for this card because I assume that products list doesn't change a lot
        //But I need more insider information to select a better approach
        test(`Verify IntelliJ IDEA Ultimate card content — usage=${usage}, period=${period}`, async ({ ideaBuyPage }) => {

            await ideaBuyPage.clickUsageToggle(usage);
            await ideaBuyPage.clickPeriodToggle(period);

            const card = await ideaBuyPage.getCardByName('IntelliJ IDEA Ultimate');
            expect(card, 'Expected "IntelliJ IDEA Ultimate" card to be present and visible').not.toBeNull();

            await expect(card!.actionButton).toBeVisible();
            await expect(card!.actionButton).toHaveAttribute('href', /shop\/buy\?item=/);

            await expect(card!.description).toBeVisible();
            await expect(card!.description).toContainText('The Leading IDE for Professional Development in Java and Kotlin. AI Free is included.');

            await expect(card!.getQuote).toBeVisible();
            await expect(card!.getQuote).toHaveAttribute('href', /shop\/quote\?item=/);

            await expect(card!.price).toBeVisible();
            //I would check there the price as well but it requires some data source to compare the price
        });
    }

    test(`Verify page content with Special Categories toogle option selected`, async ({ ideaBuyPage }) => {

        await ideaBuyPage.clickUsageToggle('Special Categories');

        await expect(ideaBuyPage.monthlyToggle).not.toBeVisible();
        await expect(ideaBuyPage.yearlyToggle).not.toBeVisible();

        //Here I would like to check special categories title and texts
        //But there are no releable locators at all for these elements - no even some more or less unique class name
    });

    for (const usage of ['For Organizations', 'For Individual Use'] as const) {

        test(`Verify All Products Pack price changes when switching period — usage=${usage}`, async ({ ideaBuyPage }) => {
            await ideaBuyPage.clickUsageToggle(usage);

            const card = await ideaBuyPage.getCardByName('All Products Pack');
            expect(card).not.toBeNull();

            await ideaBuyPage.clickPeriodToggle('Monthly Billing');
            const monthly = await card!.price.innerText();

            await ideaBuyPage.clickPeriodToggle('Yearly Billing');
            await expect(card!.price).not.toHaveText(monthly, { timeout: 7000 });
        });
    }

    test(`Verify All Products Pack: "Learn more" navigates to /all/`, async ({ ideaBuyPage, page }) => {
        const card = await ideaBuyPage.getCardByName('All Products Pack');
        expect(card, 'Expected "All Products Pack" card to be present').not.toBeNull();

        await expect(card!.learnMore).toHaveAttribute('href', /\/all\/?$/);

        await Promise.all([
            page.waitForURL(/\/all\/?$/),
            card!.learnMore.click(),
        ]);

        await expect(page).toHaveURL(/\/all\/?$/);
    });

    test('Verify All Products Pack: "Get quote" navigates to /shop', async ({ ideaBuyPage, page }) => {
        const card = await ideaBuyPage.getCardByName('All Products Pack');
        expect(card, 'Expected "All Products Pack" card to be present').not.toBeNull();

        await expect(card!.getQuote).toHaveAttribute('href', /shop\/quote\?item=.*ALL/i);

        await Promise.all([
            page.waitForURL(/\/shop\//),
            card!.getQuote.click(),
        ]);

        await expect(page).toHaveURL(/\/shop\//);
    });

    test('Verify IntelliJ IDEA Ultimate: "Get quote" navigates to /shop', async ({ ideaBuyPage, page }) => {
        const card = await ideaBuyPage.getCardByName('IntelliJ IDEA Ultimate');
        expect(card, 'Expected "IntelliJ IDEA Ultimate" card to be present').not.toBeNull();

        await expect(card!.getQuote).toHaveAttribute('href', /shop\/quote\?item=.*II/i);

        await Promise.all([
            page.waitForURL(/\/shop\//),
            card!.getQuote.click(),
        ]);

        await expect(page).toHaveURL(/\/shop\//);
    });

    //More tests

    //Verify Check IntelliJ IDEA header content
    // Pricing button should be selected, Whats New and Resources are displayed and have correct links, Features dropdon content is correct

    //Verify Download button --> navigated to download page

    //Verify Check new pracing information on cards
    //Once click to new pricing --> expand a information about new price, data is correct according to the data source

    //Verify IntelliJ IDEA Ultimate Supercharge check box behavior
    //Once selected price should be updated, data is correct if compare with data source

    //Verify currency based on browser data

});
