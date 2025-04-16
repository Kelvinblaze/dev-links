import { useRef, useState } from "react";
import { PiImage } from "react-icons/pi";

const ImageUploader = ({ label, onChange }) => {
  const fileInputRef = useRef(null);
  const [preview, setPreview] = useState(null);

  const handleClick = () => {
    if (preview === null) {
      fileInputRef.current?.click();
    } else {
      setPreview(null);
      onChange(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = null;
      }
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setPreview(reader.result);
        if (onChange) onChange(file);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="flex flex-col md:flex-row gap-5 items-start md:items-center">
      <div
        onClick={handleClick}
        className="cursor-pointer flex-none size-[193px] bg-light-purple rounded-lg grid place-content-center "
      >
        {preview ? (
          <div className="size-[193px] relative group">
            <img
              src={preview}
              alt="Preview"
              className="object-cover size-full rounded-lg"
            />
            <div className="p-5 absolute top-0 left-0 size-full bg-black/50 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 grid place-content-center">
              <div className="space-y-3 text-center">
                <PiImage size={50} className="text-white w-max mx-auto" />
                <button className="text-white font-semibold">
                  Remove Image
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-3 text-center p-5 ">
            <PiImage size={50} className="text-purple w-max mx-auto" />
            <button className="text-purple font-semibold">
              + Upload Image
            </button>
          </div>
        )}
      </div>

      {label && <p className="text-grey">{label}</p>}

      <input
        type="file"
        accept="image/*"
        ref={fileInputRef}
        onChange={handleFileChange}
        className="hidden"
      />
    </div>
  );
};

export default ImageUploader;
