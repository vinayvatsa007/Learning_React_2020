/**
 * Created by Vinay.sharma on 6/21/2020.
 */
import React, { Component } from "react";
import Avatar from "@material-ui/core/Avatar";
import { Input } from "@material-ui/core";

class ImageField extends Component {
  state = {
    image: null,
  };
  onChange = () => {};

  onFileSelected = (event) => {
    const selectedFile = event.target.files[0];
    console.log(
      "ImageField -> onFileSelected-> selectedFile----",
      selectedFile
    );

    const reader = new FileReader();

    // const imgtag = document.getElementById("myimage");
    // imgtag.title = selectedFile.name;

    reader.onload = (event) => {
      this.setState({ image: event.target.result }, () => {
        console.log("state image----", this.state.image);
      });

      // console.log(
      //   "ImageField -> onFileSelected-> ----",
      //   event.target.result
      // );
    };

    reader.readAsDataURL(selectedFile);
    // console.log("ImageField -> onFileSelected-> data----", data);
  };
  render = () => {
    const { image } = this.state;
    return (
      <div>
        <Avatar src={image} />
        {/* <img src={image} /> */}
        <Input type="file" onChange={this.onFileSelected} />
      </div>
    );
  };
}
export default ImageField;
