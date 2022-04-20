import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { FakeBackendInterceptor } from './fake-backend';


export const httpInterceptorProviders = [
    { provide: HTTP_INTERCEPTORS, useClass: FakeBackendInterceptor, multi: true },
];