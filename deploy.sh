#!/bin/bash

# Exit on any error
set -e

sudo chown -R ubuntu:ubuntu /home/ubuntu/.kube
sudo chown -R $USER /home/ubuntu/.config
sudo /opt/google-cloud-sdk/bin/gcloud docker -- push gcr.io/koa-graphql-blog/mysite
kubectl patch deployment mysite-dev -p '{"spec":{"template":{"spec":{"containers":[{"name":"mysite-dev","image":"gcr.io/koa-graphql-blog/mysite:'"$CIRCLE_SHA1"'"}]}}}}'