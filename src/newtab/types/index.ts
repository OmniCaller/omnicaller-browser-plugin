

export type HttpInfo = {
  method: string;
  url: string;
};

export type EsInfo = {
  method: string;
  url: string;
};
export type SseInfo = {
  method: string;
  url: string;
};

export type TypeData = {
  http: HttpInfo;
  es: EsInfo;
  sse: SseInfo;
};

