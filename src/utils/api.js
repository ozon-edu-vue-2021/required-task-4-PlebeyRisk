// псевдо реализация подгрузки данных с сервера
import citizenships from "../assets/data/citizenships.json";
import passportTypes from "../assets/data/passport-types.json";

const getData = (data, searchText = "", key) => {
  const search = searchText?.toLowerCase();
  return new Promise((res) =>
    setTimeout(
      () =>
        res(
          (data || []).filter((item) =>
            key
              ? item[key]?.toLowerCase()?.startsWith(search)
              : item?.toLowerCase()?.startsWith(search)
          )
        ),
      50
    )
  );
};

let countries = [];

getData(citizenships, "", "nationality")
  .then((data) => {
    countries = data
      // убирание дубликатов
      ?.reduce(
        (acc, curItem) =>
          acc.some((item) => item.nationality === curItem.nationality)
            ? acc
            : [...acc, curItem],
        []
      )
      ?.map((item) => ({ id: item.nationality, name: item.nationality }));
  })
  .catch((error) => {
    // это как бы должно просходить на бэке, поэтому ошибку не обрабатываю
    console.error("error on backend: ", error);
  });

const api = {
  citizenships(searchText = "") {
    return getData(citizenships, searchText, "nationality");
  },
  countries(searchText = "") {
    return getData(countries, searchText, "name");
  },
  passportTypes(searchText = "") {
    return getData(passportTypes, searchText, "type");
  },
  sendData(data) {
    return new Promise((res) =>
      setTimeout(() => {
        const dataJSON = JSON.stringify(data);
        console.log(dataJSON);
        res({ success: true });
      }, 500)
    );
  },
};

export default api;
