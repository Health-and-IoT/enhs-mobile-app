import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ViewformPage } from './viewform.page';

describe('ViewformPage', () => {
  let component: ViewformPage;
  let fixture: ComponentFixture<ViewformPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewformPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ViewformPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
