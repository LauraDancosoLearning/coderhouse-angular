import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { StudentsService } from './students.service';
import { Student } from '../models/student.model';
import { environment } from 'src/environments/environment';
import { STUDENTS_MOCKED } from 'src/app/data/mockData';

describe('StudentsService', () => {
  let service: StudentsService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [StudentsService],
    });

    service = TestBed.inject(StudentsService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get students', () => {
    const expectedStudents: Student[] = STUDENTS_MOCKED;

    service.getStudents().subscribe();

    const req = httpTestingController.expectOne({method: 'GET', url:`${environment.baseUrl}/students`});
    expect(req.request.method).toEqual('GET');

    req.flush(expectedStudents);

    service.students$.subscribe((students) => {
      expect(students).toEqual(expectedStudents);
    });
  });

  it('should add a student', () => {
    const newStudent: Student = STUDENTS_MOCKED[0];

    service.addStudent(newStudent).subscribe();

    const req = httpTestingController.expectOne(`${environment.baseUrl}/students`);
    expect(req.request.method).toEqual('POST');
    expect(req.request.body).toEqual(newStudent);
  });

  it('should delete a student', () => {
    const studentIdToDelete = 1;

    service.deleteStudent(studentIdToDelete).subscribe();

    const req = httpTestingController.expectOne(`${environment.baseUrl}/students/${studentIdToDelete}`);
    expect(req.request.method).toEqual('DELETE');
  });

  it('should update a student', () => {
    const studentToUpdate: Student = STUDENTS_MOCKED[0];

    service.updateStudent(studentToUpdate).subscribe();

    const req = httpTestingController.expectOne(`${environment.baseUrl}/students/${studentToUpdate.id}`);
    expect(req.request.method).toEqual('PUT');
    expect(req.request.body).toEqual(studentToUpdate);

  });

  it('should calculate marks average', () => {
    const marks: number[] = [80, 90, 75, 95];

    const average = service.getMarksAvg(marks);

    expect(average).toBeCloseTo(85, 2);
  });
});
