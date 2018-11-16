import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TemplateSaveComponent } from './TemplateSave.component';

describe('TemplateSaveComponent', () => {
  let component: TemplateSaveComponent;
  let fixture: ComponentFixture<TemplateSaveComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TemplateSaveComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TemplateSaveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
