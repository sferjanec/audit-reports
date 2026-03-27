import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AndromedaUsersComponent } from './andromeda-users.component';

describe('AndromedaUsers', () => {
  let component: AndromedaUsersComponent;
  let fixture: ComponentFixture<AndromedaUsersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AndromedaUsersComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AndromedaUsersComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
