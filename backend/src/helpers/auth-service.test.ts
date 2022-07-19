import { mock } from 'jest-mock-extended';

import { JwtService } from './jwt-service';
import { AuthService } from './auth-service';
import { ContextContainer } from './ioc-container';

// edit at https://jwt.io/
const JWT_TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwiZW1haWwiOiJ0ZXN0aW5nQGVtYWlsLmNvbSIsImlhdCI6MTUxNjIzOTAyMiwiaHR0cHM6Ly9oYXN1cmEuaW8vand0L2NsYWltcyI6eyJ4LWhhc3VyYS11c2VyLWlkIjoiMTIzIn19.NxqG7EH0XMoUn0HHrnD038-_B920MLVluJpuHED2FBQ';

describe('AuthService', () => {
    let jwtService: any;
    let context: any;
    let authService: AuthService;

    beforeEach(() => {
        jwtService = mock<JwtService>();
        jwtService.extractPayload.mockReturnValue({
            sub: '123',
            email: 'test@email.com',
            'https://hasura.io/jwt/claims': {
                'x-hasura-user-id': '123',
            },
        });
        jwtService.verify.mockReturnValue(true);
        context = {
            req: {
                authorization: JWT_TOKEN
            }
        };
        authService = new AuthService(jwtService);
    });
    
    describe('authenticate', () => {
        test('verifies and extract token payload', async () => {
            const user = await authService.authenticate(context);
            expect(user?.id).toBe('123');
            expect(user?.email).toBe('test@email.com');
            expect(jwtService.verify).toHaveBeenCalledWith(JWT_TOKEN);
            expect(jwtService.extractPayload).toHaveBeenCalledWith(JWT_TOKEN);
        });

        test('unauthenticated context returns undefined', async () => {
            const user = await authService.authenticate({ req: {} } as ContextContainer);
            expect(user).toBeUndefined();
            expect(jwtService.verify).not.toHaveBeenCalled();
            expect(jwtService.extractPayload).not.toHaveBeenCalled();
        });
    });
});
