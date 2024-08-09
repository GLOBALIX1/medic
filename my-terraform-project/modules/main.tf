# Specify the provider
provider "google" {
  credentials = file(var.gcp_service_account_key)
  project     = var.gcp_project
  region      = var.region
}

# Call the Cloud SQL module
module "cloud_sql" {
  source = "./modules/cloud-sql"
  db_name = var.db_name
}

# Call the Cloud Storage module
module "cloud_storage" {
  source = "./modules/cloud-storage"
  bucket_name = var.bucket_name
}

# Call the Cloud Run module
module "cloud_run" {
  source = "./modules/cloud-run"
  image = var.container_image
  service_name = var.service_name
}

# Define outputs if needed
output "cloud_sql_instance_name" {
  value = module.cloud_sql.instance_name
}

output "cloud_storage_bucket_name" {
  value = module.cloud_storage.bucket_name
}

output "cloud_run_service_url" {
  value = module.cloud_run.service_url
}

