import { District } from "@/Models/Helper";
import React, { useState, useEffect } from "react";

export default function useIndonesiaCityAPI() {
    const [provinceSelected, setProvinceSelected] = useState<District>({
        id: '64',
        name: 'Kalimantan Timur',
    });
    const [provinces, setProvinces] = React.useState([]);

    const [citiesProvince, setCitiesProvince] = useState<Array<District>>([]);

    useEffect(() => {
        function fetchProvince() {
            fetch('https://www.emsifa.com/api-wilayah-indonesia/api/provinces.json', {
                method: 'GET',
            })
                .then(response => response.json())
                .then(responseJson => {
                    setProvinces(responseJson);
                    setCitiesProvince([]);
                })
                .catch(error => {
                    console.error(error);
                });
        }
        fetchProvince();
    }, []);

    useEffect(() => {
        function fetchCity() {
            fetch(`https://www.emsifa.com/api-wilayah-indonesia/api/regencies/${provinceSelected.id}.json`, {
                method: 'GET',
            })
                .then(response => response.json())
                .then(responseJson => {
                    setCitiesProvince(responseJson);
                })
                .catch(error => {
                    console.error(error);
                });
        }

        fetchCity();
    }, [provinceSelected]);

    return {
        provinceSelected,
        setProvinceSelected,
        provinces,
        citiesProvince,
    }
}
