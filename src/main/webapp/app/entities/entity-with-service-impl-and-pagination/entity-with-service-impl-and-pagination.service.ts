import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { SERVER_API_URL } from '../../app.constants';

import { EntityWithServiceImplAndPagination } from './entity-with-service-impl-and-pagination.model';
import { ResponseWrapper, createRequestOption } from '../../shared';

@Injectable()
export class EntityWithServiceImplAndPaginationService {

    private resourceUrl = SERVER_API_URL + 'api/entity-with-service-impl-and-paginations';

    constructor(private http: Http) { }

    create(entityWithServiceImplAndPagination: EntityWithServiceImplAndPagination):
        Observable<EntityWithServiceImplAndPagination> {
        const copy = this.convert(entityWithServiceImplAndPagination);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    update(entityWithServiceImplAndPagination: EntityWithServiceImplAndPagination):
        Observable<EntityWithServiceImplAndPagination> {
        const copy = this.convert(entityWithServiceImplAndPagination);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    find(id: number): Observable<EntityWithServiceImplAndPagination> {
        return this.http.get(`${this.resourceUrl}/${id}`).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    query(req?: any): Observable<ResponseWrapper> {
        const options = createRequestOption(req);
        return this.http.get(this.resourceUrl, options)
            .map((res: Response) => this.convertResponse(res));
    }

    delete(id: number): Observable<Response> {
        return this.http.delete(`${this.resourceUrl}/${id}`);
    }

    private convertResponse(res: Response): ResponseWrapper {
        const jsonResponse = res.json();
        const result = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            result.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return new ResponseWrapper(res.headers, result, res.status);
    }

    /**
     * Convert a returned JSON object to EntityWithServiceImplAndPagination.
     */
    private convertItemFromServer(json: any): EntityWithServiceImplAndPagination {
        const entity: EntityWithServiceImplAndPagination = Object.assign(new EntityWithServiceImplAndPagination(), json);
        return entity;
    }

    /**
     * Convert a EntityWithServiceImplAndPagination to a JSON which can be sent to the server.
     */
    private convert(entityWithServiceImplAndPagination: EntityWithServiceImplAndPagination): EntityWithServiceImplAndPagination {
        const copy: EntityWithServiceImplAndPagination = Object.assign({}, entityWithServiceImplAndPagination);
        return copy;
    }
}
