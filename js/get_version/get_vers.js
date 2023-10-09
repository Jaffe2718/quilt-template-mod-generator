const GRADLE_VERSIONS = "https://services.gradle.org/versions/all";
const QUILT_META = "https://meta.quiltmc.org/v3";
const QUILT_RELEASE_MAVEN = "https://maven.quiltmc.org/repository/release";
const USER_AGENT = "Quilt Template Mod Generator | " + window.navigator.userAgent;



export async function gradle_versions() {
    let response = await fetch(GRADLE_VERSIONS, {
        method: "GET",
        headers: {
            "User-Agent": USER_AGENT
        }
    });
    // get versions from response
    let versions = [];
    let json = await response.json();
    for (let i = 0; i < json.length; i++) {
        versions.push(json[i].version);
        if (json[i].version === "6.8.3") {
            break;
        }
    }
    return versions;
}


export async function minecraft_versions(statable = true) {
    const url = QUILT_META + "/versions/game";
    let response = await fetch(url, {
        method: "GET",
        headers: {
            "User-Agent": USER_AGENT
        }
    });
    let versions = [];
    let json = await response.json();
    if (statable) {
        for (let i = 0; i < json.length; i++) {
            if (json[i].stable) {
                versions.push(json[i].version);
            }
        }
    }
    else {
        for (let i = 0; i < json.length; i++) {
            versions.push(json[i].version);
        }
    }
    return versions;
}


export async function qfapi_versions(mc_ver) {
    const url = QUILT_RELEASE_MAVEN + "/org/quiltmc/quilted-fabric-api/quilted-fabric-api/maven-metadata.xml";
    let response = await fetch(url, {
        method: "GET",
        headers: {
            "User-Agent": USER_AGENT
        }
    });
    let versions = [];
    const xml = await response.text();
    let parser = new DOMParser();
    const doc = parser.parseFromString(xml, "text/xml");
    const version_list = doc.getElementsByTagName("version");
    for (let i = version_list.length - 1; i >= 0; i--) {
        const ver = version_list.item(i).textContent;
        if (ver.endsWith(mc_ver)) {
            versions.push(ver);
        }
    }
    return versions;
}


export async function qsl_versions(mc_ver) {
    const url = QUILT_RELEASE_MAVEN + "/org/quiltmc/qsl/maven-metadata.xml";
    let response = await fetch(url, {
        method: "GET",
        headers: {
            "User-Agent": USER_AGENT
        }
    });
    let versions = [];
    const xml = await response.text();
    let parser = new DOMParser();
    const doc = parser.parseFromString(xml, "text/xml");
    const version_list = doc.getElementsByTagName("version");
    for (let i = version_list.length - 1; i >= 0; i--) {
        let ver = version_list.item(i).textContent;
        if (ver.endsWith(mc_ver)) {
            versions.push(ver);
        }
    }
    return versions;
}


export async function quilt_loader_versions() {
    let url = QUILT_META + "/versions/loader";
    let response = await fetch(url, {
        method: "GET",
        headers: {
            "User-Agent": USER_AGENT
        }
    });
    let versions = [];
    let json = await response.json();
    for (let i = 0; i < json.length; i++) {
        versions.push(json[i].version);
    }
    return versions;
}


export async function quilt_mapping_versions(mc_ver) {
    let url = QUILT_META + "/versions/quilt-mappings";
    let response = await fetch(url, {
        method: "GET",
        headers: {
            "User-Agent": USER_AGENT
        }
    });
    let mappings = [];
    let json = await response.json();
    for (let i = 0; i < json.length; i++) {
        if (json[i].gameVersion.toString() === mc_ver) {
            mappings.push(json[i].version);
        }
    }
    return mappings;
}

// test
// async function test() {
//     console.log(await qfapi_versions("1.19.2"));
// }
//
// test();