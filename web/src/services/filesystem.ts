export function openFileSystemGallery() {
  console.log("---");
  const fileInput = document.createElement("input");
  fileInput.type = "input";
  fileInput.multiple = false;
  console.log(fileInput);
  fileInput.onchange = (_) => {
    console.log(fileInput.files);
    // let file = Array.from(fileInput.files)[0];
    // console.log(file);
    // const image = document.createElement('img');
    // image.src = URL.createObjectURL(file);
    // imagePrompt(image, file.name, file.lastModifiedDate, file.size )
    // filePrompt(file);
    return fileInput.files;
  };
  fileInput.click();
}
