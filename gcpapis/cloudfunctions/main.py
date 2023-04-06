import functions_framework
import os
from google.cloud import storage
from google.cloud import bigquery


def download_blob(bucket_name, source_blob_name, destination_file_name):
    """Downloads a blob from the bucket."""
    storage_client = storage.Client()
    bucket = storage_client.get_bucket(bucket_name)
    blob = bucket.blob(source_blob_name)

    blob.download_to_filename(destination_file_name)

    print("Blob {} downloaded to {}.".format(source_blob_name, destination_file_name))


def upload_blob(bucket_name, source_file_name, destination_blob_name):
    """Uploads a file to the bucket."""
    storage_client = storage.Client()
    bucket = storage_client.get_bucket(bucket_name)
    blob = bucket.blob(destination_blob_name)

    blob.upload_from_filename(source_file_name)

    print("File {} uploaded to {}.".format(source_file_name, destination_blob_name))


# Triggered by a change in a storage bucket
@functions_framework.cloud_event
def hello_gcs(cloud_event):
    data = cloud_event.data

    event_id = cloud_event["id"]
    event_type = cloud_event["type"]
    bucket = data["bucket"]
    name = data["name"]
    metageneration = data["metageneration"]
    timeCreated = data["timeCreated"]
    updated = data["updated"]

    download_blob("seass", name, name)
    print("Video Input Download success...")
    os.system("git clone  https://github.com/jesherjoshua/yolo.git")
    print("Cloned yolo")
    cmd = f'python3 yolo/detect.py --weights "yolo/yolov5weights.pt" --source "{name}" --class 0 --imgsz 320 --vid-stride 30'
    print("Running yolo")
    os.system(cmd)
    print("yolo complete")

    print(os.listdir())
    fh = open("count.txt")
    t = fh.read().split(" ")[:-1]
    t = [int(i) for i in t]
    x = sum(t)
    fh.close()
    os.system("rm count.txt")
    print(f"trash count: {x}")

    # big query
    lat, lng = name.split("#")[:-1]
    client = bigquery.Client()

    table_ref = client.dataset("seass").table("heatmap_data")
    table = client.get_table(table_ref)
    rows_to_insert = [{"lat": str(lat), "long": str(lng), "trash": str(x)}]
    result = client.insert_rows(table, rows_to_insert)
    print(f"bigquery status {result}")

    # delete gcs
    storage_client = storage.Client()
    bucket = storage_client.bucket("seass")
    blob = bucket.blob(name)
    blob.delete()

    print(f"file cleared: {name}")
    print(f"Event ID: {event_id}")
    print(f"Event type: {event_type}")
    print(f"Bucket: {bucket}")
    print(f"File: {name}")
    print(f"Metageneration: {metageneration}")
    print(f"Created: {timeCreated}")
    print(f"Updated: {updated}")
