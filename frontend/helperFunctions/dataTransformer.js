import Papa from "papaparse";
import data from "../public/carparkInfo.csv";

const lotTypes = {
    C: "Cars",
    Y: "Motor Cycles",
    H: "Heavy Vehicles",
};

export default function convertData(response) {
    function findAddressByCarparkNumber(
        carparkNumber
    ) {
        const result = data.filter(
            (data) =>
                data.carparkNumber === carparkNumber
        );
        if (result.length !== 0) {
            return result[0].address;
        }
        return "N.A.";
    }

    function convertLotType(lotType) {
        return lotTypes[lotType];
    }

    const output = [];

    const carparkData = response.items[0].carpark_data;

    carparkData.forEach((carparkInfo) => {
        let rowObj = {};
        carparkInfo.carpark_info.forEach((lotType) => {
            rowObj["carparkNumber"] =
                carparkInfo.carpark_number;
            rowObj[
                "carparkAddress"
            ] = findAddressByCarparkNumber(
                carparkInfo.carpark_number
            );
            rowObj["updatedTime"] =
                carparkInfo.update_datetime;
            rowObj["lotType"] = convertLotType(
                lotType.lot_type
            );
            rowObj["availableLots"] =
                lotType.lots_available;
            rowObj["totalLots"] = lotType.total_lots;
            rowObj["percentageAvailable"] =
                lotType.lots_available /
                lotType.total_lots;
            output.push(rowObj);
            rowObj = {};
        });
    });

    return output;
}
