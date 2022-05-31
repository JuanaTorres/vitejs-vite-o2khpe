const returnFormDataAsJson = (formData: FormData) => {
  const jsonData: any = {};
  for (let key in formData.keys()) {
    for (let value in formData.values()) {
      jsonData[key] = value;
    }
  }
  return jsonData;
};

export default returnFormDataAsJson;