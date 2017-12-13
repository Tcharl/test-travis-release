import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager, JhiParseLinks, JhiAlertService } from 'ng-jhipster';

import { EntityWithServiceImplPaginationAndDTO } from './entity-with-service-impl-pagination-and-dto.model';
import { EntityWithServiceImplPaginationAndDTOService } from './entity-with-service-impl-pagination-and-dto.service';
import { ITEMS_PER_PAGE, Principal, ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-entity-with-service-impl-pagination-and-dto',
    templateUrl: './entity-with-service-impl-pagination-and-dto.component.html'
})
export class EntityWithServiceImplPaginationAndDTOComponent implements OnInit, OnDestroy {

currentAccount: any;
    entityWithServiceImplPaginationAndDTOS: EntityWithServiceImplPaginationAndDTO[];
    error: any;
    success: any;
    eventSubscriber: Subscription;
    routeData: any;
    links: any;
    totalItems: any;
    queryCount: any;
    itemsPerPage: any;
    page: any;
    predicate: any;
    previousPage: any;
    reverse: any;

    constructor(
        private entityWithServiceImplPaginationAndDTOService: EntityWithServiceImplPaginationAndDTOService,
        private parseLinks: JhiParseLinks,
        private jhiAlertService: JhiAlertService,
        private principal: Principal,
        private activatedRoute: ActivatedRoute,
        private router: Router,
        private eventManager: JhiEventManager
    ) {
        this.itemsPerPage = ITEMS_PER_PAGE;
        this.routeData = this.activatedRoute.data.subscribe((data) => {
            this.page = data.pagingParams.page;
            this.previousPage = data.pagingParams.page;
            this.reverse = data.pagingParams.ascending;
            this.predicate = data.pagingParams.predicate;
        });
    }

    loadAll() {
        this.entityWithServiceImplPaginationAndDTOService.query({
            page: this.page - 1,
            size: this.itemsPerPage,
            sort: this.sort()}).subscribe(
            (res: ResponseWrapper) => this.onSuccess(res.json, res.headers),
            (res: ResponseWrapper) => this.onError(res.json)
        );
    }
    loadPage(page: number) {
        if (page !== this.previousPage) {
            this.previousPage = page;
            this.transition();
        }
    }
    transition() {
        this.router.navigate(['/entity-with-service-impl-pagination-and-dto'], {queryParams:
            {
                page: this.page,
                size: this.itemsPerPage,
                sort: this.predicate + ',' + (this.reverse ? 'asc' : 'desc')
            }
        });
        this.loadAll();
    }

    clear() {
        this.page = 0;
        this.router.navigate(['/entity-with-service-impl-pagination-and-dto', {
            page: this.page,
            sort: this.predicate + ',' + (this.reverse ? 'asc' : 'desc')
        }]);
        this.loadAll();
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInEntityWithServiceImplPaginationAndDTOS();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: EntityWithServiceImplPaginationAndDTO) {
        return item.id;
    }
    registerChangeInEntityWithServiceImplPaginationAndDTOS() {
        this.eventSubscriber = this.eventManager.subscribe('entityWithServiceImplPaginationAndDTOListModification', (response) => this.loadAll());
    }

    sort() {
        const result = [this.predicate + ',' + (this.reverse ? 'asc' : 'desc')];
        if (this.predicate !== 'id') {
            result.push('id');
        }
        return result;
    }

    private onSuccess(data, headers) {
        this.links = this.parseLinks.parse(headers.get('link'));
        this.totalItems = headers.get('X-Total-Count');
        this.queryCount = this.totalItems;
        // this.page = pagingParams.page;
        this.entityWithServiceImplPaginationAndDTOS = data;
    }
    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
