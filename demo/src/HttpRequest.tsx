import React, { FC } from 'react';
import { useBehaviorSubject, useSubscription } from 'react-hooks-rxjs';
import { debounceTime, from, map, of, startWith, switchMap, tap } from 'rxjs';

const HttpRequest: FC = () => {
  const [search, setSearch, search$] = useBehaviorSubject('');
  const [loading, setLoading] = useBehaviorSubject(false);

  const [searchResults, err] = useSubscription(() =>
    search$.pipe(
      debounceTime(500),
      tap(() => setLoading(true)),
      switchMap((userName) =>
        !userName
          ? of([]) // if username is empty return empty array, otherwise github throws error
          : from(fetch(`https://api.github.com/search/users?q=${userName}`)).pipe(
              switchMap((res) => res.json()),
              map((json) => {
                if (json?.items instanceof Array) return json.items as any[];
                else throw new Error(json.message);
              }),
            ),
      ),
      tap(() => setLoading(false)),
      startWith([]),
      map((arr) => arr.slice(0, 10)),
    ),
  );

  return (
    <div className="App">
      {err && <div>{`${err}`}</div>}
      <input type="text" placeholder="Search" value={search} onChange={(evt) => setSearch(evt.target.value)} />
      {loading && <img src="http://i.stack.imgur.com/kOnzy.gif" height="15" width="15" />}
      <ul>
        {searchResults?.map((user) => (
          <li key={user.id}>
            <a href={user.html_url}>
              <img src={user.avatar_url} height="25" width="25" />
              {user.login}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default HttpRequest;
