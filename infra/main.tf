terraform {
  required_providers {
    google = {
      source  = "hashicorp/google"
      version = ">= 6.7.0"
    }
  }
}

provider "google" {
  project = "non-denominational-panic"
}

resource "random_id" "default" {
  byte_length = 8
}

resource "google_storage_bucket" "remote_state" {
  name     = "${random_id.default.hex}-terraform-remote-backend"
  location = "US"

  force_destroy               = false
  public_access_prevention    = "enforced"
  uniform_bucket_level_access = true

  versioning {
    enabled = true
  }
}

# create a file that tells terraform there's a bucket for remote state.
# see https://cloud.google.com/docs/terraform/resource-management/store-state to revert
resource "local_file" "default" {
  file_permission = "0644"
  filename        = "${path.module}/backend.tf"

  content = <<-EOT
  terraform {
    backend "gcs" {
      bucket = "${google_storage_bucket.remote_state.name}"
    }
  }
  EOT
}

resource "google_storage_bucket" "function_bucket" {
  name                        = "${random_id.default.hex}-gcf-source"
  location                    = "US"
  uniform_bucket_level_access = true
}

data "archive_file" "default" {
  type        = "zip"
  output_path = "/tmp/function-source.zip"
  source_dir  = "../backend/"
}
resource "google_storage_bucket_object" "object" {
  name   = "function-source.zip"
  bucket = google_storage_bucket.function_bucket.name
  source = data.archive_file.default.output_path
}

resource "google_cloudfunctions2_function" "default" {
  name        = "function-v2"
  location    = "us-central1"
  description = "a new function"

  build_config {
    runtime     = "nodejs20"
    entry_point = "helloWorld"
    source {
      storage_source {
        bucket = google_storage_bucket.function_bucket.name
        object = google_storage_bucket_object.object.name
      }
    }
  }

  service_config {
    max_instance_count = 1
    available_memory   = "128Mi"
    timeout_seconds    = 30
  }

  # force the function to redeploy when the zip file updates
  lifecycle {
    replace_triggered_by = [google_storage_bucket_object.object]

  }
}

resource "google_cloud_run_service_iam_member" "member" {
  project  = google_cloudfunctions2_function.default.project
  location = google_cloudfunctions2_function.default.location
  service  = google_cloudfunctions2_function.default.name
  role     = "roles/run.invoker"
  member   = "allUsers"
}

output "function_uri" {
  value = google_cloudfunctions2_function.default.service_config[0].uri
}
