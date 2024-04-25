import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './App';

// Mock WebSocket
global.WebSocket = jest.fn();

// Mock WebSocket events
const mockWebSocketEvents = {};
global.WebSocket.mockImplementation((url) => {
  const listeners = {};
  const ws = {
    url,
    send: jest.fn(),
    addEventListener: jest.fn((event, cb) => {
      listeners[event] = cb;
    }),
    removeEventListener: jest.fn((event) => {
      delete listeners[event];
    }),
    trigger: (event, data) => {
      const listener = listeners[event];
      if (listener) {
        listener({ data: JSON.stringify(data) });
      }
    },
    close: jest.fn(),
  };
  mockWebSocketEvents[url] = ws;
  return ws;
});

describe('App', () => {
  it('displays stock prices', async () => {
    render(<App />);
    const AAPLPrice = screen.getByText(/AAPL/i);
    expect(AAPLPrice).toBeInTheDocument();
    expect(AAPLPrice.nextSibling).toHaveTextContent('0.00');

    // Simulate receiving stock updates
    mockWebSocketEvents['ws://localhost:8080/ws'].trigger('message', { symbol: 'AAPL', price: 100 });

    await waitFor(() => {
      expect(AAPLPrice.nextSibling).toHaveTextContent('100.00');
    });

    // You can add more tests for other scenarios here
  });
});
