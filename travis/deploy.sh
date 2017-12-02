#!/usr/bin/env bash
if [ "$TRAVIS_BRANCH" = 'master' ] && [ "$TRAVIS_PULL_REQUEST" == 'false' ]; then
  git checkout -B "$TRAVIS_BRANCH"
  mvn -f .mvn/parent/pom.xml --batch-mode release:prepare -P release --settings travis/settings.xml
  mvn -f .mvn/parent/pom.xml --batch-mode release:perform -P release,nexus-pro --settings travis/settings.xml
fi
