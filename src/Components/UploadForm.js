import React, { Component } from "react";
import { Modal } from "react-bootstrap";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import FileBase64 from "react-file-base64";

import { uploadpics } from "../redux/actions/";
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
    photos: [],
    id: this.props.id,
    done: undefined,
    loading: undefined,
    rejections: []
  };

  resetUploads = () => {
    this.setState({ photos: [], done: false });
    this.props.onHide();
  };

  uploadImg = () => {
    this.props.uploadpics({
      photos: this.state.photos,
      id: this.state.id
    });

    let seeingTime = 1000;
    let timeload = seeingTime + 100 * this.state.photos.length;
    let doneTime = timeload + 1000;

    setTimeout(() => this.setState({ loading: true }), seeingTime);
    setTimeout(() => this.setState({ done: true, loading: false }), doneTime);
    setTimeout(() => this.resetUploads(), seeingTime + doneTime + 1000);
  };

  changeHandler = (file) => {
    const photos = this.state.photos.filter((picture) => {
      return picture.name !== file.file.name;
    });

    this.setState({ photos });
  };

  setUploader = () => {
    if (!this.state.done && !this.state.loading) {
      return (
        <>
          {this.state.photos.length !== 0 ? (
            <>
              <div className="uploader d-flex justify-content-end mr-5 align-items-center row">
                <label className="btn btn-primary justify-content-center align-items-center ">
                  <FileBase64
                    multiple={true}
                    onDone={(pic) => {
                      pic.forEach((picture) => {
                        this.setState({
                          photos: this.state.photos.concat(picture)
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
                files={this.state.photos.map((picture) => picture.file)}
                name="photos"
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
            <div className="uploader d-flex justify-content-end mr-5 align-items-center row">
              <label className="btn btn-primary justify-content-center align-items-center ">
                <FileBase64
                  multiple={true}
                  onDone={(pic) => {
                    pic.forEach((photos) => {
                      this.setState({
                        photos: this.state.photos.concat(photos)
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
          <div className="d-flex justify-content-center align-items-center">
            <Lottie options={defaultOptions} height={400} width={400} />
          </div>
        </FadeIn>
      );
    } else {
      return (
        <FadeIn>
          <div className="d-flex justify-content-center align-items-center">
            <Lottie options={defaultOptions2} height={400} width={400} />
          </div>
        </FadeIn>
      );
    }
  };
  rejections = [];

  render() {
    if (!this.props.user) return <Redirect to="/homepage" />;

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
const mapStateToProps = (state) => {
  return {
    user: state.authReducer.user
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    uploadpics: (photos) => dispatch(uploadpics(photos))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UploadForm);
