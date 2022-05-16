import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClient, HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import {
    MockBuilder,
    MockRender,
    NG_MOCKS_INTERCEPTORS
} from 'ng-mocks';

import { ContentTypeInterceptor } from './content-type.interceptor';
import { AppModule } from '../app.module';

describe('ContentTypeInterceptor', () => {
    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [HttpClientTestingModule]
        });
    });

    beforeEach(() => {
        return MockBuilder(ContentTypeInterceptor, AppModule).
            exclude(NG_MOCKS_INTERCEPTORS).
            keep(HTTP_INTERCEPTORS).
            replace(HttpClientModule, HttpClientTestingModule);
    });

    it('should have content-type application/json in header', () => {
        const fixture = MockRender('');
        const client: HttpClient =
            fixture.debugElement.injector.get(HttpClient);
        const httpMock: HttpTestingController =
            fixture.debugElement.injector.get(HttpTestingController);

        client.get('/testroute').subscribe();

        const httpRequest = httpMock.expectOne('/testroute');

        expect(httpRequest.request.headers.get('Content-Type')).toEqual('application/json');
    });
});
