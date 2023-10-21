import {
    gradle_versions,
    minecraft_versions,
    qfapi_versions,
    qsl_versions,
    quilt_loader_versions,
    quilt_mapping_versions,
} from "./get_version/get_vers.js";

export async function init_versions() {
    // set up version selectors
    let gradle_ver_select = document.getElementById("gradleVersion");
    let loader_ver_select = document.getElementById("loaderVersion");

    // get mc stable versions checkbox
    let mc_stable_checkbox = document.getElementById("mcStable");
    const mc_stable = mc_stable_checkbox.checked;

    // asynchonously get and display gradle versions
    gradle_versions().then((gradle_version_list) =>
        gradle_version_list.forEach((ver) => {
            let option = document.createElement("option");
            option.value = ver;
            option.innerText = ver;
            gradle_ver_select.append(option);
        })
    );

    // asynchonously get and display quilt loader versions
    quilt_loader_versions().then((loader_version_list) =>
        loader_version_list.forEach((ver) => {
            let option = document.createElement("option");
            option.value = ver;
            option.innerText = ver;
            loader_ver_select.append(option);
        })
    );

    await reload_mc_versions(mc_stable);
}

/**
 * @param {boolean} stable states if minecraft versions should be stable
 */
export async function reload_mc_versions(stable) {
    let mc_ver_select = document.getElementById("mcVersion");
    mc_ver_select.innerHTML = "";

    // asynchonously get and display minecraft versions
    minecraft_versions(stable).then(async (mc_version_list) => {
        mc_version_list.forEach((ver) => {
            let option = document.createElement("option");
            option.value = ver;
            option.innerText = ver;
            mc_ver_select.append(option);
        })

        await reload_q_dpendencies_list(mc_version_list);
    });
}

/**
 * @param {string[]} mc_vers a list of minecraft versions (the first one should be the selected one) 
 */
export async function reload_q_dpendencies_list(mc_vers) {
    let q_mapping_ver_select = document.getElementById("quiltMapping");
    let qsl_ver_select = document.getElementById("qslVersion");
    let qfapi_ver_select = document.getElementById("qfapiVersion");

    q_mapping_ver_select.innerHTML = "";
    qsl_ver_select.innerHTML = "";
    qfapi_ver_select.innerHTML = "";

    // asynchonously get and display quilt mapping versions
    // using the latest minecraft version
    quilt_mapping_versions(mc_vers[0]).then((q_mapping_version_list) =>
        q_mapping_version_list.forEach((ver) => {
            let option = document.createElement("option");
            option.value = ver;
            option.innerText = ver;
            q_mapping_ver_select.append(option);
        })
    );

    // asynchonously get and display qsl versions
    // using the latest minecraft version
    qsl_versions(mc_vers).then((qsl_version_list) =>
        qsl_version_list.forEach((ver) => {
            let option = document.createElement("option");
            option.value = ver;
            option.innerText = ver;
            qsl_ver_select.append(option);
        })
    );

    // asynchonously get and display quilted fabric api versions
    // using the latest minecraft version
    qfapi_versions(mc_vers).then((qfapi_version_list) =>
        qfapi_version_list.forEach((ver) => {
            let option = document.createElement("option");
            option.value = ver;
            option.innerText = ver;
            qfapi_ver_select.append(option);
        })
    );
}