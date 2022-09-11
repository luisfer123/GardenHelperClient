import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserBonsaiListComponent } from './user-bonsai-list.component';

describe('UserBonsaiListComponent', () => {
  let component: UserBonsaiListComponent;
  let fixture: ComponentFixture<UserBonsaiListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserBonsaiListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserBonsaiListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
