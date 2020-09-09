terraform {
  required_providers {
    github = {
      source = "hashicorp/github"
    }
    heroku = {
      source = "heroku/heroku"
    }
  }
  required_version = ">= 0.13"
}
