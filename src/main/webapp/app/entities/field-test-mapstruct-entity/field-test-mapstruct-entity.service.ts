import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { SERVER_API_URL } from '../../app.constants';

import { JhiDateUtils } from 'ng-jhipster';

import { FieldTestMapstructEntity } from './field-test-mapstruct-entity.model';
import { ResponseWrapper, createRequestOption } from '../../shared';

@Injectable()
export class FieldTestMapstructEntityService {

    private resourceUrl = SERVER_API_URL + 'api/field-test-mapstruct-entities';

    constructor(private http: Http, private dateUtils: JhiDateUtils) { }

    create(fieldTestMapstructEntity: FieldTestMapstructEntity): Observable<FieldTestMapstructEntity> {
        const copy = this.convert(fieldTestMapstructEntity);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    update(fieldTestMapstructEntity: FieldTestMapstructEntity): Observable<FieldTestMapstructEntity> {
        const copy = this.convert(fieldTestMapstructEntity);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    find(id: number): Observable<FieldTestMapstructEntity> {
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
     * Convert a returned JSON object to FieldTestMapstructEntity.
     */
    private convertItemFromServer(json: any): FieldTestMapstructEntity {
        const entity: FieldTestMapstructEntity = Object.assign(new FieldTestMapstructEntity(), json);
        entity.localDateEva = this.dateUtils
            .convertLocalDateFromServer(json.localDateEva);
        entity.localDateRequiredEva = this.dateUtils
            .convertLocalDateFromServer(json.localDateRequiredEva);
        entity.instantEva = this.dateUtils
            .convertDateTimeFromServer(json.instantEva);
        entity.instanteRequiredEva = this.dateUtils
            .convertDateTimeFromServer(json.instanteRequiredEva);
        entity.zonedDateTimeEva = this.dateUtils
            .convertDateTimeFromServer(json.zonedDateTimeEva);
        entity.zonedDateTimeRequiredEva = this.dateUtils
            .convertDateTimeFromServer(json.zonedDateTimeRequiredEva);
        return entity;
    }

    /**
     * Convert a FieldTestMapstructEntity to a JSON which can be sent to the server.
     */
    private convert(fieldTestMapstructEntity: FieldTestMapstructEntity): FieldTestMapstructEntity {
        const copy: FieldTestMapstructEntity = Object.assign({}, fieldTestMapstructEntity);
        copy.localDateEva = this.dateUtils
            .convertLocalDateToServer(fieldTestMapstructEntity.localDateEva);
        copy.localDateRequiredEva = this.dateUtils
            .convertLocalDateToServer(fieldTestMapstructEntity.localDateRequiredEva);

        copy.instantEva = this.dateUtils.toDate(fieldTestMapstructEntity.instantEva);

        copy.instanteRequiredEva = this.dateUtils.toDate(fieldTestMapstructEntity.instanteRequiredEva);

        copy.zonedDateTimeEva = this.dateUtils.toDate(fieldTestMapstructEntity.zonedDateTimeEva);

        copy.zonedDateTimeRequiredEva = this.dateUtils.toDate(fieldTestMapstructEntity.zonedDateTimeRequiredEva);
        return copy;
    }
}
