import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ViewsympPage } from './viewsymp.page';

describe('ViewsympPage', () => {
  let component: ViewsympPage;
  let fixture: ComponentFixture<ViewsympPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewsympPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ViewsympPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
