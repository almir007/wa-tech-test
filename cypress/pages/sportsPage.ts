import 'cypress-real-events';

export class SportsPage {

    sportsSectionButton() {
        return cy.get('#navSport');
    }

    clearBettingSlip() {
        return cy.get('.wtickettype-clear');
    }

    sidebarSport() {
        return cy.get("[class='sport-sidebar__list-item sport-sidebar__list-item--active']");
    }

    betSlipContainer() {
        return cy.get('.wticket');
    }

    bettingTipOdd(tipOdd: number) {
        return cy.get("[class*='sport-bet__odd activ']").eq(tipOdd - 1);
    }

    bettingSlipCoefficient(eventInList: number) {
        return cy.get('.wticketevent__currentOdd').eq(eventInList - 1);
    }

    sportsCalendarIcon() {
        return cy.get("[class='sports__last-minute__calendar__text']");
    }

    calendarTimeSelection() {
        return cy.get("[class='wtag__text']");
    }


    emptyBetSlipContainer() {
        return cy.get('.ticket-empty');
    }

    sportsTitle() {
        return cy.get("[class='sportheader__title']");
    }

    betSlipEvent(betSlipEvent: number) {
        return cy.get("[class='wticketevent']").eq(betSlipEvent - 1);
    }

    clearBetSlipEvent() {
        return cy.get("[class='ico-clear-16   ']");
    }

    bettingEvent(eventInList: number) {
        return cy.get("[class='live-match__hov single-match__prematch']").eq(eventInList - 1);
    }

    stakeField() {
        return cy.get('input.wstake__input');
    }

    possiblePayout() {
        return cy.get("[class='wpossiblepayout__payout']");
    }

    clickSportsSectionButton() {
        this.sportsSectionButton().should('be.visible').click();
    }

    verifyFootballSectionIsSelected() {
        this.sidebarSport().should('be.visible').should('contain', 'Soccer');
    }

    verifyBetSlipContainerIsNotDisplayed() {
        this.betSlipContainer().should('not.exist');
    }

    verifySportsTitleIsDisplayed() {
        this.sportsTitle().should('be.visible');
    }

    verifyEmptyBetSlipContainerIsDisplayed() {
        this.emptyBetSlipContainer().should('be.visible');
    }

    clickToClearBettingSlip() {
        this.clearBettingSlip().should('be.visible').click();
    }

    selectAllDaysInACalendar() {
        this.sportsCalendarIcon().should('be.visible').click();
        this.calendarTimeSelection().contains('All days').should('be.visible').click();
    }

    verifyBettingSlipCoefficientEqualsAddedTipCoefficient(eventInList: number) {
        this.bettingSlipCoefficient(eventInList).should('be.visible').invoke('text').then((text) => {
            const bettingSlipCoefficient = parseFloat(text.trim());
            cy.get('@marketOdd').then((marketOdd) => {
                expect(bettingSlipCoefficient).to.be.eq(marketOdd);
            })
        })
    }

    removeBetSlipEvent(betSlipEvent: number) {
        //hover is required to make the clear/x button visible
        this.betSlipEvent(betSlipEvent).realHover();
        this.clearBetSlipEvent().should('be.visible').click();
    }

    selectOddForEventInList(eventInList: number, tipOdd: number) {
        this.bettingEvent(eventInList).should('be.visible').within(() => {
            this.bettingTipOdd(tipOdd).invoke('text').then((text) => {
                const marketOdd = parseFloat(text.trim());
                cy.wrap(marketOdd).as('marketOdd');
            })
        })
        this.bettingEvent(eventInList).should('be.visible').within(() => {
            this.bettingTipOdd(tipOdd).should('be.visible').click();
        })
    }

    enterStakeValue(stake: number) {
        this.stakeField().should('be.visible').clear().realType(stake.toString());
    }
}