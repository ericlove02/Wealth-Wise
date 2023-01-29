window.onload = async function main() {
    // add the event listeners to the buttons
    // document.getElementById("complete-onb").addEventListener("click", () => {
    //     console.log("saving...");
    //     setOnboardingStatus(true);
    //     return;
    // });
    // document.getElementById("logout").addEventListener("click", () => {
    //     console.log("saving...");
    //     setOnboardingStatus(false);
    //     window.close();
    //     return;
    // });
    document.getElementById("close-ext").addEventListener("click", () => { window.close(); return; });

    if (await getStorage("onboardingStatus")) {
        document.getElementById("onb1").classList.add('hide-div'); // hide welcome div
        // document.getElementById("onb").classList.remove('hide-div'); // show the info div
        // document.getElementById("total").innerText = await getStorage("grandTotal");
    } else {
        pageRewrite("", "onb1", "onb2", "", "onb-next1");
        pageRewrite("onb1", "onb2", "onb3", "onb-back2", "onb-next2");
        pageRewrite("onb2", "onb3", "onb4", "onb-back3", "onb-next3");
        pageRewrite("onb3", "onb4", "onb5", "onb-back4", "onb-next4");
        pageRewrite("onb4", "onb5", "onb6", "onb-back5", "onb-next5");
        pageRewrite("onb5", "onb6", "onb7", "onb-back6", "onb-next6");
        pageRewrite("onb6", "onb7", "", "onb-back7", "");
    }
}

// get data from chrome storage
const getStorage = async function (key) {
    return new Promise((resolve, reject) => {
        try {
            chrome.storage.sync.get(key, function (value) {
                resolve(value[key]);
            });
        } catch (ex) {
            reject(ex);
        }
    });
};

// set onboardingStatus chrome storage data
function setOnboardingStatus(value) {
    chrome.storage.sync.set({ "onboardingStatus": value }, function () {
        console.log("Status saved");
    });
}

function pageRewrite(last, curr, next, bacbutt, forbutt) {
    if (forbutt != "" && next != "") {
        document.getElementById(forbutt).addEventListener("click", () => {
            document.getElementById(curr).classList.add('hide-div');
            document.getElementById(next).classList.remove('hide-div');
        });
    }
    if (bacbutt != "" && last != "") {
        document.getElementById(bacbutt).addEventListener("click", () => {
            document.getElementById(curr).classList.add('hide-div');
            document.getElementById(last).classList.remove('hide-div');
        });
    }
}