workflow "Release" {
  on = "release"
  resolves = ["Publish"]
}

action "Build" {
  uses = "actions/npm@master"
  args = "install"
}

action "Test" {
  needs = "Build"
  uses = "actions/npm@master"
  args = "test"
}

action "Publish" {
  needs = "Test"
  uses = "actions/npm@master"
  runs = "publish"
  args = "--access public"
  secrets = ["NPM_AUTH_TOKEN"]
}
