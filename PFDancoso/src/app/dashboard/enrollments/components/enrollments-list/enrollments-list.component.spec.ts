import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { EnrollmentsListComponent } from './enrollments-list.component';
import { MockModule, MockProvider } from 'ng-mocks';
import { EnrollmentsService } from '../../services/enrollments.service';
import { SharedModule } from 'src/app/shared/shared.module';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { By } from '@angular/platform-browser';
import { STUDENTS_MOCKED } from 'src/app/data/mockData';
import {HarnessLoader} from '@angular/cdk/testing';
import {TestbedHarnessEnvironment} from '@angular/cdk/testing/testbed';
import {MatTableHarness} from '@angular/material/table/testing';
import { MatTooltipModule } from '@angular/material/tooltip';
import {MatButtonHarness} from '@angular/material/button/testing';
import { of } from 'rxjs';



describe('EnrollmentsListComponent', () => {
  let component: EnrollmentsListComponent;
  let fixture: ComponentFixture<EnrollmentsListComponent>;
  let loader: HarnessLoader;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [EnrollmentsListComponent],
      imports: [
        MockModule(SharedModule),
        MatTableModule,
        MatTooltipModule,
        MockModule(MatIconModule),
        MockModule(MatButtonModule),
        MockModule(MatCardModule),
      ],
      providers: [
        MockProvider(EnrollmentsService)
      ]
    }).compileComponents()
    .then(()=>{
      fixture = TestBed.createComponent(EnrollmentsListComponent);
      component = fixture.componentInstance;
      loader = TestbedHarnessEnvironment.loader(fixture);
    });
    
  }));

  it('should create', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should show card with no students loaded', ()=>{
    component.students = [];
    fixture.detectChanges();
    let card = fixture.debugElement.query(By.css('mat-card-content'));
    expect(card.nativeElement?.textContent).toBe('No students loaded yet!');
  })

  it('should show the table when there are students enrolled', async ()=>{
    component.students = STUDENTS_MOCKED;
    fixture.detectChanges();
    const table = await loader.getHarness(MatTableHarness);
    expect(table).toBeTruthy();
  })

  it('should show the correct count of students in the table', async ()=>{
    component.students = STUDENTS_MOCKED;
    fixture.detectChanges();
    const table = await loader.getHarness(MatTableHarness);
    const rowsLength = (await table?.getRows())?.length;
    expect(rowsLength).toBe(STUDENTS_MOCKED.length);
  })
  
  it('should show the students email in the table', async ()=>{
    component.students = STUDENTS_MOCKED;
    fixture.detectChanges();
    const table = await loader.getHarness(MatTableHarness);
    const rows = (await table?.getRows());
    for(let [index, value] of rows.entries()){
      let emailTextCell = (await value.getCellTextByColumnName())['email'];
      expect(emailTextCell).toBe(STUDENTS_MOCKED[index]['email']);
    }
  })

  it('should enrollment service be called when button remove clicked', async ()=>{
    const spyOnEnrollmentsServiceUnenrrol = spyOn(
      (component as any).enrollmentsService,
      'unenroll'
    );
    component.students = STUDENTS_MOCKED;
    fixture.detectChanges();    
    const buttons = await loader.getAllHarnesses(MatButtonHarness);
    await buttons[0].click();
    fixture.detectChanges();
    expect(spyOnEnrollmentsServiceUnenrrol).toHaveBeenCalledTimes(1);
  })
});
