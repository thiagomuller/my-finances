
import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { Summary } from './shared/model/summary';

import { SummaryService } from './summary.service';
import { dummySummary } from './shared/fixtures/dummy';



describe('SummaryService', () => {
  let httpMock: HttpTestingController;
  let summaryService: SummaryService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [SummaryService]
    });
    summaryService = TestBed.inject(SummaryService)
    httpMock = TestBed.inject(HttpTestingController)
  })

  it('should return an Observable<Summary>', () => {

    summaryService.getSummaryForGivenUser(2415).subscribe(summary => {
      expect(summary).toEqual(dummySummary)
    })

    const req = httpMock.expectOne(`${summaryService.API_URL}getUserSummary/?userId=2415`);
    expect(req.request.method).toBe('GET')
    req.flush(dummySummary)
  })

  afterEach(() => {
    httpMock.verify();
  });
})
