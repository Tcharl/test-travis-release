import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { SERVER_API_URL } from '../../app.constants';

import { EntityWithServiceImpl } from './entity-with-service-impl.model';
import { ResponseWrapper, createRequestOption } from '../../shared';

@Injectable()
export class EntityWithServiceImplService {

    private resourceUrl = SERVER_API_URL + 'api/entity-with-service-impls';

    constructor(private http: Http) { }

    create(entityWithServiceImpl: EntityWithServiceImpl): Observable<EntityWithServiceImpl> {
        const copy = this.convert(entityWithServiceImpl);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    update(entityWithServiceImpl: EntityWithServiceImpl): Observable<EntityWithServiceImpl> {
        const copy = this.convert(entityWithServiceImpl);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    find(id: number): Observable<EntityWithServiceImpl> {
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
     * Convert a returned JSON object to EntityWithServiceImpl.
     */
    private convertItemFromServer(json: any): EntityWithServiceImpl {
        const entity: EntityWithServiceImpl = Object.assign(new EntityWithServiceImpl(), json);
        return entity;
    }

    /**
     * Convert a EntityWithServiceImpl to a JSON which can be sent to the server.
     */
    private convert(entityWithServiceImpl: EntityWithServiceImpl): EntityWithServiceImpl {
        const copy: EntityWithServiceImpl = Object.assign({}, entityWithServiceImpl);
        return copy;
    }
}
