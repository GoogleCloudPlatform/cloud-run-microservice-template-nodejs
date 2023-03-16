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

import path from 'path';
import supertest from 'supertest'
import { fileURLToPath } from 'url';

let request;

describe('Unit Tests', () => {
  before(async () => {
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);
    
    const app = import(path.join(__dirname, '..', 'index.js'));
    request = await supertest(app);
  });

  it('should respond OK to GET /', async () => {
    setTimeout(async() => {
      await request.get('/').expect(200);
    }, 1000);
  });

  it('should respond NOT FOUND to POST /', async () => {
    setTimeout(async() => {
      await request.post('/').expect(404);
    }, 1000);
  });
});
