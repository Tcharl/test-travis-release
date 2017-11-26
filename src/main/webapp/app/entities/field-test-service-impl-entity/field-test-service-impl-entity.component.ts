import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager, JhiAlertService, JhiDataUtils } from 'ng-jhipster';

import { FieldTestServiceImplEntity } from './field-test-service-impl-entity.model';
import { FieldTestServiceImplEntityService } from './field-test-service-impl-entity.service';
import { Principal, ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-field-test-service-impl-entity',
    templateUrl: './field-test-service-impl-entity.component.html'
})
export class FieldTestServiceImplEntityComponent implements OnInit, OnDestroy {
fieldTestServiceImplEntities: FieldTestServiceImplEntity[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private fieldTestServiceImplEntityService: FieldTestServiceImplEntityService,
        private jhiAlertService: JhiAlertService,
        private dataUtils: JhiDataUtils,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.fieldTestServiceImplEntityService.query().subscribe(
            (res: ResponseWrapper) => {
                this.fieldTestServiceImplEntities = res.json;
            },
            (res: ResponseWrapper) => this.onError(res.json)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInFieldTestServiceImplEntities();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: FieldTestServiceImplEntity) {
        return item.id;
    }

    byteSize(field) {
        return this.dataUtils.byteSize(field);
    }

    openFile(contentType, field) {
        return this.dataUtils.openFile(contentType, field);
    }
    registerChangeInFieldTestServiceImplEntities() {
        this.eventSubscriber = this.eventManager.subscribe('fieldTestServiceImplEntityListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
