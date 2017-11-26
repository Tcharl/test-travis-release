import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { SERVER_API_URL } from '../../app.constants';

import { EntityWithServiceClassAndDTO } from './entity-with-service-class-and-dto.model';
import { ResponseWrapper, createRequestOption } from '../../shared';

@Injectable()
export class EntityWithServiceClassAndDTOService {

    private resourceUrl = SERVER_API_URL + 'api/entity-with-service-class-and-dtos';

    constructor(private http: Http) { }

    create(entityWithServiceClassAndDTO: EntityWithServiceClassAndDTO): Observable<EntityWithServiceClassAndDTO> {
        const copy = this.convert(entityWithServiceClassAndDTO);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    update(entityWithServiceClassAndDTO: EntityWithServiceClassAndDTO): Observable<EntityWithServiceClassAndDTO> {
        const copy = this.convert(entityWithServiceClassAndDTO);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    find(id: number): Observable<EntityWithServiceClassAndDTO> {
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
     * Convert a returned JSON object to EntityWithServiceClassAndDTO.
     */
    private convertItemFromServer(json: any): EntityWithServiceClassAndDTO {
        const entity: EntityWithServiceClassAndDTO = Object.assign(new EntityWithServiceClassAndDTO(), json);
        return entity;
    }

    /**
     * Convert a EntityWithServiceClassAndDTO to a JSON which can be sent to the server.
     */
    private convert(entityWithServiceClassAndDTO: EntityWithServiceClassAndDTO): EntityWithServiceClassAndDTO {
        const copy: EntityWithServiceClassAndDTO = Object.assign({}, entityWithServiceClassAndDTO);
        return copy;
    }
}
