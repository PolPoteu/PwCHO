import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { PostService } from './post.service';
describe('PostService', () => {
  let service: PostService;
  let httpTestingController: HttpTestingController;

  const mockData = {
    userId: '1',
    id: '1',
    title: 'First',
    body: 'This is first post',
  };
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PostService, { provide: 'url', useValue: 'apiUrl' }],
      imports: [ HttpClientTestingModule ]
    });
    service = TestBed.inject(PostService);
    httpTestingController = TestBed.get(HttpTestingController);
  });
  afterEach(() => {
    httpTestingController.verify();
  });
  it('getAll should make GET http req and return all items', () => {
    service.getAll().subscribe((res) => {
      expect(res).toEqual(mockData);
    });
    const req = httpTestingController.expectOne(`http://localhost:3000/posts/`);
    expect(req.request.method).toBe('GET');
    expect(req.cancelled).toBeFalsy;
    expect(req.request.responseType).toEqual('json');
    req.flush(mockData);
    httpTestingController.verify();
  });
  it('find should make a GET request with id on end of the url', () => {
    service.find(1).subscribe(res => {
      expect(res).toEqual(mockData);
     });
    const req = httpTestingController.expectOne('http://localhost:3000/posts/1');
    expect(req.request.method).toBe('GET');
    expect(req.cancelled).toBeFalsy();
    expect(req.request.responseType).toEqual('json');
    req.flush(mockData);
    httpTestingController.verify();
   });
   it('delete should make a DELETE request with id on end of the url', () => {
    service.delete(1).subscribe(res => {
      expect(res).toBe(1);
     });
    const req = httpTestingController.expectOne('http://localhost:3000/posts/1', 'delete to api');
    expect(req.request.method).toBe('DELETE');
    expect(req.cancelled).toBeFalsy();
    expect(req.request.responseType).toEqual('json');
    req.flush(1);
    httpTestingController.verify();
   });
   });
