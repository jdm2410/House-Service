import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiceQuickListComponent } from './service-quick-list.component';

describe('ServiceQuickListComponent', () => {
  let component: ServiceQuickListComponent;
  let fixture: ComponentFixture<ServiceQuickListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ServiceQuickListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ServiceQuickListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
