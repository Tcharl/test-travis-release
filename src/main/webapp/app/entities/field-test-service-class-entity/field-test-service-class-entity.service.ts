import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { SERVER_API_URL } from '../../app.constants';

import { JhiDateUtils } from 'ng-jhipster';

import { FieldTestServiceClassEntity } from './field-test-service-class-entity.model';
import { ResponseWrapper, createRequestOption } from '../../shared';

@Injectable()
export class FieldTestServiceClassEntityService {

    private resourceUrl = SERVER_API_URL + 'api/field-test-service-class-entities';

    constructor(private http: Http, private dateUtils: JhiDateUtils) { }

    create(fieldTestServiceClassEntity: FieldTestServiceClassEntity): Observable<FieldTestServiceClassEntity> {
        const copy = this.convert(fieldTestServiceClassEntity);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    update(fieldTestServiceClassEntity: FieldTestServiceClassEntity): Observable<FieldTestServiceClassEntity> {
        const copy = this.convert(fieldTestServiceClassEntity);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    find(id: number): Observable<FieldTestServiceClassEntity> {
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
     * Convert a returned JSON object to FieldTestServiceClassEntity.
     */
    private convertItemFromServer(json: any): FieldTestServiceClassEntity {
        const entity: FieldTestServiceClassEntity = Object.assign(new FieldTestServiceClassEntity(), json);
        entity.localDateBob = this.dateUtils
            .convertLocalDateFromServer(json.localDateBob);
        entity.localDateRequiredBob = this.dateUtils
            .convertLocalDateFromServer(json.localDateRequiredBob);
        entity.instantBob = this.dateUtils
            .convertDateTimeFromServer(json.instantBob);
        entity.instanteRequiredBob = this.dateUtils
            .convertDateTimeFromServer(json.instanteRequiredBob);
        entity.zonedDateTimeBob = this.dateUtils
            .convertDateTimeFromServer(json.zonedDateTimeBob);
        entity.zonedDateTimeRequiredBob = this.dateUtils
            .convertDateTimeFromServer(json.zonedDateTimeRequiredBob);
        return entity;
    }

    /**
     * Convert a FieldTestServiceClassEntity to a JSON which can be sent to the server.
     */
    private convert(fieldTestServiceClassEntity: FieldTestServiceClassEntity): FieldTestServiceClassEntity {
        const copy: FieldTestServiceClassEntity = Object.assign({}, fieldTestServiceClassEntity);
        copy.localDateBob = this.dateUtils
            .convertLocalDateToServer(fieldTestServiceClassEntity.localDateBob);
        copy.localDateRequiredBob = this.dateUtils
            .convertLocalDateToServer(fieldTestServiceClassEntity.localDateRequiredBob);

        copy.instantBob = this.dateUtils.toDate(fieldTestServiceClassEntity.instantBob);

        copy.instanteRequiredBob = this.dateUtils.toDate(fieldTestServiceClassEntity.instanteRequiredBob);

        copy.zonedDateTimeBob = this.dateUtils.toDate(fieldTestServiceClassEntity.zonedDateTimeBob);

        copy.zonedDateTimeRequiredBob = this.dateUtils.toDate(fieldTestServiceClassEntity.zonedDateTimeRequiredBob);
        return copy;
    }
}
