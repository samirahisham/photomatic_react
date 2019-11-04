import React, { Component } from "react";
import { Modal, Button } from "react-bootstrap";
import { connect } from "react-redux";
import FileBase64 from "react-file-base64";

import { uploadPics } from "../redux/actions/";
import FadeIn from "react-fade-in";
import Lottie from "react-lottie";

import * as legoData from "../assets/json/shutterloading.json";
import * as doneData from "../assets/json/done.json";

import "filepond/dist/filepond.min.css";
import { FilePond, registerPlugin } from "react-filepond";
import FilePondPluginImageCrop from "filepond-plugin-image-crop";

import FilePondPluginImageExifOrientation from "filepond-plugin-image-exif-orientation";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css";
import FilePondPluginFileEncode from "filepond-plugin-file-encode";
import FilePondPluginFileValidateType from "filepond-plugin-file-validate-type";

// Register the plugins
registerPlugin(
  FilePondPluginFileValidateType,
  FilePondPluginImageExifOrientation,
  FilePondPluginImagePreview,
  FilePondPluginFileEncode,
  FilePondPluginImageCrop
);

const defaultOptions = {
  loop: true,
  autoplay: true,
  animationData: legoData.default,
  rendererSettings: {
    preserveAspectRatio: "xMidYMid slice"
  }
};
const defaultOptions2 = {
  loop: false,
  autoplay: true,
  animationData: doneData.default,
  rendererSettings: {
    preserveAspectRatio: "xMidYMid slice"
  }
};

class UploadForm extends Component {
  state = {
    pictures: [],
    eventID: this.props.eventID,
    done: undefined,
    loading: undefined,
    rejections: []
  };

  uploadImg = () => {
    this.props.uploadPics({
      pictures: this.state.pictures,
      eventID: this.state.eventID
    });

    let seeingTime = 1000;
    let timeload = seeingTime + 100 * this.state.pictures.length;
    let doneTime = timeload + 1000;

    setTimeout(() => this.setState({ loading: true }), seeingTime);
    setTimeout(() => this.setState({ done: true, loading: false }), doneTime);
    setTimeout(() => window.location.reload(), doneTime + 1000);
  };

  changeHandler = (file) => {
    const pictures = this.state.pictures.filter((picture) => {
      return picture.name !== file.file.name;
    });

    this.setState({ pictures });
  };

  setUploader = () => {
    if (!this.state.done && !this.state.loading) {
      return (
        <>
          {this.state.pictures.length !== 0 ? (
            <>
              <div class="uploader d-flex justify-content-end mr-5 align-items-center row">
                <label className="btn btn-primary justify-content-center align-items-center ">
                  <FileBase64
                    multiple={true}
                    onDone={(pic) => {
                      pic.forEach((picture) => {
                        this.setState({
                          pictures: this.state.pictures.concat(picture)
                        });
                      });
                    }}
                  />
                  Browse Photos
                </label>
                <button
                  className="btn btn-green justify-content-center align-items-center ml-3 "
                  style={{ marginBottom: 7 }}
                  onClick={() => this.uploadImg()}
                >
                  Upload
                </button>
              </div>
              <br></br>
              <FilePond
                files={this.state.pictures.map((picture) => picture.file)}
                name="pictures"
                allowImageCrop={true}
                allowMultiple={true}
                maxFiles={10}
                // onupdatefiles={(e) => }
                onremovefile={(error, file) => this.changeHandler(file)}
                instantUpload={false}
                allowFileEncode={true}
                allowFileTypeValidation={true}
                acceptedFileTypes={["image/jpeg", "image/jpg", "image/png"]}
                allowDrop={false}
                allowBrowse={false}
                labelIdle={"Preview Your Images"}
              ></FilePond>
            </>
          ) : (
            <div class="uploader d-flex justify-content-end mr-5 align-items-center row">
              <label className="btn btn-primary justify-content-center align-items-center ">
                <FileBase64
                  multiple={true}
                  onDone={(pic) => {
                    pic.forEach((picture) => {
                      this.setState({
                        pictures: this.state.pictures.concat(picture)
                      });
                    });
                  }}
                />
                Browse Photos
              </label>
              <br></br>
            </div>
          )}
        </>
      );
    } else if (!!this.state.loading) {
      return (
        <FadeIn>
          <div class="d-flex justify-content-center align-items-center">
            <Lottie options={defaultOptions} height={400} width={400} />
          </div>
        </FadeIn>
      );
    } else {
      return (
        <FadeIn>
          <div class="d-flex justify-content-center align-items-center">
            <Lottie options={defaultOptions2} height={400} width={400} />
          </div>
        </FadeIn>
      );
    }
  };
  rejections = [];

  render() {
    console.log(this.state.pictures);
    return (
      <Modal
        {...this.props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Upload Pictures
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Please Upload your pictures here </p>
          {/* {this.getAlert()} */}
          <div>{this.setUploader()}</div>
        </Modal.Body>
      </Modal>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    uploadPics: (pictures) => dispatch(uploadPics(pictures))
  };
};

export default connect(
  null,
  mapDispatchToProps
)(UploadForm);
