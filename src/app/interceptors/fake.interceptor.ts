import { HttpInterceptorFn } from '@angular/common/http';

export const fakeInterceptor: HttpInterceptorFn = (req, next) => {
  console.log('Interceptando petición...', req);

  const cloned = req.clone({
    setHeaders: { Authorization: 'Bearer fake-token' }
  });

  return next(cloned);
};