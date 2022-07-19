import { mock } from 'jest-mock-extended';

import { JwtService, HASURA_CLAIMS, HASURA_USER_ID } from './jwt-service';
import { User } from '../models';

const JWT_TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwiZW1haWwiOiJ0ZXN0aW5nQGVtYWlsLmNvbSIsImlhdCI6MTUxNjIzOTAyMiwiaHR0cHM6Ly9oYXN1cmEuaW8vand0L2NsYWltcyI6eyJ4LWhhc3VyYS11c2VyLWlkIjoiMTIzIn19.NxqG7EH0XMoUn0HHrnD038-_B920MLVluJpuHED2FBQ';

interface IJwt {
    sign(payload: any, secret: string, config: any): any;
    verify(token: string, secret: string, config: any): boolean;
}

describe('JwtService', () => {
    let jwt: any;
    let user: User;
    let jwtService: JwtService;

    beforeEach(() => {
        jwt = mock<IJwt>();
        user = { id: 'id', email: 'email' };
        jwtService = new JwtService(jwt, 'secret');
    });

    describe('build', () => {
        test('calls sign with payload, secret and config', () => {
            jwt.sign = jest.fn((p: any, s: string, c: any) => {
                expect(s).toBe('secret');
                expect(c.algorithm).toBe('HS256');
                expect(p.email).toBe(user.email);
                expect(p[HASURA_CLAIMS][HASURA_USER_ID]).toBe(user.id);
                return JWT_TOKEN;
            });
            expect(jwtService.build(user)).toBe(JWT_TOKEN);
        });
    });

    describe('verify', () => {
        test('calls verify with right paramters', () => {
            const token = 'token';
            jwt.verify = jest.fn((t: string, s: string, c: any) => {
                expect(s).toBe('secret');
                expect(c.algorithm).toBe('HS256');
                expect(t).toBe(token);
                return true;
            });    
            expect(jwtService.verify(token)).toBe(true);
        });

        test('returns false if verifiy is false', () => {
            jwt.verify = jest.fn(() => false); 
            expect(jwtService.verify('token')).toBe(false);
        });
    });
});
