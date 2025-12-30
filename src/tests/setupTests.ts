// src/tests/setupTests.ts
import { afterAll, afterEach, beforeAll } from 'vitest';
import { cleanup } from '@testing-library/react';
import { setupServer } from 'msw/node';
import handlers from '@/mocks/handlers';

// 1) 테스트 환경용 MSW 서버 생성
export const server = setupServer(...handlers);

// 2) 전체 테스트 시작 전에 서버 실행
beforeAll(() => server.listen({ onUnhandledRequest: 'error' }));

// 3) 각 테스트 이후 핸들러 초기화
afterEach(() => {
  server.resetHandlers();
  cleanup();
});

// 4) 모든 테스트 끝나면 서버 종료
afterAll(() => server.close());
