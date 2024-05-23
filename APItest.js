async function getBathrooms(bbox, areaName) {
  try {
    const query = await fetch("https://overpass-api.de/api/interpreter", {
      method: "POST",
      body:
        "data=" +
        encodeURIComponent(`
                [out:json][timeout:25][bbox:${bbox}];
                area[name="${areaName}"]->.searchArea;
                (
                nwr["amenity"="toilets"](area.searchArea)(${bbox});
                nwr["building"="toilets"](area.searchArea)(${bbox});
                );
                out center;
            `),
    });
    const response = await query.json();
    console.log(JSON.stringify(response, null, 2));
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

getBathrooms("49.9062,-8.6494,60.8608,1.7689", "Oxford");
