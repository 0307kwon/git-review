export interface Action<T> {
  type: T;
}

export interface ActionWithPayload<A, P> extends Action<A> {
  payload: P;
}

export interface ActionWithPayloadFromCreator<
  A,
  C extends (...args: any) => ActionWithPayload<any, any>
> extends Action<A> {
  payload: Pick<ReturnType<C>, "payload">["payload"];
}
