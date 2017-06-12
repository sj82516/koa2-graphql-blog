#!/bin/bash

# Exit on any error
set -e

sudo /opt/google-cloud-sdk/bin/gcloud docker -- push gcr.io/koa-graphql-blog/mysite
sudo chown -R ubuntu:ubuntu /home/ubuntu/.kube
kubectl patch deployment mysite-dev -p '{"spec":{"template":{"spec":{"containers":[{"name":"mysite-dev","image":"gcr.io/koa-graphql-blog/mysite:'"$CIRCLE_SHA1"'"}]}}}}'