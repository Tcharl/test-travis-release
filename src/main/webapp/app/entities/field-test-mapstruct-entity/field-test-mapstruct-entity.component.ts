import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager, JhiAlertService, JhiDataUtils } from 'ng-jhipster';

import { FieldTestMapstructEntity } from './field-test-mapstruct-entity.model';
import { FieldTestMapstructEntityService } from './field-test-mapstruct-entity.service';
import { Principal, ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-field-test-mapstruct-entity',
    templateUrl: './field-test-mapstruct-entity.component.html'
})
export class FieldTestMapstructEntityComponent implements OnInit, OnDestroy {
fieldTestMapstructEntities: FieldTestMapstructEntity[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private fieldTestMapstructEntityService: FieldTestMapstructEntityService,
        private jhiAlertService: JhiAlertService,
        private dataUtils: JhiDataUtils,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.fieldTestMapstructEntityService.query().subscribe(
            (res: ResponseWrapper) => {
                this.fieldTestMapstructEntities = res.json;
            },
            (res: ResponseWrapper) => this.onError(res.json)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInFieldTestMapstructEntities();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: FieldTestMapstructEntity) {
        return item.id;
    }

    byteSize(field) {
        return this.dataUtils.byteSize(field);
    }

    openFile(contentType, field) {
        return this.dataUtils.openFile(contentType, field);
    }
    registerChangeInFieldTestMapstructEntities() {
        this.eventSubscriber = this.eventManager.subscribe('fieldTestMapstructEntityListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
