#!/usr/bin/python3

from flask import Flask, render_template, request
import os
from google.cloud import storage

app = Flask(__name__)
os.environ['GOOGLE_APPLICATION_CREDENTIALS'] ='static/keys/serviceaccount.json'


def upload_blob(bucket_name, source_file_name, destination_blob_name):
  """Uploads a file to the bucket."""
  storage_client = storage.Client()
  bucket = storage_client.get_bucket(bucket_name)
  blob = bucket.blob(destination_blob_name)

  blob.upload_from_filename(source_file_name)


@app.route('/')
def index():
    return render_template('index.html')

@app.route('/upload', methods=['POST'])
def upload():
    video_file = request.files['video']
    text1 = request.form['text1'].strip()
    text2 = request.form['text2'].strip()
    ext=str(video_file.filename).split('.')[-1]
    s=f'{text1}#{text2}#.{ext}'
    video_file.save('static/upload/' + s)
    upload_blob('seass','static/upload/'+s,s)
    # Process the video and text inputs
    return 'File uploaded successfully.'

if __name__ == '__main__':
    app.run(debug=True,host="0.0.0.0",port="8080")
