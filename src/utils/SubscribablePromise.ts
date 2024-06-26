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

  constructor(executor: (observer: SubscribableObserver<T, P>) => void | Promise<P>) {
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

  private init(executor: (observer: SubscribableObserver<T, P>) => void | Promise<P>) {
    const execution: void | Promise<P> = executor(this.observer)
    const e = execution as Promise<P>

    Promise.resolve(e)
      .then((result) => {
        // @ts-ignore
        if (e && e.then) {
          this.observer.complete(result)
          this.observer.complete(result)
        }
      })
      .catch((err) => {
        // @ts-ignore
        if (e && e.then) {
          this.observer.error(err)
          this.observer.error(err)
        }
      })
  }
}
