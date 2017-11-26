import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { SERVER_API_URL } from '../../app.constants';

import { JhiDateUtils } from 'ng-jhipster';

import { FieldTestPagerEntity } from './field-test-pager-entity.model';
import { ResponseWrapper, createRequestOption } from '../../shared';

@Injectable()
export class FieldTestPagerEntityService {

    private resourceUrl = SERVER_API_URL + 'api/field-test-pager-entities';

    constructor(private http: Http, private dateUtils: JhiDateUtils) { }

    create(fieldTestPagerEntity: FieldTestPagerEntity): Observable<FieldTestPagerEntity> {
        const copy = this.convert(fieldTestPagerEntity);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    update(fieldTestPagerEntity: FieldTestPagerEntity): Observable<FieldTestPagerEntity> {
        const copy = this.convert(fieldTestPagerEntity);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    find(id: number): Observable<FieldTestPagerEntity> {
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
     * Convert a returned JSON object to FieldTestPagerEntity.
     */
    private convertItemFromServer(json: any): FieldTestPagerEntity {
        const entity: FieldTestPagerEntity = Object.assign(new FieldTestPagerEntity(), json);
        entity.localDateJade = this.dateUtils
            .convertLocalDateFromServer(json.localDateJade);
        entity.localDateRequiredJade = this.dateUtils
            .convertLocalDateFromServer(json.localDateRequiredJade);
        entity.instantJade = this.dateUtils
            .convertDateTimeFromServer(json.instantJade);
        entity.instanteRequiredJade = this.dateUtils
            .convertDateTimeFromServer(json.instanteRequiredJade);
        entity.zonedDateTimeJade = this.dateUtils
            .convertDateTimeFromServer(json.zonedDateTimeJade);
        entity.zonedDateTimeRequiredJade = this.dateUtils
            .convertDateTimeFromServer(json.zonedDateTimeRequiredJade);
        return entity;
    }

    /**
     * Convert a FieldTestPagerEntity to a JSON which can be sent to the server.
     */
    private convert(fieldTestPagerEntity: FieldTestPagerEntity): FieldTestPagerEntity {
        const copy: FieldTestPagerEntity = Object.assign({}, fieldTestPagerEntity);
        copy.localDateJade = this.dateUtils
            .convertLocalDateToServer(fieldTestPagerEntity.localDateJade);
        copy.localDateRequiredJade = this.dateUtils
            .convertLocalDateToServer(fieldTestPagerEntity.localDateRequiredJade);

        copy.instantJade = this.dateUtils.toDate(fieldTestPagerEntity.instantJade);

        copy.instanteRequiredJade = this.dateUtils.toDate(fieldTestPagerEntity.instanteRequiredJade);

        copy.zonedDateTimeJade = this.dateUtils.toDate(fieldTestPagerEntity.zonedDateTimeJade);

        copy.zonedDateTimeRequiredJade = this.dateUtils.toDate(fieldTestPagerEntity.zonedDateTimeRequiredJade);
        return copy;
    }
}
