import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager, JhiParseLinks, JhiAlertService } from 'ng-jhipster';

import { EntityWithServiceImpl } from './entity-with-service-impl.model';
import { EntityWithServiceImplService } from './entity-with-service-impl.service';
import { ITEMS_PER_PAGE, Principal, ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-entity-with-service-impl',
    templateUrl: './entity-with-service-impl.component.html'
})
export class EntityWithServiceImplComponent implements OnInit, OnDestroy {
entityWithServiceImpls: EntityWithServiceImpl[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private entityWithServiceImplService: EntityWithServiceImplService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.entityWithServiceImplService.query().subscribe(
            (res: ResponseWrapper) => {
                this.entityWithServiceImpls = res.json;
            },
            (res: ResponseWrapper) => this.onError(res.json)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInEntityWithServiceImpls();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: EntityWithServiceImpl) {
        return item.id;
    }
    registerChangeInEntityWithServiceImpls() {
        this.eventSubscriber = this.eventManager.subscribe('entityWithServiceImplListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
