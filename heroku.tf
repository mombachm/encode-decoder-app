provider "heroku" {
  version = "~> 2.0"
}

provider "github" {}

data "github_release" "release" {
  repository  = "encoder-decoder-app"
  owner       = "mombachm"
  retrieve_by = "latest"
}

resource "heroku_app" "encoder-decoder-app" {
  name   = "encoder-decoder-app"
  region = "us"
}

resource "heroku_build" "encoder-decoder-app" {
  app = heroku_app.encoder-decoder-app.id

  buildpacks = ["https://github.com/mars/create-react-app-buildpack.git"]

  source = {
    url = data.github_release.release.tarball_url
    version = data.github_release.release.name
  }
}

