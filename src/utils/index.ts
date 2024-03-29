export const decodeUnicode = (str: string) => {
  return decodeURIComponent(
    atob(str)
      .split("")
      .map(function (c) {
        return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
      })
      .join("")
  );
};

export const inputFileReader = (
  file: File,
  exts: string[],
  onSucess: (props: any) => void,
  onError: (props: any) => void
) => {
  const reader = new FileReader();

  const ext = file.name
    .substring(file.name.lastIndexOf(".") + 1, file.name.length)
    .toLowerCase();

  if (exts.indexOf(ext) === -1) {
    return onError(`파일 확장자를 확인해주세요. (${exts.join(", ")})`);
  }

  if (/png|jpe?g|svg|gif|tiff|bmp|ico/i.test(ext)) {
    reader.readAsDataURL(file);
  } else {
    reader.readAsText(file);
  }

  reader.onload = () => {
    const { name, size } = file;

    onSucess({
      name,
      size,
      data: reader.result,
    });
  };

  reader.onerror = (err) => {
    onError(`다시 시도해주세요. (${err})`);
  };
};

export const objectToString = (params: {
  [key: string]: string | number | boolean;
}) => {
  return Object.keys(params)
    .map((value) => `${value}=${params[value]}`)
    .join("&");
};
