# Detection of Disease in Plants

A deep learning-based system for automated identification and classification of plant diseases from leaf images. This project leverages convolutional neural networks to provide accurate, rapid disease diagnosis, offering a scalable alternative to traditional expert-dependent inspection methods.

---

## Table of Contents

- [Overview](#overview)
- [Motivation](#motivation)
- [Features](#features)
- [Project Structure](#project-structure)
- [Dataset](#dataset)
- [Model Architecture](#model-architecture)
- [Requirements](#requirements)
- [Installation](#installation)
- [Usage](#usage)
- [Results](#results)
- [Future Work](#future-work)
- [Contributing](#contributing)
- [License](#license)
- [Acknowledgements](#acknowledgements)

---

## Overview

Plant diseases are a major threat to agricultural productivity and food security worldwide. Early and accurate detection is critical to minimizing crop losses, reducing pesticide overuse, and enabling timely intervention. Traditional detection methods depend heavily on trained agronomists or plant pathologists, which is neither scalable nor accessible in rural or resource-constrained environments.

This project addresses that gap by building a machine learning pipeline that accepts an image of a plant leaf and classifies it as healthy or afflicted by one or more diseases. The system is built entirely in Python and is designed to be straightforward to train, evaluate, and deploy.

---

## Motivation

Global food demand continues to rise, while agricultural losses from disease remain significant. According to the Food and Agriculture Organization (FAO), plant diseases account for an estimated 20 to 40 percent of global crop losses each year. Developing an accessible, automated detection tool has the potential to:

- Reduce dependency on specialist expertise in remote farming communities
- Enable faster response times to disease outbreaks
- Support precision agriculture by providing data-driven insights
- Lower economic losses through early intervention

This project is built with the long-term goal of contributing toward such a tool, starting with a solid, reproducible deep learning baseline.

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

**To use the dataset:**

1. Download the PlantVillage dataset from [Kaggle](https://www.kaggle.com/datasets/emmarex/plantdisease) or the original [PlantVillage source](https://plantvillage.psu.edu/).
2. Organize the data into `train/`, `val/`, and `test/` subdirectories, each containing one subfolder per class label.

Example structure:

```
data/
|-- train/
|   |-- Tomato_healthy/
|   |-- Tomato_Late_blight/
|   |-- Potato_Early_blight/
|   |-- ...
|-- val/
|   |-- ...
|-- test/
|   |-- ...
```

Update the dataset path in the configuration or script before running training.

---

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

## Requirements

The following dependencies are required to run this project:

- Python 3.8 or higher
- TensorFlow 2.x or PyTorch (depending on the backend used)
- NumPy
- Pandas
- Matplotlib
- scikit-learn
- OpenCV (cv2)
- Pillow

Install all dependencies via pip:

```bash
pip install -r requirements.txt
```

If a `requirements.txt` file is not present in the repository, you can manually install the core packages:

```bash
pip install tensorflow numpy pandas matplotlib scikit-learn opencv-python pillow
```

---

## Installation

1. **Clone the repository:**

```bash
git clone https://github.com/kartik-865/Detection_of_disease_in_plants.git
cd Detection_of_disease_in_plants
```

2. **Set up a virtual environment (recommended):**

```bash
python -m venv venv
source venv/bin/activate        # On Windows: venv\Scripts\activate
```

3. **Install dependencies:**

```bash
pip install -r requirements.txt
```

4. **Prepare the dataset** as described in the [Dataset](#dataset) section above.

---

## Usage

### Training the Model

Navigate to the source directory and run the training script:

```bash
cd plant_disease_detection
python train.py --data_dir ../data --epochs 30 --batch_size 32
```

Common configurable arguments may include:

| Argument | Description | Default |
|---|---|---|
| `--data_dir` | Path to the dataset root directory | `./data` |
| `--epochs` | Number of training epochs | `25` |
| `--batch_size` | Number of samples per batch | `32` |
| `--lr` | Learning rate | `0.001` |
| `--model` | Model architecture to use | `cnn` |

Refer to the script's `--help` flag for the full list of available arguments.

### Evaluating the Model

After training, evaluate the model on the test set:

```bash
python evaluate.py --model_path saved_model/model.h5 --data_dir ../data/test
```

This will output accuracy, precision, recall, F1 score, and a confusion matrix.

### Running Inference on a Single Image

To classify a single leaf image:

```bash
python predict.py --image_path path/to/leaf.jpg --model_path saved_model/model.h5
```

The script will output the predicted disease class and the associated confidence score.

---

## Results

Performance metrics will vary depending on the dataset split, model architecture, and training configuration. Typical results on the PlantVillage dataset using transfer learning approaches in the literature achieve:

- **Validation Accuracy**: 90% to 99% depending on architecture and augmentation strategy
- **Test Accuracy**: Competitive with state-of-the-art models in the domain

After training, the model weights and evaluation logs are saved to a designated output directory for reproducibility. Visualizations of training and validation loss curves and the confusion matrix are also generated.

---

## Future Work

There are several directions in which this project can be extended:

- **Multi-label classification**: Support for plants exhibiting more than one disease simultaneously
- **Mobile deployment**: Export the model to TensorFlow Lite or ONNX format for deployment on mobile or edge devices for in-field use
- **Web application**: Build a simple web interface using Flask or FastAPI so farmers can upload images directly from a browser
- **Extended plant coverage**: Train on additional crop species and disease types beyond what PlantVillage contains
- **Real-time detection**: Integrate object detection (e.g., YOLOv8) for bounding-box localization of diseased regions within the leaf
- **Explainability**: Add Grad-CAM or similar visualization techniques to help users understand which regions of the image drove the prediction

---

## Contributing

Contributions are welcome. If you wish to contribute to this project, please follow these steps:

1. Fork the repository
2. Create a new branch for your feature or bug fix:
   ```bash
   git checkout -b feature/your-feature-name
   ```
3. Make your changes and commit them with clear, descriptive messages
4. Push to your fork:
   ```bash
   git push origin feature/your-feature-name
   ```
5. Open a Pull Request against the `main` branch of this repository

Please ensure your code follows consistent formatting and that any new functionality is accompanied by appropriate documentation.

For major changes, please open an issue first to discuss the proposed modification before submitting a pull request.

---

## License

This project is licensed under the **MIT License**. You are free to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of this software, provided the original copyright notice is retained.

See the [LICENSE](./LICENSE) file for the full license text.

---

## Acknowledgements

- The **PlantVillage** project at Penn State University for providing the foundational dataset used in plant disease research
- The open-source deep learning community for frameworks such as TensorFlow and PyTorch that make projects like this accessible
- Researchers in the domain of agricultural AI whose published work informed the methodology used here

---

*Developed by Kartik Gahlot. For questions or collaboration inquiries, please open an issue on this repository.*
