import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { EntityWithServiceClass } from './entity-with-service-class.model';
import { EntityWithServiceClassService } from './entity-with-service-class.service';
import { Principal, ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-entity-with-service-class',
    templateUrl: './entity-with-service-class.component.html'
})
export class EntityWithServiceClassComponent implements OnInit, OnDestroy {
entityWithServiceClasses: EntityWithServiceClass[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private entityWithServiceClassService: EntityWithServiceClassService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.entityWithServiceClassService.query().subscribe(
            (res: ResponseWrapper) => {
                this.entityWithServiceClasses = res.json;
            },
            (res: ResponseWrapper) => this.onError(res.json)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInEntityWithServiceClasses();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: EntityWithServiceClass) {
        return item.id;
    }
    registerChangeInEntityWithServiceClasses() {
        this.eventSubscriber = this.eventManager.subscribe('entityWithServiceClassListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
