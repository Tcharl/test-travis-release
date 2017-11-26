import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager, JhiParseLinks, JhiAlertService } from 'ng-jhipster';

import { EntityWithServiceImplAndDTO } from './entity-with-service-impl-and-dto.model';
import { EntityWithServiceImplAndDTOService } from './entity-with-service-impl-and-dto.service';
import { ITEMS_PER_PAGE, Principal, ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-entity-with-service-impl-and-dto',
    templateUrl: './entity-with-service-impl-and-dto.component.html'
})
export class EntityWithServiceImplAndDTOComponent implements OnInit, OnDestroy {
entityWithServiceImplAndDTOS: EntityWithServiceImplAndDTO[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private entityWithServiceImplAndDTOService: EntityWithServiceImplAndDTOService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.entityWithServiceImplAndDTOService.query().subscribe(
            (res: ResponseWrapper) => {
                this.entityWithServiceImplAndDTOS = res.json;
            },
            (res: ResponseWrapper) => this.onError(res.json)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInEntityWithServiceImplAndDTOS();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: EntityWithServiceImplAndDTO) {
        return item.id;
    }
    registerChangeInEntityWithServiceImplAndDTOS() {
        this.eventSubscriber = this.eventManager.subscribe('entityWithServiceImplAndDTOListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
