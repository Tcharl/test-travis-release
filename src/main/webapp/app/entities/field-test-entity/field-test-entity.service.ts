import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { SERVER_API_URL } from '../../app.constants';

import { JhiDateUtils } from 'ng-jhipster';

import { FieldTestEntity } from './field-test-entity.model';
import { ResponseWrapper, createRequestOption } from '../../shared';

@Injectable()
export class FieldTestEntityService {

    private resourceUrl = SERVER_API_URL + 'api/field-test-entities';

    constructor(private http: Http, private dateUtils: JhiDateUtils) { }

    create(fieldTestEntity: FieldTestEntity): Observable<FieldTestEntity> {
        const copy = this.convert(fieldTestEntity);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    update(fieldTestEntity: FieldTestEntity): Observable<FieldTestEntity> {
        const copy = this.convert(fieldTestEntity);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    find(id: number): Observable<FieldTestEntity> {
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
     * Convert a returned JSON object to FieldTestEntity.
     */
    private convertItemFromServer(json: any): FieldTestEntity {
        const entity: FieldTestEntity = Object.assign(new FieldTestEntity(), json);
        entity.localDateTom = this.dateUtils
            .convertLocalDateFromServer(json.localDateTom);
        entity.localDateRequiredTom = this.dateUtils
            .convertLocalDateFromServer(json.localDateRequiredTom);
        entity.instantTom = this.dateUtils
            .convertDateTimeFromServer(json.instantTom);
        entity.instanteRequiredTom = this.dateUtils
            .convertDateTimeFromServer(json.instanteRequiredTom);
        entity.zonedDateTimeTom = this.dateUtils
            .convertDateTimeFromServer(json.zonedDateTimeTom);
        entity.zonedDateTimeRequiredTom = this.dateUtils
            .convertDateTimeFromServer(json.zonedDateTimeRequiredTom);
        return entity;
    }

    /**
     * Convert a FieldTestEntity to a JSON which can be sent to the server.
     */
    private convert(fieldTestEntity: FieldTestEntity): FieldTestEntity {
        const copy: FieldTestEntity = Object.assign({}, fieldTestEntity);
        copy.localDateTom = this.dateUtils
            .convertLocalDateToServer(fieldTestEntity.localDateTom);
        copy.localDateRequiredTom = this.dateUtils
            .convertLocalDateToServer(fieldTestEntity.localDateRequiredTom);

        copy.instantTom = this.dateUtils.toDate(fieldTestEntity.instantTom);

        copy.instanteRequiredTom = this.dateUtils.toDate(fieldTestEntity.instanteRequiredTom);

        copy.zonedDateTimeTom = this.dateUtils.toDate(fieldTestEntity.zonedDateTimeTom);

        copy.zonedDateTimeRequiredTom = this.dateUtils.toDate(fieldTestEntity.zonedDateTimeRequiredTom);
        return copy;
    }
}
