import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager, JhiAlertService, JhiDataUtils } from 'ng-jhipster';

import { BankAccount } from './bank-account.model';
import { BankAccountService } from './bank-account.service';
import { Principal, ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-bank-account',
    templateUrl: './bank-account.component.html'
})
export class BankAccountComponent implements OnInit, OnDestroy {
bankAccounts: BankAccount[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private bankAccountService: BankAccountService,
        private jhiAlertService: JhiAlertService,
        private dataUtils: JhiDataUtils,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.bankAccountService.query().subscribe(
            (res: ResponseWrapper) => {
                this.bankAccounts = res.json;
            },
            (res: ResponseWrapper) => this.onError(res.json)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInBankAccounts();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: BankAccount) {
        return item.id;
    }

    byteSize(field) {
        return this.dataUtils.byteSize(field);
    }

    openFile(contentType, field) {
        return this.dataUtils.openFile(contentType, field);
    }
    registerChangeInBankAccounts() {
        this.eventSubscriber = this.eventManager.subscribe('bankAccountListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
