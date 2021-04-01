import { AuthModule } from './auth.module';

describe('AuthModule', () => {
  let userModule: AuthModule;

  beforeEach(() => {
    userModule = new AuthModule();
  });

  it('should create an instance', () => {
    expect(userModule).toBeTruthy();
  });
});
