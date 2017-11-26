import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager, JhiParseLinks, JhiAlertService } from 'ng-jhipster';

import { EntityWithDTO } from './entity-with-dto.model';
import { EntityWithDTOService } from './entity-with-dto.service';
import { ITEMS_PER_PAGE, Principal, ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-entity-with-dto',
    templateUrl: './entity-with-dto.component.html'
})
export class EntityWithDTOComponent implements OnInit, OnDestroy {
entityWithDTOS: EntityWithDTO[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private entityWithDTOService: EntityWithDTOService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.entityWithDTOService.query().subscribe(
            (res: ResponseWrapper) => {
                this.entityWithDTOS = res.json;
            },
            (res: ResponseWrapper) => this.onError(res.json)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInEntityWithDTOS();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: EntityWithDTO) {
        return item.id;
    }
    registerChangeInEntityWithDTOS() {
        this.eventSubscriber = this.eventManager.subscribe('entityWithDTOListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
