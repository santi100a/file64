# File to Base64 (File64)

This is a CLI for encoding any file to Base64 format. You can also specify a flag to automatically
add the proper header to use it as a URL for an image, whose format you can specify via a flag.

## Usage

### Via Source Control.
- Clone this repo.
- Enter this repo's directory.
- Run ```node . (flags)```. Flags are specified soon.

### Via Distributables.
- Enter the releases in this repo.
- Select the latest release.
- Download your version and run it. Remember the executables are a bit large.

**Keep in mind NPM usage is coming soon.**

# Flags and Operands
Specify these flags:

- ```-V, --version```: Output the version number.
- ```-h, --help```: Display help for the command.

---

- ```-f, --file <filename>```: Input file **(required).**
- ```-p, --picture [format]```: Print out the encoded file, alongside a header for using it as a URL for
an image. You can also specify a format (default is JPEG).