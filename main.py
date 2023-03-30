import os
import tensorflow as tf
from google.cloud import storage


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

  print('File {} uploaded to {}.'.format(
      source_file_name,
      destination_blob_name))





def handler(event, context):
    """Triggered by a change to a Cloud Storage bucket.
    Args:
         event (dict): Event payload.
         context (google.cloud.functions.Context): Metadata for the event.
    """
    file = event
    vid_name=file['name']

    print("YoloV5 import success")

    download_blob('seass',vid_name,'/tmp/'+vid_name)
    print("Video Input Downloaded")
    cmd=f"python3 yolov5/detect.py --weights 'yolov5/yolov5weights.pt' --source '/tmp/{vid_name}' --class 0"
    os.system(cmd)
    print("Running Yolo")
    fh=open('count.txt','r')
    txt=fh.read()
    print(txt)
    l=[int(i) for i in txt.split(' ')[:-1]]
    number=sum(l)
    max_number=100
    min_number=0
    scaled_number = (number - min_number) / (max_number - min_number)

    print(scaled_number)
    print(f"Processing file: {file['name']}.")
