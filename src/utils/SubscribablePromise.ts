import { SubscribableObserver } from './SubscribableObserver'

export class SubscribablePromise<T, P> {
  private observer = new SubscribableObserver<T, P>()

  private promise = Object.assign(
    new Promise<P>((resolve, reject) => {
      setTimeout(() => {
        this.observer.subscribe(undefined, resolve, reject)
      }, 0)
    }),
    this,
  )

  constructor(executor: (observer: SubscribableObserver<T, P>) => void | Promise<P> | null) {
    // Defer
    setTimeout(() => this.init(executor), 1)
  }

  public subscribe(onNext: (next: T) => void) {
    return this.observer.subscribe(onNext)
  }

  public next(onNext: (next: T) => void) {
    this.observer.subscribe(onNext)
    return this
  }

  public then(onfulfilled?: (value: P) => any, onrejected?: (error: any) => any) {
    return Object.assign(this.promise.then(onfulfilled, onrejected), this)
  }

  public catch(onrejected?: (error: any) => any) {
    return Object.assign(this.promise.catch(onrejected), this)
  }

  public finally(onfinally?: () => any) {
    return Object.assign(this.promise.finally(onfinally), this)
  }

  private init(executor: (observer: SubscribableObserver<T, P>) => void | Promise<P> | null) {
    const execution: void | Promise<P> | null = executor(this.observer)
    const e = execution as Promise<P>

    Promise.resolve(e)
      .then((result) => {
        this.observer.complete(result)
      })
      .catch((err) => {
        this.observer.error(err)
      })
  }
}
