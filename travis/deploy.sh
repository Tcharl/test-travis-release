#!/usr/bin/env bash
if [ "$TRAVIS_BRANCH" = 'master' ] && [ "$TRAVIS_PULL_REQUEST" == 'false' ]; then
  git push origin --delete gh-pages
  git checkout -b gh-pages
  git push origin gh-pages
  git checkout -B "$TRAVIS_BRANCH"
  ./mvnw -f .mvn/parent/pom.xml --batch-mode release:prepare
  ./mvnw -f .mvn/parent/pom.xml --batch-mode release:perform -P nexus-pro
fi
