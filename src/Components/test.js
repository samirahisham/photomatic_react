import React, { Component } from "react";
// Import React FilePond
import { FilePond, registerPlugin } from "react-filepond";
import axios from "axios";
import FileBase64 from "react-file-base64";
import base64 from "base-64";

// Import FilePond styles
import "filepond/dist/filepond.min.css";

// Import the Image EXIF Orientation and Image Preview plugins
// Note: These need to be installed separately
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
  FilePondPluginFileEncode
);

// Our app
class test extends Component {
  state = {
    // Set initial files, type 'local' means this is a file
    // that has already been uploaded to the server (see docs)
    pictures: [],
    eventID: "4"
  };

  uploadImg = () => {
    this.state.pictures.forEach((picture) => {
      const reader = new FileReader();
      reader.onload = (readerEvt) => {
        const binaryString = readerEvt.target.result;
        picture.base64 = btoa(binaryString);
        this.setState({pictures: [...this.state.pictures]});
      };
      reader.readAsBinaryString(picture);
    });
    console.log("NEW PICS:  ", this.state);
  };

  postImages = () =>
    axios.post("http://127.0.0.1:8000/api/uploads/", this.state);

  changeHandler = (e) => {
    this.setState({ [e.target.name]: e.target.file });
  };

  handleInit() {
    console.log("FilePond instance has initialised", this.pond);
  }

  render() {

    if(this.state.pictures.every(picture => picture.base64)) this.postImages();

    return (
      <div className="App">
        {/* Pass FilePond properties as attributes */}
        <FilePond
          files={this.state.pictures}
          name="pictures"
          onChange={this.changeHandler}
          allowMultiple={true}
          maxFiles={3}
          allowFileEncode={true}
          allowFileTypeValidation={true}
          acceptedFileTypes={["image/jpeg", "image/jpg", "image/png"]}
          //   server="/api/uploads"
          ref={(ref) => (this.pond = ref)}
          oninit={() => this.handleInit()}
          onupdatefiles={(fileItems) => {
            // Set current file objects to this.state
            this.setState({
              pictures: fileItems.map((fileItem) => fileItem.file)
            });
          }}
        ></FilePond>

        <button onClick={() => this.uploadImg()}>Upload</button>
      </div>
    );
  }
}

export default test;
