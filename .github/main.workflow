workflow "Build and Test" {
  on = "push"
  resolves = ["Test"]
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

workflow "Build, Test adn Publish" {
  on = "release"
  resolves = ["Publish"]
}

action "Publish" {
  needs = "Test"
  uses = "actions/npm@master"
  runs = "publish"
  args = "--access public"
  secrets = ["NPM_AUTH_TOKEN"]
}
