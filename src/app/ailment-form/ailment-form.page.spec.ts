import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AilmentFormPage } from './ailment-form.page';

describe('AilmentFormPage', () => {
  let component: AilmentFormPage;
  let fixture: ComponentFixture<AilmentFormPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AilmentFormPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AilmentFormPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
