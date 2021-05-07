interface Spawn<T> extends Resource<Task<T>> {
  within(scope: Task): Resource<Task<T>>;
}
export function spawn<T>(operation?: Operation<T>): Resource<Task<T>> {
  function* init(scope) {
    return scope.spawn(operation);
  }

  function within(scope: Task) {
    return {
      init: () => init(scope)
    }
  }

  return { init, within };
}
