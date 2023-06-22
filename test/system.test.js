// Copyright 2021 Google LLC
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//      http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

'use strict';

import assert from 'assert';
import got from 'got';

describe('System Tests', () => {
  const {BASE_URL, ID_TOKEN} = process.env;

  before(async () => {
    if (!BASE_URL) throw Error('Cloud Run service URL not found');
    if (!ID_TOKEN) throw Error('Unable to acquire an ID token.');
  });

  it('can successfully make a request', async () => {
    const options = {
      headers: {
        Authorization: `Bearer ${ID_TOKEN}`,
      },
      method: 'GET',
      throwHttpErrors: false,
      retry: {
        limit: 6,
      },
    };
    const response = await got(BASE_URL, options);
    assert.strictEqual(response.statusCode, 200);
    assert.strictEqual(response.body, 'Hello World!');
  });
});
