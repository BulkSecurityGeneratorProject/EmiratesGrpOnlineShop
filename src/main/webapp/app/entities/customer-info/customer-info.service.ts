import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { JhiDateUtils } from 'ng-jhipster';

import { CustomerInfo } from './customer-info.model';
import { ResponseWrapper, createRequestOption } from '../../shared';

@Injectable()
export class CustomerInfoService {

    private resourceUrl = 'api/customer-infos';

    constructor(private http: Http, private dateUtils: JhiDateUtils) { }

    create(customerInfo: CustomerInfo): Observable<CustomerInfo> {
        const copy = this.convert(customerInfo);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            this.convertItemFromServer(jsonResponse);
            return jsonResponse;
        });
    }

    update(customerInfo: CustomerInfo): Observable<CustomerInfo> {
        const copy = this.convert(customerInfo);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            this.convertItemFromServer(jsonResponse);
            return jsonResponse;
        });
    }

    find(id: number): Observable<CustomerInfo> {
        return this.http.get(`${this.resourceUrl}/${id}`).map((res: Response) => {
            const jsonResponse = res.json();
            this.convertItemFromServer(jsonResponse);
            return jsonResponse;
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
        for (let i = 0; i < jsonResponse.length; i++) {
            this.convertItemFromServer(jsonResponse[i]);
        }
        return new ResponseWrapper(res.headers, jsonResponse, res.status);
    }

    private convertItemFromServer(entity: any) {
        entity.lastLogin = this.dateUtils
            .convertDateTimeFromServer(entity.lastLogin);
    }

    private convert(customerInfo: CustomerInfo): CustomerInfo {
        const copy: CustomerInfo = Object.assign({}, customerInfo);

        copy.lastLogin = this.dateUtils.toDate(customerInfo.lastLogin);
        return copy;
    }
}
