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

import app from '../app.js';
import supertest from 'supertest';

let request;

describe('Unit Tests', () => {
  before(async () => {
    request = supertest(app);
  });

  it('should respond OK to GET /', async () => {
    await request.get('/').expect(200);
  });

  it('should respond NOT FOUND to POST /', async () => {
    await request.post('/').expect(404);
  });
});
