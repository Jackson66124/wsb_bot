import numpy as np
import tensorflow as tf
import tensorflow_hub as hub
import tf_keras
import pandas as pd

excel_file = 'Backend\model\csv_files\WSB_Bot_Data.csv'
df = pd.read_csv(excel_file)

#force sentiment column as int
df["label"] = (df.sentiment).astype(int)

#split data to 60 20 20
train, val, test = np.split(df.sample(frac=1), [int(0.6*len(df)), int(0.8*len(df))])

#convert train, val, and test to tf.data.dataset
def df_to_dataset(dataframe, shuffle=True, batch_size=32):
  df = dataframe.copy()
  labels = df.pop("label")
  df = df["title"]
  ds = tf.data.Dataset.from_tensor_slices((df, labels))
  if shuffle:
    ds = ds.shuffle(buffer_size=len(dataframe))
  ds = ds.batch(batch_size)
  ds = ds.prefetch(tf.data.AUTOTUNE)
  return ds

train_data = df_to_dataset(train)
valid_data = df_to_dataset(val)
test_data = df_to_dataset(test)

encoder = tf_keras.layers.TextVectorization(max_tokens=50000)
encoder.adapt(train_data.map(lambda text, label: text))

model = tf_keras.Sequential([
  encoder,
  tf_keras.layers.Embedding(
    input_dim=len(encoder.get_vocabulary()),
    output_dim=32,
    mask_zero=True
  ),
  tf_keras.layers.LSTM(16, return_sequences=False),
  tf_keras.layers.Dropout(0.4),
  tf_keras.layers.Dense(3, activation='Softmax')
])

initial_learning_rate = 0.0005
lr_schedule = tf_keras.optimizers.schedules.ExponentialDecay(
  initial_learning_rate,
  decay_steps=10000,
  decay_rate=0.9,
  staircase=True
)

model.compile(optimizer=tf_keras.optimizers.Adam(learning_rate=lr_schedule),
              loss=tf_keras.losses.sparse_categorical_crossentropy,
              metrics=['accuracy'])

def fit_model():
  model.fit(train_data, epochs=8, validation_data=valid_data)

model.save('Backend\WSB_Sentiment_Model')

#prevent model from retraining in other files
if model is None:
  fit_model()
else:
  print("Model Loaded")