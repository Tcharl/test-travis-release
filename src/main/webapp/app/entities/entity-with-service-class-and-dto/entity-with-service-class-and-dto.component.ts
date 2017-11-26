import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager, JhiParseLinks, JhiAlertService } from 'ng-jhipster';

import { EntityWithServiceClassAndDTO } from './entity-with-service-class-and-dto.model';
import { EntityWithServiceClassAndDTOService } from './entity-with-service-class-and-dto.service';
import { ITEMS_PER_PAGE, Principal, ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-entity-with-service-class-and-dto',
    templateUrl: './entity-with-service-class-and-dto.component.html'
})
export class EntityWithServiceClassAndDTOComponent implements OnInit, OnDestroy {
entityWithServiceClassAndDTOS: EntityWithServiceClassAndDTO[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private entityWithServiceClassAndDTOService: EntityWithServiceClassAndDTOService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.entityWithServiceClassAndDTOService.query().subscribe(
            (res: ResponseWrapper) => {
                this.entityWithServiceClassAndDTOS = res.json;
            },
            (res: ResponseWrapper) => this.onError(res.json)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInEntityWithServiceClassAndDTOS();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: EntityWithServiceClassAndDTO) {
        return item.id;
    }
    registerChangeInEntityWithServiceClassAndDTOS() {
        this.eventSubscriber = this.eventManager.subscribe('entityWithServiceClassAndDTOListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
