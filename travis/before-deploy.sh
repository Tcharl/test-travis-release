#!/usr/bin/env bash
if [ "$TRAVIS_BRANCH" = 'master' ] && [ "$TRAVIS_PULL_REQUEST" == 'false' ]; then
# The encrypted file contains: a signing gpg subkey and a ssh key and pubkey,
# please read how to create a gpg key: http://www.debonair.io/post/maven-cd/
# please read how to add a ssh key on travis https://oncletom.io/2016/travis-ssh-deploy/, also add the public one on github deploy repo deploy key
# and finally how to encrypt the resulting tar https://docs.travis-ci.com/user/encrypting-files/#Encrypting-multiple-files
    openssl aes-256-cbc -K $encrypted_aa444281d1e4_key -iv $encrypted_aa444281d1e4_iv -in travis/deploykeys.tar.enc -out travis/deploykeys.tar -d
    tar -xvf travis/deploykeys.tar
    gpg --fast-import .ssh/gpg-cmordant1-at-gmail-com_travis.asc
    mv .ssh/ssh_travis ~/.ssh/id_rsa
    mv .ssh/ssh_travis.pub ~/.ssh/id_rsa.pub
    chmod 600 ~/.ssh/id_rsa
    eval "$(ssh-agent -s)"
    ssh-add ~/.ssh/id_rsa
    printf "\nHost *github.com\n\tIdentityFile ~/.ssh/id_rsa\n\tUser Tcharl\n\tStrictHostKeyChecking no\n" >> ~/.ssh/config
    rm -rf .ssh/
fi
