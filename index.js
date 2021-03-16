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

const app = require('./app');
const {logger, initLogCorrelation} = require('./utils/logging');
const {fetchProjectId} = require('./utils/metadata');

/**
 * Initialize app and start Express server
 */
const main = async () => {
  let project = process.env.GOOGLE_CLOUD_PROJECT;
  if (!project) {
    try {
      project = await fetchProjectId();
    } catch (err) {
      logger.warn('Could not fetch Project Id for tracing.');
    }
  }
  // Initialize request-based logger with project Id
  initLogCorrelation(project);

  // Start server listening on PORT env var
  const PORT = process.env.PORT || 8080;
  app.listen(PORT, () => logger.info(`Listening on port ${PORT}`));
};

/**
 * Listen for termination signal
 */
process.on('SIGTERM', () => {
  // Clean up resources on shutdown
  logger.info('Caught SIGTERM.');
  logger.flush();
});

main();
