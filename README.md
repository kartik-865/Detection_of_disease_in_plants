# Detection of Disease in Plants

A deep learning-based system for automated identification and classification of plant diseases from leaf images. This project leverages convolutional neural networks to provide accurate, rapid disease diagnosis, offering a scalable alternative to traditional expert-dependent inspection methods.

---

## Overview

Plant diseases are a major threat to agricultural productivity and food security worldwide. Early and accurate detection is critical to minimizing crop losses, reducing pesticide overuse, and enabling timely intervention. Traditional detection methods depend heavily on trained agronomists or plant pathologists, which is neither scalable nor accessible in rural or resource-constrained environments.

This project addresses that gap by building a machine learning pipeline that accepts an image of a plant leaf and classifies it as healthy or afflicted by one or more diseases. The system is built entirely in Python and is designed to be straightforward to train, evaluate, and deploy.

---


## Features

- Image-based plant disease classification using convolutional neural networks
- Support for multiple plant species and disease categories
- Preprocessing pipeline for image normalization and augmentation
- Training and evaluation scripts with configurable hyperparameters
- Clean, modular Python codebase suitable for extension and experimentation
- MIT-licensed for open use and modification

---

## Project Structure

```
Detection_of_disease_in_plants/
|
|-- plant_disease_detection/        # Core source code directory
|   |-- (model definitions)
|   |-- (training scripts)
|   |-- (evaluation and prediction utilities)
|   |-- (data loading and preprocessing)
|
|-- LICENSE                         # MIT License
|-- README.md                       # Project documentation
```

The main logic is contained within the `plant_disease_detection/` directory, which holds the model architecture, training pipeline, data utilities, and inference scripts.

---

## Dataset

This project is designed to work with publicly available plant disease image datasets. The most commonly used benchmark in this domain is the **PlantVillage Dataset**, which contains over 50,000 expertly curated images of healthy and diseased plant leaves across 38 classes and 14 crop species, including:

- Tomato
- Potato
- Pepper (Bell)
- Apple
- Corn (Maize)
- Grape
- Strawberry
- and more
  
PlantVillage dataset from [Kaggle](https://www.kaggle.com/datasets/emmarex/plantdisease)

## Model Architecture

The system is built on a convolutional neural network (CNN) architecture. Depending on the configuration used, the model may leverage:

- A custom-built CNN trained from scratch
- Transfer learning from pretrained architectures such as VGG16, ResNet, or MobileNet

Key components of the pipeline include:

- **Input layer**: Accepts RGB leaf images resized to a fixed resolution (e.g., 224x224)
- **Feature extraction**: Convolutional and pooling layers to extract spatial features
- **Classification head**: Fully connected layers with softmax activation for multi-class output
- **Data augmentation**: Random flipping, rotation, zoom, and brightness adjustment to improve generalization
- **Loss function**: Categorical cross-entropy
- **Optimizer**: Adam optimizer with learning rate scheduling

The modular design allows swapping out the backbone architecture with minimal code changes.

---

## Results

Performance metrics will vary depending on the dataset split, model architecture, and training configuration. Typical results on the PlantVillage dataset using transfer learning approaches in the literature achieve:

- **Validation Accuracy**: 90% to 99% depending on architecture and augmentation strategy
- **Test Accuracy**: Competitive with state-of-the-art models in the domain

After training, the model weights and evaluation logs are saved to a designated output directory for reproducibility. Visualizations of training and validation loss curves and the confusion matrix are also generated.

---

## License

This project is licensed under the **MIT License**. You are free to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of this software, provided the original copyright notice is retained.

See the [LICENSE](./LICENSE) file for the full license text.

---

