import {SportsPage} from "../pages/sportsPage";

const sportsPage = new SportsPage();
describe('Verify Betting Slip', () => {

    beforeEach(() => {
        cy.visit('/sports');
        sportsPage.verifyFootballSectionIsSelected()
        sportsPage.selectAllDaysInACalendar();
        sportsPage.verifySportsTitleIsDisplayed();
    })

    it('should display the same odd as the one user selected', () => {
        sportsPage.verifyEmptyBetSlipContainerIsDisplayed();
        sportsPage.selectOddForEventInList(1, 1);
        sportsPage.verifyBettingSlipCoefficientEqualsAddedTipCoefficient(1)
        sportsPage.removeBetSlipEvent(1);
    })

    it('should not display the betting slip container when slip is cleared out', () => {
        sportsPage.verifyEmptyBetSlipContainerIsDisplayed();
        sportsPage.selectOddForEventInList(1, 1);
        sportsPage.verifyBettingSlipCoefficientEqualsAddedTipCoefficient(1);
        sportsPage.clickToClearBettingSlip();
        sportsPage.verifyBetSlipContainerIsNotDisplayed()
    })

    it('should not display the betting slip container by its default on Sports page', () => {
        sportsPage.verifyEmptyBetSlipContainerIsDisplayed();
    })

    it('should allow user to clear a specific betting event', () => {
        sportsPage.verifyEmptyBetSlipContainerIsDisplayed();
        sportsPage.selectOddForEventInList(1, 1);
        sportsPage.verifyBettingSlipCoefficientEqualsAddedTipCoefficient(1);
        sportsPage.removeBetSlipEvent(1);
        sportsPage.verifyBetSlipContainerIsNotDisplayed()
    })

    it('should allow user to add multiple betting events', () => {
        sportsPage.selectOddForEventInList(1, 1);
        sportsPage.verifyBettingSlipCoefficientEqualsAddedTipCoefficient(1);
        sportsPage.selectOddForEventInList(2, 2);
        sportsPage.verifyBettingSlipCoefficientEqualsAddedTipCoefficient(2);
    })

    it('should allow user to change a tip for the same betting event', () => {
        sportsPage.selectOddForEventInList(1, 1);
        sportsPage.verifyBettingSlipCoefficientEqualsAddedTipCoefficient(1);
        sportsPage.selectOddForEventInList(1, 2);
        sportsPage.verifyBettingSlipCoefficientEqualsAddedTipCoefficient(1);
    })

    it('should allow user to change the stake and see correct potential payout', () => {
        let stake = 5;
        sportsPage.selectOddForEventInList(1, 1);
        sportsPage.verifyBettingSlipCoefficientEqualsAddedTipCoefficient(1);
        sportsPage.enterStakeValue(stake);
        cy.wait(500);
        cy.get('@marketOdd').then((marketOdd) => {
            let expectedWinning = (marketOdd * stake).toFixed(2);
            sportsPage.possiblePayout().should('be.visible').invoke('text').then((text) => {
                const possiblePayout = parseFloat(text.trim()).toFixed(2);
                expect(possiblePayout).to.be.eq(expectedWinning);
            })
        })
    })
})
