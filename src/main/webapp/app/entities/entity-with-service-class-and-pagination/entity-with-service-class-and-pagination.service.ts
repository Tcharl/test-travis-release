import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { SERVER_API_URL } from '../../app.constants';

import { EntityWithServiceClassAndPagination } from './entity-with-service-class-and-pagination.model';
import { ResponseWrapper, createRequestOption } from '../../shared';

@Injectable()
export class EntityWithServiceClassAndPaginationService {

    private resourceUrl = SERVER_API_URL + 'api/entity-with-service-class-and-paginations';

    constructor(private http: Http) { }

    create(entityWithServiceClassAndPagination: EntityWithServiceClassAndPagination):
        Observable<EntityWithServiceClassAndPagination> {
        const copy = this.convert(entityWithServiceClassAndPagination);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    update(entityWithServiceClassAndPagination: EntityWithServiceClassAndPagination):
        Observable<EntityWithServiceClassAndPagination> {
        const copy = this.convert(entityWithServiceClassAndPagination);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    find(id: number): Observable<EntityWithServiceClassAndPagination> {
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
     * Convert a returned JSON object to EntityWithServiceClassAndPagination.
     */
    private convertItemFromServer(json: any): EntityWithServiceClassAndPagination {
        const entity: EntityWithServiceClassAndPagination = Object.assign(new EntityWithServiceClassAndPagination(), json);
        return entity;
    }

    /**
     * Convert a EntityWithServiceClassAndPagination to a JSON which can be sent to the server.
     */
    private convert(entityWithServiceClassAndPagination: EntityWithServiceClassAndPagination): EntityWithServiceClassAndPagination {
        const copy: EntityWithServiceClassAndPagination = Object.assign({}, entityWithServiceClassAndPagination);
        return copy;
    }
}
