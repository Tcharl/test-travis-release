import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager, JhiAlertService, JhiDataUtils } from 'ng-jhipster';

import { FieldTestEntity } from './field-test-entity.model';
import { FieldTestEntityService } from './field-test-entity.service';
import { Principal, ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-field-test-entity',
    templateUrl: './field-test-entity.component.html'
})
export class FieldTestEntityComponent implements OnInit, OnDestroy {
fieldTestEntities: FieldTestEntity[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private fieldTestEntityService: FieldTestEntityService,
        private jhiAlertService: JhiAlertService,
        private dataUtils: JhiDataUtils,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.fieldTestEntityService.query().subscribe(
            (res: ResponseWrapper) => {
                this.fieldTestEntities = res.json;
            },
            (res: ResponseWrapper) => this.onError(res.json)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInFieldTestEntities();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: FieldTestEntity) {
        return item.id;
    }

    byteSize(field) {
        return this.dataUtils.byteSize(field);
    }

    openFile(contentType, field) {
        return this.dataUtils.openFile(contentType, field);
    }
    registerChangeInFieldTestEntities() {
        this.eventSubscriber = this.eventManager.subscribe('fieldTestEntityListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
