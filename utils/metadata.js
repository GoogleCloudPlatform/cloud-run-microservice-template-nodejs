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

const gcpMetadata = require('gcp-metadata');
const {GoogleAuth} = require('google-auth-library');
const auth = new GoogleAuth();

/**
 * Fetch GCP Project Id
 * @return {string} Project Id
 */
async function fetchProjectId() {
  // Use the 'google-auth-library' to make a request to the metadata server or
  // default to Application Default Credentials in your local environment.
  return await auth.getProjectId();
}

/**
 * Fetch service region
 * @return {string | undefined} Region in format: projects/PROJECT_NUMBER/regions/REGION
 */
async function fetchServiceRegion() {
  let region = undefined;
  if (gcpMetadata.isAvailable()) {
    region = await gcpMetadata.instance('region');
  }
  return region;
}

/**
 * Make a request with an ID token to a protected service
 * https://github.com/googleapis/google-auth-library-nodejs#working-with-id-tokens
 * @param {string} url - receiving service URL
 * @param {string} method - request method
 * @return {GaxiosPromise<AxiosResponse>} request response
 */
async function authenticatedRequest(url, method) {
  const client = await auth.getIdTokenClient(url);
  const response = await client.request({url, method});
  return response;
}

module.exports = {
  fetchProjectId,
  authenticatedRequest,
  fetchServiceRegion,
};
