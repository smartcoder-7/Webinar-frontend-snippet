import { MessagePost } from '@src/fromBackend/schema';

const noop = () => {};

export interface ChatSocketOptions {
  protocols?: string | string[];
  timeout?: number;
  maxAttempts?: number;
  token?: string;
  onopen?: (this: ChatSocket, ev: Event) => any;
  onmessage?: (this: ChatSocket, ev: MessageEvent) => any;
  onreconnect?: (this: ChatSocket, ev: Event | CloseEvent) => any;
  onmaximum?: (this: ChatSocket, ev: CloseEvent) => any;
  onclose?: (this: ChatSocket, ev: CloseEvent) => any;
  onerror?: (this: ChatSocket, ev: Event) => any;
}

export enum WebSocketEventType {
  open = 'open',
  close = 'close',
  message = 'message',
  error = 'error',
}

export default class ChatSocket {
  url: string;
  opts: ChatSocketOptions = {};
  num: number = 0;
  timer: number = 0;
  max: number;
  ws?: WebSocket;

  constructor(url: string, opts?: ChatSocketOptions) {
    this.opts = Object.assign(
      {
        timeout: Infinity,
        maxAttempts: Infinity,
      },
      opts || {}
    );

    this.max = this.opts.maxAttempts || Infinity;
    this.url = url;

    this.open();
  }

  open(): void {
    this.ws = new WebSocket(`${this.url}`, this.opts.protocols || []);

    if (!this.ws) {
      console.error('WS Error: Unable to open Websocket');
      return;
    }

    // @ts-ignore
    this.ws.onmessage = this.opts.onmessage || noop;

    this.ws.onopen = (e) => {
      // @ts-ignore
      (this.opts.onopen || noop)(e);
      this.num = 0;
    };

    this.ws.onclose = (e) => {
      e.code === 1e3 || e.code === 1001 || e.code === 1005 || this.reconnect(e);
      // @ts-ignore
      (this.opts.onclose || noop)(e);
    };

    this.ws.onerror = (e) => {
      console.log('WS Error: ', e);
      // @ts-ignore
      e && e.code === 'ECONNREFUSED' ? this.reconnect(e) : (this.opts.onerror || noop)(e);
    };
  }

  sendRaw(data: any): void {
    if (!this.ws) { return }
    this.ws.send(data);
  }

  send(post: MessagePost): void {
    if (!this.ws) { return }
    if (this.opts.token) {
      post.token = this.opts.token;
    }
    this.ws.send(JSON.stringify(post as any));
  }

  on(event: WebSocketEventType, handler: (evt: Event) => void): void {
    if (!this.ws) { return }
    this.ws.addEventListener(event, handler);
  }

  off(event: WebSocketEventType, handler: (evt: Event) => void): void {
    if (!this.ws) { return }
    this.ws.removeEventListener(event, handler);
  }

  close(code?: number, reason?: string): void {
    clearTimeout(this.timer);
    this.timer = 0;
    if (!this.ws) { return }
    this.ws.close(code || 1e3, reason);
  }

  reconnect(e: Event): void {
    if (this.timer && this.num++ < this.max) {
      // @ts-ignore
      this.timer = setTimeout(() => {
        // @ts-ignore
        (this.opts.onreconnect || noop)(e);
        this.open();
      }, this.opts.timeout || 1e3);
    } else {
      // @ts-ignore
      (this.opts.onmaximum || noop)(e);
    }
  }
}
