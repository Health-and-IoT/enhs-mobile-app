import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CommonAilmentPage } from './common-ailment.page';

describe('CommonAilmentPage', () => {
  let component: CommonAilmentPage;
  let fixture: ComponentFixture<CommonAilmentPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CommonAilmentPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CommonAilmentPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
